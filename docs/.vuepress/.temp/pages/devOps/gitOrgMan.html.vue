<template><div><h1 id="git-orginisation-and-management" tabindex="-1"><a class="header-anchor" href="#git-orginisation-and-management"><span>Git orginisation and management</span></a></h1>
<p>Effective GitHub organization and management are crucial for maintaining code quality, collaboration efficiency, and streamlined development processes. Below are the structured and enhanced guidelines our team follows for managing pull requests, commits, issues, linting and coding standards, protected branches, and workflows.</p>
<h3 id="pull-request-pr-organization" tabindex="-1"><a class="header-anchor" href="#pull-request-pr-organization"><span>Pull Request (PR) Organization</span></a></h3>
<ol>
<li>
<p><strong>Review Process:</strong></p>
<ul>
<li>Each pull request must have designated reviewers tagged before it can be approved.</li>
<li>Reviewers ensure that the code meets the repository’s standards and provide feedback.</li>
</ul>
</li>
<li>
<p><strong>PR Template:</strong></p>
<ul>
<li>All PRs must follow a predefined template to uniformly structure information about what has been added, altered, or merged into the repository.</li>
<li>The template should include sections such as:
<ul>
<li><strong>Description:</strong> Detailed explanation of changes.</li>
<li><strong>Type of Change:</strong> Bug fix, feature, documentation, etc.</li>
<li><strong>Related Issues:</strong> Link to any relevant issues.</li>
<li><strong>Testing:</strong> Description of testing performed and results.</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>Automatic Rejection of PRs:</strong></p>
<ul>
<li>PRs that fail automated checks (linting, coding standards, tests) will be automatically rejected and must be fixed before resubmission.</li>
</ul>
</li>
</ol>
<h3 id="commits" tabindex="-1"><a class="header-anchor" href="#commits"><span>Commits</span></a></h3>
<ol>
<li>
<p><strong>Commit Structure:</strong></p>
<ul>
<li>Commits should be written in imperative sentences.</li>
<li>Each commit message should start with a commit type, formatted as <code v-pre>&lt;commit type&gt;: &lt;imperative sentence&gt;</code>.
<ul>
<li>Example: <code v-pre>feat: add new user authentication module</code></li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>Commit Types:</strong></p>
<ul>
<li>Common commit types include:
<ul>
<li><code v-pre>feat</code>: A new feature</li>
<li><code v-pre>fix</code>: A bug fix</li>
<li><code v-pre>docs</code>: Documentation changes</li>
<li><code v-pre>style</code>: Code style changes (formatting, missing semi-colons, etc.)</li>
<li><code v-pre>refactor</code>: Code refactoring without changing functionality</li>
<li><code v-pre>test</code>: Adding or updating tests</li>
<li><code v-pre>chore</code>: Other changes that don't modify src or test files</li>
</ul>
</li>
</ul>
</li>
</ol>
<h3 id="issues" tabindex="-1"><a class="header-anchor" href="#issues"><span>Issues</span></a></h3>
<ol>
<li>
<p><strong>Issue Templates:</strong></p>
<ul>
<li>All issues must follow a predefined template to ensure consistency and completeness. We have three types of issue templates: Bug Report, Feature Request, and User Story.</li>
</ul>
</li>
<li>
<p><strong>Bug Report Template:</strong></p>
<ul>
<li><strong>Description:</strong> A clear and concise description of what the bug is.</li>
<li><strong>To Reproduce:</strong> Steps to reproduce the behavior:
<ol>
<li>Go to '...'</li>
<li>Click on '....'</li>
<li>Scroll down to '....'</li>
<li>See error</li>
</ol>
</li>
<li><strong>Expected Behavior:</strong> A clear and concise description of what you expected to happen.</li>
<li><strong>Screenshots:</strong> If applicable, add screenshots to help explain your problem.</li>
<li><strong>Desktop:</strong>
<ul>
<li>OS: [e.g. iOS]</li>
<li>Browser [e.g. chrome, safari]</li>
<li>Version [e.g. 22]</li>
</ul>
</li>
<li><strong>Smartphone:</strong>
<ul>
<li>Device: [e.g. iPhone6]</li>
<li>OS: [e.g. iOS8.1]</li>
<li>Browser [e.g. stock browser, safari]</li>
<li>Version [e.g. 22]</li>
</ul>
</li>
<li><strong>Additional Context:</strong> Add any other context about the problem here.</li>
</ul>
</li>
<li>
<p><strong>Feature Request Template:</strong></p>
<ul>
<li><strong>Description:</strong> Provide a clear and concise description of the new feature you are proposing.</li>
<li><strong>Use Case:</strong> Explain the use case or scenario where this feature would be beneficial.</li>
<li><strong>Expected Behavior:</strong> Describe the expected behavior of the new feature.</li>
<li><strong>Additional Information:</strong> Any additional details or context that might be helpful.</li>
<li><strong>Feature Request Checklist:</strong>
<ul>
<li>I have searched for similar feature requests before submitting this one.</li>
<li>I have provided a clear and descriptive title for the request.</li>
<li>I have assigned appropriate labels.</li>
<li>I have tagged the issue with the correct project milestone (if applicable).</li>
<li>I have provided all the requested information.</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>User Story Template:</strong></p>
<ul>
<li><strong>As a [type of user]:</strong> Describe the user type.</li>
<li><strong>I want [functionality]:</strong> Describe the desired functionality.</li>
<li><strong>So that [benefit]:</strong> Describe the benefit or reason.</li>
<li><strong>Acceptance Criteria:</strong>
<ol>
<li>Criteria one</li>
<li>Criteria two</li>
<li>Criteria three</li>
</ol>
</li>
</ul>
</li>
<li>
<p><strong>Enforcement:</strong></p>
<ul>
<li>Issues not following the template will be automatically closed.</li>
<li>Such issues can be reopened once they adhere to the template.</li>
</ul>
</li>
</ol>
<h3 id="linting-and-coding-standards" tabindex="-1"><a class="header-anchor" href="#linting-and-coding-standards"><span>Linting and Coding Standards</span></a></h3>
<ol>
<li>
<p><strong>Enforcement:</strong></p>
<ul>
<li>Managed by the DevOps team to ensure code quality and consistency.</li>
<li>Linting and coding standards are enforced through automated tools integrated into the CI/CD pipeline.</li>
</ul>
</li>
<li>
<p><strong>Tools:</strong></p>
<ul>
<li>We make use of ESLint throughout our repository.</li>
</ul>
</li>
</ol>
<h3 id="protected-branches" tabindex="-1"><a class="header-anchor" href="#protected-branches"><span>Protected Branches</span></a></h3>
<ol>
<li>
<p><strong>Branch Protection Rules:</strong></p>
<ul>
<li>Branch protection rules are enforced on <code v-pre>main</code> and <code v-pre>develop</code> branches.</li>
<li>These rules include:
<ul>
<li>Requiring pull request reviews before merging.</li>
<li>Passing all required status checks (linting, tests, etc.) before merging.</li>
<li>Enforcing linear history to avoid merge commits.</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>Team Reviewers:</strong></p>
<ul>
<li>All team members are designated reviewers, ensuring comprehensive code review coverage.</li>
</ul>
</li>
</ol>
<h3 id="workflow-files" tabindex="-1"><a class="header-anchor" href="#workflow-files"><span>Workflow Files</span></a></h3>
<ol>
<li>
<p><strong>Automated Workflows:</strong></p>
<ul>
<li>Workflow files are used to automate processes such as linting, unit testing, and building.</li>
<li>Examples of workflows include:
<ul>
<li><strong>Linting Workflow:</strong> Runs linting checks on push and pull request events.</li>
<li><strong>Testing Workflow:</strong> Runs unit tests to ensure code correctness.</li>
<li><strong>Build Workflow:</strong> Automates the build process and ensures that the code can be compiled successfully.</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>CI/CD Integration:</strong></p>
<ul>
<li>Our workflows are integrated into the CI/CD pipeline.</li>
<li>We make use of GitHub Actions to manage and execute workflows.</li>
</ul>
</li>
</ol>
<h3 id="branch-naming-conventions" tabindex="-1"><a class="header-anchor" href="#branch-naming-conventions"><span>Branch Naming Conventions</span></a></h3>
<ol>
<li><strong>Naming Conventions:</strong>
<ul>
<li>Establish and enforce branch naming conventions to keep the repository organized.
<ul>
<li>Example conventions:
<ul>
<li><code v-pre>feature/branch-name</code> for new features</li>
<li><code v-pre>bugfix/branch-name</code> for bug fixes</li>
<li><code v-pre>hotfix/branch-name</code> for hotfixes</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ol>
<h3 id="code-reviews" tabindex="-1"><a class="header-anchor" href="#code-reviews"><span>Code Reviews</span></a></h3>
<ol>
<li><strong>Code Review Process:</strong>
<ul>
<li>All code changes must go through a thorough review process.</li>
<li>Use GitHub’s review features (comments, suggestions) effectively to ensure code quality and adherence to standards.</li>
<li>Encourage discussions and collaborative reviews to foster knowledge sharing and catch potential issues early.</li>
</ul>
</li>
</ol>
</div></template>


