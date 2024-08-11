<template><div><h1 id="architectural-styles" tabindex="-1"><a class="header-anchor" href="#architectural-styles"><span>Architectural styles</span></a></h1>
<h4 id="client-server" tabindex="-1"><a class="header-anchor" href="#client-server"><span>Client-server</span></a></h4>
<p>We are utilising the client-server style, through the frontend requesting data from the api. The api will enforce business rules and authenticate any requests that it receives from the frontend. This style was chosen because users exist within <strong>hierarchies of roles</strong> within companies, so a Peer-to-Peer style would not suffice.</p>
<h4 id="layered" tabindex="-1"><a class="header-anchor" href="#layered"><span>Layered</span></a></h4>
<p>The layered architectural style is being used to separate the user-interface from the business logic, and the api from the database structure. It was chosen because it improves <strong>security</strong> of the system and <strong>creates better groupings</strong> for our subsystems. Finally, layered also allowed the codebase to be more <strong>organised</strong>, thus increasing <strong>maintainability</strong>.</p>
<h4 id="component-based" tabindex="-1"><a class="header-anchor" href="#component-based"><span>Component-based</span></a></h4>
<p>The component-based architectural style is being used to make the system <strong>more modular</strong>, while also <strong>reducing coupling</strong>.</p>
<h4 id="publish-subscribe" tabindex="-1"><a class="header-anchor" href="#publish-subscribe"><span>Publish-subscribe</span></a></h4>
<p>The publish-subscribe style is being used to implement the notification subsystem. Users will be subscribers of relevant notifications and events.</p>
<h4 id="service-oriented" tabindex="-1"><a class="header-anchor" href="#service-oriented"><span>Service-oriented</span></a></h4>
<p>The service-oriented style is used to compartmentalise the business logic of the system. Each subsystem constitutes it's own service. These services then provide the business logic needed.</p>
</div></template>


