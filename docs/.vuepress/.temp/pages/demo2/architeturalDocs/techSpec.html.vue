<template><div><h1 id="technology-requirements" tabindex="-1"><a class="header-anchor" href="#technology-requirements"><span>Technology Requirements</span></a></h1>
<h2 id="vue-js" tabindex="-1"><a class="header-anchor" href="#vue-js"><span>Vue.js</span></a></h2>
<p>Vue.js is a progressive JavaScript framework that allows developers to build web interfaces and single-page applications. It is lightweight and flexible, making it optimal for the performance requirements of the project. Vue.js follows a component-based architecture, enabling the creation of reusable UI components for complex applications. Additionally, its reactive data binding system ensures automatic UI updates when data changes.</p>
<p><strong>Pros:</strong></p>
<ul>
<li>Vue.js offers fast rendering and fast change detection mechanisms.</li>
<li>Reusability of components, to streamline development time</li>
<li>Powerful set of tools for development and testing</li>
</ul>
<p><strong>Cons:</strong></p>
<ul>
<li>Vue is a relatively new framework and has a smaller community than React and Angular.</li>
<li>Vue.js has a less extensive ecosystem of tools, libraries, and plugins compared to React and Angular.</li>
</ul>
<h2 id="nest-js" tabindex="-1"><a class="header-anchor" href="#nest-js"><span>Nest.js</span></a></h2>
<p>Nest.js framework for building scalable and maintainable server-side applications using Node.js. It provides a highly extensible system, with a excellent support for important security</p>
<p><strong>Pros:</strong></p>
<ul>
<li>Nest.js uses typescript, and thus provides strong typing, static analysis, and better tooling, resulting in more robust code.</li>
<li>Nest.js has a modular architecture, allowing developers to create reusable modules and components.</li>
<li>Nest.js leverages dependency injection, making it easier to manage dependencies and write testable code.</li>
</ul>
<p><strong>Cons:</strong></p>
<ul>
<li>Nest.js projects are prone to circular dependencies, which the development team needs to account for.</li>
<li>Nest.js has a smaller ecosystem of third-party packages and plugins compared to other Node.js frameworks like Express.</li>
</ul>
<h2 id="typescript" tabindex="-1"><a class="header-anchor" href="#typescript"><span>Typescript</span></a></h2>
<p>Typescript is a superset of JavaScript that adds types-safety, which is essential in our application. Type-safety ensures that errors are caught before runtime, making the code more robust</p>
<p><strong>Pros:</strong></p>
<ul>
<li>Type system improves the robustness of the system</li>
<li>Typescript still supports regular JS functionality</li>
<li>Improved maintainability and documentation of the API endpoints, due to enforced types</li>
</ul>
<p><strong>Cons:</strong></p>
<ul>
<li>Increased compile times</li>
<li>Overhead of Abstract Syntax Tree (AST) Complexity</li>
</ul>
<h2 id="jest" tabindex="-1"><a class="header-anchor" href="#jest"><span>Jest</span></a></h2>
<p>Jest will be used for unit testing and integration tests. It ensures that individual components are working as expected, and that components of the system are operating as expected. It was also chosen due to it being the most popular test framework for JavaScript and its suitability for our needs.</p>
<p><strong>Pros:</strong></p>
<ul>
<li>It is fast and efficient</li>
<li>It has good integration with <code v-pre>codecov</code>, to provide accurate tracking of test coverage</li>
<li>Good documentation, and integration with Nest.js</li>
</ul>
<p><strong>Cons:</strong></p>
<ul>
<li>Potential complexity of mocking</li>
</ul>
<h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker"><span>Docker</span></a></h2>
<p>Docker is a powerful tool for containerization, allowing developers to package applications and their dependencies into lightweight, portable containers. It will also integrate well with our CICD, by allowing us to upload our container to the server.</p>
<p><strong>Pros:</strong></p>
<ul>
<li>It is faster and more efficient and using a virtual machine</li>
<li>Docker images are versioned, making it easy to reproduce the exact environment</li>
<li>It simplifies scaling by allowing multiple containers to be spun up</li>
</ul>
<p><strong>Cons:</strong></p>
<ul>
<li>It has the potential to strain resources when running many containers</li>
<li>Misconfigured containers can pose security risks</li>
</ul>
</div></template>


