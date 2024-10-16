---
pageClass: functionalDocDemo2
---
<div class="functional-doc">

# Functional Requirements

## Job Subsystem

- The system must be able to store information pertaining to a job, such as the title of the job, the client for whom the job is, the date the job must be completed, etc.
- The system must allow the user to create a new job on the system.
  - The system must associate a client with the job.
  - The system must allow the user to create a new client to associate with the job when creating the job.
- The system must allow the user to update any of the information pertaining to a job.
- The system must allow the user to assign any jobs that have not been assigned when they were created.
- The system must allow a job to be deleted.
  - The delete must be a soft delete
- This subsystem must have role based access (refer to the role and permission subsystem).

#### Statuses subsystem
- Each job must have a status.
- The jobs must be able to change statuses.
- The system must provide default statuses for companies:
    - Todo - the job has not been started.
    - In progress - the job in being completed at the moment.
    - Completed - the payment has been received.
- The system must also allow the statuses available for the company to be edited (refer to company settings subsystem).

#### Tags subsystem
- The system must allow the user to add tags to a job.
- The system must provide default tags for a company based on the type of company it is .
- The user must be able to add a new tag to a job from the list of tags in the company.
- The user must be able to remove a tag from a job.

#### Priority subsystem
- The system must allow the user to add a priority to a job.
- The system must provide default priorities for a company based on the type of company it is .
- The user must be able to add a new priority to a job from the list of priorities in the company.
- The user must be able to remove the priority from a job.

#### View Job Subsystem

- The system must show the user all the jobs they have access to.
    - The user should be able to sort the jobs.
    - The user should be able to filter the jobs.
    - The user should be able to search for a job using any of the attributes associated with a job.
- The system must allow the user to view each job individually via a job card.
- The job card must show all the information pertaining to the job.
- The user must be able to record details of the job on the job card.
  - The user must be able to change the status of the job.
  - The user must be able to upload images of the job.
  - The job card must provide inventory functionality.
    - The user must be ale to record the inventory items used for the job.
    - The user must be able to edit the amount of the inventory items used for the job.
    - The user should be able to remove any item they recorded.
    - Any inventory used must be updated in the company's inventory.
    - The user must also be able to log any job-specific orders.
  - The user must be able to record the time they spent on the job.
    - The user must be able to pause the timer.
    - The user must be able to resume the timer.
  - The card must provide comment functionality.
    - The user must be able to see the comments.
    - The user must be able to add comments.
    - The user must be able to edit the comments.
- The system must generate an invoice for the job.
  - The system must provide the user with a preview of the generated invoice.
  - The user must be able to edit the generated invoice.
  - The user must be able to download the invoice.
  - The user must be able to send the invoice to the client.
- The system must provide an overview of the job to the user.

## Inventory Subsystem

- The system must store all the information pertaining to the inventory.
- The system must allow an inventory item to be added.
- The system must allow an inventory item to be deleted.
- - The subsystem must display all the items in the inventory.
  - The user must be able to search for a particular item.
  - The user must be able to sort the items.
  - The user must be able to filter the items.
- The system must highlight the items that are low in stock.
- This subsystem must implement role-based access control (refer to the role and permission subsystem).

#### Stock Take Subsystem
- The user should be able to conduct a stock take
    - The user must be able to record the date of the stock take.
    - The user must be able to record the amount of each item in stock.
- The system must show a generate a report of the stock take.
  - The user must be able to download the report.

## Settings Subsystem
#### Account and Profile Settings Subsystem
- The system must allow the user to view their personal information.
- The system must allow the user to edit their personal information.
- The system must allow the user to log out of their account.
- The system must allow the user to delete their account.
- The system must allow the user to manage the companies they are part of.
  - The system must allow the user to leave a company.
    - The system must allow the user to revert the leave action within a month of leaving a company.
  - The system must allow the user to join a company.
- The system must allow the user to edit their preferences:
    - They must be able to change their themes.
    - They must be able to change their preferred language.
    - They must be able to change their notification settings.
    - They must be able to change their default home page.

#### Company Settings Subsystem
- The system must show all the current settings for a given company.
- The system must allow the roles in the company to be changed.
    - The system must allow the number of roles to be increased or decreased.
    - The system must allow the labels for each role to be altered.
    - The system must allow the permissions associated with a role to be changed.
- The system must allow the statuses available for the jobs to change.
    - The system must allow the labels for each status to be changed.
    - The system must allow the statuses to be added or removed.
    - The system must allow the colour of the status to be changed.
