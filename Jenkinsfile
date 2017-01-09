#!groovy​

node {
  // uncomment these 2 lines and edit the name 'node-4.4.5' according to what you choose in configuration
  def nodeHome = tool name: 'node-6', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
  env.PATH = "${nodeHome}/bin:${env.PATH}"
  env.TZ = "America/New_York"

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
  
  ansiColor('xterm') {
    echo "\e[31mTesting...\e[0m\n"
  }
  
  wrap([$class: 'AnsiColorBuildWrapper']) {
    stage ("test") {
      sh "yarn test"
    }
  }
}
