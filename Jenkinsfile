pipeline {
  agent {
    node {
      label 'node9'
    }
    
  }
  stages {
    stage('Test') {
      steps {
        git(url: 'https://github.com/bmilojkovic/go_everywhere_fe.git', branch: 'master', changelog: true, credentialsId: 'ntrivix', poll: true)
        sh 'npm install'
      }
    }
  }
}