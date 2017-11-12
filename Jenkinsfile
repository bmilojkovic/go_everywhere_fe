pipeline {
  agent any
  stages {
    stage('init node') {
      steps {
        node(label: 'Allocate node')
      }
    }
    stage('npm install') {
      steps {
        sh 'npm install'
      }
    }
    stage('results') {
      steps {
        echo 'ok'
      }
    }
  }
}