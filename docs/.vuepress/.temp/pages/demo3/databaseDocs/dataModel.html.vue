<template><div><h1 id="data-model" tabindex="-1"><a class="header-anchor" href="#data-model"><span>Data Model</span></a></h1>
<h2 id="user" tabindex="-1"><a class="header-anchor" href="#user"><span>User</span></a></h2>
<p>The User entity stores all user-related data, including personal, system, and professional details.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the user.</li>
<li><strong>systemDetails</strong>: Stores system-related information such as email, password, and username.</li>
<li><strong>personInfo</strong>: Contains personal details like first name, surname, date of birth, gender, preferred language, contact information (phone, email), and address (street, suburb, city, postal code, complex, house number).</li>
<li><strong>profile</strong>: Holds profile-specific data such as display image and display name.</li>
<li><strong>joinedCompanies</strong>: A list of companies the user is associated with.</li>
<li><strong>skills</strong>: A list of the user's skills.</li>
</ul>
<h2 id="employee" tabindex="-1"><a class="header-anchor" href="#employee"><span>Employee</span></a></h2>
<p>The Employee entity stores all employee-related data, including the company for whom this employee works, the employees superior, subordinates, job assignments and role.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the employee.</li>
<li><strong>roleId</strong>: id linking to the role the user has in the company</li>
<li><strong>currentJobAssignments</strong>: An array of current job assignments for the current employee.</li>
<li><strong>superiorId</strong>: The employee id of the superior of this employee.</li>
<li><strong>subordinates</strong>: An array of the employees that work under the current employee.</li>
<li><strong>companyId</strong>: A list of companies the user is associated with.</li>
</ul>
<h2 id="company" tabindex="-1"><a class="header-anchor" href="#company"><span>Company</span></a></h2>
<p>The Company entity stores information about different companies.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the company.</li>
<li><strong>registrationNumber</strong>: The company's registration number.</li>
<li><strong>name</strong>: The name of the company.</li>
<li><strong>type</strong>: The type of business the company operates.</li>
<li><strong>vatNumber</strong>: The company's VAT number.</li>
<li><strong>logo</strong>: The company's logo.</li>
<li><strong>contactDetails</strong>: Contact information including phone and email.</li>
<li><strong>address</strong>: The company's address, comprising street, suburb, city, and postal code.</li>
<li><strong>employees</strong>: A list of employee Ids associated with the company.</li>
<li><strong>inventoryItems</strong>: A list of inventory item Ids managed by the company.</li>
</ul>
<h2 id="client" tabindex="-1"><a class="header-anchor" href="#client"><span>Client</span></a></h2>
<p>The Client entity stores information about clients.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the client.</li>
<li><strong>details</strong>: Contains client-specific details such as first name, surname, contact information (phone, email), and address (street, suburb, city, postal code, complex, house number).</li>
</ul>
<h2 id="job" tabindex="-1"><a class="header-anchor" href="#job"><span>Job</span></a></h2>
<p>The Job entity stores details about various jobs.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the job.</li>
<li><strong>clientId</strong>: A reference to the client associated with the job.</li>
<li><strong>assignedEmployees</strong>: A list of employee Ids assigned to the job.</li>
<li><strong>scheduledDateTime</strong>: The scheduled date and time for the job.</li>
<li><strong>status</strong>: The current status of the job (e.g., pending, in progress, completed).</li>
<li><strong>inventoryUsed</strong>: A list of inventory items used in the job, including item Ids and quantities.</li>
<li><strong>jobDetails</strong>: Detailed information about the job, including description, notes, address, and images.</li>
<li><strong>clientFeedback</strong>: Feedback from the client, including job rating, customer service rating, and comments.</li>
</ul>
<!-- ## Appointment
The Appointment entity stores information about appointments.
- **id (Primary Key)**: A unique identifier for the appointment.
- **clientId**: A reference to the client associated with the appointment.
- **jobId**: A reference to the job related to the appointment.
- **scheduledDateTime**: The scheduled date and time for the appointment.
- **duration**: The duration of the appointment in minutes.
- **status**: The current status of the appointment (e.g., pending, confirmed, cancelled). -->
<h2 id="inventoryitem" tabindex="-1"><a class="header-anchor" href="#inventoryitem"><span>InventoryItem</span></a></h2>
<p>The InventoryItem entity stores details about inventory items.</p>
<ul>
<li><strong>id (Primary Key)</strong>: A unique identifier for the inventory item.</li>
<li><strong>name</strong>: The name of the inventory item.</li>
<li><strong>itemImage</strong>: The image or icon representing the inventory item.</li>
<li><strong>costPrice</strong>: The cost price of the inventory item.</li>
<li><strong>currentStockLevel</strong>: The current stock level of the inventory item.</li>
<li><strong>lowStockThreshold</strong>: The stock level threshold indicating when the item is considered low on stock.</li>
</ul>
</div></template>


