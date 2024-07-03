# Database Schema

### User/Employee
The User/Employee entity stores information for both general users and employees, using a single collection inheritance pattern.

#### id (Primary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each user or employee.
- **Example:** "60d21b4667d0d8992e610c85"

#### system_details
- **Data Type:** Object
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

#### personal_info
- **Data Type:** Object
- **Attributes:**
  - **first_name:** string
    - **Reasoning:** User's first name for personal identification.
    - **Example:** "John"
  - **surname:** string
    - **Reasoning:** User's surname for personal identification.
    - **Example:** "Doe"
  - **date_of_birth:** Date (as a string)
    - **Reasoning:** User's date of birth for age verification and personalization.
    - **Example:** "1990-01-01"
  - **gender:** string
    - **Reasoning:** User's gender for demographic purposes.
    - **Example:** "Male"
  - **preferred_language:** string
    - **Reasoning:** Language preference for communication.
    - **Example:** "English"
  - **contact_info:** Object
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
    - **postal_code:** string
      - **Reasoning:** Postal code for mailing purposes.
      - **Example:** "12345"
    - **complex:** string
      - **Reasoning:** Complex name if applicable.
      - **Example:** "Sunny Apartments"
    - **house_number:** string
      - **Reasoning:** House number for precise address.
      - **Example:** "10B"

#### profile
- **Data Type:** Object
- **Attributes:**
  - **display_image:** string
    - **Reasoning:** URL or base64 image string for profile picture.
    - **Example:** "data:image/png;base64,iVBORw0KGgoAAAANS..."
  - **display_name:** string
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

#### joined_companies
- **Data Type:** Array of ObjectId
- **Reasoning:** References companies the user/employee is associated with.
- **Example:** ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"]

#### skills
- **Data Type:** Array
- **Attributes:**
  - **skill_name:** string
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

#### current_job_assignments
- **Data Type:** Array of ObjectId
- **Reasoning:** References jobs the user/employee is currently assigned to.
- **Example:** ["60d21b4667d0d8992e610c87", "60d21b4667d0d8992e610c88"]

#### created_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "2024-06-01T10:00:00Z"

#### updated_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "2024-06-01T10:00:00Z"

#### deleted_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "2024-06-01T10:00:00Z"


### Company
The Company entity stores information about companies associated with users and jobs.

#### id (Primary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each company.
- **Example:** "60d21b4667d0d8992e610c89"

#### registration_number
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

#### vat_number
- **Data Type:** string
- **Reasoning:** VAT number for tax purposes.
- **Example:** "VAT789012"

#### logo
- **Data Type:** string
- **Reasoning:** URL or base64 image string for the company logo.
- **Example:** "data:image/png;base64,iVBORw0KGgoAAAANS..."

#### contact_details
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
  - **postal_code:** string
    - **Reasoning:** Postal code for mailing purposes.
    - **Example:** "67890"

#### employees
- **Data Type:** Array of ObjectId
- **Reasoning:** References employees (Users) associated with the company.
- **Example:** ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"]

#### inventory_items
- **Data Type:** Array of ObjectId
- **Reasoning:** References inventory items owned by the company.
- **Example:** ["60d21b4667d0d8992e610c8a", "60d21b4667d0d8992e610c8b"]

### Client
The Client entity stores information about clients who have jobs or appointments.

#### id (Primary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each client.
- **Example:** "60d21b4667d0d8992e610c8c"

#### details
- **Data Type:** Object
- **Attributes:**
  - **first_name:** string
    - **Reasoning:** Client's first name for personal identification.
    - **Example:** "Jane"
  - **surname:** string
    - **Reasoning:** Client's surname for personal identification.
    - **Example:** "Smith"
  - **client_info:** Object
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
      - **postal_code:** string
        - **Reasoning:** Postal code for mailing purposes.
        - **Example:** "12345"
      - **complex:** string
        - **Reasoning:** Complex name if applicable.
        - **Example:** "Client Apartments"
      - **house_number:** string
        - **Reasoning:** House number for precise address.
        - **Example:** "3A"

#### created_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "2024-06-01T10:00:00Z"

#### updated_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "2024-06-01T10:00:00Z"

#### deleted_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "2024-06-01T10:00:00Z"

### Job
The Job entity stores information about jobs assigned to employees and clients.

#### id (Primary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each job.
- **Example:** "60d21b4667d0d

8992e610c8d"

