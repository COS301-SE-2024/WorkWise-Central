# Technology choices
## Vue.js
Vue.js is a progressive JavaScript framework that allows developers to build web interfaces and single-page applications. It is lightweight and flexible, making it optimal for the performance requirements of the project. Vue.js follows a component-based architecture, enabling the creation of reusable UI components for complex applications. Additionally, its reactive data binding system ensures automatic UI updates when data changes.

**Pros:**
- Vue.js offers fast rendering and fast change detection mechanisms.
- Reusability of components, to streamline development time
- Powerful set of tools for development and testing

**Cons:**
- Vue is a relatively new framework and has a smaller community than React and Angular.
- Vue.js has a less extensive ecosystem of tools, libraries, and plugins compared to React and Angular.
  
## Nest.js
Nest.js framework for building scalable and maintainable server-side applications using Node.js. It provides a highly extensible system, with a excellent support for important security

**Pros:** 
- Nest.js uses typescript, and thus provides strong typing, static analysis, and better tooling, resulting in more robust code.
- Nest.js has a modular architecture, allowing developers to create reusable modules and components. 
- Nest.js leverages dependency injection, making it easier to manage dependencies and write testable code.
  
**Cons:**
- Nest.js projects are prone to circular dependencies, which the development team needs to account for.
- Nest.js has a smaller ecosystem of third-party packages and plugins compared to other Node.js frameworks like Express.

## Typescript
Typescript is a superset of JavaScript that adds types-safety, which is essential in our application. Type-safety ensures that errors are caught before runtime, making the code more robust

**Pros:** 
- Type system improves the robustness of the system
- Typescript still supports regular JS functionality
- Improved maintainability and documentation of the API endpoints, due to enforced types
  
**Cons:**
- Increased compile times
- Overhead of Abstract Syntax Tree (AST) Complexity
  
## Jest
Jest will be used for unit testing and integration tests. It ensures that individual components are working as expected, and that components of the system are operating as expected. It was also chosen due to it being the most popular test framework for JavaScript and its suitability for our needs. 

**Pros:** 
- It is fast and efficient
- It has good integration with `codecov`, to provide accurate tracking of test coverage
- Good documentation, and integration with Nest.js
  
**Cons:**
- Potential complexity of mocking

## Docker
Docker is a powerful tool for containerization, allowing developers to package applications and their dependencies into lightweight, portable containers. It will also integrate well with our CICD, by allowing us to upload our container to the server.

**Pros:** 
- It is faster and more efficient and using a virtual machine
- Docker images are versioned, making it easy to reproduce the exact environment
- It simplifies scaling by allowing multiple containers to be spun up
  
**Cons:**
- It has the potential to strain resources when running many containers
- Misconfigured containers can pose security risks