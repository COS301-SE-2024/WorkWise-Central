# Table of Contents

1. [Introduction](#introduction)
2. [Functional Requirements of the Database](#functional-requirements-of-the-database)
    - [Authentication](#authentication)
    - [User/Employee Management](#useremployee-management)
    - [Company Management](#company-management)
    - [Inventory Management](#inventory-management)
    - [Client Management](#client-management)
    - [Appointment Management](#appointment-management)
    - [Job Management](#job-management)
3. [Non-Functional Requirements](#non-functional-requirements)
    - [Availability and Reliability](#availability-and-reliability)
    - [Security](#security)
    - [Maintainability](#maintainability)
4. [Constraints](#constraints)
5. [Entity Relationship Diagram](#entity-relationship-diagram)
6. [Data Model](#data-model)
    - [User/Employee](#useremployee)
    - [Company](#company)
    - [Client](#client)
    - [Job](#job)
    - [Appointment](#appointment)
    - [InventoryItem](#inventoryitem)
7. [ER Diagram](#er-diagram)
8. [Database Schema](#database-schema)
    - [User/Employee](#useremployee-1)
    - [Company](#company-1)
    - [Client](#client-1)
    - [Job](#job-1)
    - [Appointment](#appointment-1)
    - [InventoryItem](#inventoryitem-1)


# WorkWise Central Database Design Documentation

## Introduction

WorkWise Central is a service-management tool crafted to meet the needs of service-based industries. This tool aims to streamline business operations, enhance resource efficiency, and elevate customer experiences. By offering a centralized platform for managing users, companies, clients, jobs, appointments, and inventory, WorkWise Central integrates various facets of service management into a cohesive system.

The goal of the database is to provide a robust and scalable backend to support the seamless operation of WorkWise Central's interfaces. The database will store, manage, and retrieve data efficiently to ensure the smooth functioning of the platform. It will handle user authentication, manage relationships between entities, and ensure data integrity and security.

## Functional Requirements of the Database

*Note: Only a subset of the collections in the database have been implemented.*

### Authentication

- **User Login and Logout**: Secure login and logout functionality for users.
- **Password Management**: Ability for users to change passwords, recover forgotten passwords, and ensure password security.
- **Role-Based Access Control**: Implementing different access levels based on user roles (e.g., admin, employee, client).

### User/Employee Management

- **User Profile Management**: Allow users to create, update, and delete their profiles.
- **Role and Permission Management**: Assign roles and manage permissions for different users.
- **Availability Scheduling**: Enable employees to set and update their availability.

### Company Management

- **Company Registration and Profile Management**: Allow companies to register, and manage their profiles.
- **Employee Association**: Associate employees with companies and manage their roles within the company.
- **Company Inventory Management**: Manage the inventory items associated with a company.

### Inventory Management

- **Inventory Item Management**: Create, update, and delete inventory items.
- **Stock Level Management**: Track current stock levels and set low stock thresholds.
- **Supplier Information Management**: Store and manage supplier information.

### Client Management

- **Client Profile Management**: Create, update, and delete client profiles.
- **Contact Information Management**: Store and manage client contact details and addresses.

### Appointment Management

- **Appointment Scheduling**: Schedule appointments between clients and employees.
- **Status Management**: Update the status of appointments (e.g., pending, confirmed, cancelled).
- **Duration Tracking**: Track the duration of appointments.

### Job Management

- **Job Assignment**: Assign jobs to employees and manage job details.
- **Job Scheduling**: Schedule jobs and manage job timelines.
- **Job Status Tracking**: Update and track the status of jobs (e.g., pending, in progress, completed).
- **Client Feedback Collection**: Collect and store client feedback for completed jobs.

## Non-Functional Requirements

### Availability and Reliability

- **High Availability**: Ensure the database is highly available with minimal downtime.
- **Backup and Recovery**: Implement robust backup and recovery mechanisms to prevent data loss.

### Security

- **Data Encryption**: Encrypt sensitive data, both at rest and in transit.
- **Access Control**: Implement strict access control measures to protect data from unauthorized access.
- **Audit Logging**: Maintain logs of all access and modifications to the data for auditing purposes.

### Maintainability

- **Scalability**: Design the database to scale horizontally as the application grows.
- **Documentation**: Maintain comprehensive documentation for database schemas, relationships, and operations.
- **Monitoring and Alerts**: Implement monitoring and alerting mechanisms to detect and respond to issues promptly.

## Constraints

- **Database Technology**: MongoDB
  - **Deployment**: Currently hosted on MongoDB Atlas, planned to be self-hosted in the future.
- **Database Size**: The current database size is constrained to 500 MB.

## Entity Relationship Diagram

### Data Model

**User/Employee**
The User/Employee entity stores all user-related data, including personal, system, and professional details.
- **id (Primary Key)**: A unique identifier for the user.
- **systemDetails**: Stores system-related information such as email, password, and username.
- **personInfo**: Contains personal details like first name, surname, date of birth, gender, preferred language, contact information (phone, email), and address (street, suburb, city, postal code, complex, house number).
- **profile**: Holds profile-specific data such as display image and display name.
- **roles**: An array of roles with associated permissions.
- **joinedCompanies**: A list of companies the user is associated with.
- **skills**: A list of the user's skills.
- **availability**: Indicates the user's availability status and schedule.
- **currentJobAssignments**: A list of job assignments linked to the user.

**Company**
The Company entity stores information about different companies.
- **id (Primary Key)**: A unique identifier for the company.
- **registrationNumber**: The company's registration number.
- **name**: The name of the company.
- **type**: The type of business the company operates.
- **vatNumber**: The company's VAT number.
- **logo**: The company's logo.
- **contactDetails**: Contact information including phone and email.
- **address**: The company's address, comprising street, suburb, city, and postal code.
- **employees**: A list of employee IDs associated with the company.
- **inventoryItems**: A list of inventory item IDs managed by the company.

**Client**
The Client entity stores information about clients.
- **id (Primary Key)**: A unique identifier for the client.
- **details**: Contains client-specific details such as first name, surname, contact information (phone, email), and address (street, suburb, city, postal code, complex, house number).

**Job**
The Job entity stores details about various jobs.
- **id (Primary Key)**: A unique identifier for the job.
- **clientId**: A reference to the client associated with the job.
- **assignedEmployees**: A list of employee IDs assigned to the job.
- **scheduledDateTime**: The scheduled date and time for the job.
- **status**: The current status of the job (e.g., pending, in progress, completed).
- **inventoryUsed**: A list of inventory items used in the job, including item IDs and quantities.
- **jobDetails**: Detailed information about the job, including description, notes, address, and images.
- **clientFeedback**: Feedback from the client, including job rating, customer service rating, and comments.

**Appointment**
The Appointment entity stores information about appointments.
- **id (Primary Key)**: A unique identifier for the appointment.
- **clientId**: A reference to the client associated with the appointment.
- **jobId**: A reference to the job related to the appointment.
- **scheduledDateTime**: The scheduled date and time for the appointment.
- **duration**: The duration of the appointment in minutes.
- **status**: The current status of the appointment (e.g., pending, confirmed, cancelled).

**InventoryItem**
The InventoryItem entity stores details about inventory items.
- **id (Primary Key)**: A unique identifier for the inventory item.
- **name**: The name of the inventory item.
- **itemImage**: The image or icon representing the inventory item.
- **costPrice**: The cost price of the inventory item.
- **currentStockLevel**: The current stock level of the inventory item.
- **lowStockThreshold**: The stock level threshold indicating when the item is considered low on stock.

## Database Schema  

### User/Employee
The User/Employee entity stores information for both general users and employees, using a single collection inheritance pcurrentStockLevelrimary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each user or employee.
- **Example:** "60d21b4667d0d8992e610c85"

#lowStockThreshold **Data Type:** Object
- **Attributes:**
  - **email:** string
    - **Reasoning:** Email used for login and communication.
    - **Example:** "user@example.com"
  - **password:** string
    - **Reasoning:** Hashed password for account security.
    - **Example:** "hashed_password_string"
  - **username:** string
    - **Reasoning:** Unique identifier for the user's profile.
    - **Example:** "user123"

#### personalInfo
- **Data Type:** Object
- **Attributes:**
  - **firstName:** string
    - **Reasoning:** User's first name for personal identification.
    - **Example:** "John"
  - **surname:** string
    - **Reasoning:** User's surname for personal identification.
    - **Example:** "Doe"
  - **dateOfBirth:** Date (as a string)
    - **Reasoning:** User's date of birth for age verification and personalization.
    - **Example:** "1990-01-01"
  - **gender:** string
    - **Reasoning:** User's gender for demographic purposes.
    - **Example:** "Male"
  - **preferredLanguage:** string
    - **Reasoning:** Language preference for communication.
    - **Example:** "English"
  - **contactInfo:** Object
    - **phone:** string
      - **Reasoning:** Phone number for contact.
      - **Example:** "+1234567890"
    - **email:** string
      - **Reasoning:** Secondary email for contact.
      - **Example:** "contact@example.com"
  - **address:** Object
    - **street:** string
      - **Reasoning:** Street address for mailing purposes.
      - **Example:** "123 Main St"
    - **suburb:** string
      - **Reasoning:** Suburb for geographical information.
      - **Example:** "Central"
    - **city:** string
      - **Reasoning:** City for geographical information.
      - **Example:** "Metropolis"
    - **postalCode:** string
      - **Reasoning:** Postal code for mailing purposes.
      - **Example:** "12345"
    - **complex:** string
      - **Reasoning:** Complex name if applicable.
      - **Example:** "Sunny Apartments"
    - **houseNumber:** string
      - **Reasoning:** House number for precise address.
      - **Example:** "10B"

#### profile
- **Data Type:** Object
- **Attributes:**
  - **displayImage:** string
    - **Reasoning:** URL or base64 image string for profile picture.
    - **Example:** "data:image/png;base64,iVBORw0KGgoAAAANS..."
  - **displayName:** string
    - **Reasoning:** Display name for user profile.
    - **Example:** "JohnDoe"

#### roles
- **Data Type:** Array of Objects
- **Attributes:**
  - **companyId**: ObjectId
    - **Reasoning:** Links to a company id in the company table
    - **Example:** "60d21b4667d0d8992e610c85"
  - **role:** Array
    - **Reasoning:** Defines the user's role (e.g., admin, employee).
    - **Example:** ["admin", "technician"]
  - **permissions:** Array
    - **Reasoning:** Permissions associated with the role.
    - **Example:** ["read", "write", "delete"]

#### joinedCompanies
- **Data Type:** Array of ObjectId
- **Reasoning:** References companies the user/employee is associated with.
- **Example:** ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"]

#### skills
- **Data Type:** Array
- **Attributes:**
  - **skillName:** string
    - **Reasoning:** List of skills the user possesses.
    - **Example:** ["JavaScript", "Python"]

#### availability
- **Data Type:** Object
- **Attributes:**
  - **status:** string
    - **Reasoning:** Current availability status of the user.
    - **Example:** "Available"
  - **schedule:** Object
    - **Reasoning:** Weekly schedule for the user.
    - **Example:** {"Monday": "9:00-17:00", "Tuesday": "9:00-17:00"}

#### currentJobAssignments
- **Data Type:** Array of ObjectId
- **Reasoning:** References jobs the user/employee is currently assigned to.
- **Example:** ["60d21b4667d0d8992e610c87", "60d21b4667d0d8992e610c88"]

#### currentJob
- **Data Type:** ObjectId
- **Reasoning:** References the current company the user is in.
- **Example:**  "60d21b4667d0d8992e610c87"

#### createdAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "2024-06-01T10:00:00Z"

#### updatedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "2024-06-01T10:00:00Z"

#### deletedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "2024-06-01T10:00:00Z"


### Company
The Company entity stores information about companies associated with users and jobs.

#### id (Primary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each company.
- **Example:** "60d21b4667d0d8992e610c89"

#### registrationNumber
- **Data Type:** string
- **Reasoning:** Unique registration number for the company.
- **Example:** "REG123456"

#### name
- **Data Type:** string
- **Reasoning:** Name of the company.
- **Example:** "Tech Solutions Inc."

#### type
- **Data Type:** string
- **Reasoning:** Type or industry of the company.
- **Example:** "IT Services"

#### vatNumber
- **Data Type:** string
- **Reasoning:** VAT number for tax purposes.
- **Example:** "VAT789012"

#### logo
- **Data Type:** string
- **Reasoning:** URL or base64 image string for the company logo.
- **Example:** "data:image/png;base64,iVBORw0KGgoAAAANS..."

#### contactDetails
- **Data Type:** Object
- **Attributes:**
  - **phone:** string
    - **Reasoning:** Phone number for contact.
    - **Example:** "+1234567890"
  - **email:** string
    - **Reasoning:** Email for contact.
    - **Example:** "contact@techsolutions.com"

#### address
- **Data Type:** Object
- **Attributes:**
  - **street:** string
    - **Reasoning:** Street address for mailing purposes.
    - **Example:** "456 Business St"
  - **suburb:** string
    - **Reasoning:** Suburb for geographical information.
    - **Example:** "Central"
  - **city:** string
    - **Reasoning:** City for geographical information.
    - **Example:** "Metropolis"
  - **postalCode:** string
    - **Reasoning:** Postal code for mailing purposes.
    - **Example:** "67890"

#### employees
- **Data Type:** Array of ObjectId
- **Reasoning:** References employees (Users) associated with the company.
- **Example:** ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"]

#### inventoryItems
- **Data Type:** Array of ObjectId
- **Reasoning:** References inventory items owned by the company.
- **Example:** ["60d21b4667d0d8992e610c8a", "60d21b4667d0d8992e610c8b"]

#### createdAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "2024-06-01T10:00:00Z"

#### updatedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "2024-06-01T10:00:00Z"

#### deletedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "2024-06-01T10:00:00Z"

### Client
The Client entity stores information about clients who have jobs or appointments.

#### id (Primary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each client.
- **Example:** "60d21b4667d0d8992e610c8c"

#### registrationNumber (Company Specific)
- **Data Type:** string
- **Reasoning:** Unique registration number for the company.
- **Example:** "REG123456"

#### name (Company Specific)
- **Data Type:** string
- **Reasoning:** Name of the company.
- **Example:** "Tech Solutions Inc."

#### type (Company Specific)
- **Data Type:** string
- **Reasoning:** Type or industry of the company.
- **Example:** "IT Services"

#### vatNumber (Company Specific)
- **Data Type:** string
- **Reasoning:** VAT number for tax purposes.
- **Example:** "VAT789012"

#### details
- **Data Type:** Object
- **Attributes:**
  - **firstName:** string
    - **Reasoning:** Client's first name for personal identification.
    - **Example:** "Jane"
  - **surname:** string
    - **Reasoning:** Client's surname for personal identification.
    - **Example:** "Smith"
  - **preferredLanguage:** string
    - **Reasoning:** Client's preferred language.
    - **Example:** "English"
  - **dateOfBirth** Object
    - **phone:** string
      - **Reasoning:** Phone number for contact.
      - **Example:** "+1234567890"
    - **email:** string
      - **Reasoning:** Email for contact.
      - **Example:** "jane.smith@example.com"
    - **address:** Object
      - **street:** string
        - **Reasoning:** Street address for mailing purposes.
        - **Example:** "789 Client Rd"
      - **suburb:** string
        - **Reasoning:** Suburb for geographical information.
        - **Example:** "Eastside"
      - **city:** string
        - **Reasoning:** City for geographical information.
        - **Example:** "Metropolis"
      - **postalCode:** string
        - **Reasoning:** Postal code for mailing purposes.
        - **Example:** "12345"
      - **complex:** string
        - **Reasoning:** Complex name if applicable.
        - **Example:** "Client Apartments"
      - **houseNumber:** string
        - **Reasoning:** House number for precise address.
        - **Example:** "3A"

#### createdAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "2024-06-01T10:00:00Z"

#### updatedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "2024-06-01T10:00:00Z"

#### deletedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "2024-06-01T10:00:00Z"

### Job
The Job entity stores information about jobs assigned to employees and clients.

#### id (Primary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each job.
- **Example:** "60d21b4667d0d8992e610c8d"

#### heading
- **Data Type:** string
- **Reasoning:** A name of a job.
- **Example:** "Linda Marshall's tiling"

#### companyId
- **Data Type:** ObjectId
- **Relationship:** References Company 
- **Reasoning:** Associates the job with a specific company.
- **Example:** "60d21b4667d0d8992e610c8c"

#### clientId (Foreign Key)
- **Data Type:** ObjectId
- **Relationship:** References Client
- **Reasoning:** Associates the job with a specific client.
- **Example:** "60d21b4667d0d8992e610c8c"

#### assignedEmployees
- **Data Type:** Array of ObjectId
- **Relationship:** References User
- **Reasoning:** Employees assigned to the job.
- **Example:** ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"]

#### assignedBy
- **Data Type:** ObjectId
- **Relationship:** References Employees table
- **Reasoning:** Assignee of a job.
- **Example:** ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"]
- 
#### scheduledDateTime
- **Data Type:** Date (in string format)
- **Reasoning:** Scheduled date and time for the job.
- **Example:** "2024-06-01T09:00:00Z"

#### status
- **Data Type:** string
- **Reasoning:** Current status of the job (e.g., pending, in progress, completed).
- **Example:** "pending"

#### inventoryUsed
- **Data Type:** Array of Object
- **Reasoning:** Inventory items used for the job.
- **Format:** { "InventoryItem": ObjectId (relationship with InventoryItem), "QuantityUsed": integer }
- **Example:** [{ "InventoryItem": "60d21b4667d0d8992e610c8a", "QuantityUsed": 2 }]

#### jobDetails
- **Data Type:** Object
- **Attributes:**
  - **jobDescription:** string
    - **Reasoning:** Description of the job.
    - **Example:** "Fixing plumbing issues."
  - **jobNotes:** string
    - **Reasoning:** Additional notes about the job.
    - **Example:** "Bring extra tools."
  - **jobAddress:** Object
    - **street:** string
      - **Reasoning:** Street address for the job location.
      - **Example:** "123 Job St"
    - **suburb:** string
      - **Reasoning:** Suburb for the job location.
      - **Example:** "Westside"
    - **city:** string
      - **Reasoning:** City for the job location.
      - **Example:** "Metropolis"
    - **postalCode:** string
      - **Reasoning:** Postal code for the job location.
      - **Example:** "67890"
    - **complex:** string
      - **Reasoning:** Complex name if applicable.
      - **Example:** "Workplace Plaza"
    - **houseNumber:** string
      - **Reasoning:** House number for the job location.
      - **Example:** "5C"
  - **imagesTaken:** Array of strings (base64 images)
    - **Reasoning:** Images related to the job.
    - **Example:** ["data:image/png;base64,iVBORw0KGgoAAAANS...", "data:image/png;base64,iVBORw0KGgoAAAANS..."]

#### clientFeedback
- **Data Type:** Object
- **Attributes:**
  - **jobRating:** number
    - **Reasoning:** Overall job rating by the client.
    - **Example:** 4.5
  - **customerServiceRating:** number
    - **Reasoning:** Rating of the customer service by the client.
    - **Example:** 5
  - **comments:** string
    - **Reasoning:** Additional feedback comments from the client.
    - **Example:** "Great service!"

#### createdAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "2024-06-01T10:00:00Z"

#### updatedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "2024-06-01T10:00:00Z"

#### deletedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "2024-06-01T10:00:00Z"
- 
### Appointment
The Appointment entity stores information about appointments between clients and jobs.

#### id (Primary Key)
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
- **Example:** "2024-06-01T10:00:00Z"

#### updatedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "2024-06-01T10:00:00Z"

#### deletedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "2024-06-01T10:00:00Z"

### InventoryItem
The InventoryItem entity stores information about items in the company's inventory.

#### id (Primary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each inventory item.
- **Example:** "60d21b4667d0d8992e610c8f"

#### name
- **Data Type:** string
- **Reasoning:** Name of the inventory item.
- **Example:** "Wrench"

#### itemImage
- **Data Type:** string (base64)
- **Reasoning:** Image or icon representing the inventory item.
- **Example:** "data:image/png;base64,iVBORw0KGgoAAAANS..."

#### costPrice
- **Data Type:** double
- **Reasoning:** Cost price of the inventory item.
- **Example:** 15.99

#### currentStockLevel
- **Data Type:** integer
- **Reasoning:** Current stock level of the inventory item.
- **Example:** 50

#### lowStockThreshold
- **Data Type:** integer
- **Reasoning:** Threshold to indicate low stock level.
- **Example:** 10

#### createdAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "2024-06-01T10:00:00Z"

#### updatedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "2024-06-01T10:00:00Z"

#### deletedAt
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "2024-06-01T10:00:00Z"
