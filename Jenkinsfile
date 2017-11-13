pipeline {
  agent any
  stages {
    stage('install-dependencies') {
      steps {
	      sh returnStatus: true, script: 'npm install'
      }
    }
  }
}
