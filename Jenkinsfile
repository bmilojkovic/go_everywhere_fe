pipeline {
  agent {
    docker {
      image 'mkenney/npm'
      args '-u root '
    }
    
  }
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            sh 'npm install'
          }
        }
        stage('list files') {
          steps {
            sh 'ls'
          }
        }
      }
    }
    stage('Test') {
      steps {
        sh 'ng -v'
      }
    }
    stage('Post') {
      steps {
        echo 'Build and test end'
      }
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
    HOME = '.'
  }
}