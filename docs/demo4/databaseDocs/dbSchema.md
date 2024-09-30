# Database Schema

## ChatMessage

- **\_id**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** The id of the chat message.

- **chatId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Indexed:** Yes
  - **References:** Chat
  - **Description:** The id of the chat the message belongs to.

- **userId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Indexed:** Yes
  - **References:** User
  - **Description:** The id of the user who sent the message.

- **textContent**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The content of the chat message.

- **usersWhoHaveReadMessage**

  - **Data Type:** Array of ObjectIds
  - **Required:** Yes
  - **Default Value:** `[]`
  - **Description:** The ids of users who have read the message.

- **attachments**

  - **Data Type:** Array of Strings
  - **Required:** No
  - **Default Value:** `[]`
  - **Description:** Optional list of attachment URLs related to the message.

- **createdAt**
  - **Data Type:** Date
  - **Required:** No
  - **Default Value:** Current Date
  - **Description:** The timestamp when the message was created.

## Chat

- **\_id**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** The id of the chat.

- **name**

  - **Data Type:** String
  - **Required:** Yes
  - **Default Value:** Randomly generated string
  - **Description:** The name of the chat.

- **description**

  - **Data Type:** String
  - **Required:** Yes
  - **Default Value:** `''`
  - **Description:** A short description of the chat.

- **image**

  - **Data Type:** String
  - **Required:** Yes
  - **Default Value:** `'https://img.icons8.com/?size=100&id=105326&format=png&color=000000'`
  - **Description:** The URL of the chat's image.

- **admin**

  - **Data Type:** ObjectId
  - **Required:** No
  - **References:** User
  - **Description:** The id of the admin of the chat.

- **participants**

  - **Data Type:** Array of ObjectIds
  - **Required:** Yes
  - **References:** User
  - **Description:** The ids of users participating in the chat.

- **createdAt**

  - **Data Type:** Date
  - **Required:** No
  - **Default Value:** Current Date
  - **Description:** The timestamp when the chat was created.

- **updatedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Default Value:** Current Date
  - **Description:** The timestamp when the chat was last updated.

## Client

- **\_id**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** The id of the client.

- **registrationNumber**

  - **Data Type:** String
  - **Required:** No
  - **Description:** The registration number of the client, if applicable.

- **details**

  - **Data Type:** ClientDetails
  - **Required:** Yes
  - **Description:** Contains detailed information about the client.

- **createdAt**

  - **Data Type:** Date
  - **Required:** No
  - **Default Value:** Current Date
  - **Description:** The timestamp when the client record was created.

- **updatedAt**

  - **Data Type:** Date
  - **Required:** No
  - **Description:** The timestamp when the client record was last updated.

- **deletedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Description:** The timestamp when the client record was deleted (if applicable).

### ClientDetails

- **firstName**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The first name of the client.

- **lastName**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The last name of the client.

- **preferredLanguage**

  - **Data Type:** String
  - **Required:** No
  - **Default Value:** `'English'`
  - **Description:** The client's preferred language.

- **contactInfo**

  - **Data Type:** ContactInfo
  - **Required:** No
  - **Description:** The contact information of the client, including phone number and email.

- **address**

  - **Data Type:** Address
  - **Required:** No
  - **Description:** The physical address of the client.

- **vatNumber**

  - **Data Type:** String
  - **Required:** No
  - **Description:** The VAT number of the client.

- **companyId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **References:** Company
  - **Description:** The id of the company to which the client belongs.

- **idNumber**

  - **Data Type:** String
  - **Required:** No
  - **Description:** The identification number of the client.

- **type**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The type of client.

### ContactInfo

- **phoneNumber**

  - **Data Type:** String
  - **Required:** No
  - **Description:** The phone number of the client.

- **email**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The email address of the client, should be unique within the company.

### Address

- **street**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The street address of the client.

- **suburb**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The suburb of the client.

- **province**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The province of the client.

- **city**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The city of the client.

- **postalCode**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The postal code of the client.

- **complexOrBuilding**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The complex or building name, if applicable.

## Company

- **\_id**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** Unique identifier for each company.

