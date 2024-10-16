# User Stories

#### User story: Help desk
As a general user,
I want to have access to a help desk,
so that I may sort out any issue I encounter when using the system

Acceptance criteria:

-Given a general user, they must be able to access a help menu that contains FAQ's
-Given a general user, they must be able to access a help menu that contains a user manual that will guide them on how to use the system

#### User story: Manager view of client
As a managerial user,
I want to be able to access all the clients of the business,
so that I may manage the clients the business has effectively

Acceptance criteria:

-Given a user with the relevant permissions, they must be given a view of all the clients of the business.
-They must be able to sort, search and filter all the clients
-They must be able to edit the information of a given client
-They must be able to add a new client to the system


##### User story: Add Client
As a managerial user,
I want to be able to add clients to the system,
so that I can keep track of all the clients and their jobs

Acceptance criteria:

-The ability to add clients should only be available to users with appropriate permissions
-The user must be click on an add client button
-The user must be able to input the clients details
-The details must be saved to the database

##### User story: Edit Client
As a managerial user,
I want to be able to edit clients that already exist in the system,
so that I make necessary changes to their info

Acceptance criteria:

-The ability to edit clients should only be available to users with appropriate permissions
-The user must be click on the client they want to edit
-The user must be able to update the clients details
-The details must be updated in the database

##### User story: Delete Client
As a managerial user,
I want to be able to delete clients from the system,
so that I may remove any clients that should no longer be in the companies system

Acceptance criteria:

-The ability to delete clients should only be available to users with appropriate permissions
-The user must be click on a delete button
-The client must be flagged for deletion on the database

#### User story: Manager view of employees
As a managerial user,
I want to be able to view the employees in the system
so that I can manage them effectively

Acceptance criteria:

-The user must only be able to view the employees based on their permissions
-The view must show all the information pertaining to the employee
-The view must allow for searching sorting and filtering

##### User story: Add employee
As a managerial user,
I want to be able to add employees to the system,
so that I can manage them effectively

Acceptance criteria:

-This must only be available to users with associated permissions
-A managerial employee must be able to add employees using the employees username
-A managerial employee must be able to add employees by sending the employee the company's Id
-A managerial employee must be able to add employees by sending the peron a dynamic link.

##### User story: edit employee
As a managerial user,
I want to be able to edit employees of the company,
so that I can make any necessary changes

Acceptance criteria:

-The user should only be able to edit jobs if they have the appropriate permissions.
-The user must be able to edit all the information pertaining to the job.
-The updated information for the job needs to be saved to the database

##### User story: delete employee
As a managerial user,
I want to be able to delete employees from the system,
so that I can remove any employee that is not part of the company anymore

Acceptance criteria:

-This must only be available to users with associated permissions
-A managerial employee must be able to delete any employee in the system
-The deleted employee must then be flagged for deletion in the database

#### User story: Manger view of jobs
As a managerial user,
I want to be able to view all the jobs of the company 
so that I may manage them effectively

Acceptance criteria:

-The user should only be able to view jobs they have the appropriate permissions to view.
-The user must be shown all the information pertaining to a job for all the jobs in the system.
-The user must be able to search, sort and filter the jobs

##### User story: Add job
As a managerial user,
I want to be able to add jobs to the system
so that I may manage the jobs the company has at the moment.

Acceptance criteria:

-The user should only be able to add jobs if they have the appropriate permissions.
-The user must be able to input all the information pertaining to the job
-If the job is for a new client the user must be able to add the new clients details first and then add the information for the job
-The information for the job needs to be saved to the database

##### User story: edit job
As a managerial user,
I want to be able to edit the jobs of the company
so that I may make any necessary changes to a job

Acceptance criteria:

-The user should only be able to edit jobs if they have the appropriate permissions.
-The user must be able to edit all the information pertaining to the job.
-The updated information for the job needs to be saved to the database.

##### User story: delete job
As a managerial user,
I want to be able to delete a jobs from the system
so that I may remove any job that should not be in the system any more.

Acceptance criteria:

-The user should only be able to delete jobs if they have the appropriate permissions
-The deleted job must be flagged for deletion in the database


##### User story: Sign up
As a new user,
I want to be able to create an account using my email address,
so that I can access the system.

