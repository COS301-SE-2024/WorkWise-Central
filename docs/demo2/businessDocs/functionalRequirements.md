---
pageClass: functionalDocDemo2
---
<div class="functional-doc">

# Functional Requirements

## Employee Subsystem
All users (except owners) are employees of companies. Each employee has information associated with them.

- The system must ensure that a user (employee) is part of at least one company.
- The system must store all information associated with an employee.
- The system must allow the users to be allocated roles in the company.

#### View Employees Subsystem
- The system must only allow employees to view the employees beneath them.
- The system must display all the information of an employee.
- The user must be able to search for a specific employee.
- The user must be able to sort the list of employees.
- The user must be able to filter the list of employees.

#### Edit Employees Subsystem
- The system must only allow employees with edit permission to access this sub system.
- The system must allow the user to edit any of the details pertaining to an employee.
- The system must save the updated details to the database. 

#### Delete Employees Subsystem
- The system must only allow employees with delete permission to access this sub system.
- The system must allow the user to delete any of the employees that they can view.
- Once a a user deleted an employee the system must set the deleted flag for that employee (soft delete).
  
## Client Subsystem
The system must allow data pertaining to a client to be stored.

#### View Client Subsystem
- The system must display all the clients the user has permission to view.
   - The user must be able to sort the list of clients.
   - The user must be able to filter the list of clients.
   - The employee must be able to search for a particular client.
- The system must display all the jobs of a particular client.

#### Edit Client Subsystem
- The system must only allow employees with edit permission to access this sub system.
- This subsystem must include everything available in the View Client Subsystem.
- The system must allow the user to create new clients.
- The user must be able to edit any of the information pertaining to a client that they have permission to edit.

#### Delete Client Subsystem
- The system must only allow employees with delete permission to access this sub system.
- The system must allow the user to delete any of the client that they can view.
- Once a a user deleted an client the system must set the deleted flag for that client (soft delete).


## Job Subsystem

- The system must be able to store information pertaining to a job.
- The system must allow a job to have a status.
- The system must provide default statuses:
   - Todo - the job has not been started.
   - In progress - the job in being completed at the moment.
   - Paused - The job has been paused (for cases where jobs run over multiple days).
   - Awaiting sign off - the employee completed their part of the job. The job needs to be reviewed by a superior.
   - Awaiting invoice - an invoice needs to be sent (refer to the automatic invoicing system).
   - Awaiting payment - The invoice has been sent.
   - Completed - the payment has been received.
- The system must also allow the user to edit the statuses available on the system (refer to company settings subsystem).

#### View Job Subsystem

- The system must show the user all the jobs they have access to.
   - The user should be able to sort the jobs.
   - The user should be able to filter the jobs.
   - The user should be able to search for a job using any of the attributes associated with a job.
- The system must allow the user to view each job individually.
- On each individual job, the system must provide a different view based on the status of the job.
- If the job status is Todo:
   - The system must show all the information pertaining to the job.
   - The user must be able to change the status to in progress.
- When the job status is In Progress:
   - The user must be able to upload images of the job.
   - The user must be able to record details of the job.
   - The user must be able to record all the inventory they used.
   - The user must be able to change the status of the job to review (i.e., indicate that they are done).
- When the job status is Paused, the user must be able to resume the job.
- When the job status is Awaiting invoice:
   - The system must provide the user with a preview of the generated invoice.
   - The user must be able to edit the generated invoice.
   - The user must be able to download the invoice.
   - The user must be able to send the invoice to the client.
   - The user must be able to change the status of the job to Awaiting payment (i.e., indicate the invoice has been sent).
- When the job status is Awaiting payment:
   - The system must display all the information pertaining to the job. This includes the details provided by the client, the details about the work added by the employees, and the invoice sent.
   - The user must be able to change the status of the job to complete (i.e., indicate the payment has been received).
- When the job status is Awaiting sign off:
   - The user must be able to see all the information they added during the job.
   - The user must be able to leave comments.
   - The user must be able to see the comments.
   - The user must be able to edit the comments if they have permission (i.e., they worked on the job or they are a superior).
   - The user must be able to change the status of the job to complete (i.e., indicate the job has been signed off).
