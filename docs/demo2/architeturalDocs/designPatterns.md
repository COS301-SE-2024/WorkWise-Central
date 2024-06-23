# Design Patterns
## The Repository Pattern
Repositories are bridges between data and operations that are in different domains. We leveraged this to maximise the effectiveness of our automated unit tests.

This pattern allows us to separate business logic, within our service, from the database layer. Using the repository pattern reduces code duplication, reduces the likelihood of programmer error and allows us to centralise data-related policies such as caching.

Using the repository pattern also improves the maintainability and readability of the code by separating the services and limiting access to specific MongoDB collections.