- The system must allow the tags available for the jobs to change.
  - The system must allow the labels for each status to be changed.
  - The system must allow the tags to be added or removed.
  - The system must allow the colour of the tags to be changed.
- The system must allow the priorities available for the jobs to be changed.
  - The system must allow the labels for each priority to be changed.
  - The system must allow the priorities to be added or removed.
  - The system must allow the colour of the priorities to be changed.
- The system must show the current structure of the company.
- The system must allow the structure of the company to be changed.
- The system must implement role-based access control (refer to the role and permission subsystem).

## Company Subsystem
- A user must be able to register a company on the system.
  - The registration process needs to prompt the user to enter the business details.
  - The user that registered the company should automatically be a part of the company.
- A user must be able to join a company.
    - They must be able to join using the company name.
    - They must be able to join using the company ID.
- The system must allow the user to change for which company they are using the system (if they are part of multiple companies).
- Users must be able to leave a company
  - The system must allow the user to revert the leave action within a month of leaving a company.


## Roles and Permissions
Roles are commonly used groupings of permissions that can be assigned to a user.
- The system must provide the following permissions:
    - view all employees
    - view employees under me
    - edit all employees
    - edit employees under me
    - add new employees
    - remove any employees
    - remove employees under me
    - view all jobs
    - view jobs under me
    - view jobs assigned to me
    - edit all jobs
    - edit jobs that are under me
    - edit jobs that are assigned to me
    - add a new job
    - remove any job
    - remove job under me
    - remove job assigned to me
    - view all clients
    - view clients under me
    - view clients that are assigned to me
    - edit all clients
    - edit clients that are under me
    - edit clients that are assigned to me
    - add a new clients
    - remove any clients
    - remove clients under me
    - remove clients assigned to me
    - view all inventory
    - edit all inventory
    - add new inventory item
    - delete inventory item
    - record inventory use
    - record job details
    - company settings
- The system must provide 2 immutable roles  
  - "Owner" which represents the owner of the company. This user must have full permissions by default.
  - "Worker" which represents the worker of the company. This is also the default role in any company. This user must have the following permissions by default:
    - view jobs assigned to me
    - view clients that are assigned to me
    - record job details
    - record inventory use
- The system must assign the user who registered the company as the owner.
- The system must provide a set of default roles when a company is created. These roles are editable.
- The roles of a given company must be editable (refer to the company setting subsystem
  above)

## Employee Subsystem
All users are employees of companies. Each employee has information associated with them.

- The system must store all information associated with an employee.
- An employee must be associated with a company.
- An employee must have a superior when added to the company.
  - The default superior is the owner of the company.
- The system must display the employees in a company.
  - The user must be able to search for a specific employee.
  - The user must be able to sort the list of employees.
  - The user must be able to filter the list of employees.
- The system must allow any of the details pertaining to an employee to be edited.
- The system must allow an employee to be deleted from a company.
  - This must be a soft delete.
- This subsystem must implement role-based access control (refer to the role and permission subsystem).

## Teams Subsystem
Teams are a grouping of employees in a company. Each team has a team leader.

- The system must store all information associated with a team.
- The system must allow a new team to be created from the existing employees in the company.
- A team must have a leader
- The system must display the teams in a company.
  - The user must be able to search for a specific team.
  - The user must be able to sort the list of teams.
  - The user must be able to filter the list of teams.
- The system must allow any of the details pertaining to a team to be edited.
- The system must allow a team to be deleted from a company.
  - This must be a soft delete.
- The system must allow a team to be assigned a job
  - Each member of the team must be assigned the job.
- This subsystem must implement role-based access control (refer to the role and permission subsystem).

## Client Subsystem
The system must allow data pertaining to a client to be stored.

- The system must store any information pertaining to a client.
- The system must allow a new client to be added to the system
- The system must display the clients in the company
   - The user must be able to sort the list of clients.
   - The user must be able to filter the list of clients.
   - The employee must be able to search for a particular client.
- The system must display all the jobs of a particular client.
- The system must allow any of the details pertaining to a client to be edited.
- The system must allow a client to be deleted.
  - This must be a soft delete.
- The system must implement role-based access control (refer to the role and permission subsystem).


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
- The system should email clients when an employee is on their way to complete a job.
- The system should have the option to automatically email an invoice to a client.
- The system should email clients with a link to be able to fill in a feedback form.
- The settings for emails must be changeable.

## Analytics Subsystem
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

</div>
