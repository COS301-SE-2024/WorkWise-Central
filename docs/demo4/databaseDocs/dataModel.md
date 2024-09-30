[//]: # (# Data Model)

[//]: # ()
[//]: # (## User)

[//]: # (The User entity stores all user-related data, including personal, system, and professional details.)

[//]: # (- **id &#40;Primary Key&#41;**: A unique identifier for the user.)

[//]: # (- **systemDetails**: Stores system-related information such as email, password, and username.)

[//]: # (- **personInfo**: Contains personal details like first name, surname, date of birth, gender, preferred language, contact information &#40;phone, email&#41;, and address &#40;street, suburb, city, postal code, complex, house number&#41;.)

[//]: # (- **profile**: Holds profile-specific data such as display image and display name.)

[//]: # (- **joinedCompanies**: A list of companies the user is associated with.)

[//]: # (- **skills**: A list of the user's skills.)

[//]: # ()
[//]: # (## Employee)

[//]: # (The Employee entity stores all employee-related data, including the company for whom this employee works, the employees superior, subordinates, job assignments and role.)

[//]: # (- **id &#40;Primary Key&#41;**: A unique identifier for the employee.)

[//]: # (- **roleId**: id linking to the role the user has in the company)

[//]: # (- **currentJobAssignments**: An array of current job assignments for the current employee.)

[//]: # (- **superiorId**: The employee id of the superior of this employee.)

[//]: # (- **subordinates**: An array of the employees that work under the current employee.)

[//]: # (- **companyId**: A list of companies the user is associated with.)

[//]: # ()
[//]: # (## Company)

[//]: # (The Company entity stores information about different companies.)

[//]: # (- **id &#40;Primary Key&#41;**: A unique identifier for the company.)

[//]: # (- **registrationNumber**: The company's registration number.)

[//]: # (- **name**: The name of the company.)

[//]: # (- **type**: The type of business the company operates.)

[//]: # (- **vatNumber**: The company's VAT number.)

[//]: # (- **logo**: The company's logo.)

[//]: # (- **contactDetails**: Contact information including phone and email.)

[//]: # (- **address**: The company's address, comprising street, suburb, city, and postal code.)

[//]: # (- **employees**: A list of employee Ids associated with the company.)

[//]: # (- **inventoryItems**: A list of inventory item Ids managed by the company.)

[//]: # ()
[//]: # (## Client)

[//]: # (The Client entity stores information about clients.)

[//]: # (- **id &#40;Primary Key&#41;**: A unique identifier for the client.)

[//]: # (- **details**: Contains client-specific details such as first name, surname, contact information &#40;phone, email&#41;, and address &#40;street, suburb, city, postal code, complex, house number&#41;.)

[//]: # ()
[//]: # (## Job)

[//]: # (The Job entity stores details about various jobs.)

[//]: # (- **id &#40;Primary Key&#41;**: A unique identifier for the job.)

[//]: # (- **clientId**: A reference to the client associated with the job.)

[//]: # (- **assignedEmployees**: A list of employee Ids assigned to the job.)

[//]: # (- **scheduledDateTime**: The scheduled date and time for the job.)

[//]: # (- **status**: The current status of the job &#40;e.g., pending, in progress, completed&#41;.)

[//]: # (- **inventoryUsed**: A list of inventory items used in the job, including item Ids and quantities.)

[//]: # (- **jobDetails**: Detailed information about the job, including description, notes, address, and images.)

[//]: # (- **clientFeedback**: Feedback from the client, including job rating, customer service rating, and comments.)

[//]: # ()
[//]: # (<!-- ## Appointment)

[//]: # (The Appointment entity stores information about appointments.)

[//]: # (- **id &#40;Primary Key&#41;**: A unique identifier for the appointment.)

[//]: # (- **clientId**: A reference to the client associated with the appointment.)

[//]: # (- **jobId**: A reference to the job related to the appointment.)

[//]: # (- **scheduledDateTime**: The scheduled date and time for the appointment.)

[//]: # (- **duration**: The duration of the appointment in minutes.)

[//]: # (- **status**: The current status of the appointment &#40;e.g., pending, confirmed, cancelled&#41;. -->)

[//]: # ()
[//]: # (## InventoryItem)

[//]: # (The InventoryItem entity stores details about inventory items.)

[//]: # (- **id &#40;Primary Key&#41;**: A unique identifier for the inventory item.)

[//]: # (- **name**: The name of the inventory item.)

[//]: # (- **itemImage**: The image or icon representing the inventory item.)

[//]: # (- **costPrice**: The cost price of the inventory item.)

[//]: # (- **currentStockLevel**: The current stock level of the inventory item.)

[//]: # (- **lowStockThreshold**: The stock level threshold indicating when the item is considered low on stock.)


