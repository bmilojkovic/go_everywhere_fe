pipeline {
  agent any
  stages {
    stage('') {
      steps {
	      checkout([$class: 'GitSCM', branches: [[name: '*/feature/jenkins-setup']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'CleanBeforeCheckout']], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/bmilojkovic/go_everywhere_fe']]])
      }
    }
  }
}
