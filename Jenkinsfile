pipeline {
  agent {
    docker {
      image 'node:9.1.0'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Post') {
      steps {
        echo 'Build and test end'
      }
    }
  }
}