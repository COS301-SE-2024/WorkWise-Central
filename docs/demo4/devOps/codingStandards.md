# Coding Standards

## Coding Conventions and Styles

### General Conventions
- **Indentation**: Use 2 spaces for indentation.
- **Line Length**: Limit lines to 120 characters.
- **File Naming**: Use kebab-case for file names (e.g., `service-delivery.component.ts`).
- **Comments**: Use `//` for single-line comments and `/* ... */` for multi-line comments. Ensure comments are meaningful and provide value.
- **Version Control**: Follow the Git Flow branching model. 
  

### TypeScript Conventions
- **Types**: Always explicitly define types.
- **Interfaces**: Use `interface` for defining object properties.
- **Enums**: Use `enum` for defining sets of named constants.
- **Classes**: Use PascalCase for class names.
- **Variables and Functions**: Use camelCase for variable and function names.
- **Constants**: Use UPPER_CASE for constants.

### Frontend Conventions
#### Vue
- **Component Structure**: Use the `<template>`, `<script>`, and `<style>` sections in single-file components.
- **Props**: Define prop types and default values.
- **Events**: Use `$emit` to trigger events and define event names in kebab-case.
- **Lifecycle Hooks**: Order lifecycle hooks as they are called (`created`, `mounted`, `updated`, `destroyed`).

### Backend Conventions
#### NestJs 
**Modules**:
Use modules to organize your application logically. Only use Global modules when it is justified. Ensure that modules export all services required by importing modules (To prevent circular dependencies)

**Controllers**: Use controllers to handle incoming requests and return responses. Controllers must utilise the `class-validator` and `class-validator` libraries in order to validate and sanitize incoming requests.

**Services**: Use services to handle business logic, this encompasses the role-based access and users' permissions. Services must not make queries directly to the Database, but rather through their injected **Repository Class**.

**Repositories**: These classes must only contain queries to relevant Mongoose models related to a Service. No validation should be performed in these classes.

**Providers**: Use providers for dependency injection. Only add providers that are required by the Service.

#### MongoDB
**Entities**: They represent documents in our schema, they also specify indexes and middleware to be used with Mongoose based on specific operations. 

**Dtos**: These specify request/response body structure, including the data sanitation and transformation before reaching the controllers. 

## File Structure
.github/

├── ...

cypress/

├── ...

docs/

├── ...

node_modules/

├── ...

res/

├── ...

revealJS/

├── ...

src/

├──api-gateway/

│ ├── coverage/

│ ├── dist/

│ ├── node_modules/

│ ├── src/

│ │ ├── ...

│ ├── test/

│ │ ├── ...

│ ├── ...

├──frontend/

│ ├── cypress/

│ ├── dev-dist/

│ ├── dist/

│ ├── img/

│ ├── nginx/

│ ├── node_modules/

│ ├── public/

│ ├── src/

│ │ ├── assets

│ │ ├── components

│ │ ├── ...

│ ├── .env

│ ├── ...

├──docker-compose.yml

├──.env

uploads

├── ...

...


## Linter and Formatting Tools

### Frontend (Vue with TypeScript)
- **ESLint**: Ensure code quality and consistency.
  - Configuration: `extends: ['plugin:vue/vue3-essential', '@vue/typescript/recommended']`
- **Prettier**: Code formatting.
  - Configuration: `.prettierrc`
    ```json
    {
      "semi": true,
      "singleQuote": true,
      "printWidth": 80,
      "tabWidth": 2
    }
    ```

### Backend (NestJS with TypeScript)
- **ESLint**: Ensure code quality and consistency.
  - Configuration: `extends: ['@nestjs/eslint-config', 'plugin:@typescript-eslint/recommended']`
- **Prettier**: Code formatting.
  - Configuration: `.prettierrc`
    ```json
    {
      "semi": true,
      "singleQuote": true,
      "printWidth": 120,
      "tabWidth": 2
    }
    ```

## Conclusion
Adhering to these coding standards will ensure that the codebase remains clean, understandable, and maintainable. Consistent use of these conventions will help in achieving a uniform style, clarity, and efficiency in the development process.