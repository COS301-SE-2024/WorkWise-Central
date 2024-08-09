# Database Schema

## User

### System Details
- **username**
  - **Data Type:** String
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** The username of the user.

- **password**
  - **Data Type:** String
  - **Required:** Yes
  - **Unique:** No
  - **Description:** The password for the user, which will be hashed before storage.

### Personal Info
- **firstName**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The first name of the user.

- **surname**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The surname of the user.

- **dateOfBirth**
  - **Data Type:** Date
  - **Required:** Yes
  - **Description:** The date of birth of the user.

- **gender**
  - **Data Type:** String
  - **Required:** Yes
  - **Default:** "Rather Not Say"
  - **Description:** The gender of the user.

- **preferredLanguage**
  - **Data Type:** String
  - **Required:** Yes
  - **Default:** "English"
  - **Description:** The preferred language of the user.

- **contactInfo**
  - **Data Type:** ContactInfo
  - **Required:** No
  - **Description:** The contact information of the user, including phone number and email.

- **address**
  - **Data Type:** Address
  - **Required:** No
  - **Description:** The address of the user.

### Profile
- **displayName**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The display name of the user.

- **displayImage**
  - **Data Type:** String
  - **Required:** No
  - **Default:** "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp"
  - **Description:** The URL of the display image of the user.

### Joined Companies
- **employeeId**
  - **Data Type:** ObjectId (Reference to Employee)
  - **Description:** The ID of the employee associated with the user.

- **companyId**
  - **Data Type:** ObjectId (Reference to Company)
  - **Description:** The ID of the company associated with the user.

- **companyName**
  - **Data Type:** String
  - **Description:** The name of the company associated with the user.

### Skills
- **skills**
  - **Data Type:** Array of Strings
  - **Required:** No
  - **Default:** []
  - **Description:** A list of skills associated with the user.

### Device IDs
- **deviceIds**
  - **Data Type:** Array of Strings
  - **Required:** No
  - **Default:** []
  - **Description:** A list of device IDs associated with the user.

### Current Employee
- **currentEmployee**
  - **Data Type:** ObjectId (Reference to Employee)
  - **Required:** No
  - **Description:** The current employee ID associated with the user.

### Is Validated
- **isValidated**
  - **Data Type:** Boolean
  - **Required:** No
  - **Default:** false
  - **Description:** Indicates whether the user has been validated.

### Timestamps
- **createdAt**
  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current Date
  - **Description:** The date the user was created.

- **updatedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Description:** The date the user was last updated.

- **deletedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Description:** The date the user was deleted (soft delete).


### ContactInfo
- **phoneNumber**
  - **Data Type:** String
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** The user's phone number.

- **email**
  - **Data Type:** String
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** The user's email address, stored in lowercase.

### Address
- **street**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The street address of the user.

- **province**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The province of the user.

- **suburb**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The suburb of the user.

- **city**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The city of the user.

- **postalCode**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The postal code of the user.

- **complex**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The complex name of the user, if applicable.

- **houseNumber**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The house number of the user, if applicable.

### Profile
- **displayName**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The display name of the user.

- **displayImage**
  - **Data Type:** String
  - **Required:** No
  - **Default:** "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp"
  - **Description:** The URL of the display image of the user.

### JoinedCompany
- **employeeId**
  - **Data Type:** ObjectId
  - **Description:** The employee ID associated with the joined company.

- **companyId**
  - **Data Type:** ObjectId
  - **Description:** The company ID associated with the joined company.

- **companyName**
  - **Data Type:** String
  - **Description:** The company name associated with the joined company.


## Employee

- **id**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** The unique ID of the employee.

- **superiorId**
  - **Data Type:** ObjectId (Reference to `Employee`)
  - **Required:** No
  - **Description:** The ID of the superior employee.

- **subordinates**
  - **Data Type:** Array of ObjectIds (Reference to `Employee`)
  - **Required:** Yes
  - **Default:** []
  - **Description:** A list of subordinate employees.

- **subordinateTeams**
  - **Data Type:** Array of ObjectIds (Reference to `Team`)
  - **Required:** Yes
  - **Default:** []
  - **Description:** A list of subordinate teams.

- **userId**
  - **Data Type:** ObjectId (Reference to `User`)
  - **Required:** Yes
  - **Description:** The ID of the associated user.

- **companyId**
  - **Data Type:** ObjectId (Reference to `Company`)
  - **Required:** Yes
  - **Description:** The ID of the company.

