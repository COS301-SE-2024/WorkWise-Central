# Architectural styles

#### Client-server
We are utilising the client-server style, through the frontend requesting data from the api. The api will enforce business rules and authenticate any requests that it receives from the frontend. This style was chosen because users exist within **hierarchies of roles** within companies, so a Peer-to-Peer style would not suffice.

#### Layered
The layered architectural style is being used to separate the user-interface from the business logic, and the api from the database structure. It was chosen because it improves **security** of the system and **creates better groupings** for our subsystems. Finally, layered also allowed the codebase to be more **organised**, thus increasing **maintainability**. 

#### Component-based
The component-based architectural style is being used to make the system **more modular**, while also **reducing coupling**. 

#### Publish-subscribe
The publish-subscribe style is being used to implement the notification subsystem. Users will be subscribers of relevant notifications and events.

#### Service-oriented
The service-oriented style is used to compartmentalise the business logic of the system. Each subsystem constitutes it's own service. These services then provide the business logic needed.