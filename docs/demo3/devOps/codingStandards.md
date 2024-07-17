# Coding Standards

## Coding Conventions and Styles

### General Conventions
- **Indentation**: Use 2 spaces for indentation.
- **Line Length**: Limit lines to 80 characters.
- **File Naming**: Use kebab-case for file names (e.g., `service-delivery.component.ts`).
- **Comments**: Use `//` for single-line comments and `/* ... */` for multi-line comments. Ensure comments are meaningful and provide value.
- **Version Control**: Follow the Git Flow branching model. Use feature branches for new features, bug branches for fixes, and develop and main branches for integration.

### TypeScript Conventions
- **Types**: Always explicitly define types.
- **Interfaces**: Use `interface` for defining object shapes.
- **Enums**: Use `enum` for defining sets of named constants.
- **Classes**: Use PascalCase for class names.
- **Variables and Functions**: Use camelCase for variable and function names.
- **Constants**: Use UPPER_CASE for constants.

### Vue Conventions
- **Component Structure**: Use the `<template>`, `<script>`, and `<style>` sections in single-file components.
- **Props**: Define prop types and default values.
- **Events**: Use `$emit` to trigger events and define event names in kebab-case.
- **Lifecycle Hooks**: Order lifecycle hooks as they are called (`created`, `mounted`, `updated`, `destroyed`).

### NestJS Conventions
- **Modules**: Use modules to organize your application logically.
- **Controllers**: Use controllers to handle incoming requests and return responses.
- **Services**: Use services to handle business logic.
- **Providers**: Use providers for dependency injection.

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

│ ├── img/

│ ├── node_modules/

│ ├── public/

│ ├── src/

│ │ ├── ...

│ ├── ...

...

### Database (MongoDB)
- Use a directory named `mongo-scripts` for database initialization and migration scripts.

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
      "printWidth": 80,
      "tabWidth": 2
    }
    ```

## Conclusion
Adhering to these coding standards will ensure that the codebase remains clean, understandable, and maintainable. Consistent use of these conventions will help in achieving a uniform style, clarity, flexibility, reliability, and efficiency in the development process.