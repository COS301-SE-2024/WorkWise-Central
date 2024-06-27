# Architectural design & pattern

![Database](/archetecturalDiagram.jpg)

## Model-View-Controller (MVC)

The MVC pattern was chosen because it emphasizes a separation of the system's business logic and user interfaces. This separation of concerns allows for a better division of labour and improves the maintainability of the system. The three components of MVC play the following roles:

**Model:** The model in our system is the Nest.js backend, which encapsulates the business logic and communicates with the database. It comprises of all the services that control all business logic, and uses the specific repository classes to query the database.

**View:** The view component in MVC represents the user interface (UI) and how data is presented to the user. It’s responsible for rendering data from the model and handling user interactions. When important events like being assigned a job take place, users' views change accordingly.

**Controller:** The Controller acts as an intermediary between the model and the view. It handles user input, processes requests, and communicates with the various services in the backend.

## Publisher-Subscriber

Components of the system will need to broadcast information with one another when relevant events occur. Asynchronous messages increase scalability and improve the responsiveness of the message sender, as it does not have to wait for a response.

Thus, the API-Gateway will use the Publisher-Subscriber pattern to facilitate communication between services while keeping them uncoupled. This will improve the extensibility of the system, as new services can simply subscribe to the existing services. The most important service involving this pattern will be the notificationService, as it is likely to be subscribed to the most services and asynchronously send notifications.

To counteract the potential security issues that may arise with a shared communication channel, message channels will be restricted by a security policy to prevent eavesdropping by unauthorized users or applications.

## Service-Oriented Architecture

Service-Oriented Architecture (SOA) is an architectural style that promotes the design of software systems as a collection of loosely coupled, independently deployable services. Each service represents a specific business capability and communicates with other services through well-defined interfaces.

## Gatekeeper pattern

We plan to use the Gatekeeper pattern to prevent malicious requests from entering the controllers in the backend.
The gatekeeper validates all requests, and rejects requests that don't meet validation requirements. It provides an additional layer of security and limit the system's attack surface.

In order to alleviate the weakness of having a single point of failure, we chose to couple the gatekeeper from the trusted host.

## The Repository Pattern

Repositories are bridges between data and operations that are in different domains. We leveraged this to maximise the effectiveness of our automated unit tests.

This pattern allows us to separate business logic, within our service, from the database layer. Using the repository pattern reduces code duplication, reduces the likelihood of programmer error and allows us to centralise data-related policies such as caching.

Using the repository pattern also improves the maintainability and readability of the code by separating the services and limiting access to specific MongoDB collections.