- **registrationNumber**

  - **Data Type:** String
  - **Required:** No
  - **Description:** The company's registration number.

- **vatNumber**

  - **Data Type:** String
  - **Required:** No
  - **Description:** The company's VAT number.

- **name**

  - **Data Type:** String
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** The name of the company.

- **type**

  - **Data Type:** String
  - **Required:** No
  - **Description:** The type of company (e.g., Private, Public).

- **jobStatuses**

  - **Data Type:** Array of ObjectId
  - **Required:** Yes
  - **References:** JobStatus entity
  - **Default:** []
  - **Description:** List of job statuses related to the company.

- **logo**

  - **Data Type:** String
  - **Required:** No
  - **Default Value:** `https://www.gravatar.com/...`
  - **Description:** URL to the company’s logo.

- **contactDetails**

  - **Data Type:** ContactDetails
  - **Required:** Yes
  - **Description:** Company’s contact information (phone number, email).

- **address**

  - **Data Type:** Address
  - **Required:** Yes
  - **Description:** Company’s address details (street, city, province, etc.).

- **accountDetails**

  - **Data Type:** AccountDetails
  - **Required:** Yes
  - **Description:** Payment-related information for the company (merchant ID, key, passphrase).

- **private**

  - **Data Type:** Boolean
  - **Required:** Yes
  - **Default Value:** `false`
  - **Description:** Indicates if the company is private or not.

- **createdAt**

  - **Data Type:** Date
  - **Required:** No
  - **Default Value:** Current date
  - **Description:** Timestamp when the company was created.

- **updatedAt**

  - **Data Type:** Date
  - **Required:** No
  - **Description:** Timestamp when the company was last updated.

- **deletedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Description:** Timestamp when the company was marked as deleted (if applicable).

### ContactDetails

- **phoneNumber**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The company's contact phone number.

- **email**
  - **Data Type:** String
  - **Required:** Yes
  - **Lowercase, Indexed**
  - **Description:** The company's contact email.

### Address

- **street**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The street address of the company.

- **province**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The province in which the company is located.

- **suburb**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The suburb of the company’s location.

- **city**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The city where the company is based.

- **postalCode**
  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The postal code of the company.

### AccountDetails

- **merchantId**

  - **Data Type:** String
  - **Required:** No
  - **Description:** The company's payment merchant ID.

- **merchantKey**

  - **Data Type:** String
  - **Required:** No
  - **Description:** The company's payment merchant key.

- **passPhrase**
  - **Data Type:** String
  - **Required:** No
  - **Description:** The payment passphrase for the company.

## Employee

- **\_id**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** Unique identifier for each employee.

- **role**

  - **Data Type:** Object
  - **Required:** Yes
  - **Default:** new roleObject()
  - **Description:** Employee's role, including the role ID, permissions, and role name.

- **superiorId**

  - **Data Type:** ObjectId
  - **Required:** No
  - **Description:** ID of the superior (if applicable) to whom the employee reports.

- **subordinates**

  - **Data Type:** Array of ObjectIds
  - **Required:** Yes
  - **Default:** []
  - **Description:** List of subordinate employee IDs under this employee's supervision.

- **teams**

  - **Data Type:** Array of ObjectIds
  - **Required:** Yes
  - **Default:** []
  - **Description:** List of team IDs the employee belongs to.

- **userId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** Reference to the associated user entity.

- **userInfo**

  - **Data Type:** Object
  - **Required:** No
  - **Default:** new UserInfo()
  - **Description:** Optional detailed information about the user, such as username, first name, and display name.

- **companyId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** ID of the company the employee belongs to.

- **hourlyRate**

  - **Data Type:** Number
  - **Required:** Yes
  - **Default:** 0
  - **Description:** The employee's hourly rate of pay.

- **currentJobAssignments**

  - **Data Type:** Array of ObjectIds
  - **Required:** Yes
  - **Default:** []
  - **Description:** List of job IDs the employee is currently assigned to.

- **currentTaskAssignments**

  - **Data Type:** Array of ObjectIds
  - **Required:** Yes
  - **Default:** []
  - **Description:** List of task IDs the employee is currently assigned to.

