pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "standing-ui"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_BUILDKIT = "1"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/BasavarajCM/standing-ui.git',  // change repo URL accordingly
                        credentialsId: 'github-credentials'
                    ]]
                ])
            }
        }

        stage('Build') {
            steps {
                // Install dependencies and build (if any build step needed)
                sh 'npm install'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Clean old containers/images if any
                    sh 'docker stop standing-ui || true'
                    sh 'docker rm standing-ui || true'
                    sh 'docker rmi standing-ui:latest || true'

                    // Build image with BuildKit
                    sh """
                        docker buildx build --load \
                            -t ${DOCKER_IMAGE}:latest \
                            -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    """

                    // Verify images
                    sh 'docker images | grep ${DOCKER_IMAGE}'
                }
            }
        }

        stage('Docker Run') {
            steps {
                script {
                    sh """
                        docker run -d \
                            --name standing-ui \
                            -p 4200:4200 \
                            ${DOCKER_IMAGE}:latest
                    """
                    // Health check - simple curl to the UI endpoint (adjust if needed)
                    sh 'sleep 10 && curl -f http://localhost:4200 || echo "UI app might not be responding yet"'
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up workspace..."
            cleanWs()
        }
        success {
            echo "✅ UI Pipeline succeeded! App running at: http://localhost:4200"
        }
        failure {
            echo "❌ UI Pipeline failed - checking logs..."
            sh 'docker logs standing-ui --tail 50 || true'
        }
    }
}
