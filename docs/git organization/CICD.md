### Continuous Integration (CI) Pipeline:

1. **Code Repository**:
   - We utilize Git for version control. All code changes are committed and pushed to the repository.

2. **Automated Build**:
   - Our automated build process is triggered by Workflow files, ensuring consistency and efficiency in building our applications.

3. **Automated Tests**:
   - **Frontend End-to-End Testing**:
     - Cypress is employed for frontend end-to-end testing, ensuring the functionality and user experience of our applications.
   - **Backend Unit Testing**:
     - Jest is utilized for backend unit testing, verifying individual units of code for correctness.
   - **Backend Integration Testing**:
     - Jest is also utilized for backend integration testing, ensuring seamless interaction between various components of our backend services.

4. **Static Code Analysis**:
   - We utilize ESLint for static code analysis, ensuring code quality, adherence to coding standards, and identifying potential issues early in the development process.

### Continuous Delivery/Continuous Deployment (CD) Pipeline:

5. **Deployment (Not Implemented Yet)**:
   - As of now, we have not implemented the continuous delivery or deployment phase. No deployments have taken place, and our focus has primarily been on establishing a robust CI process.
   - The CD will be implemented during our second sprint

