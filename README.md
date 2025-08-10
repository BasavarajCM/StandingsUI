
# Standing UI

![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-1976D2?style=flat&logo=angular&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat&logo=Jenkins&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)

A responsive Angular application with Angular Material design and automated CI/CD pipeline using Jenkins and Docker.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Features
- Responsive UI built with Angular and Angular Material
- Modern Material Design layout and components
- Containerized deployment with Docker
- Automated CI/CD pipeline using Jenkins
- Integrated with [Backend Service](https://github.com/BasavarajCM/standing-service)

## Prerequisites
- Node.js v16+
- Angular CLI (install with `npm install -g @angular/cli`)
- Angular Material (included in project)
- Docker 20.10+
- Jenkins 2.346+ (for CI/CD)
- npm 8+

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/BasavarajCM/StandingsUI.git
   cd StandingsUI
Install dependencies:

bash
npm install
Start development server:

bash
ng serve
The application will be available at http://localhost:4200

Docker Deployment
Build the Docker image:

bash
docker build -t standing-ui .
Run the container:

bash
docker run -d -p 4200:4200 --name standing-ui standing-ui
Access the application:

text
http://localhost:4200
CI/CD Pipeline
The Jenkins pipeline automates:

Code checkout

Dependency installation

Docker image building

Container deployment

Pipeline Features:
Multi-stage build process

Automatic version tagging

Health checks

Cleanup operations

To set up the Jenkins pipeline:

Import the Jenkinsfile from this repository

Configure GitHub credentials in Jenkins

Set up webhooks for automatic triggering

API Documentation
The UI integrates with the backend API service:

Swagger documentation: API Docs

Base URL: http://your-api-url/api/v1
## Project Structure
StandingsUI/
├── src/ # Angular application source
│ ├── app/ # Main application components
│ │ ├── components/ # Reusable UI components
│ │ ├── services/ # Angular services
│ │ ├── models/ # Data models/interfaces
│ │ ├── pages/ # Feature pages/views
│ │ ├── shared/ # Shared modules/pipes/directives
│ │ └── app.module.ts # Root Angular module
│ ├── assets/ # Static assets (images, fonts)
│ ├── environments/ # Environment configurations
│ ├── styles/ # Global SCSS/CSS styles
│ └── index.html # Main HTML entry point
├── .dockerignore # Files ignored by Docker
├── Dockerfile # Docker configuration
├── Jenkinsfile # CI/CD pipeline
├── angular.json # Angular CLI configuration
├── package.json # Dependency management
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation
