## GitHub Organization and Management

Effective GitHub organization and management are crucial for maintaining code quality, collaboration efficiency, and streamlined development processes. Below are the structured and enhanced guidelines our team follows for managing pull requests, commits, issues, linting and coding standards, protected branches, and workflows.

### Pull Request (PR) Organization

1. **Review Process:**
   - Each pull request must have designated reviewers tagged before it can be approved.
   - Reviewers ensure that the code meets the repository’s standards and provide feedback.

2. **PR Template:**
   - All PRs must follow a predefined template to uniformly structure information about what has been added, altered, or merged into the repository.
   - The template should include sections such as:
     - **Description:** Detailed explanation of changes.
     - **Type of Change:** Bug fix, feature, documentation, etc.
     - **Related Issues:** Link to any relevant issues.
     - **Testing:** Description of testing performed and results.

3. **Automatic Rejection of PRs:**
   - PRs that fail automated checks (linting, coding standards, tests) will be automatically rejected and must be fixed before resubmission.

### Commits

1. **Commit Structure:**
   - Commits should be written in imperative sentences.
   - Each commit message should start with a commit type, formatted as `<commit type>: <imperative sentence>`.
     - Example: `feat: add new user authentication module`

2. **Commit Types:**
   - Common commit types include:
     - `feat`: A new feature
     - `fix`: A bug fix
     - `docs`: Documentation changes
     - `style`: Code style changes (formatting, missing semi-colons, etc.)
     - `refactor`: Code refactoring without changing functionality
     - `test`: Adding or updating tests
     - `chore`: Other changes that don't modify src or test files

### Issues

1. **Issue Templates:**
   - All issues must follow a predefined template to ensure consistency and completeness. We have three types of issue templates: Bug Report, Feature Request, and User Story.

2. **Bug Report Template:**
   - **Description:** A clear and concise description of what the bug is.
   - **To Reproduce:** Steps to reproduce the behavior:
     1. Go to '...'
     2. Click on '....'
     3. Scroll down to '....'
     4. See error
   - **Expected Behavior:** A clear and concise description of what you expected to happen.
   - **Screenshots:** If applicable, add screenshots to help explain your problem.
   - **Desktop:**
     - OS: [e.g. iOS]
     - Browser [e.g. chrome, safari]
     - Version [e.g. 22]
   - **Smartphone:**
     - Device: [e.g. iPhone6]
     - OS: [e.g. iOS8.1]
     - Browser [e.g. stock browser, safari]
     - Version [e.g. 22]
   - **Additional Context:** Add any other context about the problem here.

3. **Feature Request Template:**
   - **Description:** Provide a clear and concise description of the new feature you are proposing.
   - **Use Case:** Explain the use case or scenario where this feature would be beneficial.
   - **Expected Behavior:** Describe the expected behavior of the new feature.
   - **Additional Information:** Any additional details or context that might be helpful.
   - **Feature Request Checklist:**
     - I have searched for similar feature requests before submitting this one.
     - I have provided a clear and descriptive title for the request.
     - I have assigned appropriate labels.
     - I have tagged the issue with the correct project milestone (if applicable).
     - I have provided all the requested information.

4. **User Story Template:**
   - **As a [type of user]:** Describe the user type.
   - **I want [functionality]:** Describe the desired functionality.
   - **So that [benefit]:** Describe the benefit or reason.
   - **Acceptance Criteria:**
     1. Criteria one
     2. Criteria two
     3. Criteria three

5. **Enforcement:**
   - Issues not following the template will be automatically closed.
   - Such issues can be reopened once they adhere to the template.

### Linting and Coding Standards

1. **Enforcement:**
   - Managed by the DevOps team to ensure code quality and consistency.
   - Linting and coding standards are enforced through automated tools integrated into the CI/CD pipeline.

2. **Tools:**
   - We make use of ESLint throughout our repository.

### Protected Branches

1. **Branch Protection Rules:**
   - Branch protection rules are enforced on `main` and `develop` branches.
   - These rules include:
     - Requiring pull request reviews before merging.
     - Passing all required status checks (linting, tests, etc.) before merging.
     - Enforcing linear history to avoid merge commits.

2. **Team Reviewers:**
   - All team members are designated reviewers, ensuring comprehensive code review coverage.

### Workflow Files

1. **Automated Workflows:**
   - Workflow files are used to automate processes such as linting, unit testing, and building.
   - Examples of workflows include:
     - **Linting Workflow:** Runs linting checks on push and pull request events.
     - **Testing Workflow:** Runs unit tests to ensure code correctness.
     - **Build Workflow:** Automates the build process and ensures that the code can be compiled successfully.

2. **CI/CD Integration:**
   - Our workflows are integrated into the CI/CD pipeline.
   - We make use of GitHub Actions to manage and execute workflows.

### Branch Naming Conventions

1. **Naming Conventions:**
   - Establish and enforce branch naming conventions to keep the repository organized.
     - Example conventions:
       - `feature/branch-name` for new features
       - `bugfix/branch-name` for bug fixes
       - `hotfix/branch-name` for hotfixes

### Code Reviews

1. **Code Review Process:**
   - All code changes must go through a thorough review process.
   - Use GitHub’s review features (comments, suggestions) effectively to ensure code quality and adherence to standards.
   - Encourage discussions and collaborative reviews to foster knowledge sharing and catch potential issues early.
