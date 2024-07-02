# Table of Contents

- [Table of Contents](#table-of-contents)
- [WorkWise Central Database Design Documentation](#workwise-central-database-design-documentation)
  - [Introduction](#introduction)
  - [Functional Requirements of the Database](#functional-requirements-of-the-database)
    - [Authentication](#authentication)
    - [User/Employee Management](#useremployee-management)
    - [Company Management](#company-management)
    - [Inventory Management](#inventory-management)
    - [Client Management](#client-management)
    - [Appointment Management](#appointment-management)
    - [Job Management](#job-management)
  - [Non-Functional Requirements](#non-functional-requirements)
    - [Availability and Reliability](#availability-and-reliability)
    - [Security](#security)
    - [Maintainability](#maintainability)
  - [Constraints](#constraints)
  - [Entity Relationship Diagram](#entity-relationship-diagram)
    - [Data Model](#data-model)
  - [Database Schema](#database-schema)
    - [User](#user)
      - [\_id](#_id)
      - [systemDetails](#systemdetails)
      - [profile](#profile)
      - [personalInfo](#personalinfo)
      - [joinedCompanies](#joinedcompanies)
      - [skills](#skills)
      - [currentEmployeeId](#currentemployeeid)
    - [Employee](#employee)
      - [\_id](#_id-1)
      - [role](#role)
      - [skills](#skills-1)
      - [currentJobAssignments](#currentjobassignments)
      - [superior](#superior)
      - [subordinates](#subordinates)
      - [createdAt](#createdat)
      - [updatedAt](#updatedat)
      - [deletedAt](#deletedat)
    - [Team](#team)
      - [\_id](#_id-2)
      - [teamName](#teamname)
      - [companyId](#companyid)
      - [teamMembers](#teammembers)
      - [createdAt](#createdat-1)
      - [updatedAt](#updatedat-1)
      - [deletedAt](#deletedat-1)
    - [Company](#company)
      - [\_id (Primary Key)](#_id-primary-key)
      - [registrationNumber](#registrationnumber)
      - [name](#name)
      - [type](#type)
      - [vatNumber](#vatnumber)
      - [logo](#logo)
      - [contactDetails](#contactdetails)
      - [address](#address)
      - [employees](#employees)
      - [inventoryItems](#inventoryitems)
      - [createdAt](#createdat-2)
      - [updatedAt](#updatedat-2)
      - [deletedAt](#deletedat-2)
    - [Client](#client)
      - [\_id (Primary Key)](#_id-primary-key-1)
      - [details](#details)
      - [createdAt](#createdat-3)
      - [updatedAt](#updatedat-3)
      - [deletedAt](#deletedat-3)
    - [Job](#job)
      - [\_id (Primary Key)](#_id-primary-key-2)
      - [companyId](#companyid-1)
      - [clientId (Foreign Key)](#clientid-foreign-key)
      - [assignedEmployees](#assignedemployees)
      - [recordedDetails](#recordeddetails)
      - [jobDetails](#jobdetails)
      - [clientFeedback](#clientfeedback)
      - [createdAt](#createdat-4)
      - [updatedAt](#updatedat-4)
      - [deletedAt](#deletedat-4)
    - [InventoryItem](#inventoryitem)
      - [id (Primary Key)](#id-primary-key)
      - [name](#name-1)
      - [itemImage](#itemimage)
      - [costPrice](#costprice)
      - [currentStockLevel](#currentstocklevel)
      - [lowStockThreshold](#lowstockthreshold)
      - [createdAt](#createdat-5)
      - [updatedAt](#updatedat-5)
      - [deletedAt](#deletedat-5)


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
- **employees**: A list of employee Ids associated with the company.
- **inventoryItems**: A list of inventory item Ids managed by the company.

**Client**
The Client entity stores information about clients.
- **id (Primary Key)**: A unique identifier for the client.
- **details**: Contains client-specific details such as first name, surname, contact information (phone, email), and address (street, suburb, city, postal code, complex, house number).

**Job**
The Job entity stores details about various jobs.
- **id (Primary Key)**: A unique identifier for the job.
- **clientId**: A reference to the client associated with the job.
- **assignedEmployees**: A list of employee Ids assigned to the job.
- **scheduledDateTime**: The scheduled date and time for the job.
- **status**: The current status of the job (e.g., pending, in progress, completed).
- **inventoryUsed**: A list of inventory items used in the job, including item Ids and quantities.
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

### User

The Employee entity stores information for users.

#### _id

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each user.
- **Example:** "_id": "60d21b4667d0d8992e610c85"

#### systemDetails

- **Data Type:** Object
- **Attributes:**
  - **password:** string
    - **Reasoning:** Hashed password for account security.
    - **Example:** "hashed_password_string"
  - **username:** string
    - **Reasoning:** Unique identifier for the user's profile.
    - **Example:** "user123"
- **Example:** "systemDetails": {"username":"thando", "password":"hashed password"}

#### personalInfo

- **Data Type:** Object
- **Attributes:**
  - **firstName:** string
    - **Reasoning:** User's first name for personal identification.
    - **Example:** "John"
  - **surname:** string
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
      - **Reasoning:** Email for contact.
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
- **Example:**: "personalInfo":{"firstName":"John","surname":"Doe","dateOfBirth":"1990-01-01","gender":"Male","preferredLanguage":"English","contactInfo":{"phone":"+1234567890","email":"contact@example.com"},"address":{"street":"123 Main St","suburb":"Central","city":"Metropolis","postalCode":"12345","complex":"Sunny Apartments","houseNumber":"10B"}}

#### profile

- **Data Type:** Object
- **Attributes:**
  - **displayImage:** string
    - **Reasoning:** URL or base64 image string for profile picture.
    - **Example:** "data:image/png;base64,iVBORw0KGgoAAAANS..."
  - **displayName:** string
    - **Reasoning:** Display name for user profile.
    - **Example:** "JohnDoe"
- **Example:** "profile": {"displayName":"thando", "displayImage":"base64 image"}

#### joinedCompanies

- **Data Type:** Array of Objects
- **Reasoning:** References companies the user is associated with.
- **Attributes:**
  - **employeeId:** ObjectId
    - **Reasoning:** Stores a reference to the employee collection
    - **Example:** "employeeId": "60d21b4667d0d8992e610c85"
  - **companyName:** string
    - **Reasoning:** stores the name of the company the employeeId links to
    - **Example:** "companyName": "Work Wise Central"
- **Example:** "joinedComapanies": [ {"employeeId": "60d21b4667d0d8992e610c85", "companyName": "Work Wise Central"}...]

#### skills
- **Data Type:** Array
- **Attributes:**
  - **skillName:** string
    - **Reasoning:** List of skills the user possesses.
- **Example:** "skills": ["JavaScript", "Python"]

#### employeeIds
- **Data Type:** Array of ObjectIds
- **Reasoning:** References the employeeIds in the Employee collection
- **Example:** "employeeIds": ["60d21b4667d0d8992e610c85",...]

#### currentEmployeeId

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier the current employee the user is logged in as.
- **Example:** "currentEmployeeId": "60d21b4667d0d8992e610c85"

### isValidated

- **Data Type:** boolean
- **Reasoning:** Validates whether a user has been enter into the system.
- **Example:** "isValidated": true

### Employee

The Employee entity stores information for employees.

#### _id

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each employee.
- **Example:** "_id": "60d21b4667d0d8992e610c85"

#### roleId

- **Data Type:** ObjectId
- **Reasoning:** Uniquely identifies a role.
- **Example:** "roleId": "60d21b4667d0d8992e610c86"

#### userId

- **Data Type:** ObjectId
- **Reasoning:** References the userId in the User collection.
- **Example:** "userId": "60d21b4667d0d8992e610c85"

#### companyId

- **Data Type:** ObjectId
- **Reasoning:** References the company the employee is associated with.
- **Example:** "companyId": "60d21b4667d0d8992e610c87"

#### superiorId

- **Data Type:** ObjectId
- **Reasoning:** References the employee's superior.
- **Attributes:**
  - **employeeId:** ObjectId
    - **Reasoning:** Stores a reference to the employeeId in the Employee collection
- **Example:** "superiorId": "60d21b4667d0d8992e610c87"

#### currentJobAssignments

- **Data Type:** Array of Object ids
- **Reasoning:** References jobs the employee is currently assigned to.
- **Example:** ["60d21b4667d0d8992e610c87"...]

#### subordinates

- **Data Type:** Array of Object ids
- **Reasoning:** References the employees under the employee.
- **Attributes:**
  - **employeeId:** ObjectId
    - **Reasoning:** Stores a reference to the employeeId in the Employee collection
- **Example:** "subordinates": ["60d21b4667d0d8992e610c87"...]

#### subordinateTeams

- **Data Type:** Array of Object ids
- **Reasoning:** References the teams under the employee.
- **Attributes:**
  - **employeeId:** ObjectId
    - **Reasoning:** Stores a reference to the employeeId in the Employee collection
- **Example:** "subordinatesTeams": ["60d21b4667d0d8992e610c87"...]

#### createdAt

- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "createdAt" : "2024-06-01T10:00:00Z"

#### updatedAt

- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "updatedAt: "2024-06-01T10:00:00Z"

#### deletedAt

- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "deletedAt": "2024-06-01T10:00:00Z"

### Team

#### _id

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each team.

#### companyId

- **Data Type:** ObjectId
- **Relationship:** References Company
- **Reasoning:** Associates the job with a specific company.
- **Example:** "companyId": "60d21b4667d0d8992e610c8c"

#### teamName

- **Data Type:** string
- **Reasoning:** Use of string is logical.
- **Example:** "teamName": "Boolean Hooligans"

#### teamMembers

- **Data Type:** Array of Objects ids
- **Reasoning:** Stores employeeIds
- **Attributes:**
    - **employeeId:** ObjectId
    - **Reasoning:** Stores the reference to the employee in the Employee collection
- **Example:** "teamMembers": ["60d21b4667d0d8992e610c87"...]

#### teamLeaderId 

- **Data Type:** ObjectId
- **Reasoning:** References the employeeId in the employee collection.
- **Example:** "teamLeaderId": "60d21b4667d0d8992e610c85"
- 
#### assignedJobs

- **Data Type:** Array of Object ids
- **Reasoning:** Stores a list of jobs the teams has been assigned 
- **Example:** "assignedJobs": ["60d21b4667d0d8992e610c85", ...]
- 
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
- **Example:** "deletedAt": "2024-06-01T10:00:00Z"

### Company

The Company entity stores information about companies associated with users and jobs.

#### _id (Primary Key)

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each company.
- **Example:** "_id": "60d21b4667d0d8992e610c89"

#### name

- **Data Type:** string
- **Reasoning:** Name of the company.
- **Example:** "name": "Tech Solutions Inc."

#### registrationNumber

- **Data Type:** string
- **Reasoning:** Unique registration number for the company.
- **Example:** "registrationNumber": "REG123456"

#### vatNumber

- **Data Type:** string
- **Reasoning:** VAT number for tax purposes.
- **Example:** "vatNumber": "VAT789012"

#### logo

- **Data Type:** string
- **Reasoning:** URL or base64 image string for the company logo.
- **Example:** "logo": "data:image/png;base64,iVBORw0KGgoAAAANS..."

#### type

- **Data Type:** string
- **Reasoning:** Type or industry of the company.
- **Example:** "type": "IT Services"

#### contactDetails

- **Data Type:** Object
- **Attributes:**
  - **phone:** string
    - **Reasoning:** Phone number for contact.
    - **Example:** "+1234567890"
  - **email:** string
    - **Reasoning:** Email for contact.
    - **Example:** "contact@techsolutions.com"
- **Example:** "contactDetails": {"phone":"+1234567890","email":"contact@techsolutions.com"}

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
- **Example:** "address": {"street":"456 Business St","suburb":"Central","city":"Metropolis","postalCode":"67890"}

#### employees

- **Data Type:** Array of Objects
- **Reasoning:** References employees (Users) associated with the company.
- **Attributes:** 
  - **employeeId:** ObjectId
    - **Reasoning:** Stores a reference to the employeeId in the Employee collection
- **Example:** "employees": ["60d21b4667d0d8992e610c85",...]

#### inventory

- **Data Type:** Array of Object ids
- **Reasoning:** References inventory items owned by the company to track and manage stock efficiently.
- **Attributes:**
  - **inventoryItemId:** ObjectId
    - **Reasoning:** Unique identifier for each inventory item to ensure accurate tracking and referencing.
- **Example:** "inventory": ["60d21b4667d0d8992e610c8a",...]

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
- **Example:** "deletedAt": "2024-06-01T10:00:00Z"

### Client

The Client entity stores information about clients who have jobs or appointments.

#### _id (Primary Key)

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each client.
- **Example:** "_id": "60d21b4667d0d8992e610c8c"

#### personalInfo

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
  - **contactInfo**:
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
- **Example:** "personalInfo": {"firstName":"Jane","surname":"Smith","preferredLanguage":"English","dateOfBirth":{"phone":"+1234567890"},"contactInfo":{"email":"jane.smith@example.com","address":{"street":"789 Client Rd","suburb":"Eastside","city":"Metropolis","postalCode":"12345","complex":"Client Apartments","houseNumber":"3A"}}}

#### jobs

- **Data Type:** Array of Object ids
- **Reasoning:** References jobs associated with the client.
- **Example:** "jobs": ["60d21b4667d0d8992e610c8a",...]

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
- **Example:** "deletedAt": "2024-06-01T10:00:00Z"

### Job

The Job entity stores information about jobs assigned to employees and clients.

#### _id (Primary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each job.
- **Example:** "_id": "60d21b4667d0d8992e610c8d"

#### companyId

- **Data Type:** ObjectId
- **Relationship:** References Company 
- **Reasoning:** Associates the job with a specific company.
- **Example:** "companyId": "60d21b4667d0d8992e610c8c"

#### clientId (Foreign Key)

- **Data Type:** ObjectId
- **Relationship:** References Client
- **Reasoning:** Associates the job with a specific client.
- **Example:** "clientId": "60d21b4667d0d8992e610c8c"

#### jobDetails

- **Data Type:** Object
- **Attributes:**
  - **jobName:** string
    - **Reasoning:** Name of the job.
    - **Example:** "UP Merensky library revamp"
  - **jobDescription:** string   (@Jess may you please add this field to er diagram)
    - **Reasoning:** Description of the job.
    - **Example:** "Fixing plumbing issues."
  - **jobStartDate:** Date
    - **Reasoning:** Start date of the job.
    - **Example:** "2024-06-01"
  - **jobEndDate:** Date
    - **Reasoning:** End date of the job.
    - **Example:** "2024-06-05"
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
- **Example:** "jobDetails": {"jobDescription": "Fixing plumbing issues.","jobStartDate":"2024-06-01","jobEndDate": "2024-06-05","status": "pending","jobAddress": {"street": "123 Job St","suburb": "Westside","city": "Metropolis","postalCode": "67890","complex": "Workplace Plaza","houseNumber": "5C"} }

#### assignedEmployees

- **Data Type:** Object of Employee ids and Team id
- **Relationship:** References employees and teams
- **Reasoning:** Employees and team assigned to the job.
- **Example:** "assignedEmployees": [{"employeesIds": ["60d21b4667d0d8992e610c85",...], "teamId": "60d21b4667d0d8992e610c85"}...] 

#### recordedDetails

- **Data Type:** Object
- **Attributes:**
  - **imagesTaken**
    - **Data Type**: Array of strings (base64 images)
    - **Reasoning:** Images related to the job.
    - **Example:** ["data:image/png;base64,iVBORw0KGgoAAAANS...", "data:image/png;base64,iVBORw0KGgoAAAANS..."]
  - **inventoryUsed**
    - **Data Type:** Array of Object
    - **Reasoning:** Inventory items used for the job.
    - **Example:** [{ "InventoryItem": "60d21b4667d0d8992e610c8a", "QuantityUsed": 2 }]
- **Example:** "recordedDetails": {"imagesTaken":["data:image/png;base64,iVBORw0KGgoAAAANS...","data:image/png;base64,iVBORw0KGgoAAAANS..."],"inventoryUsed":[{"InventoryItem":"60d21b4667d0d8992e610c8a","QuantityUsed":2}]}

#### assignedBy (@Jess may you please add this field to er diagram)

- **Data Type:** Object id
- **Relationship:** References Employees table
- **Reasoning:** Assignee of a job.
- **Example:** "assignedBy": "60d21b4667d0d8992e610c85" 

#### status 

- **Data Type:** string
- **Reasoning:** stores the status of the job
- **Example:** "status": "complete"

#### clientFeedback

- **Data Type:** Object
- **Attributes:**
  - **jobRating:** number (out of 5)
    - **Reasoning:** Overall job rating by the client.
    - **Example:** 4.5
  - **customerServiceRating:** number
    - **Reasoning:** Rating of the customer service by the client.
    - **Example:** 5
  - **comments:** string
    - **Reasoning:** Additional feedback comments from the client.
    - **Example:** "Great service!"
- **Example:** "clientFeedback": {"jobRating": 5, "customerServiceRating": 5, "comments": "Great service!"}

#### taskList

- **Data Type:** Array of Objects
- **Reasoning:** Stores task given to employees for a job
- **Attributes:**
  - **task**: Object
  - **Reasoning:** stores the task name, status and employee assigned to it
  - **Example:** "task" : {"taskName":"Paint north facing wall", "status": "complete", "assignedEmployees" : ["60d21b4667d0d8992e610c8a", ...]}
- **Example:** "taskList": ["task1" : {"taskName":"Paint north facing wall", "status": "complete", "assignedEmployees" : ["60d21b4667d0d8992e610c8a", ...]}, ...]

#### comments

- **Data Type:** Array of Objects
- **Reasoning:** Stores comments made by employees for the job
- **Attributes:**
  - **commentItem**: Object
  - **Reasoning:** stores the comment, employee that made it and the status
  - **Example:** "commentItem" : {"comment":"Roofing needs adjusting", "employeeId" : "60d21b4667d0d8992e610c8a", "commentDate": "2024-06-12" }
- **Example:** "comments": [{"commentItem1" : {"comment":"Roofing needs adjusting", "employeeId" : "60d21b4667d0d8992e610c8a", "commentDate": "2024-06-12" }, ...]

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
- **Example:** "deletedAt": "2024-06-01T10:00:00Z"

### Appointment (@Jess may you please add this field to er diagram, this is in the spec)

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
- **Example:** "deletedAt": "2024-06-01T10:00:00Z" 

### InventoryItem

The InventoryItem entity stores information about items in the company's inventory.

#### _id (Primary Key)

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each inventory item.
- **Example:** "_id": "60d21b4667d0d8992e610c8f"

#### name

- **Data Type:** string
- **Reasoning:** Name of the inventory item.
- **Example:** "name": "Wrench"

#### itemImage

- **Data Type:** string (base64)
- **Reasoning:** Image or icon representing the inventory item.
- **Example:** "itemImage": "data:image/png;base64,iVBORw0KGgoAAAANS..."

#### costPrice

- **Data Type:** double
- **Reasoning:** Cost price of the inventory item.
- **Example:** "costPrice": 15.99

#### currentStockLevel

- **Data Type:** integer
- **Reasoning:** Current stock level of the inventory item.
- **Example:** "currentStockLevel": 50

#### lowStockThreshold

- **Data Type:** integer
- **Reasoning:** Threshold to indicate low stock level.
- **Example:** "lowStockThreshold": 10

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
- **Example:** "deletedAt": "2024-06-01T10:00:00Z"

### Roles

#### _id

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each role.
- **Example:** "_id": "60d21b4667d0d8992e610c8g"

#### roleName

- **Data Type:** string
- **Reasoning:** Name of the role.
- **Example:** "roleName": "Admin"

#### permissionSuite

- **Data Type:** Array of strings
- **Reasoning:** List of permissions associated with the role.
- **Example:** "permissionSuite": ["create", "read", "update", "delete"]

#### companyId

- **Data Type:** ObjectId
- **Reasoning:** References the company the role is associated with.
- **Example:** "companyId": "60d21b466

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
- **Example:** "deletedAt": "2024-06-01T10:00:00Z"