- **createdAt**

  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current date
  - **Description:** The date and time when the employee record was created.

- **updatedAt**

  - **Data Type:** Date
  - **Required:** No
  - **Description:** The date and time when the employee record was last updated.

- **deletedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Description:** The date and time when the employee record was deleted (if applicable).

## Inventory

- **\_id**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** Unique identifier for each inventory item.

- **name**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** The name of the inventory item.

- **description**

  - **Data Type:** String
  - **Required:** No
  - **Description:** A description of the inventory item.

- **costPrice**

  - **Data Type:** Number
  - **Required:** No
  - **Description:** The cost price of the inventory item.

- **salePrice**

  - **Data Type:** Number
  - **Required:** No
  - **Description:** The sale price of the inventory item.

- **currentStockLevel**

  - **Data Type:** Number
  - **Required:** No
  - **Default:** 0
  - **Description:** The current stock level of the inventory item.

- **images**

  - **Data Type:** Array of Strings
  - **Required:** No
  - **Default:** []
  - **Description:** An array of image URLs for the inventory item.

- **reorderLevel**

  - **Data Type:** Number
  - **Required:** No
  - **Description:** The stock level at which the item should be reordered.

- **companyId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** ID of the company the inventory item belongs to.

- **createdAt**

  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current date
  - **Description:** The date and time when the inventory item was created.

- **updatedAt**

  - **Data Type:** Date
  - **Required:** No
  - **Description:** The date and time when the inventory item was last updated.

- **deletedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Description:** The date and time when the inventory item was deleted (if applicable).

## InventoryUsed

- **\_id**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** Unique identifier for the inventory usage record.

- **amount**

  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** The amount of the inventory item used.

- **companyId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** ID of the company associated with the inventory usage.

- **inventoryId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** ID of the inventory item that was used.

- **jobId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** ID of the job associated with the inventory usage.

- **employeeId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** ID of the employee who used the inventory item.

- **createdAt**

  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current date
  - **Description:** The date and time when the inventory usage record was created.

- **updatedAt**

  - **Data Type:** Date
  - **Required:** No
  - **Description:** The date and time when the inventory usage record was last updated.

- **deletedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Description:** The date and time when the inventory usage record was deleted (if applicable).

## Items

- **description**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** Description of the invoice item.

- **quantity**

  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** Quantity of the invoice item.

- **unitPrice**

  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** Price per unit of the invoice item.

- **discount**

  - **Data Type:** Number
  - **Required:** No
  - **Description:** Discount applied to the invoice item.

- **total**
  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** Total amount for the invoice item (after discount).

## Invoice

- **\_id**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** Unique identifier for the invoice.

- **invoiceNumber**

  - **Data Type:** Number
  - **Required:** Yes
  - **Unique:** Yes
  - **Description:** Unique number assigned to the invoice.

- **invoiceDate**

  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current date
  - **Description:** Date when the invoice was issued.

- **paymentDate**

  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current date
  - **Description:** Date when the payment was made.

- **subTotal**

  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** Total amount before tax and discounts.

- **total**

  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** Total amount after tax and discounts.

- **taxAmount**

  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** Amount of tax applied to the invoice.

- **taxPercentage**

  - **Data Type:** Number
  - **Required:** Yes
  - **Description:** Percentage of tax applied to the invoice.

- **paid**

  - **Data Type:** Boolean
  - **Required:** Yes
  - **Default:** false
  - **Description:** Indicates whether the invoice has been paid.

- **receiptOfPaymentDate**

  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current date
  - **Description:** Date when the receipt of payment was issued.

- **clientId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** ID of the client associated with the invoice.

- **jobId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** ID of the job associated with the invoice.

- **companyId**

  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** ID of the company associated with the invoice.

- **inventoryItems**

  - **Data Type:** Array of Items
  - **Required:** Yes
  - **Description:** Array of items related to inventory.

- **laborItems**

  - **Data Type:** Array of Items
  - **Required:** Yes
  - **Description:** Array of items related to labor.

- **createdAt**

  - **Data Type:** Date
  - **Required:** Yes
  - **Default:** Current date
  - **Description:** Date when the invoice record was created.

- **updatedAt**

  - **Data Type:** Date
  - **Required:** No
  - **Description:** Date when the invoice record was last updated.

- **deletedAt**
  - **Data Type:** Date
  - **Required:** No
  - **Description:** Date when the invoice record was deleted (if applicable).

## JobStatus

- **status**

  - **Data Type:** String
  - **Required:** Yes
  - **Description:** Represents the current status of the job.

- **colour**

  - **Data Type:** String
  - **Required:** No
  - **Default Value:** `#1a89c4`
  - **Description:** Represents the color associated with the job status, stored as a hex value. It defaults to a specific blue color if not provided.

- **companyId**
  - **Data Type:** ObjectId
  - **Required:** Yes
  - **Description:** The ID of the company associated with the job status, creating a relationship to the `Company` schema.

## JobTag Class

- **label**

  - **Data Type:** `String`
  - **Required:** `Yes`
  - **Description:** The label or name of the job tag.

- **colour**

  - **Data Type:** `String`
  - **Required:** `No`
  - **Default Value:** `#1a89c4`
  - **Description:** The color associated with the job tag, represented as a hex value. Defaults to a specific blue color if not provided.

- **companyId**
  - **Data Type:** `ObjectId`
  - **Required:** `Yes`
  - **Description:** The ID of the company associated with the job tag, establishing a reference to the `Company` schema.

## Job Class

- **\_id**

  - **Data Type:** `ObjectId`
  - **Required:** `Yes`
  - **Description:** Unique identifier for the job, automatically generated.

- **companyId**

  - **Data Type:** `ObjectId`
  - **Required:** `Yes`
  - **Description:** The ID of the company associated with the job, establishing a reference to the `Company` schema.

- **clientId**

  - **Data Type:** `ObjectId`
  - **Required:** `No`
  - **Default Value:** `null`
  - **Description:** The ID of the client associated with the job, establishing a reference to the `Client` schema.

- **assignedBy**

  - **Data Type:** `ObjectId`
  - **Required:** `Yes`
  - **Description:** The ID of the employee who assigned the job, establishing a reference to the `Employee` schema.

- **assignedEmployees**

  - **Data Type:** `AssignedEmployees`
  - **Required:** `No`
  - **Default Value:** A new instance of `AssignedEmployees`.
  - **Description:** Contains the IDs of employees and teams assigned to the job.

- **status**

  - **Data Type:** `ObjectId`
  - **Required:** `Yes`
  - **Description:** The ID of the job status, establishing a reference to the `JobStatus` schema.

- **tags**

  - **Data Type:** `[ObjectId]`
  - **Required:** `No`
  - **Default Value:** `[]`
  - **Description:** An array of IDs for job tags, establishing references to the `JobTag` schema.

- **priorityTag**

  - **Data Type:** `ObjectId`
  - **Required:** `No`
  - **Default Value:** `null`
  - **Description:** The ID of the priority tag associated with the job, establishing a reference to the `JobPriorityTag` schema.

- **attachments**

  - **Data Type:** `[String]`
  - **Required:** `No`
  - **Default Value:** `[]`
  - **Description:** An array of attachment URLs related to the job.

- **coverImage**

  - **Data Type:** `String`
  - **Required:** `No`
  - **Default Value:** `''`
  - **Description:** URL of the cover image associated with the job.

- **details**

  - **Data Type:** `Details`
  - **Required:** `Yes`
  - **Description:** Detailed information about the job, including heading, description, address, start date, and end date.

- **recordedDetails**

  - **Data Type:** `RecordedDetails`
  - **Required:** `No`
  - **Description:** Additional details recorded for the job, such as images taken and inventory used.

- **clientFeedback**

  - **Data Type:** `ClientFeedback`
  - **Required:** `No`
  - **Description:** Feedback received from the client regarding the job.

- **taskList**

  - **Data Type:** `[Task]`
  - **Required:** `No`
  - **Default Value:** `[]`
  - **Description:** An array of tasks associated with the job.

