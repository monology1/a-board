pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'a-board'
        DOCKER_TAG = "${BRANCH_NAME}-${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Build Docker image
                    sh """
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        echo 'Deploying to development environment'
                        sh 'docker-compose -f docker-compose.dev.yml up -d'
                    } else if (env.BRANCH_NAME == 'prod') {
                        echo 'Deploying to production environment'
                        sh 'docker-compose -f docker-compose.prod.yml up -d'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}