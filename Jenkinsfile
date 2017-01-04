node {
    // uncomment these 2 lines and edit the name 'node-4.4.5' according to what you choose in configuration
    def nodeHome = tool name: 'node-6', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

    stage 'check environment'
    sh "node -v"
    sh "npm -v"

    stage 'setup env'
    sh "npm i -g yarn"
    sh "gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3"
    sh "curl -sSL https://get.rvm.io | bash -s stable"
    sh "rvm -v"
    sh "rvm install 2.2.5"
    sh "rvm use 2.2.5"

    stage 'checkout'
    checkout scm

    stage 'install'
    sh "yarn"

    stage 'test'
    sh "yarn test"
}