- **currentJobAssignments**
  - **Data Type:** Array of ObjectIds (Reference to `Job`)
  - **Required:** Yes
  - **Default:** []
  - **Description:** A list of current job assignments.

- **createdAt**
  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** New `Date()`
  - **Description:** The date the employee was created.

- **updatedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Description:** The date the employee was last updated.

- **deletedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Description:** The date the employee was deleted (soft delete).

### role

- **roleId**
  - **Data Type:** ObjectId (Reference to `Role`)
  - **Required:** Yes
  - **Description:** The ID of the role.

- **permissionSuite**
  - **Data Type:** Array of Strings
  - **Required:** Yes
  - **Description:** A list of permissions associated with the role.

- **roleName**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The name of the role.

### UserInfo

- **username**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The username of the user.

- **firstName**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The first name of the user.

- **surname**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The surname of the user.

- **displayName**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The display name of the user.

- **displayImage**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The display image URL of the user.

## Team

- **id**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** The unique ID of the team.

- **companyId**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The ID of the company associated with the team.

- **teamName**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The name of the team.

- **teamMembers**
  - **Data Type:** Array of ObjectIds
  - **Required:** Yes
  - **Description:** A list of team member IDs.

- **teamLeaderId**
  - **Data Type:** ObjectId (Optional)
  - **Required:** No
  - **Description:** The ID of the team leader, if applicable.

- **currentJobAssignments**
  - **Data Type:** Array of ObjectIds
  - **Required:** Yes
  - **Default:** []
  - **Description:** A list of current job assignments associated with the team.

- **createdAt**
  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** New `Date()`
  - **Description:** The date the team was created.

- **updatedAt**
  - **Data Type:** Date (Optional)
  - **Required:** No
  - **Description:** The date the team was last updated.

- **deletedAt**
  - **Data Type:** Date (Optional)
  - **Required:** No
  - **Description:** The date the team was deleted (soft delete).


## Company

- **id**
  - **Data Type:** ObjectId
  - **Description:** The unique ID of the company.

- **registrationNumber**
  - **Data Type:** String
  - **Description:** The registration number of the company.

- **vatNumber**
  - **Data Type:** String
  - **Description:** The VAT number of the company.

- **name**
  - **Data Type:** String
  - **Description:** The name of the company.

- **type**
  - **Data Type:** String (Optional)
  - **Description:** The type or category of the company.

- **logo**
  - **Data Type:** String
  - **Default:** `'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'`
  - **Description:** The URL of the company's logo.

- **contactDetails**
  - **Data Type:** `ContactDetails`
  - **Description:** The contact details of the company.

- **private**
  - **Data Type:** Boolean
  - **Description:** Indicates whether the company is private.

- **createdAt**
  - **Data Type:** Date
  - **Description:** The date the company was created.

- **updatedAt**
  - **Data Type:** Date (Optional)
  - **Description:** The date the company was last updated.

- **deletedAt**
  - **Data Type:** Date (Optional)
  - **Description:** The date the company was deleted (soft delete).

## Client

- **_id**
  - **Data Type:** ObjectId (Optional)
  - **Description:** The unique ID of the client.

- **registrationNumber**
  - **Data Type:** String (Optional)
  - **Description:** The registration number of the client.

- **createdAt**
  - **Data Type:** Date
  - **Description:** The date when the client was created.

- **updatedAt**
  - **Data Type:** Date (Optional)
  - **Description:** The date when the client was last updated.

## ClientDetails

- **firstName**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The first name of the client.

- **lastName**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The last name of the client.

- **preferredLanguage**
  - **Data Type:** String (Optional)
  - **Required:** No
  - **Default:** `'English'`
  - **Description:** The preferred language of the client.

- **contactInfo**
  - **Data Type:** `ContactInfo` (Optional)
  - **Required:** No
  - **Description:** The contact information of the client, including phone number and email.

- **vatNumber**
  - **Data Type:** String (Optional)
  - **Required:** No
  - **Description:** The VAT number of the client (if applicable).

- **companyId**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The ID of the company to which the client belongs.

- **idNumber**
  - **Data Type:** String (Optional)
  - **Required:** No
  - **Description:** The ID number of the client (if applicable).

- **type**
  - **Data Type:** String (Optional)
  - **Required:** No
  - **Description:** The type or category of the client.

#### Address

- **street**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The street address of the company.

- **province**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The province where the company is located.

- **suburb**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The suburb where the company is located.

- **city**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The city where the company is located.

