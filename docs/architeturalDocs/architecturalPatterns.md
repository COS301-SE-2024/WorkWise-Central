# Architectural Patterns & Design Patterns

![Database](/archetecturalDiagram.png)

## Model-View-Controller (MVC)
The MVC pattern was chosen because it emphasizes a separation of the system's business logic and user interfaces. This separation of concerns allows for a better division of labour and improves the maintainability of the system. The three components of play the following roles:

**Model:** The 'model' in our system is the Nest.js backend, which encapsulates the business logic and communicates with the database.

**View:** The **View** component in represents the user interface (UI) and how data is presented to the user. It’s responsible for rendering data from the **Model** and handling user interactions.

**Controller:** The Controller acts as an intermediary between the **Model** and the **View**. It handles user input, processes requests, and communicates with the backend

## Publisher-Subscriber
Components of the system will need to provide information to other components as events happen. Asynchronous messages increase scalability and improve the responsiveness of the message sender, as it does not have to wait for a response.

Thus, the API-Gateway will use the Publisher-Subscriber pattern to facilitate communication between services while keeping them uncoupled. This will improve the extensibility of the system, as new services can simply subscribe to the existing services. 

To counteract the potential security issues that may arise with a shared communication channel, message channels will be restricted by a security policy to prevent eavesdropping by unauthorized users or applications.
## Service-Oriented Architecture
Service-Oriented Architecture (SOA) is an architectural style that promotes the design of software systems as a collection of loosely coupled, independently deployable services. Each service represents a specific business capability and communicates with other services through well-defined interfaces.
