<template><div><h1 id="architectural-patterns-design-patterns" tabindex="-1"><a class="header-anchor" href="#architectural-patterns-design-patterns"><span>Architectural Patterns &amp; Design Patterns</span></a></h1>
<p><img src="/archetecturalDiagram.png" alt="Database"></p>
<h2 id="model-view-controller-mvc" tabindex="-1"><a class="header-anchor" href="#model-view-controller-mvc"><span>Model-View-Controller (MVC)</span></a></h2>
<p>The MVC pattern was chosen because it emphasizes a separation of the system's business logic and user interfaces. This separation of concerns allows for a better division of labour and improves the maintainability of the system. The three components of play the following roles:</p>
<p><strong>Model:</strong> The 'model' in our system is the Nest.js backend, which encapsulates the business logic and communicates with the database.</p>
<p><strong>View:</strong> The <strong>View</strong> component in represents the user interface (UI) and how data is presented to the user. It’s responsible for rendering data from the <strong>Model</strong> and handling user interactions.</p>
<p><strong>Controller:</strong> The Controller acts as an intermediary between the <strong>Model</strong> and the <strong>View</strong>. It handles user input, processes requests, and communicates with the backend</p>
<h2 id="publisher-subscriber" tabindex="-1"><a class="header-anchor" href="#publisher-subscriber"><span>Publisher-Subscriber</span></a></h2>
<p>Components of the system will need to provide information to other components as events happen. Asynchronous messages increase scalability and improve the responsiveness of the message sender, as it does not have to wait for a response.</p>
<p>Thus, the API-Gateway will use the Publisher-Subscriber pattern to facilitate communication between services while keeping them uncoupled. This will improve the extensibility of the system, as new services can simply subscribe to the existing services.</p>
<p>To counteract the potential security issues that may arise with a shared communication channel, message channels will be restricted by a security policy to prevent eavesdropping by unauthorized users or applications.</p>
<h2 id="service-oriented-architecture" tabindex="-1"><a class="header-anchor" href="#service-oriented-architecture"><span>Service-Oriented Architecture</span></a></h2>
<p>Service-Oriented Architecture (SOA) is an architectural style that promotes the design of software systems as a collection of loosely coupled, independently deployable services. Each service represents a specific business capability and communicates with other services through well-defined interfaces.</p>
</div></template>


