# Functional Requirements of the Database


### Authentication and Authorisation

- **User login and logout**: Secure login and logout functionality for users.
- **Password management**: Ability for users to change passwords, recover forgotten passwords, and ensure password security.
- **Role-based access control**: Implementing different access levels based on user roles (e.g., admin, employee, client).

### User Document

- **User management**: Creat, update, delete and read user entities.
- **Joined companies management**: Allow users to join or leave companies

### Employee Document

- **Employee management**: Creat, update, delete and read employee entities.
- **Company association**: Associate the employee with the company.
- **Role and permission management**: Assign roles and manage permissions for different employees.
- **Model company structure**: Assign or remove superiorID and subordinateIds to model the structure company.
- **Job assignment management**: Assign or remove jobs from an employee.

### Company Document

- **Company registration and profile management**: Allow companies to register, and manage their profiles.
- **Employee association**: Associate employees with companies and manage their roles within the company.
- **Status list**: Add, edit and remove statuses
- **Tag list**: Add, edit and remove tag

### Inventory Document

- **Inventory item management**: Create, update, delete and read inventory items.
- **Stock level management**: Track stock levels and reorder levels of inventory items 


### Client Document

- **Client profile management**: Create, update, delete and read client profiles.
- **Contact information management**: Store and manage client contact details and addresses.

### Job Document

- **Job management**: Create, update, delete and read jobs.
- **Job assignment**: Assign jobs to employees and manage job details.
- **Job scheduling**: Schedule jobs and manage job timelines.
- **Job status tracking**: Update and track the status of jobs (e.g., pending, in progress, completed).
- **Client feedback collection**: Collect and store client feedback for completed jobs.
- **Upload files**: Add and remove files to the job. 
- **Comments**: Add, remove and edit comments on a job. 
- **Employee and team assignment**: Assign or remove employees or teams from a job. 
- **Task management**: Add, remove, edit and track tasks.
- **Activity History**: Keep track of all activity on a job.
- **Company association**: Associate the job with the company.
- **Client feedback**: Add feedback from client to job

### Role Document
- **Role management**: Create, update, delete and read roles.
- **Permission suite**: Add or remove a permission to a role.
- **Company association**: Associate the role with the company.

### Team Document
- **Team management**: Create, update, delete and read teams.
- **Company association**: Associate the team with the company.
- **Job assignment management**: Assign or remove jobs from a team.