- **history**

  - **Data Type:** `[History]`
  - **Required:** `Yes`
  - **Default Value:** `[]`
  - **Description:** An array of history entries related to the job.

- **comments**

  - **Data Type:** `[Comment]`
  - **Required:** `Yes`
  - **Default Value:** `[]`
  - **Description:** An array of comments associated with the job.

- **createdAt**

  - **Data Type:** `Date`
  - **Required:** `No`
  - **Default Value:** Current date
  - **Description:** The date when the job was created.

- **updatedAt**

  - **Data Type:** `Date`
  - **Required:** `No`
  - **Description:** The date when the job was last updated.

- **deletedAt**
  - **Data Type:** `Date`
  - **Required:** `No`
  - **Description:** The date when the job was marked as deleted.

## Notification

- **`_id`**: Unique identifier for the notification.
- **`senderId`**: ID of the sender (user) of the notification.
- **`recipientId`**: ID of the recipient (user) of the notification.
- **`message`**: Contains the message details.
  - **`token`**: (optional) Token related to the notification.
  - **`title`**: Title of the notification.
  - **`body`**: Body content of the notification.
  - **`data`**: (optional) Additional data related to the notification.
- **`isRead`**: Boolean indicating if the notification has been read (default: `false`).
- **`isJobRelated`**: Boolean indicating if the notification is related to a job (default: `false`).
- **`companyName`**: Name of the company associated with the notification (default: `null`).
- **`status`**: Current status of the notification (default: `ACTIVE`).
- **`createdAt`**: Date and time when the notification was created (default: current date).

## Role

- **`_id`**: Unique identifier for the role.
- **`roleName`**: Name of the role (required).
- **`permissionSuite`**: Array of permissions associated with the role (default: `['view all jobs assigned to me', 'view all clients that are assigned to me', 'record inventory use']`).
- **`companyId`**: ID of the company associated with the role (required).
- **`hourlyRate`**: (optional) Hourly rate for the role.
- **`createdAt`**: Date and time when the role was created (default: current date).
- **`updatedAt`**: (optional) Date and time when the role was last updated.
- **`deletedAt`**: (optional) Date and time when the role was deleted.

## StockMovements

- **`_id`**: Unique identifier for the stock movement.
- **`reason`**: Reason for the stock movement (required).
- **`movement`**: Quantity of the stock movement (required).
- **`employee`**: Details of the employee associated with the stock movement (required).
  - **`employeeId`**: ID of the employee (required).
  - **`username`**: (optional) Username of the employee.
  - **`firstName`**: (optional) First name of the employee.
  - **`surname`**: (optional) Surname of the employee.
  - **`displayName`**: (optional) Display name of the employee.
- **`inventoryItem`**: Details of the inventory item being moved (required).
  - **`inventoryId`**: ID of the inventory (required).
  - **`nameOfItem`**: (optional) Name of the item.
- **`movementDate`**: Date of the movement (default: current date).
- **`companyId`**: ID of the company associated with the stock movement (required).
- **`createdAt`**: Date and time when the stock movement was created (default: current date).
- **`updatedAt`**: (optional) Date and time when the stock movement was last updated.
- **`deletedAt`**: (optional) Date and time when the stock movement was deleted.

## StockTake

- **`date`**: Date of the stock take (default: current date, required).
- **`items`**: List of items included in the stock take (required).
  - **`currentStockLevel`**: Current stock level of the item (required).
  - **`recordedStockLevel`**: Recorded stock level of the item (required).
  - **`inventoryItem`**: Reference to the inventory item (required).
    - **`inventoryId`**: ID of the inventory item (required).
    - **`name`**: Name of the inventory item (required).
- **`companyId`**: ID of the company associated with the stock take (required).
- **`createdAt`**: Date and time when the stock take was created (default: current date).
- **`updatedAt`**: (optional) Date and time when the stock take was last updated.
- **`deletedAt`**: (optional) Date and time when the stock take was deleted.

## Team

