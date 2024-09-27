# Testing Policy 

## Unit testing
Unit testing is a software testing technique that evaluates individual units of source code to verify if they function as expected. WorkWise used two different frameworks to conduct unit tests. We used Jest to test our backend and Cypress to test our frontend.

### Jest - backend
The Jest framework has been used to conduct the unit tests for WorkWise. Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript/Typescript codebase. All of our unit tests in the backend were conducted using automated Jest tests. Refer to our [CI/CD](https://work-wise-central-1.vercel.app/demo4/devOps/cicd.html) section of the documentation for a description of our CI/CD pipeline. 

![Backend Unit Tests](/backend-testing.png)

### Cypress - frontend

The Cypress framework has been used to perform the unit tests in frontend for the WorkWise frontend. Cypress is a JavaScript testing framework built to efficiently test modern web applications, ensuring seamless user interactions. This is why we choose to use cypress to perform our unit tests for the frontend. All of our frontend tests have been automated using Cypress. For more details on our continuous testing approach, refer to the [CI/CD](https://work-wise-central-1.vercel.app/demo4/devOps/cicd.html) section of our documentation.

![Frontend Unit Tests](/frontend-testing.png)


## Integration testing
Integration testing is a software testing technique that assesses how multiple components or modules of a system interact with each other to ensure they work together as intended. In the WorkWise project, we employed Jest for integration testing of our backend, allowing us to verify the interactions between controllers, services, and repositories. For our frontend, we utilized Cypress to conduct integration tests, ensuring that various Vue components function correctly together and provide a seamless user experience.

### Jest - backend
The Jest framework has been employed to conduct the integration tests for WorkWise. This powerful testing framework enables us to thoroughly evaluate the interactions between various components of our backend system, including controllers, services, and repositories. By utilizing Jest, we can ensure that these components work together seamlessly and produce the expected outcomes when integrated.


### Cypress - frontend

The Cypress framework has been utilized to conduct integration tests for the WorkWise frontend. This advanced testing tool allows us to thoroughly assess the interactions between various Vue components and ensure that they function correctly together within the application. By leveraging Cypress, we can simulate real user interactions, enabling us to validate the overall user experience and verify that all integrated components operate as expected.

## End-to-end testing
### Cypress
The Cypress framework has been employed to conduct end-to-end tests for the WorkWise application. This robust testing tool enables us to simulate real user scenarios and interactions, providing a comprehensive evaluation of the application from the user's perspective. By using Cypress, we can validate the entire workflow, ensuring that all components, including the frontend, backend, and any external services, function cohesively as intended.

Our end-to-end tests cover critical user journeys, such as account registration, login, and data submission processes, allowing us to assess the complete functionality of the application. This thorough testing approach helps us identify any potential issues that may affect the user experience, ensuring that the application operates smoothly and reliably in real-world situations.

![End to end Tests](/end-to-end-testing.png)

## Non-functional requirement testing 
### User testing 
User testing is a critical phase in the development of the WorkWise application since useability is our main non-functional requirement. It involves evaluating the application’s usability, functionality, and overall user experience through direct feedback from actual users. 

#### Objective 
- **Evaluate Usability:** Identify any usability issues that may hinder users from achieving their goals within the application.
- **Gather Feedback:** Collect qualitative feedback on user satisfaction, preferences, and potential areas for improvement.
- **Test Functionality:** Ensure that all features and functionalities work as intended in real-world scenarios.
- **Identify Bugs:** Discover any bugs or glitches that may affect the user experience.

#### Methodology
1. Define Test Objectives:
    - The objective for the test were identified 
    - The acceptance criteria for each test was set.
2. Select Participants:
   - A relatively diverse range of potential users was selected to participate in the user test
3. Prepare Test Scenarios:
   - Realistic scenarios were developed for the tests
   - The scenarios were made to cover various aspects of the application
4. Conduct Testing Sessions:
   - The test were conducted both in person and remotely depending on the availability of the test subject
   - The participant were encouraged to vocalize their experience 
5. Collect Data:
   - The session is recorded and the users are asked to fill out a feedback form
6. Analyze Results:
   - The results of the testing was analyzed and the system was updated accordingly

#### The test cases

##### Test 1: Using the tables 
- Objective: Get the user to perform the actions available on the tables. Since the layout of the tables are the same for most subsystem, this will only be tested once. The teams subsystem will be used for this test.
- Acceptance: The user must preform the create, view, edit and delete operations on the Teams table.

##### Test 2: Use of job board
- Objective: Get the user to interact with the functionality in the job board 
- Acceptance: The user must change the status of a job by moving the job. They must create a new status, reorder the statuses as well as archive jobs from the job board.

##### Test 3: Use the job card
- Objective: Get the user to interact with the functionality of the job card
- Acceptance: The user must start their time tracking, record stock use, comment, create a task list and upload an image to the job card.

##### Test 4: Use the invoices subsystem
- Objective: Get the user to use the invoice subsystem.
- Acceptance: The user must generate an invoice, and send that invoice to the client as well as find which invoices have been paid

##### Test 5: Stock take 
- Objective: Get the user to preform a stock take 
- Acceptance: The user must perform a stock take for the system and have it update the inventory on the system

##### Test 6: Stock movements
- Objective: Get the user to intact with the stock movements
- Acceptance: The user must generate a pdf report of the stock movements for a particular date

##### Test 7: Changing companies 
- Objective: Get the user to change the company for which they are viewing the system
- Acceptance: The user must change from one company to another

#### The feedback form
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScKcqRHh2YjRvmo7_j1sI28zvajIzNomIxhUSi-VGWnBT-NBg/viewform?usp=sf_linkQiEZqpipQq7snRH3QuOq0chcQwYVLjmkA0SIAQJhX4g/viewform?embedded=true" width="640" height="2258" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>


#### Results 


### Performance testing

### Load testing