# WeatherAppAPI

You can view this API [Here](https://weatherappapi-pydh.onrender.com/weather?city=toronto).

## High-Level Architecture

### Overview

The WeatherApp API is designed to provide weather information for various cities. The application is built using modern web development practices and technologies to ensure scalability, maintainability, and ease of development.

### Framework and Language

- **NestJS**: The application is built using the [NestJS](https://nestjs.com/) framework. NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It leverages TypeScript and incorporates best practices such as dependency injection, modularity, and decorators.
- **TypeScript**: The codebase is written in [TypeScript](https://www.typescriptlang.org/), a typed superset of JavaScript that compiles to plain JavaScript. TypeScript provides static typing, which helps in catching errors early in the development process and improves code quality and maintainability.

### Continuous Integration and Continuous Deployment (CI/CD)

- **GitHub**: The project source code is version controlled using [GitHub](https://github.com/). GitHub facilitates collaboration, code review, and issue tracking. When code is pushed to the GitHub repository, it triggers the CI/CD pipeline.
- **CircleCI**: The project uses [CircleCI](https://circleci.com/) for Continuous Integration and Continuous Deployment (CI/CD). CircleCI automates the build, test, and deployment processes, ensuring that changes to the codebase are reliably and quickly integrated and deployed.
  - **Pull Request Workflow**: When a pull request (PR) is created, CircleCI automatically runs a pipeline that includes steps for installing dependencies, linting, running unit tests, and performing end-to-end (e2e) tests. It also builds the application to ensure there are no build errors.
  - **Deployment Workflow**: Once the PR is reviewed and merged into the `master` branch, CircleCI triggers a deployment pipeline that deploys the application to Render.com.

### Deployment

- **Render.com**: The application is deployed on [Render](https://render.com/). Render is a cloud platform that simplifies the deployment and management of web applications. It provides seamless integrations, automatic HTTPS, and zero-downtime deployments.
  - **Hosting**: The API is hosted on Render, where it runs in a docker container.
  - **Domains and SSL**: Render provides custom domains and automatic SSL certificates, ensuring secure communication between clients and the API.

### Architecture Diagram

![WeatherApp Architecture](images/architecture.png)
