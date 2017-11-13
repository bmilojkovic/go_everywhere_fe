pipeline {
  agent any
  stages {
    stage('install-dep') {
      steps {
	      sh returnStatus: true, script: 'npm install'
      }
    }
  }
}
