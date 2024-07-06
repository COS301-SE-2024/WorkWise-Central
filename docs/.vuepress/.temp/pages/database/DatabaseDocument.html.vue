<template><div><h1 id="table-of-contents" tabindex="-1"><a class="header-anchor" href="#table-of-contents"><span>Table of Contents</span></a></h1>
<ol>
<li><a href="#introduction">Introduction</a></li>
<li><a href="#functional-requirements-of-the-database">Functional Requirements of the Database</a>
<ul>
<li><a href="#authentication">Authentication</a></li>
<li><a href="#useremployee-management">User/Employee Management</a></li>
<li><a href="#company-management">Company Management</a></li>
<li><a href="#inventory-management">Inventory Management</a></li>
<li><a href="#client-management">Client Management</a></li>
<li><a href="#appointment-management">Appointment Management</a></li>
<li><a href="#job-management">Job Management</a></li>
</ul>
</li>
<li><a href="#non-functional-requirements">Non-Functional Requirements</a>
<ul>
<li><a href="#availability-and-reliability">Availability and Reliability</a></li>
<li><a href="#security">Security</a></li>
<li><a href="#maintainability">Maintainability</a></li>
</ul>
</li>
<li><a href="#constraints">Constraints</a></li>
<li><a href="#entity-relationship-diagram">Entity Relationship Diagram</a></li>
<li><a href="#data-model">Data Model</a>
<ul>
<li><a href="#useremployee">User/Employee</a></li>
<li><a href="#company">Company</a></li>
<li><a href="#client">Client</a></li>
<li><a href="#job">Job</a></li>
<li><a href="#appointment">Appointment</a></li>
<li><a href="#inventoryitem">InventoryItem</a></li>
</ul>
</li>
<li><a href="#er-diagram">ER Diagram</a></li>
<li><a href="#database-schema">Database Schema</a>
<ul>
<li><a href="#useremployee-1">User/Employee</a></li>
<li><a href="#company-1">Company</a></li>
<li><a href="#client-1">Client</a></li>
<li><a href="#job-1">Job</a></li>
<li><a href="#appointment-1">Appointment</a></li>
<li><a href="#inventoryitem-1">InventoryItem</a></li>
</ul>
</li>
</ol>
<h1 id="workwise-central-database-design-documentation" tabindex="-1"><a class="header-anchor" href="#workwise-central-database-design-documentation"><span>WorkWise Central Database Design Documentation</span></a></h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction"><span>Introduction</span></a></h2>
<p>WorkWise Central is a service-management tool crafted to meet the needs of service-based industries. This tool aims to streamline business operations, enhance resource efficiency, and elevate customer experiences. By offering a centralized platform for managing users, companies, clients, jobs, appointments, and inventory, WorkWise Central integrates various facets of service management into a cohesive system.</p>
<p>The goal of the database is to provide a robust and scalable backend to support the seamless operation of WorkWise Central's interfaces. The database will store, manage, and retrieve data efficiently to ensure the smooth functioning of the platform. It will handle user authentication, manage relationships between entities, and ensure data integrity and security.</p>
<h2 id="functional-requirements-of-the-database" tabindex="-1"><a class="header-anchor" href="#functional-requirements-of-the-database"><span>Functional Requirements of the Database</span></a></h2>
<p><em>Note: Only a subset of the collections in the database have been implemented.</em></p>
<h3 id="authentication" tabindex="-1"><a class="header-anchor" href="#authentication"><span>Authentication</span></a></h3>
<ul>
<li><strong>User Login and Logout</strong>: Secure login and logout functionality for users.</li>
<li><strong>Password Management</strong>: Ability for users to change passwords, recover forgotten passwords, and ensure password security.</li>
<li><strong>Role-Based Access Control</strong>: Implementing different access levels based on user roles (e.g., admin, employee, client).</li>
</ul>
<h3 id="user-employee-management" tabindex="-1"><a class="header-anchor" href="#user-employee-management"><span>User/Employee Management</span></a></h3>
<ul>
<li><strong>User Profile Management</strong>: Allow users to create, update, and delete their profiles.</li>
<li><strong>Role and Permission Management</strong>: Assign roles and manage permissions for different users.</li>
<li><strong>Availability Scheduling</strong>: Enable employees to set and update their availability.</li>
</ul>
<h3 id="company-management" tabindex="-1"><a class="header-anchor" href="#company-management"><span>Company Management</span></a></h3>
<ul>
<li><strong>Company Registration and Profile Management</strong>: Allow companies to register, and manage their profiles.</li>
<li><strong>Employee Association</strong>: Associate employees with companies and manage their roles within the company.</li>
<li><strong>Company Inventory Management</strong>: Manage the inventory items associated with a company.</li>
</ul>
<h3 id="inventory-management" tabindex="-1"><a class="header-anchor" href="#inventory-management"><span>Inventory Management</span></a></h3>
<ul>
<li><strong>Inventory Item Management</strong>: Create, update, and delete inventory items.</li>
<li><strong>Stock Level Management</strong>: Track current stock levels and set low stock thresholds.</li>
<li><strong>Supplier Information Management</strong>: Store and manage supplier information.</li>
</ul>
<h3 id="client-management" tabindex="-1"><a class="header-anchor" href="#client-management"><span>Client Management</span></a></h3>
<ul>
<li><strong>Client Profile Management</strong>: Create, update, and delete client profiles.</li>
<li><strong>Contact Information Management</strong>: Store and manage client contact details and addresses.</li>
</ul>
<h3 id="appointment-management" tabindex="-1"><a class="header-anchor" href="#appointment-management"><span>Appointment Management</span></a></h3>
<ul>
<li><strong>Appointment Scheduling</strong>: Schedule appointments between clients and employees.</li>
<li><strong>Status Management</strong>: Update the status of appointments (e.g., pending, confirmed, cancelled).</li>
<li><strong>Duration Tracking</strong>: Track the duration of appointments.</li>
</ul>
<h3 id="job-management" tabindex="-1"><a class="header-anchor" href="#job-management"><span>Job Management</span></a></h3>
<ul>
<li><strong>Job Assignment</strong>: Assign jobs to employees and manage job details.</li>
<li><strong>Job Scheduling</strong>: Schedule jobs and manage job timelines.</li>
<li><strong>Job Status Tracking</strong>: Update and track the status of jobs (e.g., pending, in progress, completed).</li>
<li><strong>Client Feedback Collection</strong>: Collect and store client feedback for completed jobs.</li>
</ul>
<h2 id="non-functional-requirements" tabindex="-1"><a class="header-anchor" href="#non-functional-requirements"><span>Non-Functional Requirements</span></a></h2>
<h3 id="availability-and-reliability" tabindex="-1"><a class="header-anchor" href="#availability-and-reliability"><span>Availability and Reliability</span></a></h3>
<ul>
<li><strong>High Availability</strong>: Ensure the database is highly available with minimal downtime.</li>
<li><strong>Backup and Recovery</strong>: Implement robust backup and recovery mechanisms to prevent data loss.</li>
</ul>
<h3 id="security" tabindex="-1"><a class="header-anchor" href="#security"><span>Security</span></a></h3>
<ul>
<li><strong>Data Encryption</strong>: Encrypt sensitive data, both at rest and in transit.</li>
<li><strong>Access Control</strong>: Implement strict access control measures to protect data from unauthorized access.</li>
<li><strong>Audit Logging</strong>: Maintain logs of all access and modifications to the data for auditing purposes.</li>
</ul>
<h3 id="maintainability" tabindex="-1"><a class="header-anchor" href="#maintainability"><span>Maintainability</span></a></h3>
<ul>
<li><strong>Scalability</strong>: Design the database to scale horizontally as the application grows.</li>
<li><strong>Documentation</strong>: Maintain comprehensive documentation for database schemas, relationships, and operations.</li>
<li><strong>Monitoring and Alerts</strong>: Implement monitoring and alerting mechanisms to detect and respond to issues promptly.</li>
</ul>
<h2 id="constraints" tabindex="-1"><a class="header-anchor" href="#constraints"><span>Constraints</span></a></h2>
<ul>
<li><strong>Database Technology</strong>: MongoDB
<ul>
<li><strong>Deployment</strong>: Currently hosted on MongoDB Atlas, planned to be self-hosted in the future.</li>
</ul>
</li>
<li><strong>Database Size</strong>: The current database size is constrained to 500 MB.</li>
</ul>
<h2 id="entity-relationship-diagram" tabindex="-1"><a class="header-anchor" href="#entity-relationship-diagram"><span>Entity Relationship Diagram</span></a></h2>
<h3 id="data-model" tabindex="-1"><a class="header-anchor" href="#data-model"><span>Data Model</span></a></h3>
<p><strong>User/Employee</strong>
The User/Employee entity stores all user-related data, including personal, system, and professional details.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the user.</li>
<li><strong>systemDetails</strong>: Stores system-related information such as email, password, and username.</li>
<li><strong>personInfo</strong>: Contains personal details like first name, surname, date of birth, gender, preferred language, contact information (phone, email), and address (street, suburb, city, postal code, complex, house number).</li>
<li><strong>profile</strong>: Holds profile-specific data such as display image and display name.</li>
<li><strong>roles</strong>: An array of roles with associated permissions.</li>
<li><strong>joinedCompanies</strong>: A list of companies the user is associated with.</li>
<li><strong>skills</strong>: A list of the user's skills.</li>
<li><strong>availability</strong>: Indicates the user's availability status and schedule.</li>
<li><strong>currentJobAssignments</strong>: A list of job assignments linked to the user.</li>
</ul>
<p><strong>Company</strong>
The Company entity stores information about different companies.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the company.</li>
<li><strong>registrationNumber</strong>: The company's registration number.</li>
<li><strong>name</strong>: The name of the company.</li>
<li><strong>type</strong>: The type of business the company operates.</li>
<li><strong>vatNumber</strong>: The company's VAT number.</li>
<li><strong>logo</strong>: The company's logo.</li>
<li><strong>contactDetails</strong>: Contact information including phone and email.</li>
<li><strong>address</strong>: The company's address, comprising street, suburb, city, and postal code.</li>
<li><strong>employees</strong>: A list of employee IDs associated with the company.</li>
<li><strong>inventoryItems</strong>: A list of inventory item IDs managed by the company.</li>
</ul>
<p><strong>Client</strong>
The Client entity stores information about clients.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the client.</li>
<li><strong>details</strong>: Contains client-specific details such as first name, surname, contact information (phone, email), and address (street, suburb, city, postal code, complex, house number).</li>
</ul>
<p><strong>Job</strong>
The Job entity stores details about various jobs.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the job.</li>
<li><strong>clientId</strong>: A reference to the client associated with the job.</li>
<li><strong>assignedEmployees</strong>: A list of employee IDs assigned to the job.</li>
<li><strong>scheduledDateTime</strong>: The scheduled date and time for the job.</li>
<li><strong>status</strong>: The current status of the job (e.g., pending, in progress, completed).</li>
<li><strong>inventoryUsed</strong>: A list of inventory items used in the job, including item IDs and quantities.</li>
<li><strong>jobDetails</strong>: Detailed information about the job, including description, notes, address, and images.</li>
<li><strong>clientFeedback</strong>: Feedback from the client, including job rating, customer service rating, and comments.</li>
</ul>
<p><strong>Appointment</strong>
The Appointment entity stores information about appointments.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the appointment.</li>
<li><strong>clientId</strong>: A reference to the client associated with the appointment.</li>
<li><strong>jobId</strong>: A reference to the job related to the appointment.</li>
<li><strong>scheduledDateTime</strong>: The scheduled date and time for the appointment.</li>
<li><strong>duration</strong>: The duration of the appointment in minutes.</li>
<li><strong>status</strong>: The current status of the appointment (e.g., pending, confirmed, cancelled).</li>
</ul>
<p><strong>InventoryItem</strong>
The InventoryItem entity stores details about inventory items.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the inventory item.</li>
<li><strong>name</strong>: The name of the inventory item.</li>
<li><strong>itemImage</strong>: The image or icon representing the inventory item.</li>
<li><strong>costPrice</strong>: The cost price of the inventory item.</li>
<li><strong>currentStockLevel</strong>: The current stock level of the inventory item.</li>
<li><strong>lowStockThreshold</strong>: The stock level threshold indicating when the item is considered low on stock.</li>
</ul>
<h2 id="database-schema" tabindex="-1"><a class="header-anchor" href="#database-schema"><span>Database Schema</span></a></h2>
<h3 id="user-employee" tabindex="-1"><a class="header-anchor" href="#user-employee"><span>User/Employee</span></a></h3>
<p>The User/Employee entity stores information for both general users and employees, using a single collection inheritance pcurrentStockLevelrimary Key)</p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each user or employee.</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c85&quot;</li>
</ul>
<p>#lowStockThreshold <strong>Data Type:</strong> Object</p>
<ul>
<li><strong>Attributes:</strong>
<ul>
<li><strong>email:</strong> string
<ul>
<li><strong>Reasoning:</strong> Email used for login and communication.</li>
<li><strong>Example:</strong> &quot;user@example.com&quot;</li>
</ul>
</li>
<li><strong>password:</strong> string
<ul>
<li><strong>Reasoning:</strong> Hashed password for account security.</li>
<li><strong>Example:</strong> &quot;hashed_password_string&quot;</li>
</ul>
</li>
<li><strong>username:</strong> string
<ul>
<li><strong>Reasoning:</strong> Unique identifier for the user's profile.</li>
<li><strong>Example:</strong> &quot;user123&quot;</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="personalinfo" tabindex="-1"><a class="header-anchor" href="#personalinfo"><span>personalInfo</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>firstName:</strong> string
<ul>
<li><strong>Reasoning:</strong> User's first name for personal identification.</li>
<li><strong>Example:</strong> &quot;John&quot;</li>
</ul>
</li>
<li><strong>surname:</strong> string
<ul>
<li><strong>Reasoning:</strong> User's surname for personal identification.</li>
<li><strong>Example:</strong> &quot;Doe&quot;</li>
</ul>
</li>
<li><strong>dateOfBirth:</strong> Date (as a string)
<ul>
<li><strong>Reasoning:</strong> User's date of birth for age verification and personalization.</li>
<li><strong>Example:</strong> &quot;1990-01-01&quot;</li>
</ul>
</li>
<li><strong>gender:</strong> string
<ul>
<li><strong>Reasoning:</strong> User's gender for demographic purposes.</li>
<li><strong>Example:</strong> &quot;Male&quot;</li>
</ul>
</li>
<li><strong>preferredLanguage:</strong> string
<ul>
<li><strong>Reasoning:</strong> Language preference for communication.</li>
<li><strong>Example:</strong> &quot;English&quot;</li>
</ul>
</li>
<li><strong>contactInfo:</strong> Object
<ul>
<li><strong>phone:</strong> string
<ul>
<li><strong>Reasoning:</strong> Phone number for contact.</li>
<li><strong>Example:</strong> &quot;+1234567890&quot;</li>
</ul>
</li>
<li><strong>email:</strong> string
<ul>
<li><strong>Reasoning:</strong> Secondary email for contact.</li>
<li><strong>Example:</strong> &quot;contact@example.com&quot;</li>
</ul>
</li>
</ul>
</li>
<li><strong>address:</strong> Object
<ul>
<li><strong>street:</strong> string
<ul>
<li><strong>Reasoning:</strong> Street address for mailing purposes.</li>
<li><strong>Example:</strong> &quot;123 Main St&quot;</li>
</ul>
</li>
<li><strong>suburb:</strong> string
<ul>
<li><strong>Reasoning:</strong> Suburb for geographical information.</li>
<li><strong>Example:</strong> &quot;Central&quot;</li>
</ul>
</li>
<li><strong>city:</strong> string
<ul>
<li><strong>Reasoning:</strong> City for geographical information.</li>
<li><strong>Example:</strong> &quot;Metropolis&quot;</li>
</ul>
</li>
<li><strong>postalCode:</strong> string
<ul>
<li><strong>Reasoning:</strong> Postal code for mailing purposes.</li>
<li><strong>Example:</strong> &quot;12345&quot;</li>
</ul>
</li>
<li><strong>complex:</strong> string
<ul>
<li><strong>Reasoning:</strong> Complex name if applicable.</li>
<li><strong>Example:</strong> &quot;Sunny Apartments&quot;</li>
</ul>
</li>
<li><strong>houseNumber:</strong> string
<ul>
<li><strong>Reasoning:</strong> House number for precise address.</li>
<li><strong>Example:</strong> &quot;10B&quot;</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="profile" tabindex="-1"><a class="header-anchor" href="#profile"><span>profile</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>displayImage:</strong> string
<ul>
<li><strong>Reasoning:</strong> URL or base64 image string for profile picture.</li>
<li><strong>Example:</strong> &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;</li>
</ul>
</li>
<li><strong>displayName:</strong> string
<ul>
<li><strong>Reasoning:</strong> Display name for user profile.</li>
<li><strong>Example:</strong> &quot;JohnDoe&quot;</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="roles" tabindex="-1"><a class="header-anchor" href="#roles"><span>roles</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Objects</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>companyId</strong>: ObjectId
<ul>
<li><strong>Reasoning:</strong> Links to a company id in the company table</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c85&quot;</li>
</ul>
</li>
<li><strong>role:</strong> Array
<ul>
<li><strong>Reasoning:</strong> Defines the user's role (e.g., admin, employee).</li>
<li><strong>Example:</strong> [&quot;admin&quot;, &quot;technician&quot;]</li>
</ul>
</li>
<li><strong>permissions:</strong> Array
<ul>
<li><strong>Reasoning:</strong> Permissions associated with the role.</li>
<li><strong>Example:</strong> [&quot;read&quot;, &quot;write&quot;, &quot;delete&quot;]</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="joinedcompanies" tabindex="-1"><a class="header-anchor" href="#joinedcompanies"><span>joinedCompanies</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of ObjectId</li>
<li><strong>Reasoning:</strong> References companies the user/employee is associated with.</li>
<li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c85&quot;, &quot;60d21b4667d0d8992e610c86&quot;]</li>
</ul>
<h4 id="skills" tabindex="-1"><a class="header-anchor" href="#skills"><span>skills</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>skillName:</strong> string
<ul>
<li><strong>Reasoning:</strong> List of skills the user possesses.</li>
<li><strong>Example:</strong> [&quot;JavaScript&quot;, &quot;Python&quot;]</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="availability" tabindex="-1"><a class="header-anchor" href="#availability"><span>availability</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>status:</strong> string
<ul>
<li><strong>Reasoning:</strong> Current availability status of the user.</li>
<li><strong>Example:</strong> &quot;Available&quot;</li>
</ul>
</li>
<li><strong>schedule:</strong> Object
<ul>
<li><strong>Reasoning:</strong> Weekly schedule for the user.</li>
<li><strong>Example:</strong> {&quot;Monday&quot;: &quot;9:00-17:00&quot;, &quot;Tuesday&quot;: &quot;9:00-17:00&quot;}</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="currentjobassignments" tabindex="-1"><a class="header-anchor" href="#currentjobassignments"><span>currentJobAssignments</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of ObjectId</li>
<li><strong>Reasoning:</strong> References jobs the user/employee is currently assigned to.</li>
<li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c87&quot;, &quot;60d21b4667d0d8992e610c88&quot;]</li>
</ul>
<h4 id="currentjob" tabindex="-1"><a class="header-anchor" href="#currentjob"><span>currentJob</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> References the current company the user is in.</li>
<li><strong>Example:</strong>  &quot;60d21b4667d0d8992e610c87&quot;</li>
</ul>
<h4 id="createdat" tabindex="-1"><a class="header-anchor" href="#createdat"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat" tabindex="-1"><a class="header-anchor" href="#updatedat"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat" tabindex="-1"><a class="header-anchor" href="#deletedat"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h3 id="company" tabindex="-1"><a class="header-anchor" href="#company"><span>Company</span></a></h3>
<p>The Company entity stores information about companies associated with users and jobs.</p>
<h4 id="id-primary-key" tabindex="-1"><a class="header-anchor" href="#id-primary-key"><span>id (Primary Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each company.</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c89&quot;</li>
</ul>
<h4 id="registrationnumber" tabindex="-1"><a class="header-anchor" href="#registrationnumber"><span>registrationNumber</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Unique registration number for the company.</li>
<li><strong>Example:</strong> &quot;REG123456&quot;</li>
</ul>
<h4 id="name" tabindex="-1"><a class="header-anchor" href="#name"><span>name</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Name of the company.</li>
<li><strong>Example:</strong> &quot;Tech Solutions Inc.&quot;</li>
</ul>
<h4 id="type" tabindex="-1"><a class="header-anchor" href="#type"><span>type</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Type or industry of the company.</li>
<li><strong>Example:</strong> &quot;IT Services&quot;</li>
</ul>
<h4 id="vatnumber" tabindex="-1"><a class="header-anchor" href="#vatnumber"><span>vatNumber</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> VAT number for tax purposes.</li>
<li><strong>Example:</strong> &quot;VAT789012&quot;</li>
</ul>
<h4 id="logo" tabindex="-1"><a class="header-anchor" href="#logo"><span>logo</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> URL or base64 image string for the company logo.</li>
<li><strong>Example:</strong> &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;</li>
</ul>
<h4 id="contactdetails" tabindex="-1"><a class="header-anchor" href="#contactdetails"><span>contactDetails</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>phone:</strong> string
<ul>
<li><strong>Reasoning:</strong> Phone number for contact.</li>
<li><strong>Example:</strong> &quot;+1234567890&quot;</li>
</ul>
</li>
<li><strong>email:</strong> string
<ul>
<li><strong>Reasoning:</strong> Email for contact.</li>
<li><strong>Example:</strong> &quot;contact@techsolutions.com&quot;</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="address" tabindex="-1"><a class="header-anchor" href="#address"><span>address</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>street:</strong> string
<ul>
<li><strong>Reasoning:</strong> Street address for mailing purposes.</li>
<li><strong>Example:</strong> &quot;456 Business St&quot;</li>
</ul>
</li>
<li><strong>suburb:</strong> string
<ul>
<li><strong>Reasoning:</strong> Suburb for geographical information.</li>
<li><strong>Example:</strong> &quot;Central&quot;</li>
</ul>
</li>
<li><strong>city:</strong> string
<ul>
<li><strong>Reasoning:</strong> City for geographical information.</li>
<li><strong>Example:</strong> &quot;Metropolis&quot;</li>
</ul>
</li>
<li><strong>postalCode:</strong> string
<ul>
<li><strong>Reasoning:</strong> Postal code for mailing purposes.</li>
<li><strong>Example:</strong> &quot;67890&quot;</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="employees" tabindex="-1"><a class="header-anchor" href="#employees"><span>employees</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of ObjectId</li>
<li><strong>Reasoning:</strong> References employees (Users) associated with the company.</li>
<li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c85&quot;, &quot;60d21b4667d0d8992e610c86&quot;]</li>
</ul>
<h4 id="inventoryitems" tabindex="-1"><a class="header-anchor" href="#inventoryitems"><span>inventoryItems</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of ObjectId</li>
<li><strong>Reasoning:</strong> References inventory items owned by the company.</li>
<li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c8a&quot;, &quot;60d21b4667d0d8992e610c8b&quot;]</li>
</ul>
<h4 id="createdat-1" tabindex="-1"><a class="header-anchor" href="#createdat-1"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat-1" tabindex="-1"><a class="header-anchor" href="#updatedat-1"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat-1" tabindex="-1"><a class="header-anchor" href="#deletedat-1"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h3 id="client" tabindex="-1"><a class="header-anchor" href="#client"><span>Client</span></a></h3>
<p>The Client entity stores information about clients who have jobs or appointments.</p>
<h4 id="id-primary-key-1" tabindex="-1"><a class="header-anchor" href="#id-primary-key-1"><span>id (Primary Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each client.</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8c&quot;</li>
</ul>
<h4 id="registrationnumber-company-specific" tabindex="-1"><a class="header-anchor" href="#registrationnumber-company-specific"><span>registrationNumber (Company Specific)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Unique registration number for the company.</li>
<li><strong>Example:</strong> &quot;REG123456&quot;</li>
</ul>
<h4 id="name-company-specific" tabindex="-1"><a class="header-anchor" href="#name-company-specific"><span>name (Company Specific)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Name of the company.</li>
<li><strong>Example:</strong> &quot;Tech Solutions Inc.&quot;</li>
</ul>
<h4 id="type-company-specific" tabindex="-1"><a class="header-anchor" href="#type-company-specific"><span>type (Company Specific)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Type or industry of the company.</li>
<li><strong>Example:</strong> &quot;IT Services&quot;</li>
</ul>
<h4 id="vatnumber-company-specific" tabindex="-1"><a class="header-anchor" href="#vatnumber-company-specific"><span>vatNumber (Company Specific)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> VAT number for tax purposes.</li>
<li><strong>Example:</strong> &quot;VAT789012&quot;</li>
</ul>
<h4 id="details" tabindex="-1"><a class="header-anchor" href="#details"><span>details</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>firstName:</strong> string
<ul>
<li><strong>Reasoning:</strong> Client's first name for personal identification.</li>
<li><strong>Example:</strong> &quot;Jane&quot;</li>
</ul>
</li>
<li><strong>surname:</strong> string
<ul>
<li><strong>Reasoning:</strong> Client's surname for personal identification.</li>
<li><strong>Example:</strong> &quot;Smith&quot;</li>
</ul>
</li>
<li><strong>preferredLanguage:</strong> string
<ul>
<li><strong>Reasoning:</strong> Client's preferred language.</li>
<li><strong>Example:</strong> &quot;English&quot;</li>
</ul>
</li>
<li><strong>dateOfBirth</strong> Object
<ul>
<li><strong>phone:</strong> string
<ul>
<li><strong>Reasoning:</strong> Phone number for contact.</li>
<li><strong>Example:</strong> &quot;+1234567890&quot;</li>
</ul>
</li>
<li><strong>email:</strong> string
<ul>
<li><strong>Reasoning:</strong> Email for contact.</li>
<li><strong>Example:</strong> &quot;jane.smith@example.com&quot;</li>
</ul>
</li>
<li><strong>address:</strong> Object
<ul>
<li><strong>street:</strong> string
<ul>
<li><strong>Reasoning:</strong> Street address for mailing purposes.</li>
<li><strong>Example:</strong> &quot;789 Client Rd&quot;</li>
</ul>
</li>
<li><strong>suburb:</strong> string
<ul>
<li><strong>Reasoning:</strong> Suburb for geographical information.</li>
<li><strong>Example:</strong> &quot;Eastside&quot;</li>
</ul>
</li>
<li><strong>city:</strong> string
<ul>
<li><strong>Reasoning:</strong> City for geographical information.</li>
<li><strong>Example:</strong> &quot;Metropolis&quot;</li>
</ul>
</li>
<li><strong>postalCode:</strong> string
<ul>
<li><strong>Reasoning:</strong> Postal code for mailing purposes.</li>
<li><strong>Example:</strong> &quot;12345&quot;</li>
</ul>
</li>
<li><strong>complex:</strong> string
<ul>
<li><strong>Reasoning:</strong> Complex name if applicable.</li>
<li><strong>Example:</strong> &quot;Client Apartments&quot;</li>
</ul>
</li>
<li><strong>houseNumber:</strong> string
<ul>
<li><strong>Reasoning:</strong> House number for precise address.</li>
<li><strong>Example:</strong> &quot;3A&quot;</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="createdat-2" tabindex="-1"><a class="header-anchor" href="#createdat-2"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat-2" tabindex="-1"><a class="header-anchor" href="#updatedat-2"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat-2" tabindex="-1"><a class="header-anchor" href="#deletedat-2"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h3 id="job" tabindex="-1"><a class="header-anchor" href="#job"><span>Job</span></a></h3>
<p>The Job entity stores information about jobs assigned to employees and clients.</p>
<h4 id="id-primary-key-2" tabindex="-1"><a class="header-anchor" href="#id-primary-key-2"><span>id (Primary Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each job.</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8d&quot;</li>
</ul>
<h4 id="heading" tabindex="-1"><a class="header-anchor" href="#heading"><span>heading</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> A name of a job.</li>
<li><strong>Example:</strong> &quot;Linda Marshall's tiling&quot;</li>
</ul>
<h4 id="companyid" tabindex="-1"><a class="header-anchor" href="#companyid"><span>companyId</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Relationship:</strong> References Company</li>
<li><strong>Reasoning:</strong> Associates the job with a specific company.</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8c&quot;</li>
</ul>
<h4 id="clientid-foreign-key" tabindex="-1"><a class="header-anchor" href="#clientid-foreign-key"><span>clientId (Foreign Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Relationship:</strong> References Client</li>
<li><strong>Reasoning:</strong> Associates the job with a specific client.</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8c&quot;</li>
</ul>
<h4 id="assignedemployees" tabindex="-1"><a class="header-anchor" href="#assignedemployees"><span>assignedEmployees</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of ObjectId</li>
<li><strong>Relationship:</strong> References User</li>
<li><strong>Reasoning:</strong> Employees assigned to the job.</li>
<li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c85&quot;, &quot;60d21b4667d0d8992e610c86&quot;]</li>
</ul>
<h4 id="assignedby" tabindex="-1"><a class="header-anchor" href="#assignedby"><span>assignedBy</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Relationship:</strong> References Employees table</li>
<li><strong>Reasoning:</strong> Assignee of a job.</li>
<li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c85&quot;, &quot;60d21b4667d0d8992e610c86&quot;]</li>
<li></li>
</ul>
<h4 id="scheduleddatetime" tabindex="-1"><a class="header-anchor" href="#scheduleddatetime"><span>scheduledDateTime</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Scheduled date and time for the job.</li>
<li><strong>Example:</strong> &quot;2024-06-01T09:00:00Z&quot;</li>
</ul>
<h4 id="status" tabindex="-1"><a class="header-anchor" href="#status"><span>status</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Current status of the job (e.g., pending, in progress, completed).</li>
<li><strong>Example:</strong> &quot;pending&quot;</li>
</ul>
<h4 id="inventoryused" tabindex="-1"><a class="header-anchor" href="#inventoryused"><span>inventoryUsed</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Object</li>
<li><strong>Reasoning:</strong> Inventory items used for the job.</li>
<li><strong>Format:</strong> { &quot;InventoryItem&quot;: ObjectId (relationship with InventoryItem), &quot;QuantityUsed&quot;: integer }</li>
<li><strong>Example:</strong> [{ &quot;InventoryItem&quot;: &quot;60d21b4667d0d8992e610c8a&quot;, &quot;QuantityUsed&quot;: 2 }]</li>
</ul>
<h4 id="jobdetails" tabindex="-1"><a class="header-anchor" href="#jobdetails"><span>jobDetails</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>jobDescription:</strong> string
<ul>
<li><strong>Reasoning:</strong> Description of the job.</li>
<li><strong>Example:</strong> &quot;Fixing plumbing issues.&quot;</li>
</ul>
</li>
<li><strong>jobNotes:</strong> string
<ul>
<li><strong>Reasoning:</strong> Additional notes about the job.</li>
<li><strong>Example:</strong> &quot;Bring extra tools.&quot;</li>
</ul>
</li>
<li><strong>jobAddress:</strong> Object
<ul>
<li><strong>street:</strong> string
<ul>
<li><strong>Reasoning:</strong> Street address for the job location.</li>
<li><strong>Example:</strong> &quot;123 Job St&quot;</li>
</ul>
</li>
<li><strong>suburb:</strong> string
<ul>
<li><strong>Reasoning:</strong> Suburb for the job location.</li>
<li><strong>Example:</strong> &quot;Westside&quot;</li>
</ul>
</li>
<li><strong>city:</strong> string
<ul>
<li><strong>Reasoning:</strong> City for the job location.</li>
<li><strong>Example:</strong> &quot;Metropolis&quot;</li>
</ul>
</li>
<li><strong>postalCode:</strong> string
<ul>
<li><strong>Reasoning:</strong> Postal code for the job location.</li>
<li><strong>Example:</strong> &quot;67890&quot;</li>
</ul>
</li>
<li><strong>complex:</strong> string
<ul>
<li><strong>Reasoning:</strong> Complex name if applicable.</li>
<li><strong>Example:</strong> &quot;Workplace Plaza&quot;</li>
</ul>
</li>
<li><strong>houseNumber:</strong> string
<ul>
<li><strong>Reasoning:</strong> House number for the job location.</li>
<li><strong>Example:</strong> &quot;5C&quot;</li>
</ul>
</li>
</ul>
</li>
<li><strong>imagesTaken:</strong> Array of strings (base64 images)
<ul>
<li><strong>Reasoning:</strong> Images related to the job.</li>
<li><strong>Example:</strong> [&quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;, &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;]</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="clientfeedback" tabindex="-1"><a class="header-anchor" href="#clientfeedback"><span>clientFeedback</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>jobRating:</strong> number
<ul>
<li><strong>Reasoning:</strong> Overall job rating by the client.</li>
<li><strong>Example:</strong> 4.5</li>
</ul>
</li>
<li><strong>customerServiceRating:</strong> number
<ul>
<li><strong>Reasoning:</strong> Rating of the customer service by the client.</li>
<li><strong>Example:</strong> 5</li>
</ul>
</li>
<li><strong>comments:</strong> string
<ul>
<li><strong>Reasoning:</strong> Additional feedback comments from the client.</li>
<li><strong>Example:</strong> &quot;Great service!&quot;</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="createdat-3" tabindex="-1"><a class="header-anchor" href="#createdat-3"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat-3" tabindex="-1"><a class="header-anchor" href="#updatedat-3"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat-3" tabindex="-1"><a class="header-anchor" href="#deletedat-3"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
<li></li>
</ul>
<h3 id="appointment" tabindex="-1"><a class="header-anchor" href="#appointment"><span>Appointment</span></a></h3>
<p>The Appointment entity stores information about appointments between clients and jobs.</p>
<h4 id="id-primary-key-3" tabindex="-1"><a class="header-anchor" href="#id-primary-key-3"><span>id (Primary Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each appointment.</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8e&quot;</li>
</ul>
<h4 id="clientid-foreign-key-1" tabindex="-1"><a class="header-anchor" href="#clientid-foreign-key-1"><span>clientId (Foreign Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Relationship:</strong> References Client</li>
<li><strong>Reasoning:</strong> Associates the appointment with a specific client.</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8c&quot;</li>
</ul>
<h4 id="jobid-foreign-key" tabindex="-1"><a class="header-anchor" href="#jobid-foreign-key"><span>jobId (Foreign Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Relationship:</strong> References Job</li>
<li><strong>Reasoning:</strong> Associates the appointment with a specific job.</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8d&quot;</li>
</ul>
<h4 id="scheduleddatetime-1" tabindex="-1"><a class="header-anchor" href="#scheduleddatetime-1"><span>scheduledDateTime</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Scheduled date and time for the appointment.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="duration" tabindex="-1"><a class="header-anchor" href="#duration"><span>duration</span></a></h4>
<ul>
<li><strong>Data Type:</strong> integer</li>
<li><strong>Reasoning:</strong> Duration of the appointment in minutes.</li>
<li><strong>Example:</strong> 60</li>
</ul>
<h4 id="status-1" tabindex="-1"><a class="header-anchor" href="#status-1"><span>status</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Current status of the appointment (e.g., pending, confirmed, cancelled).</li>
<li><strong>Example:</strong> &quot;confirmed&quot;</li>
</ul>
<h4 id="createdat-4" tabindex="-1"><a class="header-anchor" href="#createdat-4"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat-4" tabindex="-1"><a class="header-anchor" href="#updatedat-4"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat-4" tabindex="-1"><a class="header-anchor" href="#deletedat-4"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h3 id="inventoryitem" tabindex="-1"><a class="header-anchor" href="#inventoryitem"><span>InventoryItem</span></a></h3>
<p>The InventoryItem entity stores information about items in the company's inventory.</p>
<h4 id="id-primary-key-4" tabindex="-1"><a class="header-anchor" href="#id-primary-key-4"><span>id (Primary Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each inventory item.</li>
<li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8f&quot;</li>
</ul>
<h4 id="name-1" tabindex="-1"><a class="header-anchor" href="#name-1"><span>name</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Name of the inventory item.</li>
<li><strong>Example:</strong> &quot;Wrench&quot;</li>
</ul>
<h4 id="itemimage" tabindex="-1"><a class="header-anchor" href="#itemimage"><span>itemImage</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string (base64)</li>
<li><strong>Reasoning:</strong> Image or icon representing the inventory item.</li>
<li><strong>Example:</strong> &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;</li>
</ul>
<h4 id="costprice" tabindex="-1"><a class="header-anchor" href="#costprice"><span>costPrice</span></a></h4>
<ul>
<li><strong>Data Type:</strong> double</li>
<li><strong>Reasoning:</strong> Cost price of the inventory item.</li>
<li><strong>Example:</strong> 15.99</li>
</ul>
<h4 id="currentstocklevel" tabindex="-1"><a class="header-anchor" href="#currentstocklevel"><span>currentStockLevel</span></a></h4>
<ul>
<li><strong>Data Type:</strong> integer</li>
<li><strong>Reasoning:</strong> Current stock level of the inventory item.</li>
<li><strong>Example:</strong> 50</li>
</ul>
<h4 id="lowstockthreshold" tabindex="-1"><a class="header-anchor" href="#lowstockthreshold"><span>lowStockThreshold</span></a></h4>
<ul>
<li><strong>Data Type:</strong> integer</li>
<li><strong>Reasoning:</strong> Threshold to indicate low stock level.</li>
<li><strong>Example:</strong> 10</li>
</ul>
<h4 id="createdat-5" tabindex="-1"><a class="header-anchor" href="#createdat-5"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat-5" tabindex="-1"><a class="header-anchor" href="#updatedat-5"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat-5" tabindex="-1"><a class="header-anchor" href="#deletedat-5"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
</div></template>