Acceptance criteria:

 There must be a button to allow a user to sign up.
 There must be a form that allows the user to enter their email and create a password.
 The form must validate the data (make sure the email is actually an email address and ensure that the password is strong)
 If the email is not a valid email or the password is too weak, an error message must be displayed
 After the user has entered their details, they should be able to click on a "sign-up" button that takes them to the sign-up flow page.
 A verification email must also be sent out to the user.

##### User story: Log in 
As a registered user,
I want to be able to log in using my email,
so that I can access my account

Acceptance criteria:

 When the user is on the splash page, a button to log-in must be displayed.
 When the user clicks on the button it must display a form that allows them to input their username and password
 After they input their credentials, they must be able to click a log in button
 After they click the log in button, their credentials must be checked.
 If they entered the wrong information, an error message must be displayed.
 Otherwise, they must be redirected to their homepage.

 ##### User story: Sign-up flow
 
As a new user,
I want to be taken through a sign-up flow,
so that I add my personal information to my account

Acceptance criteria:

 Once the user has created their account the user must be redirected to the sign up flow modal/page
 The user must be promoted to enter their name, surname, contact details (phone number and email) and what their role is.
 The user should be redirected to their dashboard when they are done.
 Al the data entered should be sent to the database

 ##### User story: Register company 
 As a new or general user,
I want to be able to register my company
so that my company may use the system for its management

Acceptance criteria:

 Given a new user, they must be able to register a new company when signing up.
 GIven a existing user, they must be able to register a new company.
 When registering a new company, the system must allow the user to enter all the details of the company
 The details of the company must be saved to the database
 The user that registered the company must automatically be a part of the company
 The user that registered the company must automatically be a owner of the company

 ##### User story: Join company
 As a new or general user,
I want to be able to join a company that has already been register,
so that I may use the system for all the companies I work for

Acceptance criteria:

 Given a new user has gone through sign-up flow, they must be able to join a company using the company ID or searching for the company by name or by clicking a link sent by the company.
 Given a user that is already part of another company, they must be able to join company using the company ID or searching for the company by name or by clicking a link sent by the company.

 ##### User story: settings - profile
 As a signed-in user,
I want to be able to view and edit my profile information,
so that I may ensure their correctness

Acceptance criteria:

 When a logged in user accesses their profile all their information must be displayed.
 They must then be able to edit the information
 All changes must be sent to the database
 They must then see an updated version of their details

 ##### User story: settings
 As a logged in user,
I want to view and edit my account settings
so that I can change my preferences

Acceptance criteria:

 Once a user click on the settings tab in the profile dropdown, they must see all their current settings
 They must be able to change their settings
 They must be able to save those changes. I.e. it needs to go to the database.
 They must be shown an updated view of their settings.

 ##### User story: themes
 As a logged in user,
I want to change my theme
so that it suites my preferences

Acceptance criteria:

 On the splash page, the user must be able to change which mode is selected (light or dark)
 Once they choose a different mode the system must update accordingly.

 ##### User story: permissions
 As a managerial user,
I want to be provided with a set of permissions for the system,
so that I may assign appropriate permission to employees

Acceptance criteria:

 The database needs to store the various permissions (listed below)
 An employee needs to have permissions associated with them.
 The parts of the system that are available to the employee mut depend on the permissions of the user
 The permissions of a user must be changeable. (i.e. the system must provide settings for the users permissions). This must not be available to they user themselves. Rather a higher up employee must be able to change this (only a user that has permission to edit the employee's information)

 ##### User story: Default roles 
 As a managerial user,
I want to be provided with a set roles ,
so that I can quickly add a set of permissions to an employee

Acceptance criteria:

 The system must provide a set of default role that comprise of a list of permissions (listed below) when a employee signs up to the company or when an employee is added to the company

 ##### User story: Edit roles 
 As a managerial user,
I want to be able to edit the roles available to me,
so that I can customise the roles to the needs of the business

Acceptance criteria:

 The user must be given an interface to edit the roles of the business
 The number of roles for the business needs to be changeable
 The names for each role needs to be changeable
 The permissions associated with the roles need to be changeable

 ##### User story: Employee - multiple companies
 As a general user,
I want to be able to join multiple companies,
so that I may use the system for all the companies I work for.

Acceptance criteria:

 The user must be able to join another company after they joined their initial company
 Other users must be able to add the user to a different company
 When a user is viewing their system, they must be able to see for which company they are viewing the system
 They must be able to change between companies for which they are viewing the system

