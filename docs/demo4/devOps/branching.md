# Branching strategy 
![GitFlow](/gitflow.png)

For this project, we are utilising the GitFlow branching strategy. 
Gitflow is a well-defined workflow that enhances collaboration, ensures a structured development process, and facilitates smooth release management.
By following this strategy, we aim to maintain a stable codebase, manage features efficiently, and handle releases and hotfixes systematically.

#### From our repo
![Branching](/branching.png)
![Branches](/branches.png)

## Key Branches
### Main 
- Purpose: Holds the production-ready code.
- Stability: Must always be stable and deployable.
- Releases: Each merge into main represents a new release version, tagged accordingly.

### Develop 
- Purpose: Serves as the integration branch for feature development.
- Stability: Should remain stable with integrated features ready for the next release.

## Supporting Branches 
### Feature branch
- Purpose: Used to develop new features.
- Naming Convention: `feature/feature-name` (e.g., feature/user-authentication).
- Creation: Branch off from `develop`.
- Merge: Merged back into `develop` after completion and testing.

### Hotfix branch
- Purpose: Used to quickly address critical issues found in the production environment.
- Naming Convention: `hotfix/hotfix-name` (e.g., hotfix/security-patch).
- Creation: Branch off from `main`.
- Merge: Merged into `main` and `develop` after the fix is applied.

### Bugfix
- Purpose: Used to address small bugs found during development.
- Naming Convention: `bugfix/bugfix-name` (e.g., bugfix/date-format).
- Creation: Branch off from `develop`.
- Merge: Merged into `develop` after the fix is applied.

### Refactor 
- Purpose: Used for general code improvements.
- Naming Convention: `refactor/refactor-name` (e.g., refactor/job-speed-improvement).
- Creation: Branch off from `develop`.
- Merge: Merged into `develop` after the fix is applied.

### Chore
- Purpose: Used to do maintenance on the system and perform CI/CD updates.
- Naming Convention: `chore/chore-name` (e.g., chore/reconfiguring-docker).
- Creation: Branch off from `develop`.
- Merge: Merged into `develop` after the fix is applied.

## Workflow 
### Feature Development
1. Creating a Feature Branch:

- Create a new branch from develop using the naming convention `feature/feature-name`.
- Work on the feature, committing changes regularly.

2. Completing a Feature:

- Ensure the feature is complete and thoroughly tested.
- Open a pull request (PR) to merge the feature branch into develop.
- Conduct a code review and resolve any feedback.
- Merge the feature branch into develop and delete the feature branch.

<!-- ### Release Preparation
1. Everyone freak out bcs demo approaching and test non existent!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->

### Hotfix Management
1. Creating a Hotfix Branch:

- Create a hotfix branch from main using the naming convention `hotfix/hotfix-name`.
- Implement the necessary fixes, committing changes regularly.

2. Completing a Hotfix:

- Ensure the hotfix is complete and thoroughly tested.
- Open a PR to merge the hotfix branch into main and develop.
- Conduct a code review and resolve any feedback.
- Merge the hotfix branch into main and tag the release.
- Merge the hotfix branch into develop to keep the codebase in sync.
- Delete the hotfix branch.
