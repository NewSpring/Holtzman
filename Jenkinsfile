node {
    // uncomment these 2 lines and edit the name 'node-4.4.5' according to what you choose in configuration
    def nodeHome = tool name: 'node-6', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

    stage 'check environment'
    sh "node -v"
    sh "npm -v"

    stage 'setup env'
    sh "npm i -g yarn"

    stage 'checkout'
    checkout scm

    stage 'install'
    sh "yarn"

    stage 'test'
    sh "yarn test"
}
