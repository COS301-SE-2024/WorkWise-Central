<template><div><h1 id="design-patterns" tabindex="-1"><a class="header-anchor" href="#design-patterns"><span>Design Patterns</span></a></h1>
<h2 id="the-repository-pattern" tabindex="-1"><a class="header-anchor" href="#the-repository-pattern"><span>The Repository Pattern</span></a></h2>
<p>Repositories are bridges between data and operations that are in different domains. We leveraged this to maximise the effectiveness of our automated unit tests.</p>
<p>This pattern allows us to separate business logic, within our service, from the database layer. Using the repository pattern reduces code duplication, reduces the likelihood of programmer error and allows us to centralise data-related policies such as caching.</p>
<p>Using the repository pattern also improves the maintainability and readability of the code by separating the services and limiting access to specific MongoDB collections.</p>
</div></template>


