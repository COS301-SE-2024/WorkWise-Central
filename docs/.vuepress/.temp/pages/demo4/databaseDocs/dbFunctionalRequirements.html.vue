<template><div><h1 id="functional-requirements-of-the-database" tabindex="-1"><a class="header-anchor" href="#functional-requirements-of-the-database"><span>Functional Requirements of the Database</span></a></h1>
<h3 id="authentication-and-authorization" tabindex="-1"><a class="header-anchor" href="#authentication-and-authorization"><span>Authentication and Authorization</span></a></h3>
<ul>
<li><strong>User login and logout</strong>: Secure login and logout functionality for users.</li>
<li><strong>Password management</strong>: Ability for users to change passwords, recover forgotten passwords, and ensure password security.</li>
<li><strong>Role-based access control</strong>: Implementing different access levels based on user roles (e.g., admin, employee, client).</li>
</ul>
<h3 id="user-management" tabindex="-1"><a class="header-anchor" href="#user-management"><span>User Management</span></a></h3>
<ul>
<li><strong>User profile management</strong>: Create, read, update, and delete user entities, including personal information, contact details, and system details.</li>
<li><strong>Company association</strong>: Allow users to join or leave companies, managing their <code v-pre>joinedCompanies</code> list.</li>
<li><strong>Skills management</strong>: Add, remove, or update user skills.</li>
<li><strong>Device management</strong>: Associate and manage multiple device IDs for each user.</li>
<li><strong>Account validation</strong>: Implement a process to validate user accounts.</li>
</ul>
<h3 id="employee-management" tabindex="-1"><a class="header-anchor" href="#employee-management"><span>Employee Management</span></a></h3>
<ul>
<li><strong>Employee profile management</strong>: Create, read, update, and delete employee entities.</li>
<li><strong>Company association</strong>: Associate employees with companies.</li>
<li><strong>Role and permission management</strong>: Assign roles and manage permissions for different employees.</li>
<li><strong>Organizational structure</strong>: Model company structure by assigning or removing superiorId and managing subordinates.</li>
<li><strong>Job and task assignment</strong>: Manage current job and task assignments for employees.</li>
<li><strong>Team membership</strong>: Associate employees with teams.</li>
</ul>
<h3 id="company-management" tabindex="-1"><a class="header-anchor" href="#company-management"><span>Company Management</span></a></h3>
<ul>
<li><strong>Company profile management</strong>: Allow companies to register and manage their profiles, including contact details and address information.</li>
<li><strong>Employee association</strong>: Manage employee associations with the company.</li>
<li><strong>Job status management</strong>: Add, edit, and remove job statuses.</li>
<li><strong>Job tag management</strong>: Add, edit, and remove job tags.</li>
<li><strong>Inventory management</strong>: Associate and manage inventory items for the company.</li>
</ul>
<h3 id="inventory-management" tabindex="-1"><a class="header-anchor" href="#inventory-management"><span>Inventory Management</span></a></h3>
<ul>
<li><strong>Inventory item management</strong>: Create, read, update, and delete inventory items.</li>
<li><strong>Stock level tracking</strong>: Monitor current stock levels of inventory items.</li>
<li><strong>Reorder level management</strong>: Set and manage reorder levels for inventory items.</li>
<li><strong>Cost and pricing</strong>: Manage cost prices and sale prices for inventory items.</li>
<li><strong>Stock movement tracking</strong>: Record and manage stock movements, including reasons and employee associations.</li>
<li><strong>Stock take management</strong>: Conduct and record stock takes, comparing current and recorded stock levels.</li>
</ul>
<h3 id="client-management" tabindex="-1"><a class="header-anchor" href="#client-management"><span>Client Management</span></a></h3>
<ul>
<li><strong>Client profile management</strong>: Create, read, update, and delete client profiles.</li>
<li><strong>Contact information management</strong>: Store and manage client contact details and addresses.</li>
<li><strong>Company association</strong>: Associate clients with specific companies.</li>
</ul>
<h3 id="job-management" tabindex="-1"><a class="header-anchor" href="#job-management"><span>Job Management</span></a></h3>
<ul>
<li><strong>Job creation and management</strong>: Create, read, update, and delete jobs.</li>
<li><strong>Job assignment</strong>: Assign jobs to employees and teams.</li>
<li><strong>Job scheduling</strong>: Manage job timelines, including start and end dates.</li>
<li><strong>Status tracking</strong>: Update and track the status of jobs using predefined status options.</li>
<li><strong>Priority management</strong>: Assign and manage priority tags for jobs.</li>
<li><strong>File management</strong>: Add and remove attachments and cover images for jobs.</li>
<li><strong>Comment system</strong>: Add, remove, and edit comments on jobs.</li>
<li><strong>Task management</strong>: Create, update, delete, and track tasks within jobs.</li>
<li><strong>Activity history</strong>: Maintain a log of all activities related to a job.</li>
<li><strong>Client feedback</strong>: Collect and store client feedback for completed jobs.</li>
</ul>
<h3 id="role-management" tabindex="-1"><a class="header-anchor" href="#role-management"><span>Role Management</span></a></h3>
<ul>
<li><strong>Role creation and management</strong>: Create, read, update, and delete roles.</li>
<li><strong>Permission suite management</strong>: Add or remove permissions for each role.</li>
<li><strong>Company association</strong>: Associate roles with specific companies.</li>
</ul>
<h3 id="team-management" tabindex="-1"><a class="header-anchor" href="#team-management"><span>Team Management</span></a></h3>
<ul>
<li><strong>Team creation and management</strong>: Create, read, update, and delete teams.</li>
<li><strong>Team composition</strong>: Manage team members and team leaders.</li>
<li><strong>Company association</strong>: Associate teams with specific companies.</li>
<li><strong>Job assignment</strong>: Manage current job assignments for teams.</li>
</ul>
<h3 id="chat-and-communication" tabindex="-1"><a class="header-anchor" href="#chat-and-communication"><span>Chat and Communication</span></a></h3>
<ul>
<li><strong>Chat message management</strong>: Create, read, and manage chat messages between users.</li>
<li><strong>Chat creation</strong>: Allow users to create new chats and manage participants.</li>
</ul>
<h3 id="notification-system" tabindex="-1"><a class="header-anchor" href="#notification-system"><span>Notification System</span></a></h3>
<ul>
<li><strong>Notification management</strong>: Create, read, and manage notifications for users.</li>
<li><strong>Notification status</strong>: Track whether notifications have been read by recipients.</li>
<li><strong>Job-related notifications</strong>: Distinguish between job-related and other types of notifications.</li>
</ul>
<h3 id="time-tracking" tabindex="-1"><a class="header-anchor" href="#time-tracking"><span>Time Tracking</span></a></h3>
<ul>
<li><strong>Time interval management</strong>: Record start and end times for work periods.</li>
<li><strong>Employee time tracking</strong>: Associate time tracking entries with specific employees and jobs.</li>
<li><strong>Break management</strong>: Record and manage break times during work periods.</li>
</ul>
<h3 id="invoice-management" tabindex="-1"><a class="header-anchor" href="#invoice-management"><span>Invoice Management</span></a></h3>
<ul>
<li><strong>Invoice creation and management</strong>: Create, read, update, and delete invoices.</li>
<li><strong>Item management</strong>: Add and manage both inventory and labor items on invoices.</li>
<li><strong>Payment tracking</strong>: Record payment status and dates for invoices.</li>
<li><strong>Tax calculation</strong>: Manage tax amounts and percentages for invoices.</li>
<li><strong>Association with jobs and clients</strong>: Link invoices to specific jobs and clients.</li>
</ul>
<h3 id="video-call-management" tabindex="-1"><a class="header-anchor" href="#video-call-management"><span>Video Call Management</span></a></h3>
<ul>
<li><strong>Video call scheduling</strong>: Create and manage video call schedules.</li>
<li><strong>Participant management</strong>: Add and remove participants for video calls.</li>
<li><strong>Company association</strong>: Associate video calls with specific companies.</li>
</ul>
</div></template>


