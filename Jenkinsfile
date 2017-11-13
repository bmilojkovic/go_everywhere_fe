pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            sh '''ng set --global warnings.versionMismatch=false
npm install'''
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
}