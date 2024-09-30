# Functional Requirements of the Database

### Authentication and Authorization

- **User login and logout**: Secure login and logout functionality for users.
- **Password management**: Ability for users to change passwords, recover forgotten passwords, and ensure password security.
- **Role-based access control**: Implementing different access levels based on user roles (e.g., admin, employee, client).

### User Management

- **User profile management**: Create, read, update, and delete user entities, including personal information, contact details, and system details.
- **Company association**: Allow users to join or leave companies, managing their `joinedCompanies` list.
- **Skills management**: Add, remove, or update user skills.
- **Device management**: Associate and manage multiple device IDs for each user.
- **Account validation**: Implement a process to validate user accounts.

### Employee Management

- **Employee profile management**: Create, read, update, and delete employee entities.
- **Company association**: Associate employees with companies.
- **Role and permission management**: Assign roles and manage permissions for different employees.
- **Organizational structure**: Model company structure by assigning or removing superiorId and managing subordinates.
- **Job and task assignment**: Manage current job and task assignments for employees.
- **Team membership**: Associate employees with teams.

### Company Management

- **Company profile management**: Allow companies to register and manage their profiles, including contact details and address information.
- **Employee association**: Manage employee associations with the company.
- **Job status management**: Add, edit, and remove job statuses.
- **Job tag management**: Add, edit, and remove job tags.
- **Inventory management**: Associate and manage inventory items for the company.

### Inventory Management

- **Inventory item management**: Create, read, update, and delete inventory items.
- **Stock level tracking**: Monitor current stock levels of inventory items.
- **Reorder level management**: Set and manage reorder levels for inventory items.
- **Cost and pricing**: Manage cost prices and sale prices for inventory items.
- **Stock movement tracking**: Record and manage stock movements, including reasons and employee associations.
- **Stock take management**: Conduct and record stock takes, comparing current and recorded stock levels.

### Client Management

- **Client profile management**: Create, read, update, and delete client profiles.
- **Contact information management**: Store and manage client contact details and addresses.
- **Company association**: Associate clients with specific companies.

### Job Management

- **Job creation and management**: Create, read, update, and delete jobs.
- **Job assignment**: Assign jobs to employees and teams.
- **Job scheduling**: Manage job timelines, including start and end dates.
- **Status tracking**: Update and track the status of jobs using predefined status options.
- **Priority management**: Assign and manage priority tags for jobs.
- **File management**: Add and remove attachments and cover images for jobs.
- **Comment system**: Add, remove, and edit comments on jobs.
- **Task management**: Create, update, delete, and track tasks within jobs.
- **Activity history**: Maintain a log of all activities related to a job.
- **Client feedback**: Collect and store client feedback for completed jobs.

### Role Management

- **Role creation and management**: Create, read, update, and delete roles.
- **Permission suite management**: Add or remove permissions for each role.
- **Company association**: Associate roles with specific companies.

### Team Management

- **Team creation and management**: Create, read, update, and delete teams.
- **Team composition**: Manage team members and team leaders.
- **Company association**: Associate teams with specific companies.
- **Job assignment**: Manage current job assignments for teams.

### Chat and Communication

- **Chat message management**: Create, read, and manage chat messages between users.
- **Chat creation**: Allow users to create new chats and manage participants.

### Notification System

- **Notification management**: Create, read, and manage notifications for users.
- **Notification status**: Track whether notifications have been read by recipients.
- **Job-related notifications**: Distinguish between job-related and other types of notifications.

### Time Tracking

- **Time interval management**: Record start and end times for work periods.
- **Employee time tracking**: Associate time tracking entries with specific employees and jobs.
- **Break management**: Record and manage break times during work periods.

### Invoice Management

- **Invoice creation and management**: Create, read, update, and delete invoices.
- **Item management**: Add and manage both inventory and labor items on invoices.
- **Payment tracking**: Record payment status and dates for invoices.
- **Tax calculation**: Manage tax amounts and percentages for invoices.
- **Association with jobs and clients**: Link invoices to specific jobs and clients.

### Video Call Management

- **Video call scheduling**: Create and manage video call schedules.
- **Participant management**: Add and remove participants for video calls.
- **Company association**: Associate video calls with specific companies.