<template><div><h1 id="database-schema" tabindex="-1"><a class="header-anchor" href="#database-schema"><span>Database Schema</span></a></h1>
<h2 id="user" tabindex="-1"><a class="header-anchor" href="#user"><span>User</span></a></h2>
<p>The Employee entity stores information for users.</p>
<h4 id="id" tabindex="-1"><a class="header-anchor" href="#id"><span>_id</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each user.</li>
<li><strong>Example:</strong> &quot;_id&quot;: &quot;60d21b4667d0d8992e610c85&quot;</li>
</ul>
<h4 id="systemdetails" tabindex="-1"><a class="header-anchor" href="#systemdetails"><span>systemDetails</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
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
<li><strong>Example:</strong> &quot;systemDetails&quot;: {&quot;username&quot;:&quot;thando&quot;, &quot;password&quot;:&quot;hashed password&quot;}</li>
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
<li><strong>Example:</strong> &quot;profile&quot;: {&quot;displayName&quot;:&quot;thando&quot;, &quot;displayImage&quot;:&quot;base64 image&quot;}</li>
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
<li><strong>Reasoning:</strong> Email for contact.</li>
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
<li><strong>Example:</strong>: &quot;personalInfo&quot;:{&quot;firstName&quot;:&quot;John&quot;,&quot;surname&quot;:&quot;Doe&quot;,&quot;dateOfBirth&quot;:&quot;1990-01-01&quot;,&quot;gender&quot;:&quot;Male&quot;,&quot;preferredLanguage&quot;:&quot;English&quot;,&quot;contactInfo&quot;:{&quot;phone&quot;:&quot;+1234567890&quot;,&quot;email&quot;:&quot;contact@example.com&quot;},&quot;address&quot;:{&quot;street&quot;:&quot;123 Main St&quot;,&quot;suburb&quot;:&quot;Central&quot;,&quot;city&quot;:&quot;Metropolis&quot;,&quot;postalCode&quot;:&quot;12345&quot;,&quot;complex&quot;:&quot;Sunny Apartments&quot;,&quot;houseNumber&quot;:&quot;10B&quot;}}</li>
</ul>
<h4 id="joinedcompanies" tabindex="-1"><a class="header-anchor" href="#joinedcompanies"><span>joinedCompanies</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Objects</li>
<li><strong>Reasoning:</strong> References companies the user is associated with.</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>employeeId:</strong> ObjectId
<ul>
<li><strong>Reasoning:</strong> Stores a reference to the employee collection</li>
<li><strong>Example:</strong> &quot;employeeId&quot;: &quot;60d21b4667d0d8992e610c85&quot;</li>
</ul>
</li>
<li><strong>companyName:</strong> string
<ul>
<li><strong>Reasoning:</strong> stores the name of the company the employeeId links to</li>
<li><strong>Example:</strong> &quot;companyName&quot;: &quot;Work Wise Central&quot;</li>
</ul>
</li>
</ul>
</li>
<li><strong>Example:</strong> &quot;joinedComapanies&quot;: [ {&quot;employeeId&quot;: &quot;60d21b4667d0d8992e610c85&quot;, &quot;companyName&quot;: &quot;Work Wise Central&quot;}...]</li>
</ul>
<h4 id="skills" tabindex="-1"><a class="header-anchor" href="#skills"><span>skills</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>skillName:</strong> string
<ul>
<li><strong>Reasoning:</strong> List of skills the user possesses.</li>
</ul>
</li>
</ul>
</li>
<li><strong>Example:</strong> &quot;skills&quot;: [&quot;JavaScript&quot;, &quot;Python&quot;]</li>
</ul>
<h4 id="currentemployeeid" tabindex="-1"><a class="header-anchor" href="#currentemployeeid"><span>currentEmployeeId</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier the current employee the user is logged in as.</li>
<li><strong>Example:</strong> &quot;currentEmployeeId&quot;: &quot;60d21b4667d0d8992e610c85&quot;</li>
</ul>
<h2 id="employee" tabindex="-1"><a class="header-anchor" href="#employee"><span>Employee</span></a></h2>
<p>The Employee entity stores information for employees.</p>
<h4 id="id-1" tabindex="-1"><a class="header-anchor" href="#id-1"><span>_id</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each employee.</li>
<li><strong>Example:</strong> &quot;_id&quot;: &quot;60d21b4667d0d8992e610c85&quot;</li>
</ul>
<h4 id="role" tabindex="-1"><a class="header-anchor" href="#role"><span>role</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Objects</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>role:</strong> string
<ul>
<li><strong>Reasoning:</strong> Defines the user's role (e.g., admin, employee).</li>
<li><strong>Example:</strong>&quot;admin&quot;</li>
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
<li><strong>Example:</strong> &quot;role&quot;: {&quot;role&quot;:&quot;admin&quot;,&quot;permissions&quot;:[&quot;read&quot;,&quot;write&quot;,&quot;delete&quot;]}</li>
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
<h4 id="skills-1" tabindex="-1"><a class="header-anchor" href="#skills-1"><span>skills</span></a></h4>
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
<h4 id="currentjobassignments" tabindex="-1"><a class="header-anchor" href="#currentjobassignments"><span>currentJobAssignments</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Object ids</li>
<li><strong>Reasoning:</strong> References jobs the employee is currently assigned to.</li>
<li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c87&quot;...]</li>
</ul>
<h4 id="superior" tabindex="-1"><a class="header-anchor" href="#superior"><span>superior</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> References the employee's superior.</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>employeeId:</strong> ObjectId
<ul>
<li><strong>Reasoning:</strong> Stores a reference to the employeeId in the Employee collection</li>
</ul>
</li>
</ul>
</li>
<li><strong>Example:</strong> &quot;superior&quot;: &quot;60d21b4667d0d8992e610c87&quot;</li>
</ul>
<h4 id="subordinates" tabindex="-1"><a class="header-anchor" href="#subordinates"><span>subordinates</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Object ids</li>
<li><strong>Reasoning:</strong> References the employees under the employee.</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>employeeId:</strong> ObjectId
<ul>
<li><strong>Reasoning:</strong> Stores a reference to the employeeId in the Employee collection</li>
</ul>
</li>
</ul>
</li>
<li><strong>Example:</strong> &quot;subordinates&quot;: [&quot;60d21b4667d0d8992e610c87&quot;...]</li>
</ul>
<h4 id="createdat" tabindex="-1"><a class="header-anchor" href="#createdat"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;createdAt&quot; : &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat" tabindex="-1"><a class="header-anchor" href="#updatedat"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;updatedAt: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat" tabindex="-1"><a class="header-anchor" href="#deletedat"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;deletedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h2 id="team" tabindex="-1"><a class="header-anchor" href="#team"><span>Team</span></a></h2>
<h4 id="id-2" tabindex="-1"><a class="header-anchor" href="#id-2"><span>_id</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each team.</li>
<li><strong>Example:</strong> &quot;_id&quot;: &quot;60d21b4667d0d8992e610c85&quot;</li>
</ul>
<h4 id="teamname" tabindex="-1"><a class="header-anchor" href="#teamname"><span>teamName</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Use of string is logical.</li>
<li><strong>Example:</strong> &quot;teamName&quot;: &quot;Boolean Hooligans&quot;</li>
</ul>
<h4 id="companyid" tabindex="-1"><a class="header-anchor" href="#companyid"><span>companyId</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Relationship:</strong> References Company</li>
<li><strong>Reasoning:</strong> Associates the job with a specific company.</li>
<li><strong>Example:</strong> &quot;companyId&quot;: &quot;60d21b4667d0d8992e610c8c&quot;</li>
</ul>
<h4 id="teammembers" tabindex="-1"><a class="header-anchor" href="#teammembers"><span>teamMembers</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Objects ids</li>
<li><strong>Reasoning:</strong> Stores employeeIds</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>employeeId:</strong> ObjectId
<ul>
<li><strong>Reasoning:</strong> Stores the reference to the employee in the Employee collection</li>
</ul>
</li>
</ul>
</li>
<li><strong>Example:</strong> &quot;teamMembers&quot;: [&quot;60d21b4667d0d8992e610c87&quot;...]</li>
</ul>
<h4 id="teamleaderid" tabindex="-1"><a class="header-anchor" href="#teamleaderid"><span>teamLeaderId</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> References the employeeId in the employee collection.</li>
<li><strong>Example:</strong> &quot;_id&quot;: &quot;60d21b4667d0d8992e610c85&quot;</li>
<li></li>
</ul>
<h4 id="assignedjobs" tabindex="-1"><a class="header-anchor" href="#assignedjobs"><span>assignedJobs</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Object ids</li>
<li><strong>Reasoning:</strong> Stores a list of jobs the teams has been assigned</li>
<li><strong>Example:</strong> &quot;assignedJobs&quot;: [&quot;60d21b4667d0d8992e610c85&quot;, ...]</li>
<li></li>
</ul>
<h4 id="createdat-1" tabindex="-1"><a class="header-anchor" href="#createdat-1"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;createdAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat-1" tabindex="-1"><a class="header-anchor" href="#updatedat-1"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;updatedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat-1" tabindex="-1"><a class="header-anchor" href="#deletedat-1"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;deletedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h2 id="company" tabindex="-1"><a class="header-anchor" href="#company"><span>Company</span></a></h2>
<p>The Company entity stores information about companies associated with users and jobs.</p>
<h4 id="id-primary-key" tabindex="-1"><a class="header-anchor" href="#id-primary-key"><span>_id (Primary Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each company.</li>
<li><strong>Example:</strong> &quot;_id&quot;: &quot;60d21b4667d0d8992e610c89&quot;</li>
</ul>
<h4 id="registrationnumber" tabindex="-1"><a class="header-anchor" href="#registrationnumber"><span>registrationNumber</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Unique registration number for the company.</li>
<li><strong>Example:</strong> &quot;registrationNumber&quot;: &quot;REG123456&quot;</li>
</ul>
<h4 id="name" tabindex="-1"><a class="header-anchor" href="#name"><span>name</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Name of the company.</li>
<li><strong>Example:</strong> &quot;name&quot;: &quot;Tech Solutions Inc.&quot;</li>
</ul>
<h4 id="type" tabindex="-1"><a class="header-anchor" href="#type"><span>type</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Type or industry of the company.</li>
<li><strong>Example:</strong> &quot;type&quot;: &quot;IT Services&quot;</li>
</ul>
<h4 id="vatnumber" tabindex="-1"><a class="header-anchor" href="#vatnumber"><span>vatNumber</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> VAT number for tax purposes.</li>
<li><strong>Example:</strong> &quot;vatNumber&quot;: &quot;VAT789012&quot;</li>
</ul>
<h4 id="logo" tabindex="-1"><a class="header-anchor" href="#logo"><span>logo</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> URL or base64 image string for the company logo.</li>
<li><strong>Example:</strong> &quot;logo&quot;: &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;</li>
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
<li><strong>Example:</strong> &quot;contactDetails&quot;: {&quot;phone&quot;:&quot;+1234567890&quot;,&quot;email&quot;:&quot;contact@techsolutions.com&quot;}</li>
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
<li><strong>Example:</strong> &quot;address&quot;: {&quot;street&quot;:&quot;456 Business St&quot;,&quot;suburb&quot;:&quot;Central&quot;,&quot;city&quot;:&quot;Metropolis&quot;,&quot;postalCode&quot;:&quot;67890&quot;}</li>
</ul>
<h4 id="employees" tabindex="-1"><a class="header-anchor" href="#employees"><span>employees</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Objects</li>
<li><strong>Reasoning:</strong> References employees (Users) associated with the company.</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>employeeId:</strong> ObjectId
<ul>
<li><strong>Reasoning:</strong> Stores a reference to the employeeId in the Employee collection</li>
</ul>
</li>
</ul>
</li>
<li><strong>Example:</strong> &quot;employees&quot;: [&quot;60d21b4667d0d8992e610c85&quot;,...]</li>
</ul>
<h4 id="inventoryitems" tabindex="-1"><a class="header-anchor" href="#inventoryitems"><span>inventoryItems</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Object ids</li>
<li><strong>Reasoning:</strong> References inventory items owned by the company to track and manage stock efficiently.</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>inventoryItemId:</strong> ObjectId
<ul>
<li><strong>Reasoning:</strong> Unique identifier for each inventory item to ensure accurate tracking and referencing.</li>
</ul>
</li>
</ul>
</li>
<li><strong>Example:</strong> &quot;inventoryItems&quot;: [&quot;60d21b4667d0d8992e610c8a&quot;,...]</li>
</ul>
<h4 id="createdat-2" tabindex="-1"><a class="header-anchor" href="#createdat-2"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;createdAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat-2" tabindex="-1"><a class="header-anchor" href="#updatedat-2"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;updatedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat-2" tabindex="-1"><a class="header-anchor" href="#deletedat-2"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;deletedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h2 id="client" tabindex="-1"><a class="header-anchor" href="#client"><span>Client</span></a></h2>
<p>The Client entity stores information about clients who have jobs or appointments.</p>
<h4 id="id-primary-key-1" tabindex="-1"><a class="header-anchor" href="#id-primary-key-1"><span>_id (Primary Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each client.</li>
<li><strong>Example:</strong> &quot;_id&quot;: &quot;60d21b4667d0d8992e610c8c&quot;</li>
</ul>
<h4 id="personalinfo-1" tabindex="-1"><a class="header-anchor" href="#personalinfo-1"><span>personalInfo</span></a></h4>
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
</ul>
</li>
<li><strong>contactInfo</strong>:
<ul>
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
<li><strong>Example:</strong> &quot;personalInfo&quot;: {&quot;firstName&quot;:&quot;Jane&quot;,&quot;surname&quot;:&quot;Smith&quot;,&quot;preferredLanguage&quot;:&quot;English&quot;,&quot;dateOfBirth&quot;:{&quot;phone&quot;:&quot;+1234567890&quot;},&quot;contactInfo&quot;:{&quot;email&quot;:&quot;jane.smith@example.com&quot;,&quot;address&quot;:{&quot;street&quot;:&quot;789 Client Rd&quot;,&quot;suburb&quot;:&quot;Eastside&quot;,&quot;city&quot;:&quot;Metropolis&quot;,&quot;postalCode&quot;:&quot;12345&quot;,&quot;complex&quot;:&quot;Client Apartments&quot;,&quot;houseNumber&quot;:&quot;3A&quot;}}}</li>
</ul>
<h4 id="createdat-3" tabindex="-1"><a class="header-anchor" href="#createdat-3"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;createdAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat-3" tabindex="-1"><a class="header-anchor" href="#updatedat-3"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;updatedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat-3" tabindex="-1"><a class="header-anchor" href="#deletedat-3"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;deletedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h2 id="job" tabindex="-1"><a class="header-anchor" href="#job"><span>Job</span></a></h2>
<p>The Job entity stores information about jobs assigned to employees and clients.</p>
<h4 id="id-primary-key-2" tabindex="-1"><a class="header-anchor" href="#id-primary-key-2"><span>_id (Primary Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each job.</li>
<li><strong>Example:</strong> &quot;_id&quot;: &quot;60d21b4667d0d8992e610c8d&quot;</li>
</ul>
<h4 id="companyid-1" tabindex="-1"><a class="header-anchor" href="#companyid-1"><span>companyId</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Relationship:</strong> References Company</li>
<li><strong>Reasoning:</strong> Associates the job with a specific company.</li>
<li><strong>Example:</strong> &quot;companyId&quot;: &quot;60d21b4667d0d8992e610c8c&quot;</li>
</ul>
<h4 id="clientid-foreign-key" tabindex="-1"><a class="header-anchor" href="#clientid-foreign-key"><span>clientId (Foreign Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Relationship:</strong> References Client</li>
<li><strong>Reasoning:</strong> Associates the job with a specific client.</li>
<li><strong>Example:</strong> &quot;clientId&quot;: &quot;60d21b4667d0d8992e610c8c&quot;</li>
</ul>
<h4 id="assignedemployees" tabindex="-1"><a class="header-anchor" href="#assignedemployees"><span>assignedEmployees</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object of Employee ids and Team id</li>
<li><strong>Relationship:</strong> References employees and teams</li>
<li><strong>Reasoning:</strong> Employees and team assigned to the job.</li>
<li><strong>Example:</strong> &quot;assignedEmployees&quot;: {&quot;employeesIds&quot;: [&quot;60d21b4667d0d8992e610c85&quot;,...], &quot;teamId&quot;: &quot;60d21b4667d0d8992e610c85&quot;}</li>
</ul>
<h4 id="assignedby-jess-may-you-please-add-this-field-to-er-diagram" tabindex="-1"><a class="header-anchor" href="#assignedby-jess-may-you-please-add-this-field-to-er-diagram"><span>assignedBy (@Jess may you please add this field to er diagram)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object id</li>
<li><strong>Relationship:</strong> References Employees table</li>
<li><strong>Reasoning:</strong> Assignee of a job.</li>
<li><strong>Example:</strong> &quot;assignedBy&quot;: &quot;60d21b4667d0d8992e610c85&quot;</li>
</ul>
<h4 id="status-jess-may-you-please-add-this-field-to-er-diagram-i-ve-just-made-status-it-s-own-attribute" tabindex="-1"><a class="header-anchor" href="#status-jess-may-you-please-add-this-field-to-er-diagram-i-ve-just-made-status-it-s-own-attribute"><span>status (@Jess may you please add this field to er diagram, I've just made status it's own attribute)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> stores the status of the job</li>
<li><strong>Example:</strong> &quot;status&quot;: &quot;complete&quot;</li>
</ul>
<h4 id="recordeddetails" tabindex="-1"><a class="header-anchor" href="#recordeddetails"><span>recordedDetails</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>imagesTaken</strong>
<ul>
<li><strong>Data Type</strong>: Array of strings (base64 images)</li>
<li><strong>Reasoning:</strong> Images related to the job.</li>
<li><strong>Example:</strong> [&quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;, &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;]</li>
</ul>
</li>
<li><strong>inventoryUsed</strong>
<ul>
<li><strong>Data Type:</strong> Array of Object</li>
<li><strong>Reasoning:</strong> Inventory items used for the job.</li>
<li><strong>Example:</strong> [{ &quot;InventoryItem&quot;: &quot;60d21b4667d0d8992e610c8a&quot;, &quot;QuantityUsed&quot;: 2 }]</li>
</ul>
</li>
</ul>
</li>
<li><strong>Example:</strong> &quot;recordedDetails&quot;: {&quot;imagesTaken&quot;:[&quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;,&quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;],&quot;inventoryUsed&quot;:[{&quot;InventoryItem&quot;:&quot;60d21b4667d0d8992e610c8a&quot;,&quot;QuantityUsed&quot;:2}]}</li>
</ul>
<h4 id="jobdetails" tabindex="-1"><a class="header-anchor" href="#jobdetails"><span>jobDetails</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>jobName:</strong> string
<ul>
<li><strong>Reasoning:</strong> Name of the job.</li>
<li><strong>Example:</strong> &quot;UP Merensky library revamp&quot;</li>
</ul>
</li>
<li><strong>jobDescription:</strong> string   (@Jess may you please add this field to er diagram)
<ul>
<li><strong>Reasoning:</strong> Description of the job.</li>
<li><strong>Example:</strong> &quot;Fixing plumbing issues.&quot;</li>
</ul>
</li>
<li><strong>jobStartDate:</strong> Date
<ul>
<li><strong>Reasoning:</strong> Start date of the job.</li>
<li><strong>Example:</strong> &quot;2024-06-01&quot;</li>
</ul>
</li>
<li><strong>jobEndDate:</strong> Date
<ul>
<li><strong>Reasoning:</strong> End date of the job.</li>
<li><strong>Example:</strong> &quot;2024-06-05&quot;</li>
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
</ul>
</li>
<li><strong>Example:</strong> &quot;jobDetails&quot;: {&quot;jobDescription&quot;: &quot;Fixing plumbing issues.&quot;,&quot;jobStartDate&quot;:&quot;2024-06-01&quot;,&quot;jobEndDate&quot;: &quot;2024-06-05&quot;,&quot;status&quot;: &quot;pending&quot;,&quot;jobAddress&quot;: {&quot;street&quot;: &quot;123 Job St&quot;,&quot;suburb&quot;: &quot;Westside&quot;,&quot;city&quot;: &quot;Metropolis&quot;,&quot;postalCode&quot;: &quot;67890&quot;,&quot;complex&quot;: &quot;Workplace Plaza&quot;,&quot;houseNumber&quot;: &quot;5C&quot;} }</li>
</ul>
<h4 id="clientfeedback" tabindex="-1"><a class="header-anchor" href="#clientfeedback"><span>clientFeedback</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>jobRating:</strong> number (out of 5)
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
<li><strong>Example:</strong> &quot;clientFeedback&quot;: {&quot;jobRating&quot;: 5, &quot;customerServiceRating&quot;: 5, &quot;comments&quot;: &quot;Great service!&quot;}</li>
</ul>
<h4 id="tasklist" tabindex="-1"><a class="header-anchor" href="#tasklist"><span>taskList</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Objects</li>
<li><strong>Reasoning:</strong> Stores task given to employees for a job</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>task</strong>: Object</li>
<li><strong>Reasoning:</strong> stores the task name, status and employee assigned to it</li>
<li><strong>Example:</strong> &quot;task&quot; : {&quot;taskName&quot;:&quot;Paint north facing wall&quot;, &quot;status&quot;: &quot;complete&quot;, &quot;assignedEmployees&quot; : [&quot;60d21b4667d0d8992e610c8a&quot;, ...]}</li>
</ul>
</li>
<li><strong>Example:</strong> &quot;taskList&quot;: [&quot;task1&quot; : {&quot;taskName&quot;:&quot;Paint north facing wall&quot;, &quot;status&quot;: &quot;complete&quot;, &quot;assignedEmployees&quot; : [&quot;60d21b4667d0d8992e610c8a&quot;, ...]}, ...]</li>
</ul>
<h4 id="comments" tabindex="-1"><a class="header-anchor" href="#comments"><span>comments</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Array of Objects</li>
<li><strong>Reasoning:</strong> Stores comments made by employees for the job</li>
<li><strong>Attributes:</strong>
<ul>
<li><strong>commentItem</strong>: Object</li>
<li><strong>Reasoning:</strong> stores the comment, employee that made it and the status</li>
<li><strong>Example:</strong> &quot;commentItem&quot; : {&quot;comment&quot;:&quot;Roofing needs adjusting&quot;, &quot;employeeId&quot; : &quot;60d21b4667d0d8992e610c8a&quot;, &quot;commentDate&quot;: &quot;2024-06-12&quot; }</li>
</ul>
</li>
<li><strong>Example:</strong> &quot;comments&quot;: [{&quot;commentItem1&quot; : {&quot;comment&quot;:&quot;Roofing needs adjusting&quot;, &quot;employeeId&quot; : &quot;60d21b4667d0d8992e610c8a&quot;, &quot;commentDate&quot;: &quot;2024-06-12&quot; }, ...]</li>
</ul>
<h4 id="createdat-4" tabindex="-1"><a class="header-anchor" href="#createdat-4"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;createdAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat-4" tabindex="-1"><a class="header-anchor" href="#updatedat-4"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;updatedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat-4" tabindex="-1"><a class="header-anchor" href="#deletedat-4"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;deletedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<!-- ## Appointment 

The Appointment entity stores information about appointments between clients and jobs.

#### _id (Primary Key)

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each appointment.
- **Example:** "60d21b4667d0d8992e610c8e"

#### clientId (Foreign Key)

- **Data Type:** ObjectId
- **Relationship:** References Client
- **Reasoning:** Associates the appointment with a specific client.
- **Example:** "60d21b4667d0d8992e610c8c"

#### jobId (Foreign Key)

- **Data Type:** ObjectId
- **Relationship:** References Job
- **Reasoning:** Associates the appointment with a specific job.
- **Example:** "60d21b4667d0d8992e610c8d"

#### scheduledDateTime

- **Data Type:** Date (in string format)
- **Reasoning:** Scheduled date and time for the appointment.
- **Example:** "2024-06-01T10:00:00Z"

#### duration

- **Data Type:** integer
- **Reasoning:** Duration of the appointment in minutes.
- **Example:** 60

#### status

- **Data Type:** string
- **Reasoning:** Current status of the appointment (e.g., pending, confirmed, cancelled).
- **Example:** "confirmed"

#### createdAt

- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "createdAt": "2024-06-01T10:00:00Z"

#### updatedAt

- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "updatedAt": "2024-06-01T10:00:00Z"

#### deletedAt

- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "deletedAt": "2024-06-01T10:00:00Z"  -->
<h2 id="inventoryitem" tabindex="-1"><a class="header-anchor" href="#inventoryitem"><span>InventoryItem</span></a></h2>
<p>The InventoryItem entity stores information about items in the company's inventory.</p>
<h4 id="id-primary-key-3" tabindex="-1"><a class="header-anchor" href="#id-primary-key-3"><span>_id (Primary Key)</span></a></h4>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Reasoning:</strong> Unique identifier for each inventory item.</li>
<li><strong>Example:</strong> &quot;_id&quot;: &quot;60d21b4667d0d8992e610c8f&quot;</li>
</ul>
<h4 id="name-1" tabindex="-1"><a class="header-anchor" href="#name-1"><span>name</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string</li>
<li><strong>Reasoning:</strong> Name of the inventory item.</li>
<li><strong>Example:</strong> &quot;name&quot;: &quot;Wrench&quot;</li>
</ul>
<h4 id="itemimage" tabindex="-1"><a class="header-anchor" href="#itemimage"><span>itemImage</span></a></h4>
<ul>
<li><strong>Data Type:</strong> string (base64)</li>
<li><strong>Reasoning:</strong> Image or icon representing the inventory item.</li>
<li><strong>Example:</strong> &quot;itemImage&quot;: &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;</li>
</ul>
<h4 id="costprice" tabindex="-1"><a class="header-anchor" href="#costprice"><span>costPrice</span></a></h4>
<ul>
<li><strong>Data Type:</strong> double</li>
<li><strong>Reasoning:</strong> Cost price of the inventory item.</li>
<li><strong>Example:</strong> &quot;costPrice&quot;: 15.99</li>
</ul>
<h4 id="currentstocklevel" tabindex="-1"><a class="header-anchor" href="#currentstocklevel"><span>currentStockLevel</span></a></h4>
<ul>
<li><strong>Data Type:</strong> integer</li>
<li><strong>Reasoning:</strong> Current stock level of the inventory item.</li>
<li><strong>Example:</strong> &quot;currentStockLevel&quot;: 50</li>
</ul>
<h4 id="lowstockthreshold" tabindex="-1"><a class="header-anchor" href="#lowstockthreshold"><span>lowStockThreshold</span></a></h4>
<ul>
<li><strong>Data Type:</strong> integer</li>
<li><strong>Reasoning:</strong> Threshold to indicate low stock level.</li>
<li><strong>Example:</strong> &quot;lowStockThreshold&quot;: 10</li>
</ul>
<h4 id="createdat-5" tabindex="-1"><a class="header-anchor" href="#createdat-5"><span>createdAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was created.</li>
<li><strong>Example:</strong> &quot;createdAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="updatedat-5" tabindex="-1"><a class="header-anchor" href="#updatedat-5"><span>updatedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li>
<li><strong>Example:</strong> &quot;updatedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
<h4 id="deletedat-5" tabindex="-1"><a class="header-anchor" href="#deletedat-5"><span>deletedAt</span></a></h4>
<ul>
<li><strong>Data Type:</strong> Date (in string format)</li>
<li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li>
<li><strong>Example:</strong> &quot;deletedAt&quot;: &quot;2024-06-01T10:00:00Z&quot;</li>
</ul>
</div></template>


