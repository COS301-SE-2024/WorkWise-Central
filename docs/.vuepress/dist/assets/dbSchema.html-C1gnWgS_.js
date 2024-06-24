import{_ as t,c as n,o as e,b as o}from"./app-Di2dHnTD.js";const s={},i=o('<h1 id="database-schema" tabindex="-1"><a class="header-anchor" href="#database-schema"><span>Database Schema</span></a></h1><h3 id="user-employee" tabindex="-1"><a class="header-anchor" href="#user-employee"><span>User/Employee</span></a></h3><p>The User/Employee entity stores information for both general users and employees, using a single collection inheritance pattern.</p><h4 id="id-primary-key" tabindex="-1"><a class="header-anchor" href="#id-primary-key"><span>id (Primary Key)</span></a></h4><ul><li><strong>Data Type:</strong> ObjectId</li><li><strong>Reasoning:</strong> Unique identifier for each user or employee.</li><li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c85&quot;</li></ul><h4 id="system-details" tabindex="-1"><a class="header-anchor" href="#system-details"><span>system_details</span></a></h4><ul><li><strong>Data Type:</strong> Object</li><li><strong>Attributes:</strong><ul><li><strong>email:</strong> string <ul><li><strong>Reasoning:</strong> Email used for login and communication.</li><li><strong>Example:</strong> &quot;user@example.com&quot;</li></ul></li><li><strong>password:</strong> string <ul><li><strong>Reasoning:</strong> Hashed password for account security.</li><li><strong>Example:</strong> &quot;hashed_password_string&quot;</li></ul></li><li><strong>username:</strong> string <ul><li><strong>Reasoning:</strong> Unique identifier for the user&#39;s profile.</li><li><strong>Example:</strong> &quot;user123&quot;</li></ul></li></ul></li></ul><h4 id="personal-info" tabindex="-1"><a class="header-anchor" href="#personal-info"><span>personal_info</span></a></h4><ul><li><strong>Data Type:</strong> Object</li><li><strong>Attributes:</strong><ul><li><strong>first_name:</strong> string <ul><li><strong>Reasoning:</strong> User&#39;s first name for personal identification.</li><li><strong>Example:</strong> &quot;John&quot;</li></ul></li><li><strong>surname:</strong> string <ul><li><strong>Reasoning:</strong> User&#39;s surname for personal identification.</li><li><strong>Example:</strong> &quot;Doe&quot;</li></ul></li><li><strong>date_of_birth:</strong> Date (as a string) <ul><li><strong>Reasoning:</strong> User&#39;s date of birth for age verification and personalization.</li><li><strong>Example:</strong> &quot;1990-01-01&quot;</li></ul></li><li><strong>gender:</strong> string <ul><li><strong>Reasoning:</strong> User&#39;s gender for demographic purposes.</li><li><strong>Example:</strong> &quot;Male&quot;</li></ul></li><li><strong>preferred_language:</strong> string <ul><li><strong>Reasoning:</strong> Language preference for communication.</li><li><strong>Example:</strong> &quot;English&quot;</li></ul></li><li><strong>contact_info:</strong> Object <ul><li><strong>phone:</strong> string <ul><li><strong>Reasoning:</strong> Phone number for contact.</li><li><strong>Example:</strong> &quot;+1234567890&quot;</li></ul></li><li><strong>email:</strong> string <ul><li><strong>Reasoning:</strong> Secondary email for contact.</li><li><strong>Example:</strong> &quot;contact@example.com&quot;</li></ul></li></ul></li><li><strong>address:</strong> Object <ul><li><strong>street:</strong> string <ul><li><strong>Reasoning:</strong> Street address for mailing purposes.</li><li><strong>Example:</strong> &quot;123 Main St&quot;</li></ul></li><li><strong>suburb:</strong> string <ul><li><strong>Reasoning:</strong> Suburb for geographical information.</li><li><strong>Example:</strong> &quot;Central&quot;</li></ul></li><li><strong>city:</strong> string <ul><li><strong>Reasoning:</strong> City for geographical information.</li><li><strong>Example:</strong> &quot;Metropolis&quot;</li></ul></li><li><strong>postal_code:</strong> string <ul><li><strong>Reasoning:</strong> Postal code for mailing purposes.</li><li><strong>Example:</strong> &quot;12345&quot;</li></ul></li><li><strong>complex:</strong> string <ul><li><strong>Reasoning:</strong> Complex name if applicable.</li><li><strong>Example:</strong> &quot;Sunny Apartments&quot;</li></ul></li><li><strong>house_number:</strong> string <ul><li><strong>Reasoning:</strong> House number for precise address.</li><li><strong>Example:</strong> &quot;10B&quot;</li></ul></li></ul></li></ul></li></ul><h4 id="profile" tabindex="-1"><a class="header-anchor" href="#profile"><span>profile</span></a></h4><ul><li><strong>Data Type:</strong> Object</li><li><strong>Attributes:</strong><ul><li><strong>display_image:</strong> string <ul><li><strong>Reasoning:</strong> URL or base64 image string for profile picture.</li><li><strong>Example:</strong> &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;</li></ul></li><li><strong>display_name:</strong> string <ul><li><strong>Reasoning:</strong> Display name for user profile.</li><li><strong>Example:</strong> &quot;JohnDoe&quot;</li></ul></li></ul></li></ul><h4 id="roles" tabindex="-1"><a class="header-anchor" href="#roles"><span>roles</span></a></h4><ul><li><strong>Data Type:</strong> Array of Objects</li><li><strong>Attributes:</strong><ul><li><strong>companyId</strong>: ObjectId <ul><li><strong>Reasoning:</strong> Links to a company id in the company table</li><li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c85&quot;</li></ul></li><li><strong>role:</strong> Array <ul><li><strong>Reasoning:</strong> Defines the user&#39;s role (e.g., admin, employee).</li><li><strong>Example:</strong> [&quot;admin&quot;, &quot;technician&quot;]</li></ul></li><li><strong>permissions:</strong> Array <ul><li><strong>Reasoning:</strong> Permissions associated with the role.</li><li><strong>Example:</strong> [&quot;read&quot;, &quot;write&quot;, &quot;delete&quot;]</li></ul></li></ul></li></ul><h4 id="joined-companies" tabindex="-1"><a class="header-anchor" href="#joined-companies"><span>joined_companies</span></a></h4><ul><li><strong>Data Type:</strong> Array of ObjectId</li><li><strong>Reasoning:</strong> References companies the user/employee is associated with.</li><li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c85&quot;, &quot;60d21b4667d0d8992e610c86&quot;]</li></ul><h4 id="skills" tabindex="-1"><a class="header-anchor" href="#skills"><span>skills</span></a></h4><ul><li><strong>Data Type:</strong> Array</li><li><strong>Attributes:</strong><ul><li><strong>skill_name:</strong> string <ul><li><strong>Reasoning:</strong> List of skills the user possesses.</li><li><strong>Example:</strong> [&quot;JavaScript&quot;, &quot;Python&quot;]</li></ul></li></ul></li></ul><h4 id="availability" tabindex="-1"><a class="header-anchor" href="#availability"><span>availability</span></a></h4><ul><li><strong>Data Type:</strong> Object</li><li><strong>Attributes:</strong><ul><li><strong>status:</strong> string <ul><li><strong>Reasoning:</strong> Current availability status of the user.</li><li><strong>Example:</strong> &quot;Available&quot;</li></ul></li><li><strong>schedule:</strong> Object <ul><li><strong>Reasoning:</strong> Weekly schedule for the user.</li><li><strong>Example:</strong> {&quot;Monday&quot;: &quot;9:00-17:00&quot;, &quot;Tuesday&quot;: &quot;9:00-17:00&quot;}</li></ul></li></ul></li></ul><h4 id="current-job-assignments" tabindex="-1"><a class="header-anchor" href="#current-job-assignments"><span>current_job_assignments</span></a></h4><ul><li><strong>Data Type:</strong> Array of ObjectId</li><li><strong>Reasoning:</strong> References jobs the user/employee is currently assigned to.</li><li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c87&quot;, &quot;60d21b4667d0d8992e610c88&quot;]</li></ul><h4 id="created-at" tabindex="-1"><a class="header-anchor" href="#created-at"><span>created_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was created.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h4 id="updated-at" tabindex="-1"><a class="header-anchor" href="#updated-at"><span>updated_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h4 id="deleted-at" tabindex="-1"><a class="header-anchor" href="#deleted-at"><span>deleted_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h3 id="company" tabindex="-1"><a class="header-anchor" href="#company"><span>Company</span></a></h3><p>The Company entity stores information about companies associated with users and jobs.</p><h4 id="id-primary-key-1" tabindex="-1"><a class="header-anchor" href="#id-primary-key-1"><span>id (Primary Key)</span></a></h4><ul><li><strong>Data Type:</strong> ObjectId</li><li><strong>Reasoning:</strong> Unique identifier for each company.</li><li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c89&quot;</li></ul><h4 id="registration-number" tabindex="-1"><a class="header-anchor" href="#registration-number"><span>registration_number</span></a></h4><ul><li><strong>Data Type:</strong> string</li><li><strong>Reasoning:</strong> Unique registration number for the company.</li><li><strong>Example:</strong> &quot;REG123456&quot;</li></ul><h4 id="name" tabindex="-1"><a class="header-anchor" href="#name"><span>name</span></a></h4><ul><li><strong>Data Type:</strong> string</li><li><strong>Reasoning:</strong> Name of the company.</li><li><strong>Example:</strong> &quot;Tech Solutions Inc.&quot;</li></ul><h4 id="type" tabindex="-1"><a class="header-anchor" href="#type"><span>type</span></a></h4><ul><li><strong>Data Type:</strong> string</li><li><strong>Reasoning:</strong> Type or industry of the company.</li><li><strong>Example:</strong> &quot;IT Services&quot;</li></ul><h4 id="vat-number" tabindex="-1"><a class="header-anchor" href="#vat-number"><span>vat_number</span></a></h4><ul><li><strong>Data Type:</strong> string</li><li><strong>Reasoning:</strong> VAT number for tax purposes.</li><li><strong>Example:</strong> &quot;VAT789012&quot;</li></ul><h4 id="logo" tabindex="-1"><a class="header-anchor" href="#logo"><span>logo</span></a></h4><ul><li><strong>Data Type:</strong> string</li><li><strong>Reasoning:</strong> URL or base64 image string for the company logo.</li><li><strong>Example:</strong> &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;</li></ul><h4 id="contact-details" tabindex="-1"><a class="header-anchor" href="#contact-details"><span>contact_details</span></a></h4><ul><li><strong>Data Type:</strong> Object</li><li><strong>Attributes:</strong><ul><li><strong>phone:</strong> string <ul><li><strong>Reasoning:</strong> Phone number for contact.</li><li><strong>Example:</strong> &quot;+1234567890&quot;</li></ul></li><li><strong>email:</strong> string <ul><li><strong>Reasoning:</strong> Email for contact.</li><li><strong>Example:</strong> &quot;contact@techsolutions.com&quot;</li></ul></li></ul></li></ul><h4 id="address" tabindex="-1"><a class="header-anchor" href="#address"><span>address</span></a></h4><ul><li><strong>Data Type:</strong> Object</li><li><strong>Attributes:</strong><ul><li><strong>street:</strong> string <ul><li><strong>Reasoning:</strong> Street address for mailing purposes.</li><li><strong>Example:</strong> &quot;456 Business St&quot;</li></ul></li><li><strong>suburb:</strong> string <ul><li><strong>Reasoning:</strong> Suburb for geographical information.</li><li><strong>Example:</strong> &quot;Central&quot;</li></ul></li><li><strong>city:</strong> string <ul><li><strong>Reasoning:</strong> City for geographical information.</li><li><strong>Example:</strong> &quot;Metropolis&quot;</li></ul></li><li><strong>postal_code:</strong> string <ul><li><strong>Reasoning:</strong> Postal code for mailing purposes.</li><li><strong>Example:</strong> &quot;67890&quot;</li></ul></li></ul></li></ul><h4 id="employees" tabindex="-1"><a class="header-anchor" href="#employees"><span>employees</span></a></h4><ul><li><strong>Data Type:</strong> Array of ObjectId</li><li><strong>Reasoning:</strong> References employees (Users) associated with the company.</li><li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c85&quot;, &quot;60d21b4667d0d8992e610c86&quot;]</li></ul><h4 id="inventory-items" tabindex="-1"><a class="header-anchor" href="#inventory-items"><span>inventory_items</span></a></h4><ul><li><strong>Data Type:</strong> Array of ObjectId</li><li><strong>Reasoning:</strong> References inventory items owned by the company.</li><li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c8a&quot;, &quot;60d21b4667d0d8992e610c8b&quot;]</li></ul><h3 id="client" tabindex="-1"><a class="header-anchor" href="#client"><span>Client</span></a></h3><p>The Client entity stores information about clients who have jobs or appointments.</p><h4 id="id-primary-key-2" tabindex="-1"><a class="header-anchor" href="#id-primary-key-2"><span>id (Primary Key)</span></a></h4><ul><li><strong>Data Type:</strong> ObjectId</li><li><strong>Reasoning:</strong> Unique identifier for each client.</li><li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8c&quot;</li></ul><h4 id="details" tabindex="-1"><a class="header-anchor" href="#details"><span>details</span></a></h4><ul><li><strong>Data Type:</strong> Object</li><li><strong>Attributes:</strong><ul><li><strong>first_name:</strong> string <ul><li><strong>Reasoning:</strong> Client&#39;s first name for personal identification.</li><li><strong>Example:</strong> &quot;Jane&quot;</li></ul></li><li><strong>surname:</strong> string <ul><li><strong>Reasoning:</strong> Client&#39;s surname for personal identification.</li><li><strong>Example:</strong> &quot;Smith&quot;</li></ul></li><li><strong>client_info:</strong> Object <ul><li><strong>phone:</strong> string <ul><li><strong>Reasoning:</strong> Phone number for contact.</li><li><strong>Example:</strong> &quot;+1234567890&quot;</li></ul></li><li><strong>email:</strong> string <ul><li><strong>Reasoning:</strong> Email for contact.</li><li><strong>Example:</strong> &quot;jane.smith@example.com&quot;</li></ul></li><li><strong>address:</strong> Object <ul><li><strong>street:</strong> string <ul><li><strong>Reasoning:</strong> Street address for mailing purposes.</li><li><strong>Example:</strong> &quot;789 Client Rd&quot;</li></ul></li><li><strong>suburb:</strong> string <ul><li><strong>Reasoning:</strong> Suburb for geographical information.</li><li><strong>Example:</strong> &quot;Eastside&quot;</li></ul></li><li><strong>city:</strong> string <ul><li><strong>Reasoning:</strong> City for geographical information.</li><li><strong>Example:</strong> &quot;Metropolis&quot;</li></ul></li><li><strong>postal_code:</strong> string <ul><li><strong>Reasoning:</strong> Postal code for mailing purposes.</li><li><strong>Example:</strong> &quot;12345&quot;</li></ul></li><li><strong>complex:</strong> string <ul><li><strong>Reasoning:</strong> Complex name if applicable.</li><li><strong>Example:</strong> &quot;Client Apartments&quot;</li></ul></li><li><strong>house_number:</strong> string <ul><li><strong>Reasoning:</strong> House number for precise address.</li><li><strong>Example:</strong> &quot;3A&quot;</li></ul></li></ul></li></ul></li></ul></li></ul><h4 id="created-at-1" tabindex="-1"><a class="header-anchor" href="#created-at-1"><span>created_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was created.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h4 id="updated-at-1" tabindex="-1"><a class="header-anchor" href="#updated-at-1"><span>updated_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h4 id="deleted-at-1" tabindex="-1"><a class="header-anchor" href="#deleted-at-1"><span>deleted_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h3 id="job" tabindex="-1"><a class="header-anchor" href="#job"><span>Job</span></a></h3><p>The Job entity stores information about jobs assigned to employees and clients.</p><h4 id="id-primary-key-3" tabindex="-1"><a class="header-anchor" href="#id-primary-key-3"><span>id (Primary Key)</span></a></h4><ul><li><strong>Data Type:</strong> ObjectId</li><li><strong>Reasoning:</strong> Unique identifier for each job.</li><li><strong>Example:</strong> &quot;60d21b4667d0d</li></ul><p>8992e610c8d&quot;</p><h4 id="client-id-foreign-key" tabindex="-1"><a class="header-anchor" href="#client-id-foreign-key"><span>client_id (Foreign Key)</span></a></h4><ul><li><strong>Data Type:</strong> ObjectId</li><li><strong>Relationship:</strong> References Client</li><li><strong>Reasoning:</strong> Associates the job with a specific client.</li><li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8c&quot;</li></ul><h4 id="assigned-employees" tabindex="-1"><a class="header-anchor" href="#assigned-employees"><span>assigned_employees</span></a></h4><ul><li><strong>Data Type:</strong> Array of ObjectId</li><li><strong>Relationship:</strong> References User</li><li><strong>Reasoning:</strong> Employees assigned to the job.</li><li><strong>Example:</strong> [&quot;60d21b4667d0d8992e610c85&quot;, &quot;60d21b4667d0d8992e610c86&quot;]</li></ul><h4 id="scheduled-date-time" tabindex="-1"><a class="header-anchor" href="#scheduled-date-time"><span>scheduled_date_time</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Scheduled date and time for the job.</li><li><strong>Example:</strong> &quot;2024-06-01T09:00:00Z&quot;</li></ul><h4 id="status" tabindex="-1"><a class="header-anchor" href="#status"><span>status</span></a></h4><ul><li><strong>Data Type:</strong> string</li><li><strong>Reasoning:</strong> Current status of the job (e.g., pending, in progress, completed).</li><li><strong>Example:</strong> &quot;pending&quot;</li></ul><h4 id="inventory-used" tabindex="-1"><a class="header-anchor" href="#inventory-used"><span>inventory_used</span></a></h4><ul><li><strong>Data Type:</strong> Array of Object</li><li><strong>Reasoning:</strong> Inventory items used for the job.</li><li><strong>Format:</strong> { &quot;InventoryItem&quot;: ObjectId (relationship with InventoryItem), &quot;QuantityUsed&quot;: integer }</li><li><strong>Example:</strong> [{ &quot;InventoryItem&quot;: &quot;60d21b4667d0d8992e610c8a&quot;, &quot;QuantityUsed&quot;: 2 }]</li></ul><h4 id="job-details" tabindex="-1"><a class="header-anchor" href="#job-details"><span>job_details</span></a></h4><ul><li><strong>Data Type:</strong> Object</li><li><strong>Attributes:</strong><ul><li><strong>job_description:</strong> string <ul><li><strong>Reasoning:</strong> Description of the job.</li><li><strong>Example:</strong> &quot;Fixing plumbing issues.&quot;</li></ul></li><li><strong>job_notes:</strong> string <ul><li><strong>Reasoning:</strong> Additional notes about the job.</li><li><strong>Example:</strong> &quot;Bring extra tools.&quot;</li></ul></li><li><strong>job_address:</strong> Object <ul><li><strong>street:</strong> string <ul><li><strong>Reasoning:</strong> Street address for the job location.</li><li><strong>Example:</strong> &quot;123 Job St&quot;</li></ul></li><li><strong>suburb:</strong> string <ul><li><strong>Reasoning:</strong> Suburb for the job location.</li><li><strong>Example:</strong> &quot;Westside&quot;</li></ul></li><li><strong>city:</strong> string <ul><li><strong>Reasoning:</strong> City for the job location.</li><li><strong>Example:</strong> &quot;Metropolis&quot;</li></ul></li><li><strong>postal_code:</strong> string <ul><li><strong>Reasoning:</strong> Postal code for the job location.</li><li><strong>Example:</strong> &quot;67890&quot;</li></ul></li><li><strong>complex:</strong> string <ul><li><strong>Reasoning:</strong> Complex name if applicable.</li><li><strong>Example:</strong> &quot;Workplace Plaza&quot;</li></ul></li><li><strong>house_number:</strong> string <ul><li><strong>Reasoning:</strong> House number for the job location.</li><li><strong>Example:</strong> &quot;5C&quot;</li></ul></li></ul></li><li><strong>images_taken:</strong> Array of strings (base64 images) <ul><li><strong>Reasoning:</strong> Images related to the job.</li><li><strong>Example:</strong> [&quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;, &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;]</li></ul></li></ul></li></ul><h4 id="client-feedback" tabindex="-1"><a class="header-anchor" href="#client-feedback"><span>client_feedback</span></a></h4><ul><li><strong>Data Type:</strong> Object</li><li><strong>Attributes:</strong><ul><li><strong>job_rating:</strong> number <ul><li><strong>Reasoning:</strong> Overall job rating by the client.</li><li><strong>Example:</strong> 4.5</li></ul></li><li><strong>customer_service_rating:</strong> number <ul><li><strong>Reasoning:</strong> Rating of the customer service by the client.</li><li><strong>Example:</strong> 5</li></ul></li><li><strong>comments:</strong> string <ul><li><strong>Reasoning:</strong> Additional feedback comments from the client.</li><li><strong>Example:</strong> &quot;Great service!&quot;</li></ul></li></ul></li></ul><h3 id="appointment" tabindex="-1"><a class="header-anchor" href="#appointment"><span>Appointment</span></a></h3><p>The Appointment entity stores information about appointments between clients and jobs.</p><h4 id="id-primary-key-4" tabindex="-1"><a class="header-anchor" href="#id-primary-key-4"><span>id (Primary Key)</span></a></h4><ul><li><strong>Data Type:</strong> ObjectId</li><li><strong>Reasoning:</strong> Unique identifier for each appointment.</li><li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8e&quot;</li></ul><h4 id="client-id-foreign-key-1" tabindex="-1"><a class="header-anchor" href="#client-id-foreign-key-1"><span>client_id (Foreign Key)</span></a></h4><ul><li><strong>Data Type:</strong> ObjectId</li><li><strong>Relationship:</strong> References Client</li><li><strong>Reasoning:</strong> Associates the appointment with a specific client.</li><li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8c&quot;</li></ul><h4 id="job-id-foreign-key" tabindex="-1"><a class="header-anchor" href="#job-id-foreign-key"><span>job_id (Foreign Key)</span></a></h4><ul><li><strong>Data Type:</strong> ObjectId</li><li><strong>Relationship:</strong> References Job</li><li><strong>Reasoning:</strong> Associates the appointment with a specific job.</li><li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8d&quot;</li></ul><h4 id="scheduled-date-time-1" tabindex="-1"><a class="header-anchor" href="#scheduled-date-time-1"><span>scheduled_date_time</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Scheduled date and time for the appointment.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h4 id="duration" tabindex="-1"><a class="header-anchor" href="#duration"><span>duration</span></a></h4><ul><li><strong>Data Type:</strong> integer</li><li><strong>Reasoning:</strong> Duration of the appointment in minutes.</li><li><strong>Example:</strong> 60</li></ul><h4 id="status-1" tabindex="-1"><a class="header-anchor" href="#status-1"><span>status</span></a></h4><ul><li><strong>Data Type:</strong> string</li><li><strong>Reasoning:</strong> Current status of the appointment (e.g., pending, confirmed, cancelled).</li><li><strong>Example:</strong> &quot;confirmed&quot;</li></ul><h4 id="created-at-2" tabindex="-1"><a class="header-anchor" href="#created-at-2"><span>created_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was created.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h4 id="updated-at-2" tabindex="-1"><a class="header-anchor" href="#updated-at-2"><span>updated_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h4 id="deleted-at-2" tabindex="-1"><a class="header-anchor" href="#deleted-at-2"><span>deleted_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h3 id="inventoryitem" tabindex="-1"><a class="header-anchor" href="#inventoryitem"><span>InventoryItem</span></a></h3><p>The InventoryItem entity stores information about items in the company&#39;s inventory.</p><h4 id="id-primary-key-5" tabindex="-1"><a class="header-anchor" href="#id-primary-key-5"><span>id (Primary Key)</span></a></h4><ul><li><strong>Data Type:</strong> ObjectId</li><li><strong>Reasoning:</strong> Unique identifier for each inventory item.</li><li><strong>Example:</strong> &quot;60d21b4667d0d8992e610c8f&quot;</li></ul><h4 id="name-1" tabindex="-1"><a class="header-anchor" href="#name-1"><span>name</span></a></h4><ul><li><strong>Data Type:</strong> string</li><li><strong>Reasoning:</strong> Name of the inventory item.</li><li><strong>Example:</strong> &quot;Wrench&quot;</li></ul><h4 id="image-or-icon" tabindex="-1"><a class="header-anchor" href="#image-or-icon"><span>image_or_icon</span></a></h4><ul><li><strong>Data Type:</strong> string (base64)</li><li><strong>Reasoning:</strong> Image or icon representing the inventory item.</li><li><strong>Example:</strong> &quot;data:image/png;base64,iVBORw0KGgoAAAANS...&quot;</li></ul><h4 id="cost-price" tabindex="-1"><a class="header-anchor" href="#cost-price"><span>cost_price</span></a></h4><ul><li><strong>Data Type:</strong> double</li><li><strong>Reasoning:</strong> Cost price of the inventory item.</li><li><strong>Example:</strong> 15.99</li></ul><h4 id="current-stock-level" tabindex="-1"><a class="header-anchor" href="#current-stock-level"><span>current_stock_level</span></a></h4><ul><li><strong>Data Type:</strong> integer</li><li><strong>Reasoning:</strong> Current stock level of the inventory item.</li><li><strong>Example:</strong> 50</li></ul><h4 id="low-stock-threshold" tabindex="-1"><a class="header-anchor" href="#low-stock-threshold"><span>low_stock_threshold</span></a></h4><ul><li><strong>Data Type:</strong> integer</li><li><strong>Reasoning:</strong> Threshold to indicate low stock level.</li><li><strong>Example:</strong> 10</li></ul><h4 id="created-at-3" tabindex="-1"><a class="header-anchor" href="#created-at-3"><span>created_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was created.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h4 id="updated-at-3" tabindex="-1"><a class="header-anchor" href="#updated-at-3"><span>updated_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was updated.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul><h4 id="deleted-at-3" tabindex="-1"><a class="header-anchor" href="#deleted-at-3"><span>deleted_at</span></a></h4><ul><li><strong>Data Type:</strong> Date (in string format)</li><li><strong>Reasoning:</strong> Timestamp of when the document was deleted.</li><li><strong>Example:</strong> &quot;2024-06-01T10:00:00Z&quot;</li></ul>',120),r=[i];function a(l,g){return e(),n("div",null,r)}const d=t(s,[["render",a],["__file","dbSchema.html.vue"]]),p=JSON.parse('{"path":"/databaseDocs/dbSchema.html","title":"Database Schema","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"User/Employee","slug":"user-employee","link":"#user-employee","children":[]},{"level":3,"title":"Company","slug":"company","link":"#company","children":[]},{"level":3,"title":"Client","slug":"client","link":"#client","children":[]},{"level":3,"title":"Job","slug":"job","link":"#job","children":[]},{"level":3,"title":"Appointment","slug":"appointment","link":"#appointment","children":[]},{"level":3,"title":"InventoryItem","slug":"inventoryitem","link":"#inventoryitem","children":[]}],"git":{"updatedTime":1717193035000,"contributors":[{"name":"JessicaBloem","email":"jessicabloem8@gmail.com","commits":2}]},"filePathRelative":"databaseDocs/dbSchema.md"}');export{d as comp,p as data};
