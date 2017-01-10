#!groovy​

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
  println "--------${branch}--------"

  // Get all Causes for the current build
  def causes = currentBuild.rawBuild.getCauses()
  println("--------${causes}--------")

  // Get a specific Cause type (in this case the user who kicked off the build),
  // if present.
  def specificCause = currentBuild.rawBuild.getCause(hudson.model.Cause$UserIdCause)
  println("--------${specificCause}--------")

  // If you see errors regarding 'Scripts not permitted to use method...' approve
  // these scripts at JENKINS_URL/scriptApproval/ - the UI shows the blocked methods


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
      // sh "yarn test -- --colors"
    }
  }
}
