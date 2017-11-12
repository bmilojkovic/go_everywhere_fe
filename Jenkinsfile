pipeline {
  agent any
  stages {
    stage('init node') {
      steps {
        node(label: 'Allocate node')
      }
    }
    stage('results') {
      steps {
        echo 'ok'
      }
    }
  }
}