- **postalCode**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The postal code of the company's location.

#### ContactInfo

- **phoneNumber**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The phone number of the client.

- **email**
  - **Data Type:** String
  - **Required:** Yes
  - **Unique:** Yes (within the company)
  - **Lowercase:** Yes
  - **Trim:** Yes
  - **Description:** The email address of the client. Unique within the company, rather than the entire database.


## Job

- **_id**
  - **Data Type:** ObjectId (Optional)
  - **Description:** The unique ID of the client.

- **companyId**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The ID of the company to which the job belongs.

- **clientId**
  - **Data Type:** ObjectId (Optional)
  - **Default:** `null`
  - **Description:** The ID of the client for whom the job is performed.

- **assignedBy**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The ID of the employee who assigned the job.

- **assignedEmployees**
  - **Data Type:** `AssignedEmployees` (Optional)
  - **Default:** New `AssignedEmployees()`
  - **Description:** The employees and teams assigned to the job.

- **status**
  - **Data Type:** ObjectId (Optional)
  - **Default:** `null`
  - **Description:** The current status of the job.

- **tags**
  - **Data Type:** Array of ObjectIds (Optional)
  - **Default:** `[]`
  - **Description:** Tags associated with the job.

- **priorityTag**
  - **Data Type:** ObjectId (Optional)
  - **Default:** `null`
  - **Description:** The priority tag associated with the job.

- **attachments**
  - **Data Type:** Array of Strings (Optional)
  - **Default:** `null`
  - **Description:** File attachments related to the job.

- **details**
  - **Data Type:** `Details`
  - **Required:** Yes
  - **Description:** Detailed information about the job.

- **recordedDetails**
  - **Data Type:** `RecordedDetails` (Optional)
  - **Default:** New `RecordedDetails()`
  - **Description:** Recorded details such as images and inventory used during the job.

- **clientFeedback**
  - **Data Type:** `ClientFeedback` (Optional)
  - **Description:** Feedback from the client regarding the job.

- **taskList**
  - **Data Type:** Array of `Task` (Optional)
  - **Default:** `[]`
  - **Description:** A list of tasks associated with the job.

- **history**
  - **Data Type:** Array of `History`
  - **Required:** Yes
  - **Default:** `[]`
  - **Description:** The history of events related to the job.

- **comments**
  - **Data Type:** Array of `Comment` (Optional)
  - **Default:** `[]`
  - **Description:** Comments made by employees on the job.

- **createdAt**
  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current date
  - **Description:** The date when the job was created.

- **updatedAt**
  - **Data Type:** Date (Optional)
  - **Description:** The date when the job was last updated.

- **deletedAt**
  - **Data Type:** Date (Optional)
  - **Description:** The date when the job was deleted (soft delete).

### ClientFeedback

- **jobRating**
  - **Data Type:** Number (Optional)
  - **Default:** 10
  - **Description:** The rating given by the client for the job itself.

- **customerServiceRating**
  - **Data Type:** Number (Optional)
  - **Default:** 10
  - **Description:** The rating given by the client for customer service.

- **comments**
  - **Data Type:** String (Optional)
  - **Default:** `''`
  - **Description:** Additional comments from the client about the job.

### Details

- **heading**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The heading or title of the job.

- **description**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** A detailed description of the job.

- **address**
  - **Data Type:** `Address`
  - **Required:** Yes
  - **Description:** The address where the job will take place.

- **startDate**
  - **Data Type:** Date
  - **Required:** Yes
  - **Description:** The start date of the job.

- **endDate**
  - **Data Type:** Date (Optional)
  - **Description:** The end date of the job (if applicable).

#### Address

- **street**
  - **Data Type:** String (Optional)
  - **Description:** The street address where the job is located.

- **province**
  - **Data Type:** String (Optional)
  - **Description:** The province where the job is located.

- **suburb**
  - **Data Type:** String (Optional)
  - **Description:** The suburb where the job is located.

- **city**
  - **Data Type:** String (Optional)
  - **Description:** The city where the job is located.

- **postalCode**
  - **Data Type:** String (Optional)
  - **Description:** The postal code of the job's location.

- **complex**
  - **Data Type:** String (Optional)
  - **Description:** The complex name (if applicable).

- **houseNumber**
  - **Data Type:** String (Optional)
  - **Description:** The house number (if applicable).

### RecordedDetails

- **imagesTaken**
  - **Data Type:** Array of Strings (Optional)
  - **Default:** `[]`
  - **Description:** An array of image URLs taken during the job.

