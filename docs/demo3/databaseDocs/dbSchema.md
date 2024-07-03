# Database Schema

## User

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

#### currentEmployeeId

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier the current employee the user is logged in as.
- **Example:** "currentEmployeeId": "60d21b4667d0d8992e610c85"

## Employee

The Employee entity stores information for employees.

#### _id

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each employee.
- **Example:** "_id": "60d21b4667d0d8992e610c85"

#### role

- **Data Type:** Objects
- **Attributes:**
  - **role:** string
    - **Reasoning:** Defines the user's role (e.g., admin, employee).
    - **Example:**"admin"
  - **permissions:** Array
    - **Reasoning:** Permissions associated with the role.
    - **Example:** ["read", "write", "delete"]
- **Example:** "role": {"role":"admin","permissions":["read","write","delete"]}

#### availability

- **Data Type:** Object
- **Attributes:**
  - **status:** string
    - **Reasoning:** Current availability status of the user.
    - **Example:** "Available"
  - **schedule:** Object
    - **Reasoning:** Weekly schedule for the user.
    - **Example:** {"Monday": "9:00-17:00", "Tuesday": "9:00-17:00"} 

#### skills
- **Data Type:** Array
- **Attributes:**
  - **skillName:** string
    - **Reasoning:** List of skills the user possesses.
    - **Example:** ["JavaScript", "Python"]

#### currentJobAssignments

- **Data Type:** Array of Object ids
- **Reasoning:** References jobs the employee is currently assigned to.
- **Example:** ["60d21b4667d0d8992e610c87"...]
  
#### superior 

- **Data Type:** ObjectId
- **Reasoning:** References the employee's superior.
- **Attributes:**
  - **employeeId:** ObjectId
    - **Reasoning:** Stores a reference to the employeeId in the Employee collection
- **Example:** "superior": "60d21b4667d0d8992e610c87"

#### subordinates

- **Data Type:** Array of Object ids
- **Reasoning:** References the employees under the employee.
- **Attributes:** 
  - **employeeId:** ObjectId
    - **Reasoning:** Stores a reference to the employeeId in the Employee collection
- **Example:** "subordinates": ["60d21b4667d0d8992e610c87"...]

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

## Team

#### _id

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each team.
- **Example:** "_id": "60d21b4667d0d8992e610c85"

#### teamName

- **Data Type:** string
- **Reasoning:** Use of string is logical.
- **Example:** "teamName": "Boolean Hooligans"

#### companyId

- **Data Type:** ObjectId
- **Relationship:** References Company
- **Reasoning:** Associates the job with a specific company.
- **Example:** "companyId": "60d21b4667d0d8992e610c8c"

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
- **Example:** "_id": "60d21b4667d0d8992e610c85"
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

## Company

The Company entity stores information about companies associated with users and jobs.

#### _id (Primary Key)

- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each company.
- **Example:** "_id": "60d21b4667d0d8992e610c89"

#### registrationNumber

- **Data Type:** string
- **Reasoning:** Unique registration number for the company.
- **Example:** "registrationNumber": "REG123456"

#### name

- **Data Type:** string
- **Reasoning:** Name of the company.
- **Example:** "name": "Tech Solutions Inc."

#### type

- **Data Type:** string
- **Reasoning:** Type or industry of the company.
- **Example:** "type": "IT Services"

#### vatNumber

- **Data Type:** string
- **Reasoning:** VAT number for tax purposes.
- **Example:** "vatNumber": "VAT789012"

#### logo

- **Data Type:** string
- **Reasoning:** URL or base64 image string for the company logo.
- **Example:** "logo": "data:image/png;base64,iVBORw0KGgoAAAANS..."

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

#### inventoryItems

- **Data Type:** Array of Object ids
- **Reasoning:** References inventory items owned by the company to track and manage stock efficiently.
- **Attributes:**
  - **inventoryItemId:** ObjectId
    - **Reasoning:** Unique identifier for each inventory item to ensure accurate tracking and referencing.
- **Example:** "inventoryItems": ["60d21b4667d0d8992e610c8a",...]

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

## Client

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

## Job

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

#### assignedEmployees

- **Data Type:** Object of Employee ids and Team id
- **Relationship:** References employees and teams
- **Reasoning:** Employees and team assigned to the job.
- **Example:** "assignedEmployees": {"employeesIds": ["60d21b4667d0d8992e610c85",...], "teamId": "60d21b4667d0d8992e610c85"} 

#### assignedBy (@Jess may you please add this field to er diagram)

- **Data Type:** Object id
- **Relationship:** References Employees table
- **Reasoning:** Assignee of a job.
- **Example:** "assignedBy": "60d21b4667d0d8992e610c85" 

#### status (@Jess may you please add this field to er diagram, I've just made status it's own attribute)

- **Data Type:** string
- **Reasoning:** stores the status of the job
- **Example:** "status": "complete"

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

## InventoryItem

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