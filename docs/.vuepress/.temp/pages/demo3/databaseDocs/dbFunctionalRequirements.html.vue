<template><div><h1 id="functional-requirements-of-the-database" tabindex="-1"><a class="header-anchor" href="#functional-requirements-of-the-database"><span>Functional Requirements of the Database</span></a></h1>
<h3 id="authentication-and-authorisation" tabindex="-1"><a class="header-anchor" href="#authentication-and-authorisation"><span>Authentication and Authorisation</span></a></h3>
<ul>
<li><strong>User login and logout</strong>: Secure login and logout functionality for users.</li>
<li><strong>Password management</strong>: Ability for users to change passwords, recover forgotten passwords, and ensure password security.</li>
<li><strong>Role-based access control</strong>: Implementing different access levels based on user roles (e.g., admin, employee, client).</li>
</ul>
<h3 id="user-document" tabindex="-1"><a class="header-anchor" href="#user-document"><span>User Document</span></a></h3>
<ul>
<li><strong>User management</strong>: Creat, update, delete and read user entities.</li>
<li><strong>Joined companies management</strong>: Allow users to join or leave companies</li>
</ul>
<h3 id="employee-document" tabindex="-1"><a class="header-anchor" href="#employee-document"><span>Employee Document</span></a></h3>
<ul>
<li><strong>Employee management</strong>: Creat, update, delete and read employee entities.</li>
<li><strong>Company association</strong>: Associate the employee with the company.</li>
<li><strong>Role and permission management</strong>: Assign roles and manage permissions for different employees.</li>
<li><strong>Model company structure</strong>: Assign or remove superiorID and subordinateIds to model the structure company.</li>
<li><strong>Job assignment management</strong>: Assign or remove jobs from an employee.</li>
</ul>
<h3 id="company-document" tabindex="-1"><a class="header-anchor" href="#company-document"><span>Company Document</span></a></h3>
<ul>
<li><strong>Company registration and profile management</strong>: Allow companies to register, and manage their profiles.</li>
<li><strong>Employee association</strong>: Associate employees with companies and manage their roles within the company.</li>
<li><strong>Status list</strong>: Add, edit and remove statuses</li>
<li><strong>Tag list</strong>: Add, edit and remove tag</li>
</ul>
<h3 id="inventory-document" tabindex="-1"><a class="header-anchor" href="#inventory-document"><span>Inventory Document</span></a></h3>
<ul>
<li><strong>Inventory item management</strong>: Create, update, delete and read inventory items.</li>
<li><strong>Stock level management</strong>: Track stock levels and reorder levels of inventory items</li>
</ul>
<h3 id="client-document" tabindex="-1"><a class="header-anchor" href="#client-document"><span>Client Document</span></a></h3>
<ul>
<li><strong>Client profile management</strong>: Create, update, delete and read client profiles.</li>
<li><strong>Contact information management</strong>: Store and manage client contact details and addresses.</li>
</ul>
<h3 id="job-document" tabindex="-1"><a class="header-anchor" href="#job-document"><span>Job Document</span></a></h3>
<ul>
<li><strong>Job management</strong>: Create, update, delete and read jobs.</li>
<li><strong>Job assignment</strong>: Assign jobs to employees and manage job details.</li>
<li><strong>Job scheduling</strong>: Schedule jobs and manage job timelines.</li>
<li><strong>Job status tracking</strong>: Update and track the status of jobs (e.g., pending, in progress, completed).</li>
<li><strong>Client feedback collection</strong>: Collect and store client feedback for completed jobs.</li>
<li><strong>Upload files</strong>: Add and remove files to the job.</li>
<li><strong>Comments</strong>: Add, remove and edit comments on a job.</li>
<li><strong>Employee and team assignment</strong>: Assign or remove employees or teams from a job.</li>
<li><strong>Task management</strong>: Add, remove, edit and track tasks.</li>
<li><strong>Activity History</strong>: Keep track of all activity on a job.</li>
<li><strong>Company association</strong>: Associate the job with the company.</li>
<li><strong>Client feedback</strong>: Add feedback from client to job</li>
</ul>
<h3 id="role-document" tabindex="-1"><a class="header-anchor" href="#role-document"><span>Role Document</span></a></h3>
<ul>
<li><strong>Role management</strong>: Create, update, delete and read roles.</li>
<li><strong>Permission suite</strong>: Add or remove a permission to a role.</li>
<li><strong>Company association</strong>: Associate the role with the company.</li>
</ul>
<h3 id="team-document" tabindex="-1"><a class="header-anchor" href="#team-document"><span>Team Document</span></a></h3>
<ul>
<li><strong>Team management</strong>: Create, update, delete and read teams.</li>
<li><strong>Company association</strong>: Associate the team with the company.</li>
<li><strong>Job assignment management</strong>: Assign or remove jobs from a team.</li>
</ul>
</div></template>