- **inventoryUsed**
  - **Data Type:** Array of `InventoryUsed` (Optional)
  - **Default:** `[]`
  - **Description:** A list of inventory items used during the job.

#### InventoryUsed

- **inventoryItemId**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The ID of the inventory item used in the job.

- **inventoryItemName**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The name of the inventory item used.

- **quantityUsed**
  - **Data Type:** Number
  - **Required:** Yes
  - **Default:** 0
  - **Description:** The quantity of the inventory item used.

### AssignedEmployees

- **employeeIds**
  - **Data Type:** Array of ObjectIds (Optional)
  - **Default:** `[]`
  - **Description:** A list of IDs of employees assigned to the job.

- **teamIds**
  - **Data Type:** Array of ObjectIds (Optional)
  - **Default:** `[]`
  - **Description:** A list of IDs of teams assigned to the job.

### Task

- **_id**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Default:** New `ObjectId()`
  - **Description:** The unique ID of the task.

- **name**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The name of the task.

- **status**
  - **Data Type:** String
  - **Required:** Yes
  - **Default:** `'To do'`
  - **Description:** The current status of the task (e.g., To do, In progress, Done).

- **assignedEmployees**
  - **Data Type:** Array of ObjectIds (Optional)
  - **Default:** `[]`
  - **Description:** A list of employee IDs assigned to this task.

### History

- **event**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** A description of the event in the job's history.

- **timestamp**
  - **Data Type:** Date
  - **Required:** Yes
  - **Description:** The timestamp when the event occurred.

### Comment

- **_id**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Default:** New `ObjectId()`
  - **Description:** The unique ID of the comment.

- **employeeId**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The ID of the employee who made the comment.

- **comment**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The text of the comment.

- **edited**
  - **Data Type:** Boolean
  - **Required:** Yes
  - **Default:** `false`
  - **Description:** Whether the comment has been edited.

- **date**
  - **Data Type:** Date (Optional)
  - **Default:** Current date
  - **Description:** The date when the comment was made or last edited.

## Inventory
- **id**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The unique ID of the inventory item.

- **name**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The name of the inventory item.

- **description**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** A brief description of the inventory item.

- **costPrice**
  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** The cost price of the inventory item.

- **currentStockLevel**
  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** The current stock level of the inventory item.

- **reorderLevel**
  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** The stock level at which the inventory item needs to be reordered.

- **companyId**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The ID of the company to which the inventory item belongs.

- **createdAt**
  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current date
  - **Description:** The date when the inventory item was created.

- **updatedAt**
  - **Data Type:** Date (Optional)
  - **Description:** The date when the inventory item was last updated.

- **deletedAt**
  - **Data Type:** Date (Optional)
  - **Description:** The date when the inventory item was deleted (soft delete).

## Role

- **id**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The unique ID of the role.

- **roleName**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The name of the role.

- **permissionSuite**
  - **Data Type:** Array of Strings
  - **Required:** Yes
  - **Default:** ['view all jobs assigned to me', 'view all clients that are assigned to me', 'record inventory use']
  - **Description:** The set of permissions associated with the role.

- **companyId**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The ID of the company to which the role belongs.

- **createdAt**
  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current date
  - **Description:** The date when the role was created.

- **updatedAt**
  - **Data Type:** Date (Optional)
  - **Description:** The date when the role was last updated.

- **deletedAt**
  - **Data Type:** Date (Optional)
  - **Description:** The date when the role was deleted (soft delete).

## Message

### Properties

- **token**
  - **Data Type:** String (Optional)
  - **Default:** ''
  - **Description:** A token associated with the message.

- **title**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The title of the message.

- **body**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The body content of the message.

- **data**
  - **Data Type:** Any (Optional)
  - **Description:** Additional data associated with the message.

## Notification

- **senderId**
  - **Data Type:** ObjectId (Optional)
  - **Description:** The ID of the sender. This can reference an `Employee` entity but is not required.

- **recipientId**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The ID of the recipient. This must reference an `Employee` entity.

- **message**
  - **Data Type:** `Message`
  - **Required:** Yes
  - **Description:** The message details, including title, body, token, and additional data.

- **isRead**
  - **Data Type:** Boolean
  - **Required:** Yes
  - **Default:** false
  - **Description:** Indicates whether the notification has been read.

- **createdAt**
  - **Data Type:** Date
  - **Default:** Current date
  - **Description:** The date when the notification was created.