- When the job status is complete, the system must show an overview of the job.
- At any point, the system must allow the user to access an overview of the job.

#### Edit Job Subsystem

- Everything available for the View Job Subsystem must also be available to this subsystem.
- The system must allow the user to create a job.
   - The system must allow the user to enter the date the job was received.
   - The system must allow the user to enter the date on which the job must be complete.
   - The system must allow the user to enter the client for whom the job is.
     - If the client does not exist, the user must be able to create a client and then create the job for that client.
     - The system must ensure that the client field is filled in.
   - The system must allow the user to assign an employee or to leave the assignment for later.
- The system must allow the user to assign any jobs that have not been assigned when they were created.

#### Delete Job Subsystem

- The system must only allow employees with delete permission to access this sub system.
- The system must allow the user to delete any of the jobs that they can view.
- Once a a user deleted a job the system must set the deleted flag for that job (soft delete).


## Authorization and Authentication Subsystem
- The system must allow a new user to sign up.
   - The system must allow the user to sign up using their email address.
   - The system must allow the user to input their personal details.
   - The system must then allow the user to either join an existing company or to create a company.
     - The user must be able to search for a company to join by name.
     - The user must be able to join a company using their company ID.
   - When creating a company, the system must allow the user to enter all the information related to that company.

- The system must allow a user to log in to an existing account.
   - The system must allow a user to log in using their username and password.

  
## Roles and Permissions
Roles are commonly used groupings of permissions that can be assigned to a user.
- The system must provide the following permissions:
   - Allow the user to view all employees.
   - Allow the user to edit employees.
   - Allow the user to add new employees.
   - Allow the user to view all job.
   - Allow the user to view all jobs that are assigned to employees that work under the user.
   - Allow the user to view all jobs assigned to the current user.
   - Allow the user to edit all jobs.
   - Allow the user to edit jobs that are assigned to employees that work under the user.
   - Allow the user to edit jobs that are assigned to them.
   - Allow the user to add a new job.
   - Allow the user to view all clients.
   - Allow the user to view all client that are associated with a job that is assigned to a employee that works under the user.
   - Allow the user to view all client that are associated with a job that is assigned to the user.
   - Allow the user to edit all clients.
   - Allow the user to edit all client that are associated with a job that is assigned to a employee that works under the user.
   - Allow the user to edit all client that are associated with a job that is assigned to the user.
   - Allow the user to view all inventory.
   - Allow the user to edit all inventory.
   - Allow the user to add a new inventory item.
   - The system must allow all employees that have been allocated to a job, to record the inventory they have used and thus change the amount of a certain item(/s) in the inventory.
- The system must provide a super user, which represents the owner of the company. This user must have full permissions by default. 
- The system must protect the permissions of the owner such that no-one can change their permissions.
- The system must assign the user who registered the company as the owner.
- The system must provide a set of default roles:
   - The system must provide an admin role and by default the role must have full permissions.
   - The system must provide a supervisor role and provide the following default permissions:
     - View all jobs under the user.
     - Edit all jobs under the user.
     - View all employees under the user.
     - Edit all employees under the user.
     - View client for all the jobs under the user.
     - Edit all clients for jobs under the user.
   - Team leader. Must have the following permissions:
     - View all jobs under the user.
     - Edit all jobs under the user.
     - View all employees under the user.
     - Edit all employees under the user.
     - View client for all the jobs under the user.
     - Edit all clients for jobs under the user.
   - Worker. Must have the following permissions:
     - View all the jobs the user has been assigned to.
     - View client who are associated with a job the user has been assigned to.
- The roles of a given company must be able to change (refer to the company setting subsystem 
above)

