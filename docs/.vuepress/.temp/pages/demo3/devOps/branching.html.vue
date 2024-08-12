<template><div><h1 id="branching-strategy" tabindex="-1"><a class="header-anchor" href="#branching-strategy"><span>Branching strategy</span></a></h1>
<p><img src="/gitflow.png" alt="GitFlow"></p>
<p>For this project, we are utilising the GitFlow branching strategy.
Gitflow is a well-defined workflow that enhances collaboration, ensures a structured development process, and facilitates smooth release management.
By following this strategy, we aim to maintain a stable codebase, manage features efficiently, and handle releases and hotfixes systematically.</p>
<h4 id="from-our-repo" tabindex="-1"><a class="header-anchor" href="#from-our-repo"><span>From our repo</span></a></h4>
<p><img src="/branching.png" alt="Branching">
<img src="/branches.png" alt="Branches"></p>
<h2 id="key-branches" tabindex="-1"><a class="header-anchor" href="#key-branches"><span>Key Branches</span></a></h2>
<h3 id="main" tabindex="-1"><a class="header-anchor" href="#main"><span>Main</span></a></h3>
<ul>
<li>Purpose: Holds the production-ready code.</li>
<li>Stability: Must always be stable and deployable.</li>
<li>Releases: Each merge into main represents a new release version, tagged accordingly.</li>
</ul>
<h3 id="develop" tabindex="-1"><a class="header-anchor" href="#develop"><span>Develop</span></a></h3>
<ul>
<li>Purpose: Serves as the integration branch for feature development.</li>
<li>Stability: Should remain stable with integrated features ready for the next release.</li>
</ul>
<h2 id="supporting-branches" tabindex="-1"><a class="header-anchor" href="#supporting-branches"><span>Supporting Branches</span></a></h2>
<h3 id="feature-branch" tabindex="-1"><a class="header-anchor" href="#feature-branch"><span>Feature branch</span></a></h3>
<ul>
<li>Purpose: Used to develop new features.</li>
<li>Naming Convention: <code v-pre>feature/feature-name</code> (e.g., feature/user-authentication).</li>
<li>Creation: Branch off from <code v-pre>develop</code>.</li>
<li>Merge: Merged back into <code v-pre>develop</code> after completion and testing.</li>
</ul>
<h3 id="release-branch" tabindex="-1"><a class="header-anchor" href="#release-branch"><span>Release branch</span></a></h3>
<ul>
<li>Purpose: Used to prepare for a new production release, allowing for minor bug fixes and final tweaks.</li>
<li>Naming Convention: <code v-pre>release/release-version</code> (e.g., release/1.0.0).</li>
<li>Creation: Branch off from <code v-pre>develop</code> when the codebase is ready for a new release.
Merge: Merged into <code v-pre>main</code> and <code v-pre>develop</code> after finalization.</li>
</ul>
<h3 id="hotfix-branch" tabindex="-1"><a class="header-anchor" href="#hotfix-branch"><span>Hotfix branch</span></a></h3>
<ul>
<li>Purpose: Used to quickly address critical issues found in the production environment.</li>
<li>Naming Convention: <code v-pre>hotfix/hotfix-name</code> (e.g., hotfix/security-patch).</li>
<li>Creation: Branch off from <code v-pre>main</code>.</li>
<li>Merge: Merged into <code v-pre>main</code> and <code v-pre>develop</code> after the fix is applied.</li>
</ul>
<h2 id="workflow" tabindex="-1"><a class="header-anchor" href="#workflow"><span>Workflow</span></a></h2>
<h3 id="feature-development" tabindex="-1"><a class="header-anchor" href="#feature-development"><span>Feature Development</span></a></h3>
<ol>
<li>Creating a Feature Branch:</li>
</ol>
<ul>
<li>Create a new branch from develop using the naming convention <code v-pre>feature/feature-name</code>.</li>
<li>Work on the feature, committing changes regularly.</li>
</ul>
<ol start="2">
<li>Completing a Feature:</li>
</ol>
<ul>
<li>Ensure the feature is complete and thoroughly tested.</li>
<li>Open a pull request (PR) to merge the feature branch into develop.</li>
<li>Conduct a code review and resolve any feedback.</li>
<li>Merge the feature branch into develop and delete the feature branch.</li>
</ul>
<h3 id="release-preparation" tabindex="-1"><a class="header-anchor" href="#release-preparation"><span>Release Preparation</span></a></h3>
<ol>
<li>Creating a Release Branch:</li>
</ol>
<ul>
<li>When develop has accumulated enough changes, create a release branch from <code v-pre>develop</code>.</li>
<li>Name the branch <code v-pre>release/release-version</code>.</li>
</ul>
<ol start="2">
<li>Finalizing the Release:</li>
</ol>
<ul>
<li>Perform any final testing and bug fixing on the release branch.</li>
<li>Update version numbers and documentation as needed.</li>
</ul>
<ol start="3">
<li>Completing the Release:</li>
</ol>
<ul>
<li>Merge the release branch into main and tag the release.</li>
<li>Merge the release branch back into develop to incorporate any changes made during the release preparation.</li>
<li>Delete the release branch.</li>
</ul>
<h3 id="hotfix-management" tabindex="-1"><a class="header-anchor" href="#hotfix-management"><span>Hotfix Management</span></a></h3>
<ol>
<li>Creating a Hotfix Branch:</li>
</ol>
<ul>
<li>Create a hotfix branch from main using the naming convention <code v-pre>hotfix/hotfix-name</code>.</li>
<li>Implement the necessary fixes, committing changes regularly.</li>
</ul>
<ol start="2">
<li>Completing a Hotfix:</li>
</ol>
<ul>
<li>Ensure the hotfix is complete and thoroughly tested.</li>
<li>Open a PR to merge the hotfix branch into main and develop.</li>
<li>Conduct a code review and resolve any feedback.</li>
<li>Merge the hotfix branch into main and tag the release.</li>
<li>Merge the hotfix branch into develop to keep the codebase in sync.</li>
<li>Delete the hotfix branch.</li>
</ul>
</div></template>


