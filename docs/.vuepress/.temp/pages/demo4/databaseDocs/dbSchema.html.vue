<template><div><h1 id="database-schema" tabindex="-1"><a class="header-anchor" href="#database-schema"><span>Database Schema</span></a></h1>
<h2 id="chatmessage" tabindex="-1"><a class="header-anchor" href="#chatmessage"><span>ChatMessage</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> The id of the chat message.</li>
</ul>
</li>
<li>
<p><strong>chatId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Indexed:</strong> Yes</li>
<li><strong>References:</strong> Chat</li>
<li><strong>Description:</strong> The id of the chat the message belongs to.</li>
</ul>
</li>
<li>
<p><strong>userId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Indexed:</strong> Yes</li>
<li><strong>References:</strong> User</li>
<li><strong>Description:</strong> The id of the user who sent the message.</li>
</ul>
</li>
<li>
<p><strong>textContent</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The content of the chat message.</li>
</ul>
</li>
<li>
<p><strong>usersWhoHaveReadMessage</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default Value:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> The ids of users who have read the message.</li>
</ul>
</li>
<li>
<p><strong>attachments</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of Strings</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default Value:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> Optional list of attachment URLs related to the message.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default Value:</strong> Current Date</li>
<li><strong>Description:</strong> The timestamp when the message was created.</li>
</ul>
</li>
</ul>
<h2 id="chat" tabindex="-1"><a class="header-anchor" href="#chat"><span>Chat</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> The id of the chat.</li>
</ul>
</li>
<li>
<p><strong>name</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default Value:</strong> Randomly generated string</li>
<li><strong>Description:</strong> The name of the chat.</li>
</ul>
</li>
<li>
<p><strong>description</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default Value:</strong> <code v-pre>''</code></li>
<li><strong>Description:</strong> A short description of the chat.</li>
</ul>
</li>
<li>
<p><strong>image</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default Value:</strong> <code v-pre>'https://img.icons8.com/?size=100&amp;id=105326&amp;format=png&amp;color=000000'</code></li>
<li><strong>Description:</strong> The URL of the chat's image.</li>
</ul>
</li>
<li>
<p><strong>admin</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> No</li>
<li><strong>References:</strong> User</li>
<li><strong>Description:</strong> The id of the admin of the chat.</li>
</ul>
</li>
<li>
<p><strong>participants</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>References:</strong> User</li>
<li><strong>Description:</strong> The ids of users participating in the chat.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default Value:</strong> Current Date</li>
<li><strong>Description:</strong> The timestamp when the chat was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default Value:</strong> Current Date</li>
<li><strong>Description:</strong> The timestamp when the chat was last updated.</li>
</ul>
</li>
</ul>
<h2 id="client" tabindex="-1"><a class="header-anchor" href="#client"><span>Client</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> The id of the client.</li>
</ul>
</li>
<li>
<p><strong>registrationNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The registration number of the client, if applicable.</li>
</ul>
</li>
<li>
<p><strong>details</strong></p>
<ul>
<li><strong>Data Type:</strong> ClientDetails</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Contains detailed information about the client.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default Value:</strong> Current Date</li>
<li><strong>Description:</strong> The timestamp when the client record was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The timestamp when the client record was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The timestamp when the client record was deleted (if applicable).</li>
</ul>
</li>
</ul>
<h3 id="clientdetails" tabindex="-1"><a class="header-anchor" href="#clientdetails"><span>ClientDetails</span></a></h3>
<ul>
<li>
<p><strong>firstName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The first name of the client.</li>
</ul>
</li>
<li>
<p><strong>lastName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The last name of the client.</li>
</ul>
</li>
<li>
<p><strong>preferredLanguage</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default Value:</strong> <code v-pre>'English'</code></li>
<li><strong>Description:</strong> The client's preferred language.</li>
</ul>
</li>
<li>
<p><strong>contactInfo</strong></p>
<ul>
<li><strong>Data Type:</strong> ContactInfo</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The contact information of the client, including phone number and email.</li>
</ul>
</li>
<li>
<p><strong>address</strong></p>
<ul>
<li><strong>Data Type:</strong> Address</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The physical address of the client.</li>
</ul>
</li>
<li>
<p><strong>vatNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The VAT number of the client.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>References:</strong> Company</li>
<li><strong>Description:</strong> The id of the company to which the client belongs.</li>
</ul>
</li>
<li>
<p><strong>idNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The identification number of the client.</li>
</ul>
</li>
<li>
<p><strong>type</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The type of client.</li>
</ul>
</li>
</ul>
<h3 id="contactinfo" tabindex="-1"><a class="header-anchor" href="#contactinfo"><span>ContactInfo</span></a></h3>
<ul>
<li>
<p><strong>phoneNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The phone number of the client.</li>
</ul>
</li>
<li>
<p><strong>email</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The email address of the client, should be unique within the company.</li>
</ul>
</li>
</ul>
<h3 id="address" tabindex="-1"><a class="header-anchor" href="#address"><span>Address</span></a></h3>
<ul>
<li>
<p><strong>street</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The street address of the client.</li>
</ul>
</li>
<li>
<p><strong>suburb</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The suburb of the client.</li>
</ul>
</li>
<li>
<p><strong>province</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The province of the client.</li>
</ul>
</li>
<li>
<p><strong>city</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The city of the client.</li>
</ul>
</li>
<li>
<p><strong>postalCode</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The postal code of the client.</li>
</ul>
</li>
<li>
<p><strong>complexOrBuilding</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The complex or building name, if applicable.</li>
</ul>
</li>
</ul>
<h2 id="company" tabindex="-1"><a class="header-anchor" href="#company"><span>Company</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> Unique identifier for each company.</li>
</ul>
</li>
<li>
<p><strong>registrationNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The company's registration number.</li>
</ul>
</li>
<li>
<p><strong>vatNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The company's VAT number.</li>
</ul>
</li>
<li>
<p><strong>name</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> The name of the company.</li>
</ul>
</li>
<li>
<p><strong>type</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The type of company (e.g., Private, Public).</li>
</ul>
</li>
<li>
<p><strong>jobStatuses</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>References:</strong> JobStatus entity</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> List of job statuses related to the company.</li>
</ul>
</li>
<li>
<p><strong>logo</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default Value:</strong> <code v-pre>https://www.gravatar.com/...</code></li>
<li><strong>Description:</strong> URL to the company’s logo.</li>
</ul>
</li>
<li>
<p><strong>contactDetails</strong></p>
<ul>
<li><strong>Data Type:</strong> ContactDetails</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Company’s contact information (phone number, email).</li>
</ul>
</li>
<li>
<p><strong>address</strong></p>
<ul>
<li><strong>Data Type:</strong> Address</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Company’s address details (street, city, province, etc.).</li>
</ul>
</li>
<li>
<p><strong>accountDetails</strong></p>
<ul>
<li><strong>Data Type:</strong> AccountDetails</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Payment-related information for the company (merchant ID, key, passphrase).</li>
</ul>
</li>
<li>
<p><strong>private</strong></p>
<ul>
<li><strong>Data Type:</strong> Boolean</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default Value:</strong> <code v-pre>false</code></li>
<li><strong>Description:</strong> Indicates if the company is private or not.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default Value:</strong> Current date</li>
<li><strong>Description:</strong> Timestamp when the company was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> Timestamp when the company was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> Timestamp when the company was marked as deleted (if applicable).</li>
</ul>
</li>
</ul>
<h3 id="contactdetails" tabindex="-1"><a class="header-anchor" href="#contactdetails"><span>ContactDetails</span></a></h3>
<ul>
<li>
<p><strong>phoneNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The company's contact phone number.</li>
</ul>
</li>
<li>
<p><strong>email</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Lowercase, Indexed</strong></li>
<li><strong>Description:</strong> The company's contact email.</li>
</ul>
</li>
</ul>
<h3 id="address-1" tabindex="-1"><a class="header-anchor" href="#address-1"><span>Address</span></a></h3>
<ul>
<li>
<p><strong>street</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The street address of the company.</li>
</ul>
</li>
<li>
<p><strong>province</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The province in which the company is located.</li>
</ul>
</li>
<li>
<p><strong>suburb</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The suburb of the company’s location.</li>
</ul>
</li>
<li>
<p><strong>city</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The city where the company is based.</li>
</ul>
</li>
<li>
<p><strong>postalCode</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The postal code of the company.</li>
</ul>
</li>
</ul>
<h3 id="accountdetails" tabindex="-1"><a class="header-anchor" href="#accountdetails"><span>AccountDetails</span></a></h3>
<ul>
<li>
<p><strong>merchantId</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The company's payment merchant ID.</li>
</ul>
</li>
<li>
<p><strong>merchantKey</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The company's payment merchant key.</li>
</ul>
</li>
<li>
<p><strong>passPhrase</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The payment passphrase for the company.</li>
</ul>
</li>
</ul>
<h2 id="employee" tabindex="-1"><a class="header-anchor" href="#employee"><span>Employee</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> Unique identifier for each employee.</li>
</ul>
</li>
<li>
<p><strong>role</strong></p>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> new roleObject()</li>
<li><strong>Description:</strong> Employee's role, including the role ID, permissions, and role name.</li>
</ul>
</li>
<li>
<p><strong>superiorId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> ID of the superior (if applicable) to whom the employee reports.</li>
</ul>
</li>
<li>
<p><strong>subordinates</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> List of subordinate employee IDs under this employee's supervision.</li>
</ul>
</li>
<li>
<p><strong>teams</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> List of team IDs the employee belongs to.</li>
</ul>
</li>
<li>
<p><strong>userId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Reference to the associated user entity.</li>
</ul>
</li>
<li>
<p><strong>userInfo</strong></p>
<ul>
<li><strong>Data Type:</strong> Object</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default:</strong> new UserInfo()</li>
<li><strong>Description:</strong> Optional detailed information about the user, such as username, first name, and display name.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> ID of the company the employee belongs to.</li>
</ul>
</li>
<li>
<p><strong>hourlyRate</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> 0</li>
<li><strong>Description:</strong> The employee's hourly rate of pay.</li>
</ul>
</li>
<li>
<p><strong>currentJobAssignments</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> List of job IDs the employee is currently assigned to.</li>
</ul>
</li>
<li>
<p><strong>currentTaskAssignments</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> List of task IDs the employee is currently assigned to.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> The date and time when the employee record was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date and time when the employee record was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date and time when the employee record was deleted (if applicable).</li>
</ul>
</li>
</ul>
<h2 id="inventory" tabindex="-1"><a class="header-anchor" href="#inventory"><span>Inventory</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> Unique identifier for each inventory item.</li>
</ul>
</li>
<li>
<p><strong>name</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The name of the inventory item.</li>
</ul>
</li>
<li>
<p><strong>description</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> A description of the inventory item.</li>
</ul>
</li>
<li>
<p><strong>costPrice</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The cost price of the inventory item.</li>
</ul>
</li>
<li>
<p><strong>salePrice</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The sale price of the inventory item.</li>
</ul>
</li>
<li>
<p><strong>currentStockLevel</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default:</strong> 0</li>
<li><strong>Description:</strong> The current stock level of the inventory item.</li>
</ul>
</li>
<li>
<p><strong>images</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of Strings</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> An array of image URLs for the inventory item.</li>
</ul>
</li>
<li>
<p><strong>reorderLevel</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The stock level at which the item should be reordered.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> ID of the company the inventory item belongs to.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> The date and time when the inventory item was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date and time when the inventory item was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date and time when the inventory item was deleted (if applicable).</li>
</ul>
</li>
</ul>
<h2 id="inventoryused" tabindex="-1"><a class="header-anchor" href="#inventoryused"><span>InventoryUsed</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> Unique identifier for the inventory usage record.</li>
</ul>
</li>
<li>
<p><strong>amount</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The amount of the inventory item used.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> ID of the company associated with the inventory usage.</li>
</ul>
</li>
<li>
<p><strong>inventoryId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> ID of the inventory item that was used.</li>
</ul>
</li>
<li>
<p><strong>jobId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> ID of the job associated with the inventory usage.</li>
</ul>
</li>
<li>
<p><strong>employeeId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> ID of the employee who used the inventory item.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> The date and time when the inventory usage record was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date and time when the inventory usage record was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date and time when the inventory usage record was deleted (if applicable).</li>
</ul>
</li>
</ul>
<h2 id="items" tabindex="-1"><a class="header-anchor" href="#items"><span>Items</span></a></h2>
<ul>
<li>
<p><strong>description</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Description of the invoice item.</li>
</ul>
</li>
<li>
<p><strong>quantity</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Quantity of the invoice item.</li>
</ul>
</li>
<li>
<p><strong>unitPrice</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Price per unit of the invoice item.</li>
</ul>
</li>
<li>
<p><strong>discount</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> Discount applied to the invoice item.</li>
</ul>
</li>
<li>
<p><strong>total</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Total amount for the invoice item (after discount).</li>
</ul>
</li>
</ul>
<h2 id="invoice" tabindex="-1"><a class="header-anchor" href="#invoice"><span>Invoice</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> Unique identifier for the invoice.</li>
</ul>
</li>
<li>
<p><strong>invoiceNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> Unique number assigned to the invoice.</li>
</ul>
</li>
<li>
<p><strong>invoiceDate</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> Date when the invoice was issued.</li>
</ul>
</li>
<li>
<p><strong>paymentDate</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> Date when the payment was made.</li>
</ul>
</li>
<li>
<p><strong>subTotal</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Total amount before tax and discounts.</li>
</ul>
</li>
<li>
<p><strong>total</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Total amount after tax and discounts.</li>
</ul>
</li>
<li>
<p><strong>taxAmount</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Amount of tax applied to the invoice.</li>
</ul>
</li>
<li>
<p><strong>taxPercentage</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Percentage of tax applied to the invoice.</li>
</ul>
</li>
<li>
<p><strong>paid</strong></p>
<ul>
<li><strong>Data Type:</strong> Boolean</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> false</li>
<li><strong>Description:</strong> Indicates whether the invoice has been paid.</li>
</ul>
</li>
<li>
<p><strong>receiptOfPaymentDate</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> Date when the receipt of payment was issued.</li>
</ul>
</li>
<li>
<p><strong>clientId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> ID of the client associated with the invoice.</li>
</ul>
</li>
<li>
<p><strong>jobId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> ID of the job associated with the invoice.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> ID of the company associated with the invoice.</li>
</ul>
</li>
<li>
<p><strong>inventoryItems</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of Items</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Array of items related to inventory.</li>
</ul>
</li>
<li>
<p><strong>laborItems</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of Items</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Array of items related to labor.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> Date when the invoice record was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> Date when the invoice record was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> Date when the invoice record was deleted (if applicable).</li>
</ul>
</li>
</ul>
<h2 id="jobstatus" tabindex="-1"><a class="header-anchor" href="#jobstatus"><span>JobStatus</span></a></h2>
<ul>
<li>
<p><strong>status</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Represents the current status of the job.</li>
</ul>
</li>
<li>
<p><strong>colour</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default Value:</strong> <code v-pre>#1a89c4</code></li>
<li><strong>Description:</strong> Represents the color associated with the job status, stored as a hex value. It defaults to a specific blue color if not provided.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the company associated with the job status, creating a relationship to the <code v-pre>Company</code> schema.</li>
</ul>
</li>
</ul>
<h2 id="jobtag-class" tabindex="-1"><a class="header-anchor" href="#jobtag-class"><span>JobTag Class</span></a></h2>
<ul>
<li>
<p><strong>label</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>String</code></li>
<li><strong>Required:</strong> <code v-pre>Yes</code></li>
<li><strong>Description:</strong> The label or name of the job tag.</li>
</ul>
</li>
<li>
<p><strong>colour</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>String</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Default Value:</strong> <code v-pre>#1a89c4</code></li>
<li><strong>Description:</strong> The color associated with the job tag, represented as a hex value. Defaults to a specific blue color if not provided.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ObjectId</code></li>
<li><strong>Required:</strong> <code v-pre>Yes</code></li>
<li><strong>Description:</strong> The ID of the company associated with the job tag, establishing a reference to the <code v-pre>Company</code> schema.</li>
</ul>
</li>
</ul>
<h2 id="job-class" tabindex="-1"><a class="header-anchor" href="#job-class"><span>Job Class</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ObjectId</code></li>
<li><strong>Required:</strong> <code v-pre>Yes</code></li>
<li><strong>Description:</strong> Unique identifier for the job, automatically generated.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ObjectId</code></li>
<li><strong>Required:</strong> <code v-pre>Yes</code></li>
<li><strong>Description:</strong> The ID of the company associated with the job, establishing a reference to the <code v-pre>Company</code> schema.</li>
</ul>
</li>
<li>
<p><strong>clientId</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ObjectId</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Default Value:</strong> <code v-pre>null</code></li>
<li><strong>Description:</strong> The ID of the client associated with the job, establishing a reference to the <code v-pre>Client</code> schema.</li>
</ul>
</li>
<li>
<p><strong>assignedBy</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ObjectId</code></li>
<li><strong>Required:</strong> <code v-pre>Yes</code></li>
<li><strong>Description:</strong> The ID of the employee who assigned the job, establishing a reference to the <code v-pre>Employee</code> schema.</li>
</ul>
</li>
<li>
<p><strong>assignedEmployees</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>AssignedEmployees</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Default Value:</strong> A new instance of <code v-pre>AssignedEmployees</code>.</li>
<li><strong>Description:</strong> Contains the IDs of employees and teams assigned to the job.</li>
</ul>
</li>
<li>
<p><strong>status</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ObjectId</code></li>
<li><strong>Required:</strong> <code v-pre>Yes</code></li>
<li><strong>Description:</strong> The ID of the job status, establishing a reference to the <code v-pre>JobStatus</code> schema.</li>
</ul>
</li>
<li>
<p><strong>tags</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>[ObjectId]</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Default Value:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> An array of IDs for job tags, establishing references to the <code v-pre>JobTag</code> schema.</li>
</ul>
</li>
<li>
<p><strong>priorityTag</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ObjectId</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Default Value:</strong> <code v-pre>null</code></li>
<li><strong>Description:</strong> The ID of the priority tag associated with the job, establishing a reference to the <code v-pre>JobPriorityTag</code> schema.</li>
</ul>
</li>
<li>
<p><strong>attachments</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>[String]</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Default Value:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> An array of attachment URLs related to the job.</li>
</ul>
</li>
<li>
<p><strong>coverImage</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>String</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Default Value:</strong> <code v-pre>''</code></li>
<li><strong>Description:</strong> URL of the cover image associated with the job.</li>
</ul>
</li>
<li>
<p><strong>details</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>Details</code></li>
<li><strong>Required:</strong> <code v-pre>Yes</code></li>
<li><strong>Description:</strong> Detailed information about the job, including heading, description, address, start date, and end date.</li>
</ul>
</li>
<li>
<p><strong>recordedDetails</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>RecordedDetails</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Description:</strong> Additional details recorded for the job, such as images taken and inventory used.</li>
</ul>
</li>
<li>
<p><strong>clientFeedback</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ClientFeedback</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Description:</strong> Feedback received from the client regarding the job.</li>
</ul>
</li>
<li>
<p><strong>taskList</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>[Task]</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Default Value:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> An array of tasks associated with the job.</li>
</ul>
</li>
<li>
<p><strong>history</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>[History]</code></li>
<li><strong>Required:</strong> <code v-pre>Yes</code></li>
<li><strong>Default Value:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> An array of history entries related to the job.</li>
</ul>
</li>
<li>
<p><strong>comments</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>[Comment]</code></li>
<li><strong>Required:</strong> <code v-pre>Yes</code></li>
<li><strong>Default Value:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> An array of comments associated with the job.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>Date</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Default Value:</strong> Current date</li>
<li><strong>Description:</strong> The date when the job was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>Date</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Description:</strong> The date when the job was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>Date</code></li>
<li><strong>Required:</strong> <code v-pre>No</code></li>
<li><strong>Description:</strong> The date when the job was marked as deleted.</li>
</ul>
</li>
</ul>
<h2 id="notification" tabindex="-1"><a class="header-anchor" href="#notification"><span>Notification</span></a></h2>
<ul>
<li><strong><code v-pre>_id</code></strong>: Unique identifier for the notification.</li>
<li><strong><code v-pre>senderId</code></strong>: ID of the sender (user) of the notification.</li>
<li><strong><code v-pre>recipientId</code></strong>: ID of the recipient (user) of the notification.</li>
<li><strong><code v-pre>message</code></strong>: Contains the message details.
<ul>
<li><strong><code v-pre>token</code></strong>: (optional) Token related to the notification.</li>
<li><strong><code v-pre>title</code></strong>: Title of the notification.</li>
<li><strong><code v-pre>body</code></strong>: Body content of the notification.</li>
<li><strong><code v-pre>data</code></strong>: (optional) Additional data related to the notification.</li>
</ul>
</li>
<li><strong><code v-pre>isRead</code></strong>: Boolean indicating if the notification has been read (default: <code v-pre>false</code>).</li>
<li><strong><code v-pre>isJobRelated</code></strong>: Boolean indicating if the notification is related to a job (default: <code v-pre>false</code>).</li>
<li><strong><code v-pre>companyName</code></strong>: Name of the company associated with the notification (default: <code v-pre>null</code>).</li>
<li><strong><code v-pre>status</code></strong>: Current status of the notification (default: <code v-pre>ACTIVE</code>).</li>
<li><strong><code v-pre>createdAt</code></strong>: Date and time when the notification was created (default: current date).</li>
</ul>
<h2 id="role" tabindex="-1"><a class="header-anchor" href="#role"><span>Role</span></a></h2>
<ul>
<li><strong><code v-pre>_id</code></strong>: Unique identifier for the role.</li>
<li><strong><code v-pre>roleName</code></strong>: Name of the role (required).</li>
<li><strong><code v-pre>permissionSuite</code></strong>: Array of permissions associated with the role (default: <code v-pre>['view all jobs assigned to me', 'view all clients that are assigned to me', 'record inventory use']</code>).</li>
<li><strong><code v-pre>companyId</code></strong>: ID of the company associated with the role (required).</li>
<li><strong><code v-pre>hourlyRate</code></strong>: (optional) Hourly rate for the role.</li>
<li><strong><code v-pre>createdAt</code></strong>: Date and time when the role was created (default: current date).</li>
<li><strong><code v-pre>updatedAt</code></strong>: (optional) Date and time when the role was last updated.</li>
<li><strong><code v-pre>deletedAt</code></strong>: (optional) Date and time when the role was deleted.</li>
</ul>
<h2 id="stockmovements" tabindex="-1"><a class="header-anchor" href="#stockmovements"><span>StockMovements</span></a></h2>
<ul>
<li><strong><code v-pre>_id</code></strong>: Unique identifier for the stock movement.</li>
<li><strong><code v-pre>reason</code></strong>: Reason for the stock movement (required).</li>
<li><strong><code v-pre>movement</code></strong>: Quantity of the stock movement (required).</li>
<li><strong><code v-pre>employee</code></strong>: Details of the employee associated with the stock movement (required).
<ul>
<li><strong><code v-pre>employeeId</code></strong>: ID of the employee (required).</li>
<li><strong><code v-pre>username</code></strong>: (optional) Username of the employee.</li>
<li><strong><code v-pre>firstName</code></strong>: (optional) First name of the employee.</li>
<li><strong><code v-pre>surname</code></strong>: (optional) Surname of the employee.</li>
<li><strong><code v-pre>displayName</code></strong>: (optional) Display name of the employee.</li>
</ul>
</li>
<li><strong><code v-pre>inventoryItem</code></strong>: Details of the inventory item being moved (required).
<ul>
<li><strong><code v-pre>inventoryId</code></strong>: ID of the inventory (required).</li>
<li><strong><code v-pre>nameOfItem</code></strong>: (optional) Name of the item.</li>
</ul>
</li>
<li><strong><code v-pre>movementDate</code></strong>: Date of the movement (default: current date).</li>
<li><strong><code v-pre>companyId</code></strong>: ID of the company associated with the stock movement (required).</li>
<li><strong><code v-pre>createdAt</code></strong>: Date and time when the stock movement was created (default: current date).</li>
<li><strong><code v-pre>updatedAt</code></strong>: (optional) Date and time when the stock movement was last updated.</li>
<li><strong><code v-pre>deletedAt</code></strong>: (optional) Date and time when the stock movement was deleted.</li>
</ul>
<h2 id="stocktake" tabindex="-1"><a class="header-anchor" href="#stocktake"><span>StockTake</span></a></h2>
<ul>
<li><strong><code v-pre>date</code></strong>: Date of the stock take (default: current date, required).</li>
<li><strong><code v-pre>items</code></strong>: List of items included in the stock take (required).
<ul>
<li><strong><code v-pre>currentStockLevel</code></strong>: Current stock level of the item (required).</li>
<li><strong><code v-pre>recordedStockLevel</code></strong>: Recorded stock level of the item (required).</li>
<li><strong><code v-pre>inventoryItem</code></strong>: Reference to the inventory item (required).
<ul>
<li><strong><code v-pre>inventoryId</code></strong>: ID of the inventory item (required).</li>
<li><strong><code v-pre>name</code></strong>: Name of the inventory item (required).</li>
</ul>
</li>
</ul>
</li>
<li><strong><code v-pre>companyId</code></strong>: ID of the company associated with the stock take (required).</li>
<li><strong><code v-pre>createdAt</code></strong>: Date and time when the stock take was created (default: current date).</li>
<li><strong><code v-pre>updatedAt</code></strong>: (optional) Date and time when the stock take was last updated.</li>
<li><strong><code v-pre>deletedAt</code></strong>: (optional) Date and time when the stock take was deleted.</li>
</ul>
<h2 id="team" tabindex="-1"><a class="header-anchor" href="#team"><span>Team</span></a></h2>
<ul>
<li><strong><code v-pre>companyId</code></strong>: The ID of the company associated with the team (required).</li>
<li><strong><code v-pre>teamName</code></strong>: The name of the team (required).</li>
<li><strong><code v-pre>teamMembers</code></strong>: An array of employee IDs who are members of the team (required, default: empty array).</li>
<li><strong><code v-pre>teamLeaderId</code></strong>: The ID of the team leader (optional).</li>
<li><strong><code v-pre>currentJobAssignments</code></strong>: An array of job assignment IDs currently assigned to the team (default: empty array).</li>
<li><strong><code v-pre>createdAt</code></strong>: Date and time when the team was created (default: current date).</li>
<li><strong><code v-pre>updatedAt</code></strong>: (optional) Date and time when the team was last updated.</li>
<li><strong><code v-pre>deletedAt</code></strong>: (optional) Date and time when the team was deleted.</li>
</ul>
<h2 id="timeinterval" tabindex="-1"><a class="header-anchor" href="#timeinterval"><span>TimeInterval</span></a></h2>
<ul>
<li><strong><code v-pre>start</code></strong>: The start time of a time interval (required, defaults to <code v-pre>null</code>).</li>
<li><strong><code v-pre>end</code></strong>: The end time of a time interval (optional).</li>
</ul>
<h2 id="timetracker" tabindex="-1"><a class="header-anchor" href="#timetracker"><span>TimeTracker</span></a></h2>
<ul>
<li><strong><code v-pre>employeeId</code></strong>: The ID of the employee associated with the time tracking (required, references <code v-pre>Employee</code>).</li>
<li><strong><code v-pre>jobId</code></strong>: The ID of the job being worked on (required, references <code v-pre>Job</code>).</li>
<li><strong><code v-pre>companyId</code></strong>: The ID of the company the employee is working for (required, references <code v-pre>Company</code>).</li>
<li><strong><code v-pre>checkInTime</code></strong>: The time when the employee checked in (required, defaults to the current date).</li>
<li><strong><code v-pre>checkOutTime</code></strong>: The time when the employee checked out (optional, defaults to <code v-pre>null</code>).</li>
<li><strong><code v-pre>pauses</code></strong>: An array of <code v-pre>TimeInterval</code> objects representing breaks or pauses during the job (optional, defaults to an empty array).</li>
<li><strong><code v-pre>createdAt</code></strong>: The time when the record was created (required, defaults to the current date).</li>
</ul>
<h2 id="systemdetails" tabindex="-1"><a class="header-anchor" href="#systemdetails"><span>SystemDetails</span></a></h2>
<ul>
<li><strong><code v-pre>username</code></strong>: The unique username of the user (required).</li>
<li><strong><code v-pre>password</code></strong>: The password for the user (required).</li>
</ul>
<h2 id="contactinfo-1" tabindex="-1"><a class="header-anchor" href="#contactinfo-1"><span>ContactInfo</span></a></h2>
<ul>
<li><strong><code v-pre>phoneNumber</code></strong>: The unique phone number of the user (required).</li>
<li><strong><code v-pre>email</code></strong>: The unique email address of the user, stored in lowercase (required).</li>
</ul>
<h2 id="address-2" tabindex="-1"><a class="header-anchor" href="#address-2"><span>Address</span></a></h2>
<ul>
<li><strong><code v-pre>street</code></strong>: The street address of the user (required).</li>
<li><strong><code v-pre>province</code></strong>: The province of the user (required).</li>
<li><strong><code v-pre>suburb</code></strong>: The suburb where the user resides (required).</li>
<li><strong><code v-pre>city</code></strong>: The city where the user resides (required).</li>
<li><strong><code v-pre>postalCode</code></strong>: The postal code of the user's address (required).</li>
<li><strong><code v-pre>complex</code></strong>: The complex where the user resides (optional).</li>
<li><strong><code v-pre>houseNumber</code></strong>: The house number of the user's residence (optional).</li>
</ul>
<h2 id="personalinfo" tabindex="-1"><a class="header-anchor" href="#personalinfo"><span>PersonalInfo</span></a></h2>
<ul>
<li><strong><code v-pre>firstName</code></strong>: The first name of the user (required).</li>
<li><strong><code v-pre>surname</code></strong>: The surname of the user (required).</li>
<li><strong><code v-pre>dateOfBirth</code></strong>: The date of birth of the user (required).</li>
<li><strong><code v-pre>gender</code></strong>: The gender of the user, defaults to 'Rather Not Say' (optional).</li>
<li><strong><code v-pre>preferredLanguage</code></strong>: The preferred language of the user (required).</li>
<li><strong><code v-pre>contactInfo</code></strong>: Contact information containing phone number and email (optional).</li>
<li><strong><code v-pre>address</code></strong>: The address of the user (optional).</li>
</ul>
<h2 id="profile" tabindex="-1"><a class="header-anchor" href="#profile"><span>Profile</span></a></h2>
<ul>
<li><strong><code v-pre>displayName</code></strong>: The display name of the user (required).</li>
<li><strong><code v-pre>displayImage</code></strong>: The URL for the user's display image, defaults to a Gravatar image (optional).</li>
</ul>
<h2 id="joinedcompany" tabindex="-1"><a class="header-anchor" href="#joinedcompany"><span>JoinedCompany</span></a></h2>
<ul>
<li><strong><code v-pre>employeeId</code></strong>: The ID of the employee (optional, references <code v-pre>Employee</code>).</li>
<li><strong><code v-pre>companyId</code></strong>: The ID of the company the user is associated with (optional, references <code v-pre>Company</code>).</li>
<li><strong><code v-pre>companyName</code></strong>: The name of the company (optional).</li>
</ul>
<h2 id="user" tabindex="-1"><a class="header-anchor" href="#user"><span>User</span></a></h2>
<ul>
<li><strong><code v-pre>systemDetails</code></strong>: Contains the system details such as username and password (required).</li>
<li><strong><code v-pre>personalInfo</code></strong>: Contains personal information such as first name, surname, contact info, and address (required).</li>
<li><strong><code v-pre>profile</code></strong>: Contains the display name and profile image (required).</li>
<li><strong><code v-pre>joinedCompanies</code></strong>: A list of companies the user has joined (optional, defaults to an empty array).</li>
<li><strong><code v-pre>skills</code></strong>: A list of skills the user possesses (optional, defaults to an empty array).</li>
<li><strong><code v-pre>deviceIds</code></strong>: A list of device IDs associated with the user (optional, defaults to an empty array).</li>
<li><strong><code v-pre>currentEmployee</code></strong>: The current employee ID associated with the user (optional).</li>
<li><strong><code v-pre>isValidated</code></strong>: Indicates if the user's account has been validated (optional, defaults to <code v-pre>false</code>).</li>
<li><strong><code v-pre>createdAt</code></strong>: The date when the user was created (required, defaults to the current date).</li>
<li><strong><code v-pre>updatedAt</code></strong>: The date when the user was last updated (optional).</li>
<li><strong><code v-pre>deletedAt</code></strong>: The date when the user was deleted (optional).</li>
</ul>
<h2 id="videocall" tabindex="-1"><a class="header-anchor" href="#videocall"><span>VideoCall</span></a></h2>
<ul>
<li><strong><code v-pre>title</code></strong>: The title of the video call (required).</li>
<li><strong><code v-pre>date</code></strong>: The date of the video call in string format (required).</li>
<li><strong><code v-pre>startTime</code></strong>: The start time of the video call (required).</li>
<li><strong><code v-pre>endTime</code></strong>: The end time of the video call (required).</li>
<li><strong><code v-pre>participants</code></strong>: A list of participant IDs (references <code v-pre>Employee</code>, required, defaults to an empty array).</li>
<li><strong><code v-pre>companyId</code></strong>: The ID of the company hosting the video call (references <code v-pre>Company</code>, required).</li>
<li><strong><code v-pre>details</code></strong>: Additional details about the video call (required).</li>
<li><strong><code v-pre>roomId</code></strong>: The unique room ID for the video call (hidden).</li>
<li><strong><code v-pre>createdAt</code></strong>: The date and time when the video call was created (hidden, defaults to the current date).</li>
<li><strong><code v-pre>updatedAt</code></strong>: The date and time when the video call was last updated (hidden, optional).</li>
<li><strong><code v-pre>deletedAt</code></strong>: The date and time when the video call was deleted (hidden, optional).</li>
</ul>
</div></template>


