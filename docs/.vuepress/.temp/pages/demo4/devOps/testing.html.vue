<template><div><h1 id="testing-policy" tabindex="-1"><a class="header-anchor" href="#testing-policy"><span>Testing Policy</span></a></h1>
<h2 id="unit-testing" tabindex="-1"><a class="header-anchor" href="#unit-testing"><span>Unit testing</span></a></h2>
<p>Unit testing is a software testing technique that evaluates individual units of source code to verify if they function as expected. WorkWise used two different frameworks to conduct unit tests. We used Jest to test our backend and Cypress to test our frontend.</p>
<h3 id="jest-backend" tabindex="-1"><a class="header-anchor" href="#jest-backend"><span>Jest - backend</span></a></h3>
<p>The Jest framework has been used to conduct the unit tests for WorkWise. Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript/Typescript codebase. All of our unit tests in the backend were conducted using automated Jest tests. Refer to our <a href="https://work-wise-central-1.vercel.app/demo4/devOps/cicd.html" target="_blank" rel="noopener noreferrer">CI/CD</a> section of the documentation for a description of our CI/CD pipeline.</p>
<p><img src="/backend-testing.png" alt="Backend Unit Tests"></p>
<h3 id="cypress-frontend" tabindex="-1"><a class="header-anchor" href="#cypress-frontend"><span>Cypress - frontend</span></a></h3>
<p>The Cypress framework has been used to perform the unit tests in frontend for the WorkWise frontend. Cypress is a JavaScript testing framework built to efficiently test modern web applications, ensuring seamless user interactions. This is why we choose to use cypress to perform our unit tests for the frontend. All of our frontend tests have been automated using Cypress. For more details on our continuous testing approach, refer to the <a href="https://work-wise-central-1.vercel.app/demo4/devOps/cicd.html" target="_blank" rel="noopener noreferrer">CI/CD</a> section of our documentation.</p>
<p><img src="/frontend-testing.png" alt="Frontend Unit Tests"></p>
<h2 id="integration-testing" tabindex="-1"><a class="header-anchor" href="#integration-testing"><span>Integration testing</span></a></h2>
<p>Integration testing is a software testing technique that assesses how multiple components or modules of a system interact with each other to ensure they work together as intended. In the WorkWise project, we employed Jest for integration testing of our backend, allowing us to verify the interactions between controllers, services, and repositories. For our frontend, we utilized Cypress to conduct integration tests, ensuring that various Vue components function correctly together and provide a seamless user experience.</p>
<h3 id="jest-backend-1" tabindex="-1"><a class="header-anchor" href="#jest-backend-1"><span>Jest - backend</span></a></h3>
<p>The Jest framework has been employed to conduct the integration tests for WorkWise. This powerful testing framework enables us to thoroughly evaluate the interactions between various components of our backend system, including controllers, services, and repositories. By utilizing Jest, we can ensure that these components work together seamlessly and produce the expected outcomes when integrated.</p>
<h3 id="cypress-frontend-1" tabindex="-1"><a class="header-anchor" href="#cypress-frontend-1"><span>Cypress - frontend</span></a></h3>
<p>The Cypress framework has been utilized to conduct integration tests for the WorkWise frontend. This advanced testing tool allows us to thoroughly assess the interactions between various Vue components and ensure that they function correctly together within the application. By leveraging Cypress, we can simulate real user interactions, enabling us to validate the overall user experience and verify that all integrated components operate as expected.</p>
<h2 id="end-to-end-testing" tabindex="-1"><a class="header-anchor" href="#end-to-end-testing"><span>End-to-end testing</span></a></h2>
<h3 id="cypress" tabindex="-1"><a class="header-anchor" href="#cypress"><span>Cypress</span></a></h3>
<p>The Cypress framework has been employed to conduct end-to-end tests for the WorkWise application. This robust testing tool enables us to simulate real user scenarios and interactions, providing a comprehensive evaluation of the application from the user's perspective. By using Cypress, we can validate the entire workflow, ensuring that all components, including the frontend, backend, and any external services, function cohesively as intended.</p>
<p>Our end-to-end tests cover critical user journeys, such as account registration, login, and data submission processes, allowing us to assess the complete functionality of the application. This thorough testing approach helps us identify any potential issues that may affect the user experience, ensuring that the application operates smoothly and reliably in real-world situations.</p>
<p><img src="/end-to-end-testing.png" alt="End to end Tests"></p>
<h2 id="non-functional-requirement-testing" tabindex="-1"><a class="header-anchor" href="#non-functional-requirement-testing"><span>Non-functional requirement testing</span></a></h2>
<h3 id="user-testing" tabindex="-1"><a class="header-anchor" href="#user-testing"><span>User testing</span></a></h3>
<p>User testing is a critical phase in the development of the WorkWise application since useability is our main non-functional requirement. It involves evaluating the application’s usability, functionality, and overall user experience through direct feedback from actual users.</p>
<h4 id="objective" tabindex="-1"><a class="header-anchor" href="#objective"><span>Objective</span></a></h4>
<ul>
<li><strong>Evaluate Usability:</strong> Identify any usability issues that may hinder users from achieving their goals within the application.</li>
<li><strong>Gather Feedback:</strong> Collect qualitative feedback on user satisfaction, preferences, and potential areas for improvement.</li>
<li><strong>Test Functionality:</strong> Ensure that all features and functionalities work as intended in real-world scenarios.</li>
<li><strong>Identify Bugs:</strong> Discover any bugs or glitches that may affect the user experience.</li>
</ul>
<h4 id="methodology" tabindex="-1"><a class="header-anchor" href="#methodology"><span>Methodology</span></a></h4>
<ol>
<li>Define Test Objectives:
<ul>
<li>The objective for the test were identified</li>
<li>The acceptance criteria for each test was set.</li>
</ul>
</li>
<li>Select Participants:
<ul>
<li>A relatively diverse range of potential users was selected to participate in the user test</li>
</ul>
</li>
<li>Prepare Test Scenarios:
<ul>
<li>Realistic scenarios were developed for the tests</li>
<li>The scenarios were made to cover various aspects of the application</li>
</ul>
</li>
<li>Conduct Testing Sessions:
<ul>
<li>The test were conducted both in person and remotely depending on the availability of the test subject</li>
<li>The participant were encouraged to vocalize their experience</li>
</ul>
</li>
<li>Collect Data:
<ul>
<li>The session is recorded and the users are asked to fill out a feedback form</li>
</ul>
</li>
<li>Analyze Results:
<ul>
<li>The results of the testing was analyzed and the system was updated accordingly</li>
</ul>
</li>
</ol>
<h4 id="the-test-cases" tabindex="-1"><a class="header-anchor" href="#the-test-cases"><span>The test cases</span></a></h4>
<h5 id="test-1-using-the-tables" tabindex="-1"><a class="header-anchor" href="#test-1-using-the-tables"><span>Test 1: Using the tables</span></a></h5>
<ul>
<li>Objective: Get the user to perform the actions available on the tables. Since the layout of the tables are the same for most subsystem, this will only be tested once. The teams subsystem will be used for this test.</li>
<li>Acceptance: The user must preform the create, view, edit and delete operations on the Teams table.</li>
</ul>
<h5 id="test-2-use-of-job-board" tabindex="-1"><a class="header-anchor" href="#test-2-use-of-job-board"><span>Test 2: Use of job board</span></a></h5>
<ul>
<li>Objective: Get the user to interact with the functionality in the job board</li>
<li>Acceptance: The user must change the status of a job by moving the job. They must create a new status, reorder the statuses as well as archive jobs from the job board.</li>
</ul>
<h5 id="test-3-use-the-job-card" tabindex="-1"><a class="header-anchor" href="#test-3-use-the-job-card"><span>Test 3: Use the job card</span></a></h5>
<ul>
<li>Objective: Get the user to interact with the functionality of the job card</li>
<li>Acceptance: The user must start their time tracking, record stock use, comment, create a task list and upload an image to the job card.</li>
</ul>
<h5 id="test-4-use-the-invoices-subsystem" tabindex="-1"><a class="header-anchor" href="#test-4-use-the-invoices-subsystem"><span>Test 4: Use the invoices subsystem</span></a></h5>
<ul>
<li>Objective: Get the user to use the invoice subsystem.</li>
<li>Acceptance: The user must generate an invoice, and send that invoice to the client as well as find which invoices have been paid</li>
</ul>
<h5 id="test-5-stock-take" tabindex="-1"><a class="header-anchor" href="#test-5-stock-take"><span>Test 5: Stock take</span></a></h5>
<ul>
<li>Objective: Get the user to preform a stock take</li>
<li>Acceptance: The user must perform a stock take for the system and have it update the inventory on the system</li>
</ul>
<h5 id="test-6-stock-movements" tabindex="-1"><a class="header-anchor" href="#test-6-stock-movements"><span>Test 6: Stock movements</span></a></h5>
<ul>
<li>Objective: Get the user to intact with the stock movements</li>
<li>Acceptance: The user must generate a pdf report of the stock movements for a particular date</li>
</ul>
<h5 id="test-7-changing-companies" tabindex="-1"><a class="header-anchor" href="#test-7-changing-companies"><span>Test 7: Changing companies</span></a></h5>
<ul>
<li>Objective: Get the user to change the company for which they are viewing the system</li>
<li>Acceptance: The user must change from one company to another</li>
</ul>
<h4 id="the-feedback-form" tabindex="-1"><a class="header-anchor" href="#the-feedback-form"><span>The feedback form</span></a></h4>
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScKcqRHh2YjRvmo7_j1sI28zvajIzNomIxhUSi-VGWnBT-NBg/viewform?usp=sf_linkQiEZqpipQq7snRH3QuOq0chcQwYVLjmkA0SIAQJhX4g/viewform?embedded=true" width="640" height="2258" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
<h4 id="results" tabindex="-1"><a class="header-anchor" href="#results"><span>Results</span></a></h4>
<h3 id="performance-testing" tabindex="-1"><a class="header-anchor" href="#performance-testing"><span>Performance testing</span></a></h3>
<h3 id="load-testing" tabindex="-1"><a class="header-anchor" href="#load-testing"><span>Load testing</span></a></h3>
</div></template>


