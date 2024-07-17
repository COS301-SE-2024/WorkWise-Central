# Data Model

**User/Employee**
The User/Employee entity stores all user-related data, including personal, system, and professional details.
- **id (Primary Key)**: A unique identifier for the user.
- **system_details**: Stores system-related information such as email, password, and username.
- **personal_info**: Contains personal details like first name, surname, date of birth, gender, preferred language, contact information (phone, email), and address (street, suburb, city, postal code, complex, house number).
- **profile**: Holds profile-specific data such as display image and display name.
- **roles**: An array of roles with associated permissions.
- **joined_companies**: A list of companies the user is associated with.
- **skills**: A list of the user's skills.
- **availability**: Indicates the user's availability status and schedule.
- **current_job_assignments**: A list of job assignments linked to the user.

**Company**
The Company entity stores information about different companies.
- **id (Primary Key)**: A unique identifier for the company.
- **registration_number**: The company's registration number.
- **name**: The name of the company.
- **type**: The type of business the company operates.
- **vat_number**: The company's VAT number.
- **logo**: The company's logo.
- **contact_details**: Contact information including phone and email.
- **address**: The company's address, comprising street, suburb, city, and postal code.
- **employees**: A list of employee IDs associated with the company.
- **inventory_items**: A list of inventory item IDs managed by the company.

**Client**
The Client entity stores information about clients.
- **id (Primary Key)**: A unique identifier for the client.
- **details**: Contains client-specific details such as first name, surname, contact information (phone, email), and address (street, suburb, city, postal code, complex, house number).

**Job**
The Job entity stores details about various jobs.
- **id (Primary Key)**: A unique identifier for the job.
- **client_id**: A reference to the client associated with the job.
- **assigned_employees**: A list of employee IDs assigned to the job.
- **scheduled_date_time**: The scheduled date and time for the job.
- **status**: The current status of the job (e.g., pending, in progress, completed).
- **inventory_used**: A list of inventory items used in the job, including item IDs and quantities.
- **job_details**: Detailed information about the job, including description, notes, address, and images.
- **client_feedback**: Feedback from the client, including job rating, customer service rating, and comments.

**Appointment**
The Appointment entity stores information about appointments.
- **id (Primary Key)**: A unique identifier for the appointment.
- **client_id**: A reference to the client associated with the appointment.
- **job_id**: A reference to the job related to the appointment.
- **scheduled_date_time**: The scheduled date and time for the appointment.
- **duration**: The duration of the appointment in minutes.
- **status**: The current status of the appointment (e.g., pending, confirmed, cancelled).

**InventoryItem**
The InventoryItem entity stores details about inventory items.
- **id (Primary Key)**: A unique identifier for the inventory item.
- **name**: The name of the inventory item.
- **image_or_icon**: The image or icon representing the inventory item.
- **cost_price**: The cost price of the inventory item.
- **current_stock_level**: The current stock level of the inventory item.
- **low_stock_threshold**: The stock level threshold indicating when the item is considered low on stock.
