pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        node(label: 'docker-node') {
          sh 'docker build -f docker/slim/Dockerfile .'
        }

      }
    }
  }
}