## Settings Subsystem
#### Account and Profile Settings Subsystem
- The system must allow the user to view their personal information.
- The system must allow the user to edit their personal information.
- The system must allow the user to log out of their account.
- The system must allow the user to delete their account.
- The system must allow the user to leave a company.
- The system must allow the user to join a company.
- The system must allow the user to edit their preferences:
   - They must be able to change their themes.
   - They must be able to change their preferred language.
   - They must be able to change their notification settings.
   - They must be able to change their default home page.
  
#### Company Settings Subsystem
- The system must allow the user to view all the settings for the company if they have permission.
- The system must allow the roles in the company to be changed.
   - The system must allow the number of roles to be increased or decreased.
   - The system must allow the labels for each role to be altered.
   - The system must allow the permissions associated with a role to be changed.
- The system must allow the statuses available for the jobs to change.
   - The system must allow the labels for each status to be changed.
- The system must display all the information of to the company.
- The user (if given permission) must be able to edit the information pertaining to the company.

## Company Subsystem
- A user must be able to register a company on the system.
- The registration process needs to prompt the user to enter the business details.
- The user that registered the company should automatically be a part of the company.
- A user must be able to join a company.
   - They must be able to join using the company name.
   - They must be able to join using the company ID.
   - They must be able to join by using a dynamic link for joining that company.
- The system must allow the user to change for which company they are using the system (if they are part of multiple companies).

## Inventory Subsystem
#### On The Job Inventory Subsystem
This is how anyone on site will be able to track the inventory they used.
- The system should allow any on-site employee to add an item to the list of items used for a job.
- The user should be able to add multiple items at once.
- The user should be able to remove any item they added.
- Any inventory used must be updated in the company's inventory.
- The user must also be able to log any job-specific orders.

#### View Inventory Subsystem
- The subsystem must allow the user to view all the inventory items the company has, if the user has the relevant permission.
   - The user must be able to search for a particular item.
   - The user must be able to sort the items.
   - The user must be able to filter the items.
- The system must highlight the items that are low in stock.

#### Edit Inventory Subsystem
- Everything that is available to the View Inventory Subsystem must also be available for this subsystem.
- The user should be able to add new items to the inventory:
   - The system should allow the user to add all the information pertaining to the item.
- The user should be able to update an existing item. They must be able to edit any of the information for that item.
- The user should be able to delete an item from the inventory.
- The user should be able to conduct a stock take at the end of the day.
   - The system should then generate a report based on the day.
   - The report should specify if there were any discrepancies in the amount of stock used and the stock take.

## Communication and Notification Subsystem
#### Push Notifications
- All users of the system should receive push notifications regarding any important changes in the system that involve them.
- Users should receive notifications when they are added to a job.
- Users should receive notifications when the status of a job they have access to changes.
- Users with appropriate permissions should receive notifications about any inventory that needs to be ordered.
- The system should allow each user to change their notification settings.
- Users with permission should receive notifications about any client feedback after the job has been completed.

#### SMS Notifications
- Clients of the company must receive an SMS when an employee is on their way to complete a job.

#### Emails
- The system should send an email to clients when an employee is on their way to complete a job.
- The system should have the option to automatically email an invoice to a client.
- The system should send an email to clients with a link to be able to fill in a feedback form.
- The settings for emails must be changeable.

## Reporting Subsystem
- The system should be able to generate analytics:
   - The system must generate analytics about the inventory system.
   - The system must generate analytics about the clients of the business. The system should include any client feedback.
   - The system must generate analytics about the employees of the business.
     - The system should provide these reports to the users based on their role in the company.
     - If there is no one under a particular employee, the system should only show a report of the user's own performance.
     - If there is someone working under the user, then the system should show analytics for everyone and everything under that user.
- The system must be able to automatically generate a report of those analytics.

## Feedback Subsystem
- This system is intended to gather feedback from clients.
- The system must provide a feedback form for each client for each job that has been completed.

## Automated Job Assignment Subsystem
This is added as a potential wow factor.
- This subsystem should automatically suggest an employee to which the job should be assigned when the job is being created.
- The system should make these recommendations based on the availability of the employees, spread of jobs amongst all employees, skill level of an employee, and location of the job.

</div>
