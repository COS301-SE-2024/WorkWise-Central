# CI/CD 

## Continuous Integration (CI)
### Code Repository
   - We utilize Git for version control. All code changes are committed and pushed to the repository.

### Automated Build
   - Our automated build process is triggered by Workflow files, ensuring consistency and efficiency in building our applications.

### Automated Tests
   - **Frontend End-to-End Testing**:
     - Cypress is employed for frontend end-to-end testing, ensuring the functionality and user experience of our applications.
   - **Backend Unit Testing**:
     - Jest is utilized for backend unit testing, verifying individual units of code for correctness.
   - **Backend Integration Testing**:
     - Jest is also utilized for backend integration testing, ensuring seamless interaction between various components of our backend services.

### Static Code Analysis
   - We utilize ESLint for static code analysis, ensuring code quality, adherence to coding standards, and identifying potential issues early in the development process.

## Continuous Delivery/Continuous Deployment (CD)

### Deployment
   - Our client has provided us a secured Virtual Machine to deploy/host our entire system. Due to **security concerns** brought up by the client, we will be unable to implement continuous deployment.