#### client_id (Foreign Key)
- **Data Type:** ObjectId
- **Relationship:** References Client
- **Reasoning:** Associates the job with a specific client.
- **Example:** "60d21b4667d0d8992e610c8c"

#### assigned_employees
- **Data Type:** Array of ObjectId
- **Relationship:** References User
- **Reasoning:** Employees assigned to the job.
- **Example:** ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"]

#### scheduled_date_time
- **Data Type:** Date (in string format)
- **Reasoning:** Scheduled date and time for the job.
- **Example:** "2024-06-01T09:00:00Z"

#### status
- **Data Type:** string
- **Reasoning:** Current status of the job (e.g., pending, in progress, completed).
- **Example:** "pending"

#### inventory_used
- **Data Type:** Array of Object
- **Reasoning:** Inventory items used for the job.
- **Format:** { "InventoryItem": ObjectId (relationship with InventoryItem), "QuantityUsed": integer }
- **Example:** [{ "InventoryItem": "60d21b4667d0d8992e610c8a", "QuantityUsed": 2 }]

#### job_details
- **Data Type:** Object
- **Attributes:**
  - **job_description:** string
    - **Reasoning:** Description of the job.
    - **Example:** "Fixing plumbing issues."
  - **job_notes:** string
    - **Reasoning:** Additional notes about the job.
    - **Example:** "Bring extra tools."
  - **job_address:** Object
    - **street:** string
      - **Reasoning:** Street address for the job location.
      - **Example:** "123 Job St"
    - **suburb:** string
      - **Reasoning:** Suburb for the job location.
      - **Example:** "Westside"
    - **city:** string
      - **Reasoning:** City for the job location.
      - **Example:** "Metropolis"
    - **postal_code:** string
      - **Reasoning:** Postal code for the job location.
      - **Example:** "67890"
    - **complex:** string
      - **Reasoning:** Complex name if applicable.
      - **Example:** "Workplace Plaza"
    - **house_number:** string
      - **Reasoning:** House number for the job location.
      - **Example:** "5C"
  - **images_taken:** Array of strings (base64 images)
    - **Reasoning:** Images related to the job.
    - **Example:** ["data:image/png;base64,iVBORw0KGgoAAAANS...", "data:image/png;base64,iVBORw0KGgoAAAANS..."]

#### client_feedback
- **Data Type:** Object
- **Attributes:**
  - **job_rating:** number
    - **Reasoning:** Overall job rating by the client.
    - **Example:** 4.5
  - **customer_service_rating:** number
    - **Reasoning:** Rating of the customer service by the client.
    - **Example:** 5
  - **comments:** string
    - **Reasoning:** Additional feedback comments from the client.
    - **Example:** "Great service!"

### Appointment
The Appointment entity stores information about appointments between clients and jobs.

#### id (Primary Key)
- **Data Type:** ObjectId
- **Reasoning:** Unique identifier for each appointment.
- **Example:** "60d21b4667d0d8992e610c8e"

#### client_id (Foreign Key)
- **Data Type:** ObjectId
- **Relationship:** References Client
- **Reasoning:** Associates the appointment with a specific client.
- **Example:** "60d21b4667d0d8992e610c8c"

#### job_id (Foreign Key)
- **Data Type:** ObjectId
- **Relationship:** References Job
- **Reasoning:** Associates the appointment with a specific job.
- **Example:** "60d21b4667d0d8992e610c8d"

#### scheduled_date_time
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

#### created_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "2024-06-01T10:00:00Z"

#### updated_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "2024-06-01T10:00:00Z"

#### deleted_at
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

#### image_or_icon
- **Data Type:** string (base64)
- **Reasoning:** Image or icon representing the inventory item.
- **Example:** "data:image/png;base64,iVBORw0KGgoAAAANS..."

#### cost_price
- **Data Type:** double
- **Reasoning:** Cost price of the inventory item.
- **Example:** 15.99

#### current_stock_level
- **Data Type:** integer
- **Reasoning:** Current stock level of the inventory item.
- **Example:** 50

#### low_stock_threshold
- **Data Type:** integer
- **Reasoning:** Threshold to indicate low stock level.
- **Example:** 10

#### created_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was created.
- **Example:** "2024-06-01T10:00:00Z"

#### updated_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was updated.
- **Example:** "2024-06-01T10:00:00Z"

#### deleted_at
- **Data Type:** Date (in string format)
- **Reasoning:** Timestamp of when the document was deleted.
- **Example:** "2024-06-01T10:00:00Z"