- **`companyId`**: The ID of the company associated with the team (required).
- **`teamName`**: The name of the team (required).
- **`teamMembers`**: An array of employee IDs who are members of the team (required, default: empty array).
- **`teamLeaderId`**: The ID of the team leader (optional).
- **`currentJobAssignments`**: An array of job assignment IDs currently assigned to the team (default: empty array).
- **`createdAt`**: Date and time when the team was created (default: current date).
- **`updatedAt`**: (optional) Date and time when the team was last updated.
- **`deletedAt`**: (optional) Date and time when the team was deleted.

## TimeInterval

- **`start`**: The start time of a time interval (required, defaults to `null`).
- **`end`**: The end time of a time interval (optional).

## TimeTracker

- **`employeeId`**: The ID of the employee associated with the time tracking (required, references `Employee`).
- **`jobId`**: The ID of the job being worked on (required, references `Job`).
- **`companyId`**: The ID of the company the employee is working for (required, references `Company`).
- **`checkInTime`**: The time when the employee checked in (required, defaults to the current date).
- **`checkOutTime`**: The time when the employee checked out (optional, defaults to `null`).
- **`pauses`**: An array of `TimeInterval` objects representing breaks or pauses during the job (optional, defaults to an empty array).
- **`createdAt`**: The time when the record was created (required, defaults to the current date).

## SystemDetails

- **`username`**: The unique username of the user (required).
- **`password`**: The password for the user (required).

## ContactInfo

- **`phoneNumber`**: The unique phone number of the user (required).
- **`email`**: The unique email address of the user, stored in lowercase (required).

## Address

- **`street`**: The street address of the user (required).
- **`province`**: The province of the user (required).
- **`suburb`**: The suburb where the user resides (required).
- **`city`**: The city where the user resides (required).
- **`postalCode`**: The postal code of the user's address (required).
- **`complex`**: The complex where the user resides (optional).
- **`houseNumber`**: The house number of the user's residence (optional).

## PersonalInfo

- **`firstName`**: The first name of the user (required).
- **`surname`**: The surname of the user (required).
- **`dateOfBirth`**: The date of birth of the user (required).
- **`gender`**: The gender of the user, defaults to 'Rather Not Say' (optional).
- **`preferredLanguage`**: The preferred language of the user (required).
- **`contactInfo`**: Contact information containing phone number and email (optional).
- **`address`**: The address of the user (optional).

## Profile

- **`displayName`**: The display name of the user (required).
- **`displayImage`**: The URL for the user's display image, defaults to a Gravatar image (optional).

## JoinedCompany

- **`employeeId`**: The ID of the employee (optional, references `Employee`).
- **`companyId`**: The ID of the company the user is associated with (optional, references `Company`).
- **`companyName`**: The name of the company (optional).

## User

- **`systemDetails`**: Contains the system details such as username and password (required).
- **`personalInfo`**: Contains personal information such as first name, surname, contact info, and address (required).
- **`profile`**: Contains the display name and profile image (required).
- **`joinedCompanies`**: A list of companies the user has joined (optional, defaults to an empty array).
- **`skills`**: A list of skills the user possesses (optional, defaults to an empty array).
- **`deviceIds`**: A list of device IDs associated with the user (optional, defaults to an empty array).
- **`currentEmployee`**: The current employee ID associated with the user (optional).
- **`isValidated`**: Indicates if the user's account has been validated (optional, defaults to `false`).
- **`createdAt`**: The date when the user was created (required, defaults to the current date).
- **`updatedAt`**: The date when the user was last updated (optional).
- **`deletedAt`**: The date when the user was deleted (optional).

## VideoCall

- **`title`**: The title of the video call (required).
- **`date`**: The date of the video call in string format (required).
- **`startTime`**: The start time of the video call (required).
- **`endTime`**: The end time of the video call (required).
- **`participants`**: A list of participant IDs (references `Employee`, required, defaults to an empty array).
- **`companyId`**: The ID of the company hosting the video call (references `Company`, required).
- **`details`**: Additional details about the video call (required).
- **`roomId`**: The unique room ID for the video call (hidden).
- **`createdAt`**: The date and time when the video call was created (hidden, defaults to the current date).
- **`updatedAt`**: The date and time when the video call was last updated (hidden, optional).
- **`deletedAt`**: The date and time when the video call was deleted (hidden, optional).
