<template><div><h1 id="database-schema" tabindex="-1"><a class="header-anchor" href="#database-schema"><span>Database Schema</span></a></h1>
<h2 id="user" tabindex="-1"><a class="header-anchor" href="#user"><span>User</span></a></h2>
<h3 id="system-details" tabindex="-1"><a class="header-anchor" href="#system-details"><span>System Details</span></a></h3>
<ul>
<li>
<p><strong>username</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> The username of the user.</li>
</ul>
</li>
<li>
<p><strong>password</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> No</li>
<li><strong>Description:</strong> The password for the user, which will be hashed before storage.</li>
</ul>
</li>
</ul>
<h3 id="personal-info" tabindex="-1"><a class="header-anchor" href="#personal-info"><span>Personal Info</span></a></h3>
<ul>
<li>
<p><strong>firstName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The first name of the user.</li>
</ul>
</li>
<li>
<p><strong>surname</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The surname of the user.</li>
</ul>
</li>
<li>
<p><strong>dateOfBirth</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The date of birth of the user.</li>
</ul>
</li>
<li>
<p><strong>gender</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> &quot;Rather Not Say&quot;</li>
<li><strong>Description:</strong> The gender of the user.</li>
</ul>
</li>
<li>
<p><strong>preferredLanguage</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> &quot;English&quot;</li>
<li><strong>Description:</strong> The preferred language of the user.</li>
</ul>
</li>
<li>
<p><strong>contactInfo</strong></p>
<ul>
<li><strong>Data Type:</strong> ContactInfo</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The contact information of the user, including phone number and email.</li>
</ul>
</li>
<li>
<p><strong>address</strong></p>
<ul>
<li><strong>Data Type:</strong> Address</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The address of the user.</li>
</ul>
</li>
</ul>
<h3 id="profile" tabindex="-1"><a class="header-anchor" href="#profile"><span>Profile</span></a></h3>
<ul>
<li>
<p><strong>displayName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The display name of the user.</li>
</ul>
</li>
<li>
<p><strong>displayImage</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default:</strong> &quot;https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp&quot;</li>
<li><strong>Description:</strong> The URL of the display image of the user.</li>
</ul>
</li>
</ul>
<h3 id="joined-companies" tabindex="-1"><a class="header-anchor" href="#joined-companies"><span>Joined Companies</span></a></h3>
<ul>
<li>
<p><strong>employeeId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Reference to Employee)</li>
<li><strong>Description:</strong> The ID of the employee associated with the user.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Reference to Company)</li>
<li><strong>Description:</strong> The ID of the company associated with the user.</li>
</ul>
</li>
<li>
<p><strong>companyName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Description:</strong> The name of the company associated with the user.</li>
</ul>
</li>
</ul>
<h3 id="skills" tabindex="-1"><a class="header-anchor" href="#skills"><span>Skills</span></a></h3>
<ul>
<li><strong>skills</strong>
<ul>
<li><strong>Data Type:</strong> Array of Strings</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> A list of skills associated with the user.</li>
</ul>
</li>
</ul>
<h3 id="device-ids" tabindex="-1"><a class="header-anchor" href="#device-ids"><span>Device IDs</span></a></h3>
<ul>
<li><strong>deviceIds</strong>
<ul>
<li><strong>Data Type:</strong> Array of Strings</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> A list of device IDs associated with the user.</li>
</ul>
</li>
</ul>
<h3 id="current-employee" tabindex="-1"><a class="header-anchor" href="#current-employee"><span>Current Employee</span></a></h3>
<ul>
<li><strong>currentEmployee</strong>
<ul>
<li><strong>Data Type:</strong> ObjectId (Reference to Employee)</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The current employee ID associated with the user.</li>
</ul>
</li>
</ul>
<h3 id="is-validated" tabindex="-1"><a class="header-anchor" href="#is-validated"><span>Is Validated</span></a></h3>
<ul>
<li><strong>isValidated</strong>
<ul>
<li><strong>Data Type:</strong> Boolean</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default:</strong> false</li>
<li><strong>Description:</strong> Indicates whether the user has been validated.</li>
</ul>
</li>
</ul>
<h3 id="timestamps" tabindex="-1"><a class="header-anchor" href="#timestamps"><span>Timestamps</span></a></h3>
<ul>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current Date</li>
<li><strong>Description:</strong> The date the user was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date the user was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date the user was deleted (soft delete).</li>
</ul>
</li>
</ul>
<h3 id="contactinfo" tabindex="-1"><a class="header-anchor" href="#contactinfo"><span>ContactInfo</span></a></h3>
<ul>
<li>
<p><strong>phoneNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> The user's phone number.</li>
</ul>
</li>
<li>
<p><strong>email</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> The user's email address, stored in lowercase.</li>
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
<li><strong>Description:</strong> The street address of the user.</li>
</ul>
</li>
<li>
<p><strong>province</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The province of the user.</li>
</ul>
</li>
<li>
<p><strong>suburb</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The suburb of the user.</li>
</ul>
</li>
<li>
<p><strong>city</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The city of the user.</li>
</ul>
</li>
<li>
<p><strong>postalCode</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The postal code of the user.</li>
</ul>
</li>
<li>
<p><strong>complex</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The complex name of the user, if applicable.</li>
</ul>
</li>
<li>
<p><strong>houseNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The house number of the user, if applicable.</li>
</ul>
</li>
</ul>
<h3 id="profile-1" tabindex="-1"><a class="header-anchor" href="#profile-1"><span>Profile</span></a></h3>
<ul>
<li>
<p><strong>displayName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The display name of the user.</li>
</ul>
</li>
<li>
<p><strong>displayImage</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default:</strong> &quot;https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp&quot;</li>
<li><strong>Description:</strong> The URL of the display image of the user.</li>
</ul>
</li>
</ul>
<h3 id="joinedcompany" tabindex="-1"><a class="header-anchor" href="#joinedcompany"><span>JoinedCompany</span></a></h3>
<ul>
<li>
<p><strong>employeeId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Description:</strong> The employee ID associated with the joined company.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Description:</strong> The company ID associated with the joined company.</li>
</ul>
</li>
<li>
<p><strong>companyName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Description:</strong> The company name associated with the joined company.</li>
</ul>
</li>
</ul>
<h2 id="employee" tabindex="-1"><a class="header-anchor" href="#employee"><span>Employee</span></a></h2>
<ul>
<li>
<p><strong>id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> The unique ID of the employee.</li>
</ul>
</li>
<li>
<p><strong>superiorId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Reference to <code v-pre>Employee</code>)</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The ID of the superior employee.</li>
</ul>
</li>
<li>
<p><strong>subordinates</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds (Reference to <code v-pre>Employee</code>)</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> A list of subordinate employees.</li>
</ul>
</li>
<li>
<p><strong>subordinateTeams</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds (Reference to <code v-pre>Team</code>)</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> A list of subordinate teams.</li>
</ul>
</li>
<li>
<p><strong>userId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Reference to <code v-pre>User</code>)</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the associated user.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Reference to <code v-pre>Company</code>)</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the company.</li>
</ul>
</li>
<li>
<p><strong>currentJobAssignments</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds (Reference to <code v-pre>Job</code>)</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> A list of current job assignments.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> New <code v-pre>Date()</code></li>
<li><strong>Description:</strong> The date the employee was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date the employee was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date the employee was deleted (soft delete).</li>
</ul>
</li>
</ul>
<h3 id="role" tabindex="-1"><a class="header-anchor" href="#role"><span>role</span></a></h3>
<ul>
<li>
<p><strong>roleId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Reference to <code v-pre>Role</code>)</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the role.</li>
</ul>
</li>
<li>
<p><strong>permissionSuite</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of Strings</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> A list of permissions associated with the role.</li>
</ul>
</li>
<li>
<p><strong>roleName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The name of the role.</li>
</ul>
</li>
</ul>
<h3 id="userinfo" tabindex="-1"><a class="header-anchor" href="#userinfo"><span>UserInfo</span></a></h3>
<ul>
<li>
<p><strong>username</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The username of the user.</li>
</ul>
</li>
<li>
<p><strong>firstName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The first name of the user.</li>
</ul>
</li>
<li>
<p><strong>surname</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The surname of the user.</li>
</ul>
</li>
<li>
<p><strong>displayName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The display name of the user.</li>
</ul>
</li>
<li>
<p><strong>displayImage</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The display image URL of the user.</li>
</ul>
</li>
</ul>
<h2 id="team" tabindex="-1"><a class="header-anchor" href="#team"><span>Team</span></a></h2>
<ul>
<li>
<p><strong>id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes</li>
<li><strong>Description:</strong> The unique ID of the team.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the company associated with the team.</li>
</ul>
</li>
<li>
<p><strong>teamName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The name of the team.</li>
</ul>
</li>
<li>
<p><strong>teamMembers</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> A list of team member IDs.</li>
</ul>
</li>
<li>
<p><strong>teamLeaderId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Optional)</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The ID of the team leader, if applicable.</li>
</ul>
</li>
<li>
<p><strong>currentJobAssignments</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> []</li>
<li><strong>Description:</strong> A list of current job assignments associated with the team.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> New <code v-pre>Date()</code></li>
<li><strong>Description:</strong> The date the team was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date the team was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The date the team was deleted (soft delete).</li>
</ul>
</li>
</ul>
<h2 id="company" tabindex="-1"><a class="header-anchor" href="#company"><span>Company</span></a></h2>
<ul>
<li>
<p><strong>id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Description:</strong> The unique ID of the company.</li>
</ul>
</li>
<li>
<p><strong>registrationNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Description:</strong> The registration number of the company.</li>
</ul>
</li>
<li>
<p><strong>vatNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Description:</strong> The VAT number of the company.</li>
</ul>
</li>
<li>
<p><strong>name</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Description:</strong> The name of the company.</li>
</ul>
</li>
<li>
<p><strong>type</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Description:</strong> The type or category of the company.</li>
</ul>
</li>
<li>
<p><strong>logo</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Default:</strong> <code v-pre>'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'</code></li>
<li><strong>Description:</strong> The URL of the company's logo.</li>
</ul>
</li>
<li>
<p><strong>contactDetails</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ContactDetails</code></li>
<li><strong>Description:</strong> The contact details of the company.</li>
</ul>
</li>
<li>
<p><strong>private</strong></p>
<ul>
<li><strong>Data Type:</strong> Boolean</li>
<li><strong>Description:</strong> Indicates whether the company is private.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Description:</strong> The date the company was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Description:</strong> The date the company was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Description:</strong> The date the company was deleted (soft delete).</li>
</ul>
</li>
</ul>
<h2 id="client" tabindex="-1"><a class="header-anchor" href="#client"><span>Client</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Optional)</li>
<li><strong>Description:</strong> The unique ID of the client.</li>
</ul>
</li>
<li>
<p><strong>registrationNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Description:</strong> The registration number of the client.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Description:</strong> The date when the client was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Description:</strong> The date when the client was last updated.</li>
</ul>
</li>
</ul>
<h2 id="clientdetails" tabindex="-1"><a class="header-anchor" href="#clientdetails"><span>ClientDetails</span></a></h2>
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
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Required:</strong> No</li>
<li><strong>Default:</strong> <code v-pre>'English'</code></li>
<li><strong>Description:</strong> The preferred language of the client.</li>
</ul>
</li>
<li>
<p><strong>contactInfo</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ContactInfo</code> (Optional)</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The contact information of the client, including phone number and email.</li>
</ul>
</li>
<li>
<p><strong>vatNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The VAT number of the client (if applicable).</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the company to which the client belongs.</li>
</ul>
</li>
<li>
<p><strong>idNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The ID number of the client (if applicable).</li>
</ul>
</li>
<li>
<p><strong>type</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Required:</strong> No</li>
<li><strong>Description:</strong> The type or category of the client.</li>
</ul>
</li>
</ul>
<h4 id="address-1" tabindex="-1"><a class="header-anchor" href="#address-1"><span>Address</span></a></h4>
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
<li><strong>Description:</strong> The province where the company is located.</li>
</ul>
</li>
<li>
<p><strong>suburb</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The suburb where the company is located.</li>
</ul>
</li>
<li>
<p><strong>city</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The city where the company is located.</li>
</ul>
</li>
<li>
<p><strong>postalCode</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The postal code of the company's location.</li>
</ul>
</li>
</ul>
<h4 id="contactinfo-1" tabindex="-1"><a class="header-anchor" href="#contactinfo-1"><span>ContactInfo</span></a></h4>
<ul>
<li>
<p><strong>phoneNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The phone number of the client.</li>
</ul>
</li>
<li>
<p><strong>email</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Unique:</strong> Yes (within the company)</li>
<li><strong>Lowercase:</strong> Yes</li>
<li><strong>Trim:</strong> Yes</li>
<li><strong>Description:</strong> The email address of the client. Unique within the company, rather than the entire database.</li>
</ul>
</li>
</ul>
<h2 id="job" tabindex="-1"><a class="header-anchor" href="#job"><span>Job</span></a></h2>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Optional)</li>
<li><strong>Description:</strong> The unique ID of the client.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the company to which the job belongs.</li>
</ul>
</li>
<li>
<p><strong>clientId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Optional)</li>
<li><strong>Default:</strong> <code v-pre>null</code></li>
<li><strong>Description:</strong> The ID of the client for whom the job is performed.</li>
</ul>
</li>
<li>
<p><strong>assignedBy</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the employee who assigned the job.</li>
</ul>
</li>
<li>
<p><strong>assignedEmployees</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>AssignedEmployees</code> (Optional)</li>
<li><strong>Default:</strong> New <code v-pre>AssignedEmployees()</code></li>
<li><strong>Description:</strong> The employees and teams assigned to the job.</li>
</ul>
</li>
<li>
<p><strong>status</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Optional)</li>
<li><strong>Default:</strong> <code v-pre>null</code></li>
<li><strong>Description:</strong> The current status of the job.</li>
</ul>
</li>
<li>
<p><strong>tags</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds (Optional)</li>
<li><strong>Default:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> Tags associated with the job.</li>
</ul>
</li>
<li>
<p><strong>priorityTag</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Optional)</li>
<li><strong>Default:</strong> <code v-pre>null</code></li>
<li><strong>Description:</strong> The priority tag associated with the job.</li>
</ul>
</li>
<li>
<p><strong>attachments</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of Strings (Optional)</li>
<li><strong>Default:</strong> <code v-pre>null</code></li>
<li><strong>Description:</strong> File attachments related to the job.</li>
</ul>
</li>
<li>
<p><strong>details</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>Details</code></li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> Detailed information about the job.</li>
</ul>
</li>
<li>
<p><strong>recordedDetails</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>RecordedDetails</code> (Optional)</li>
<li><strong>Default:</strong> New <code v-pre>RecordedDetails()</code></li>
<li><strong>Description:</strong> Recorded details such as images and inventory used during the job.</li>
</ul>
</li>
<li>
<p><strong>clientFeedback</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>ClientFeedback</code> (Optional)</li>
<li><strong>Description:</strong> Feedback from the client regarding the job.</li>
</ul>
</li>
<li>
<p><strong>taskList</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of <code v-pre>Task</code> (Optional)</li>
<li><strong>Default:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> A list of tasks associated with the job.</li>
</ul>
</li>
<li>
<p><strong>history</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of <code v-pre>History</code></li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> The history of events related to the job.</li>
</ul>
</li>
<li>
<p><strong>comments</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of <code v-pre>Comment</code> (Optional)</li>
<li><strong>Default:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> Comments made by employees on the job.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> The date when the job was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Description:</strong> The date when the job was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Description:</strong> The date when the job was deleted (soft delete).</li>
</ul>
</li>
</ul>
<h3 id="clientfeedback" tabindex="-1"><a class="header-anchor" href="#clientfeedback"><span>ClientFeedback</span></a></h3>
<ul>
<li>
<p><strong>jobRating</strong></p>
<ul>
<li><strong>Data Type:</strong> Number (Optional)</li>
<li><strong>Default:</strong> 10</li>
<li><strong>Description:</strong> The rating given by the client for the job itself.</li>
</ul>
</li>
<li>
<p><strong>customerServiceRating</strong></p>
<ul>
<li><strong>Data Type:</strong> Number (Optional)</li>
<li><strong>Default:</strong> 10</li>
<li><strong>Description:</strong> The rating given by the client for customer service.</li>
</ul>
</li>
<li>
<p><strong>comments</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Default:</strong> <code v-pre>''</code></li>
<li><strong>Description:</strong> Additional comments from the client about the job.</li>
</ul>
</li>
</ul>
<h3 id="details" tabindex="-1"><a class="header-anchor" href="#details"><span>Details</span></a></h3>
<ul>
<li>
<p><strong>heading</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The heading or title of the job.</li>
</ul>
</li>
<li>
<p><strong>description</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> A detailed description of the job.</li>
</ul>
</li>
<li>
<p><strong>address</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>Address</code></li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The address where the job will take place.</li>
</ul>
</li>
<li>
<p><strong>startDate</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The start date of the job.</li>
</ul>
</li>
<li>
<p><strong>endDate</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Description:</strong> The end date of the job (if applicable).</li>
</ul>
</li>
</ul>
<h4 id="address-2" tabindex="-1"><a class="header-anchor" href="#address-2"><span>Address</span></a></h4>
<ul>
<li>
<p><strong>street</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Description:</strong> The street address where the job is located.</li>
</ul>
</li>
<li>
<p><strong>province</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Description:</strong> The province where the job is located.</li>
</ul>
</li>
<li>
<p><strong>suburb</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Description:</strong> The suburb where the job is located.</li>
</ul>
</li>
<li>
<p><strong>city</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Description:</strong> The city where the job is located.</li>
</ul>
</li>
<li>
<p><strong>postalCode</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Description:</strong> The postal code of the job's location.</li>
</ul>
</li>
<li>
<p><strong>complex</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Description:</strong> The complex name (if applicable).</li>
</ul>
</li>
<li>
<p><strong>houseNumber</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Description:</strong> The house number (if applicable).</li>
</ul>
</li>
</ul>
<h3 id="recordeddetails" tabindex="-1"><a class="header-anchor" href="#recordeddetails"><span>RecordedDetails</span></a></h3>
<ul>
<li>
<p><strong>imagesTaken</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of Strings (Optional)</li>
<li><strong>Default:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> An array of image URLs taken during the job.</li>
</ul>
</li>
<li>
<p><strong>inventoryUsed</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of <code v-pre>InventoryUsed</code> (Optional)</li>
<li><strong>Default:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> A list of inventory items used during the job.</li>
</ul>
</li>
</ul>
<h4 id="inventoryused" tabindex="-1"><a class="header-anchor" href="#inventoryused"><span>InventoryUsed</span></a></h4>
<ul>
<li>
<p><strong>inventoryItemId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the inventory item used in the job.</li>
</ul>
</li>
<li>
<p><strong>inventoryItemName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The name of the inventory item used.</li>
</ul>
</li>
<li>
<p><strong>quantityUsed</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> 0</li>
<li><strong>Description:</strong> The quantity of the inventory item used.</li>
</ul>
</li>
</ul>
<h3 id="assignedemployees" tabindex="-1"><a class="header-anchor" href="#assignedemployees"><span>AssignedEmployees</span></a></h3>
<ul>
<li>
<p><strong>employeeIds</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds (Optional)</li>
<li><strong>Default:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> A list of IDs of employees assigned to the job.</li>
</ul>
</li>
<li>
<p><strong>teamIds</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds (Optional)</li>
<li><strong>Default:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> A list of IDs of teams assigned to the job.</li>
</ul>
</li>
</ul>
<h3 id="task" tabindex="-1"><a class="header-anchor" href="#task"><span>Task</span></a></h3>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> New <code v-pre>ObjectId()</code></li>
<li><strong>Description:</strong> The unique ID of the task.</li>
</ul>
</li>
<li>
<p><strong>name</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The name of the task.</li>
</ul>
</li>
<li>
<p><strong>status</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> <code v-pre>'To do'</code></li>
<li><strong>Description:</strong> The current status of the task (e.g., To do, In progress, Done).</li>
</ul>
</li>
<li>
<p><strong>assignedEmployees</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of ObjectIds (Optional)</li>
<li><strong>Default:</strong> <code v-pre>[]</code></li>
<li><strong>Description:</strong> A list of employee IDs assigned to this task.</li>
</ul>
</li>
</ul>
<h3 id="history" tabindex="-1"><a class="header-anchor" href="#history"><span>History</span></a></h3>
<ul>
<li>
<p><strong>event</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> A description of the event in the job's history.</li>
</ul>
</li>
<li>
<p><strong>timestamp</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The timestamp when the event occurred.</li>
</ul>
</li>
</ul>
<h3 id="comment" tabindex="-1"><a class="header-anchor" href="#comment"><span>Comment</span></a></h3>
<ul>
<li>
<p><strong>_id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> New <code v-pre>ObjectId()</code></li>
<li><strong>Description:</strong> The unique ID of the comment.</li>
</ul>
</li>
<li>
<p><strong>employeeId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the employee who made the comment.</li>
</ul>
</li>
<li>
<p><strong>comment</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The text of the comment.</li>
</ul>
</li>
<li>
<p><strong>edited</strong></p>
<ul>
<li><strong>Data Type:</strong> Boolean</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> <code v-pre>false</code></li>
<li><strong>Description:</strong> Whether the comment has been edited.</li>
</ul>
</li>
<li>
<p><strong>date</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> The date when the comment was made or last edited.</li>
</ul>
</li>
</ul>
<h2 id="inventory" tabindex="-1"><a class="header-anchor" href="#inventory"><span>Inventory</span></a></h2>
<ul>
<li>
<p><strong>id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The unique ID of the inventory item.</li>
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
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> A brief description of the inventory item.</li>
</ul>
</li>
<li>
<p><strong>costPrice</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The cost price of the inventory item.</li>
</ul>
</li>
<li>
<p><strong>currentStockLevel</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The current stock level of the inventory item.</li>
</ul>
</li>
<li>
<p><strong>reorderLevel</strong></p>
<ul>
<li><strong>Data Type:</strong> Number</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The stock level at which the inventory item needs to be reordered.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the company to which the inventory item belongs.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> The date when the inventory item was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Description:</strong> The date when the inventory item was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Description:</strong> The date when the inventory item was deleted (soft delete).</li>
</ul>
</li>
</ul>
<h2 id="role-1" tabindex="-1"><a class="header-anchor" href="#role-1"><span>Role</span></a></h2>
<ul>
<li>
<p><strong>id</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The unique ID of the role.</li>
</ul>
</li>
<li>
<p><strong>roleName</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The name of the role.</li>
</ul>
</li>
<li>
<p><strong>permissionSuite</strong></p>
<ul>
<li><strong>Data Type:</strong> Array of Strings</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> ['view all jobs assigned to me', 'view all clients that are assigned to me', 'record inventory use']</li>
<li><strong>Description:</strong> The set of permissions associated with the role.</li>
</ul>
</li>
<li>
<p><strong>companyId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the company to which the role belongs.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> The date when the role was created.</li>
</ul>
</li>
<li>
<p><strong>updatedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Description:</strong> The date when the role was last updated.</li>
</ul>
</li>
<li>
<p><strong>deletedAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date (Optional)</li>
<li><strong>Description:</strong> The date when the role was deleted (soft delete).</li>
</ul>
</li>
</ul>
<h2 id="message" tabindex="-1"><a class="header-anchor" href="#message"><span>Message</span></a></h2>
<h3 id="properties" tabindex="-1"><a class="header-anchor" href="#properties"><span>Properties</span></a></h3>
<ul>
<li>
<p><strong>token</strong></p>
<ul>
<li><strong>Data Type:</strong> String (Optional)</li>
<li><strong>Default:</strong> ''</li>
<li><strong>Description:</strong> A token associated with the message.</li>
</ul>
</li>
<li>
<p><strong>title</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The title of the message.</li>
</ul>
</li>
<li>
<p><strong>body</strong></p>
<ul>
<li><strong>Data Type:</strong> String</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The body content of the message.</li>
</ul>
</li>
<li>
<p><strong>data</strong></p>
<ul>
<li><strong>Data Type:</strong> Any (Optional)</li>
<li><strong>Description:</strong> Additional data associated with the message.</li>
</ul>
</li>
</ul>
<h2 id="notification" tabindex="-1"><a class="header-anchor" href="#notification"><span>Notification</span></a></h2>
<ul>
<li>
<p><strong>senderId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId (Optional)</li>
<li><strong>Description:</strong> The ID of the sender. This can reference an <code v-pre>Employee</code> entity but is not required.</li>
</ul>
</li>
<li>
<p><strong>recipientId</strong></p>
<ul>
<li><strong>Data Type:</strong> ObjectId</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The ID of the recipient. This must reference an <code v-pre>Employee</code> entity.</li>
</ul>
</li>
<li>
<p><strong>message</strong></p>
<ul>
<li><strong>Data Type:</strong> <code v-pre>Message</code></li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Description:</strong> The message details, including title, body, token, and additional data.</li>
</ul>
</li>
<li>
<p><strong>isRead</strong></p>
<ul>
<li><strong>Data Type:</strong> Boolean</li>
<li><strong>Required:</strong> Yes</li>
<li><strong>Default:</strong> false</li>
<li><strong>Description:</strong> Indicates whether the notification has been read.</li>
</ul>
</li>
<li>
<p><strong>createdAt</strong></p>
<ul>
<li><strong>Data Type:</strong> Date</li>
<li><strong>Default:</strong> Current date</li>
<li><strong>Description:</strong> The date when the notification was created.</li>
</ul>
</li>
</ul>
</div></template>


