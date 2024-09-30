<template><div><div class="functional-doc">
<h1 id="functional-requirements" tabindex="-1"><a class="header-anchor" href="#functional-requirements"><span>Functional Requirements</span></a></h1>
<h2 id="wow-factors" tabindex="-1"><a class="header-anchor" href="#wow-factors"><span>Wow factors</span></a></h2>
<p>Given the use case for this system, our team decided that it does not make sense to add one particularly large &quot;wow factor&quot; feature. Since useability is our most important non-functional requirement, we decided that it would be most beneficial to add a group of smaller features that enhances our system</p>
<h3 id="invoice-and-client-portal-subsystem" tabindex="-1"><a class="header-anchor" href="#invoice-and-client-portal-subsystem"><span>Invoice and client portal subsystem</span></a></h3>
<h4 id="invoice-subsystem" tabindex="-1"><a class="header-anchor" href="#invoice-subsystem"><span>Invoice subsystem</span></a></h4>
<ul>
<li>The system must be able to generate invoices for a particular job</li>
<li>The system must allow that invoice be to edit if the user has the correct permissions</li>
<li>The system must provide a view of the invoice</li>
<li>The system must allow the user to send the invoice to the client</li>
<li>The system must allow the client to view their invoice</li>
<li>The system must allow the client to pay their invoice through a payment gateway</li>
</ul>
<h4 id="client-portal-subsystem" tabindex="-1"><a class="header-anchor" href="#client-portal-subsystem"><span>Client portal subsystem</span></a></h4>
<ul>
<li>The system must provide an interface that clients of the businesses can access</li>
<li>The system must allow the business to send an email to the client containing a dynamic link that allows the client to access the client portal</li>
<li>The system must display the jobs the client currently has with the company, as well as a page to review previous jobs and current invoices</li>
<li>The system must allow the client to pay their invoice through a payment gateway.</li>
<li>The system must ensure that the invoice gets updated when the user pays their invoice</li>
</ul>
<h4 id="feedback-subsystem" tabindex="-1"><a class="header-anchor" href="#feedback-subsystem"><span>Feedback Subsystem</span></a></h4>
<p>This system is intended to gather feedback from clients. It is linked to the client portal subsystem</p>
<ul>
<li>The system must allow the clients to provide a rating on the work done in a job</li>
<li>The system must allow the client to provide a rating for customer service for the job</li>
<li>The system must allow the client to submit any feedback they have on the job</li>
<li>The system must allow the user to access the feedback on jobs if they have the appropriate permissions</li>
</ul>
<h3 id="company-structure-and-role-modeling-subsystem" tabindex="-1"><a class="header-anchor" href="#company-structure-and-role-modeling-subsystem"><span>Company structure and role modeling subsystem</span></a></h3>
<h4 id="company-structure-modeling-subsystem" tabindex="-1"><a class="header-anchor" href="#company-structure-modeling-subsystem"><span>Company structure modeling subsystem</span></a></h4>
<ul>
<li>The system must provide the ability to specify the superior of employees in the company</li>
<li>The system must provide the ability to specify the subordinates of an employee in the company</li>
<li>The system must provide a representation of the structure of the employees of the company</li>
<li>The system must allow the user to edit that structure if they have the reliant permissions</li>
</ul>
<h4 id="role-and-system-permissions-subsystem" tabindex="-1"><a class="header-anchor" href="#role-and-system-permissions-subsystem"><span>Role and system permissions subsystem</span></a></h4>
<p>Roles are commonly used groupings of permissions that can be assigned to a employee.</p>
<ul>
<li>The system must provide permissions for all the operations on the system</li>
<li>The system must restrict access to the actions based on the permissions</li>
<li>The system must provide default roles when a company is created.</li>
<li>The system must provide 2 immutable roles
<ul>
<li>&quot;Owner&quot; which represents the owner of the company. This user must have full permissions.</li>
<li>&quot;Worker&quot; which represents the worker of the company. This is also the default role in any company. This role must give the most basic access required.</li>
</ul>
</li>
<li>The system must assign the user who registered the company as the owner.</li>
<li>The system must allow the permissions associated with a role to be edited if they are not immutable</li>
<li>The viewing of subsystems such as employee, job and client must be based on the structure of the company (described in the subsystem)</li>
</ul>
<h3 id="communication-and-notification-subsystem" tabindex="-1"><a class="header-anchor" href="#communication-and-notification-subsystem"><span>Communication and Notification Subsystem</span></a></h3>
<h4 id="in-app-notifications" tabindex="-1"><a class="header-anchor" href="#in-app-notifications"><span>In App Notifications</span></a></h4>
<ul>
<li>All users of the system should receive push notifications regarding any important changes in the system that involve them.</li>
<li>The system should allow the user to view their notifications.</li>
<li>The system should allow the user to mark their notification as read or unread</li>
</ul>
<h4 id="emails" tabindex="-1"><a class="header-anchor" href="#emails"><span>Emails</span></a></h4>
<ul>
<li>The system should email a user when they joined a company</li>
<li>The system should email a user when they left or was removed from a company</li>
<li>The system should email a user when there are any important changes to a job they are assigned to.</li>
<li>The system should email a user when they have been invited to join a company</li>
<li>The system should send a email when a user requests to join a company</li>
<li>The system should email a client with their invoices</li>
<li>The system should send an email to users to reset their password if they forgot their password.</li>
</ul>
<h3 id="video-conferencing" tabindex="-1"><a class="header-anchor" href="#video-conferencing"><span>Video conferencing</span></a></h3>
<ul>
<li>The system must provide video conferencing capabilities.</li>
<li>THe system must allow the user to schedule a video conference in which they invite certain users to the meeting</li>
<li>The user must be able to view all the meeting they have scheduled</li>
<li>The scheduled meeting's must be editable</li>
</ul>
<h2 id="analytics-subsystem" tabindex="-1"><a class="header-anchor" href="#analytics-subsystem"><span>Analytics Subsystem</span></a></h2>
<ul>
<li>The system should be able to generate analytics:
<ul>
<li>The system must generate analytics about the inventory system.</li>
<li>The system must generate analytics about the clients of the business. The system should include any client feedback.</li>
<li>The system must generate analytics about the employees of the business.
<ul>
<li>The system should provide these reports to the users based on their role in the company.</li>
<li>If there is no one under a particular employee, the system should only show a report of the user's own performance.</li>
<li>If there is someone working under the user, then the system should show analytics for everyone and everything under that user.</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="job-subsystem" tabindex="-1"><a class="header-anchor" href="#job-subsystem"><span>Job Subsystem</span></a></h2>
<ul>
<li>The system must be able to store information pertaining to a job, such as the title of the job, the client for whom the job is, the date the job must be completed, etc.</li>
<li>The system must allow the user to create a new job on the system.
<ul>
<li>The system must associate a client with the job.</li>
<li>The system must allow the user to create a new client to associate with the job when creating the job.</li>
</ul>
</li>
<li>The system must allow the user to update any of the information pertaining to a job.</li>
<li>The system must allow the user to assign any jobs that have not been assigned when they were created.</li>
<li>The system must allow a job to be deleted.
<ul>
<li>The delete must be a soft delete</li>
</ul>
</li>
<li>This subsystem must have role based access (refer to the role and permission subsystem).</li>
</ul>
<h4 id="statuses-subsystem" tabindex="-1"><a class="header-anchor" href="#statuses-subsystem"><span>Statuses subsystem</span></a></h4>
<ul>
<li>Each job must have a status.</li>
<li>The jobs must be able to change statuses.</li>
<li>The system must provide default statuses for companies:
<ul>
<li>Todo - the job has not been started.</li>
<li>In progress - the job in being completed at the moment.</li>
<li>Completed - the payment has been received.</li>
</ul>
</li>
<li>The system must also allow the statuses available for the company to be edited (refer to company settings subsystem).</li>
</ul>
<h4 id="tags-subsystem" tabindex="-1"><a class="header-anchor" href="#tags-subsystem"><span>Tags subsystem</span></a></h4>
<ul>
<li>The system must allow the user to add tags to a job.</li>
<li>The system must provide default tags for a company based on the type of company it is .</li>
<li>The user must be able to add a new tag to a job from the list of tags in the company.</li>
<li>The user must be able to remove a tag from a job.</li>
</ul>
<h4 id="priority-subsystem" tabindex="-1"><a class="header-anchor" href="#priority-subsystem"><span>Priority subsystem</span></a></h4>
<ul>
<li>The system must allow the user to add a priority to a job.</li>
<li>The system must provide default priorities for a company based on the type of company it is .</li>
<li>The user must be able to add a new priority to a job from the list of priorities in the company.</li>
<li>The user must be able to remove the priority from a job.</li>
</ul>
<h4 id="view-job-subsystem" tabindex="-1"><a class="header-anchor" href="#view-job-subsystem"><span>View Job Subsystem</span></a></h4>
<ul>
<li>The system must show the user all the jobs they have access to.
<ul>
<li>The user should be able to sort the jobs.</li>
<li>The user should be able to filter the jobs.</li>
<li>The user should be able to search for a job using any of the attributes associated with a job.</li>
</ul>
</li>
<li>The system must allow the user to view each job individually via a job card.</li>
<li>The job card must show all the information pertaining to the job.</li>
<li>The user must be able to record details of the job on the job card.
<ul>
<li>The user must be able to change the status of the job.</li>
<li>The user must be able to upload images of the job.</li>
<li>The job card must provide inventory functionality.
<ul>
<li>The user must be ale to record the inventory items used for the job.</li>
<li>The user must be able to edit the amount of the inventory items used for the job.</li>
<li>The user should be able to remove any item they recorded.</li>
<li>Any inventory used must be updated in the company's inventory.</li>
<li>The user must also be able to log any job-specific orders.</li>
</ul>
</li>
<li>The user must be able to record the time they spent on the job.
<ul>
<li>The user must be able to pause the timer.</li>
<li>The user must be able to resume the timer.</li>
</ul>
</li>
<li>The card must provide comment functionality.
<ul>
<li>The user must be able to see the comments.</li>
<li>The user must be able to add comments.</li>
<li>The user must be able to edit the comments.</li>
</ul>
</li>
</ul>
</li>
<li>The system must generate an invoice for the job.
<ul>
<li>The system must provide the user with a preview of the generated invoice.</li>
<li>The user must be able to edit the generated invoice.</li>
<li>The user must be able to download the invoice.</li>
<li>The user must be able to send the invoice to the client.</li>
</ul>
</li>
<li>The system must provide an overview of the job to the user.</li>
</ul>
<h2 id="inventory-subsystem" tabindex="-1"><a class="header-anchor" href="#inventory-subsystem"><span>Inventory Subsystem</span></a></h2>
<ul>
<li>The system must store all the information pertaining to the inventory.</li>
<li>The system must allow an inventory item to be added.</li>
<li>The system must allow an inventory item to be deleted.</li>
<li>
<ul>
<li>The subsystem must display all the items in the inventory.</li>
<li>The user must be able to search for a particular item.</li>
<li>The user must be able to sort the items.</li>
<li>The user must be able to filter the items.</li>
</ul>
</li>
<li>The system must highlight the items that are low in stock.</li>
<li>This subsystem must implement role-based access control (refer to the role and permission subsystem).</li>
</ul>
<h4 id="stock-take-subsystem" tabindex="-1"><a class="header-anchor" href="#stock-take-subsystem"><span>Stock Take Subsystem</span></a></h4>
<ul>
<li>The user should be able to conduct a stock take
<ul>
<li>The user must be able to record the date of the stock take.</li>
<li>The user must be able to record the amount of each item in stock.</li>
</ul>
</li>
<li>The system must show a generate a report of the stock take.
<ul>
<li>The user must be able to download the report.</li>
</ul>
</li>
</ul>
<h2 id="settings-subsystem" tabindex="-1"><a class="header-anchor" href="#settings-subsystem"><span>Settings Subsystem</span></a></h2>
<h4 id="account-and-profile-settings-subsystem" tabindex="-1"><a class="header-anchor" href="#account-and-profile-settings-subsystem"><span>Account and Profile Settings Subsystem</span></a></h4>
<ul>
<li>The system must allow the user to view their personal information.</li>
<li>The system must allow the user to edit their personal information.</li>
<li>The system must allow the user to log out of their account.</li>
<li>The system must allow the user to delete their account.</li>
<li>The system must allow the user to manage the companies they are part of.
<ul>
<li>The system must allow the user to leave a company.
<ul>
<li>The system must allow the user to revert the leave action within a month of leaving a company.</li>
</ul>
</li>
<li>The system must allow the user to join a company.</li>
</ul>
</li>
<li>The system must allow the user to edit their preferences:
<ul>
<li>They must be able to change their themes.</li>
<li>They must be able to change their preferred language.</li>
<li>They must be able to change their notification settings.</li>
<li>They must be able to change their default home page.</li>
</ul>
</li>
</ul>
<h4 id="company-settings-subsystem" tabindex="-1"><a class="header-anchor" href="#company-settings-subsystem"><span>Company Settings Subsystem</span></a></h4>
<ul>
<li>The system must show all the current settings for a given company.</li>
<li>The system must allow the roles in the company to be changed.
<ul>
<li>The system must allow the number of roles to be increased or decreased.</li>
<li>The system must allow the labels for each role to be altered.</li>
<li>The system must allow the permissions associated with a role to be changed.</li>
</ul>
</li>
<li>The system must allow the statuses available for the jobs to change.
<ul>
<li>The system must allow the labels for each status to be changed.</li>
<li>The system must allow the statuses to be added or removed.</li>
<li>The system must allow the colour of the status to be changed.</li>
</ul>
</li>
<li>The system must allow the tags available for the jobs to change.
<ul>
<li>The system must allow the labels for each status to be changed.</li>
<li>The system must allow the tags to be added or removed.</li>
<li>The system must allow the colour of the tags to be changed.</li>
</ul>
</li>
<li>The system must allow the priorities available for the jobs to be changed.
<ul>
<li>The system must allow the labels for each priority to be changed.</li>
<li>The system must allow the priorities to be added or removed.</li>
<li>The system must allow the colour of the priorities to be changed.</li>
</ul>
</li>
<li>The system must show the current structure of the company.</li>
<li>The system must allow the structure of the company to be changed.</li>
<li>The system must implement role-based access control (refer to the role and permission subsystem).</li>
</ul>
<h2 id="company-subsystem" tabindex="-1"><a class="header-anchor" href="#company-subsystem"><span>Company Subsystem</span></a></h2>
<ul>
<li>A user must be able to register a company on the system.
<ul>
<li>The registration process needs to prompt the user to enter the business details.</li>
<li>The user that registered the company should automatically be a part of the company.</li>
</ul>
</li>
<li>A user must be able to join a company.
<ul>
<li>They must be able to join using the company name.</li>
<li>They must be able to join using the company ID.</li>
</ul>
</li>
<li>The system must allow the user to change for which company they are using the system (if they are part of multiple companies).</li>
<li>Users must be able to leave a company
<ul>
<li>The system must allow the user to revert the leave action within a month of leaving a company.</li>
</ul>
</li>
</ul>
<h2 id="employee-subsystem" tabindex="-1"><a class="header-anchor" href="#employee-subsystem"><span>Employee Subsystem</span></a></h2>
<p>All users are employees of companies. Each employee has information associated with them.</p>
<ul>
<li>The system must store all information associated with an employee.</li>
<li>An employee must be associated with a company.</li>
<li>An employee must have a superior when added to the company.
<ul>
<li>The default superior is the owner of the company.</li>
</ul>
</li>
<li>The system must display the employees in a company.
<ul>
<li>The user must be able to search for a specific employee.</li>
<li>The user must be able to sort the list of employees.</li>
<li>The user must be able to filter the list of employees.</li>
</ul>
</li>
<li>The system must allow any of the details pertaining to an employee to be edited.</li>
<li>The system must allow an employee to be deleted from a company.
<ul>
<li>This must be a soft delete.</li>
</ul>
</li>
<li>This subsystem must implement role-based access control (refer to the role and permission subsystem).</li>
</ul>
<h2 id="teams-subsystem" tabindex="-1"><a class="header-anchor" href="#teams-subsystem"><span>Teams Subsystem</span></a></h2>
<p>Teams are a grouping of employees in a company. Each team has a team leader.</p>
<ul>
<li>The system must store all information associated with a team.</li>
<li>The system must allow a new team to be created from the existing employees in the company.</li>
<li>A team must have a leader</li>
<li>The system must display the teams in a company.
<ul>
<li>The user must be able to search for a specific team.</li>
<li>The user must be able to sort the list of teams.</li>
<li>The user must be able to filter the list of teams.</li>
</ul>
</li>
<li>The system must allow any of the details pertaining to a team to be edited.</li>
<li>The system must allow a team to be deleted from a company.
<ul>
<li>This must be a soft delete.</li>
</ul>
</li>
<li>The system must allow a team to be assigned a job
<ul>
<li>Each member of the team must be assigned the job.</li>
</ul>
</li>
<li>This subsystem must implement role-based access control (refer to the role and permission subsystem).</li>
</ul>
<h2 id="client-subsystem" tabindex="-1"><a class="header-anchor" href="#client-subsystem"><span>Client Subsystem</span></a></h2>
<p>The system must allow data pertaining to a client to be stored.</p>
<ul>
<li>The system must store any information pertaining to a client.</li>
<li>The system must allow a new client to be added to the system</li>
<li>The system must display the clients in the company
<ul>
<li>The user must be able to sort the list of clients.</li>
<li>The user must be able to filter the list of clients.</li>
<li>The employee must be able to search for a particular client.</li>
</ul>
</li>
<li>The system must display all the jobs of a particular client.</li>
<li>The system must allow any of the details pertaining to a client to be edited.</li>
<li>The system must allow a client to be deleted.
<ul>
<li>This must be a soft delete.</li>
</ul>
</li>
<li>The system must implement role-based access control (refer to the role and permission subsystem).</li>
</ul>
<h2 id="authorization-and-authentication-subsystem" tabindex="-1"><a class="header-anchor" href="#authorization-and-authentication-subsystem"><span>Authorization and Authentication Subsystem</span></a></h2>
<ul>
<li>
<p>The system must allow a new user to sign up.</p>
<ul>
<li>The system must allow the user to sign up using their email address.</li>
<li>The system must allow the user to input their personal details.</li>
<li>The system must then allow the user to either join an existing company or to create a company.
<ul>
<li>The user must be able to search for a company to join by name.</li>
<li>The user must be able to join a company using their company ID.</li>
</ul>
</li>
<li>When creating a company, the system must allow the user to enter all the information related to that company.</li>
</ul>
</li>
<li>
<p>The system must allow a user to log in to an existing account.</p>
<ul>
<li>The system must allow a user to log in using their username and password.</li>
</ul>
</li>
</ul>
</div>
</div></template>


