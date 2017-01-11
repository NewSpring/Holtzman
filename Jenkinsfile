#!groovy​

// set +x //hide run commands

node {
  // uncomment these 2 lines and edit the name 'node-4.4.5' according to what you choose in configuration
  def nodeHome = tool name: 'node-6', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
  env.PATH = "${nodeHome}/bin:${env.PATH}"
  env.TZ = "America/New_York"

  // github-organization-plugin jobs are named as 'org/repo/branch'
  // we don't want to assume that the github-organization job is at the top-level
  // instead we get the total number of tokens (size)
  // and work back from the branch level Pipeline job where this would actually be run
  // Note: that branch job is at -1 because Java uses zero-based indexing
  tokens = "${env.JOB_NAME}".tokenize('/')
  org = tokens[tokens.size()-3]
  repo = tokens[tokens.size()-2]
  branch = tokens[tokens.size()-1]

  println "#### CURRENTLY CHECKED OUT: ${branch} ####"
  def prCount = branch.findAll(/PR-.*/).size();
  def isPR = prCount > 0;

  stage ("environment") {
    sh "node -v"
    sh "npm -v"
  }

  stage ("checkout") {
    checkout scm
  }

  stage ("install") {
    sh "yarn"
  }

  wrap([$class: 'AnsiColorBuildWrapper']) {
    stage ("test") {
      sh "yarn test -- --colors"
    }
  }

  if (isPR) {
    stage("tagging") {
      def green = "\u001B[32m";
      def tag = "GH${branch.substring(3)}-B${env.BUILD_NUMBER}";
      wrap([$class: 'AnsiColorBuildWrapper']) {
        sh "echo tagging ${branch} with ${green}${tag}"
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'GithubJD', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
          sh("git tag ${tag}")
          def repositoryUrl = "github.com/NewSpring/holtzman.git"
          sh("git push https://${env.GIT_USERNAME}:${env.GIT_PASSWORD}@${repositoryUrl} --tags")
        }
      }
    }
  }
}
