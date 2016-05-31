#!/usr/bin/env bash

set -e
set -u
set -o pipefail

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

# reads $CIRCLE_SHA1, $host_port
# sets $task_def
make_task_def() {

    meteor_settings=$(cat settings.json | $JQ . | sed 's/\"/\\"/g' | tr -d '\n')

    task_template='[
      {
        "name": "apollos",
        "memory": 512,
        "cpu": 512,
        "essential": true,
        "image": "meteorhacks/meteord:binbuild",
        "portMappings": [
          {
            "hostPort": 8080,
            "containerPort": 80,
            "protocol": "tcp"
          }
        ],
        "environment": [
          {
            "name": "REBUILD_NPM_MODULES",
            "value": "1"
          },
          {
            "name": "MONGO_URL",
            "value": "'"$DOCKER_MONGO_URL"'"
          },
          {
            "name": "DISABLE_WEBSOCKETS",
            "value": "1"
          },
          {
            "name": "ROOT_URL",
            "value": "https://my.newspring.cc"
          },
          {
            "name": "BUNDLE_URL",
            "value": "'"$BUNDLE_URL"'"
          },
          {
            "name": "OPLOG_URL",
            "value": "'"$DOCKER_OPLOG_URL"'"
          },
          {
            "name": "METEOR_SETTINGS",
            "value": "'"$meteor_settings"'"
          },
          {
            "name": "NEW_RELIC_NO_CONFIG_FILE",
            "value": "true"
          },
          {
            "name": "NEW_RELIC_LICENSE_KEY",
            "value": "'"$NEW_RELIC_LICENSE_KEY"'"
          },
          {
            "name": "NEW_RELIC_APP_NAME",
            "value": "'"$NEW_RELIC_APP_NAME"'"
          },
          {
            "name": "NEW_RELIC_LOG_LEVEL",
            "value": "'"$NEW_RELIC_LOG_LEVEL"'"
          },
          {
            "name": "NEW_RELIC_IGNORING_RULES",
            "value": "^/sockjs"
          },
          {
            "name": "TZ",
            "value": "America/New_York"
          }
        ]
      }
    ]'

}

# reads $family
# sets $revision
register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_template" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

deploy_cluster() {

    host_port=8080
    family="newwwspring"

    make_task_def

    register_definition
    if [[ $(aws ecs update-service --cluster apollos --service newwwspring --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi

    # wait for older revisions to disappear
    # not really necessary, but nice for demos
    # for attempt in {1..30}; do
    #     if stale=$(aws ecs describe-services --cluster apollos --services apollos-new | \
    #                    $JQ ".services[0].deployments | .[] | select(.taskDefinition != \"$revision\") | .taskDefinition"); then
    #         echo "Waiting for stale deployments:"
    #         echo "$stale"
    #         sleep 5
    #     else
    #         echo "Deployed!"
    #         return 0
    #     fi
    # done
    # echo "Service update took too long."
    return 0
}

deploy_cluster
