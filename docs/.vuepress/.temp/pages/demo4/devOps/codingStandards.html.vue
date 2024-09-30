<template><div><h1 id="coding-standards" tabindex="-1"><a class="header-anchor" href="#coding-standards"><span>Coding Standards</span></a></h1>
<h2 id="coding-conventions-and-styles" tabindex="-1"><a class="header-anchor" href="#coding-conventions-and-styles"><span>Coding Conventions and Styles</span></a></h2>
<h3 id="general-conventions" tabindex="-1"><a class="header-anchor" href="#general-conventions"><span>General Conventions</span></a></h3>
<ul>
<li><strong>Indentation</strong>: Use 2 spaces for indentation.</li>
<li><strong>Line Length</strong>: Limit lines to 120 characters.</li>
<li><strong>File Naming</strong>: Use kebab-case for file names (e.g., <code v-pre>service-delivery.component.ts</code>).</li>
<li><strong>Comments</strong>: Use <code v-pre>//</code> for single-line comments and <code v-pre>/* ... */</code> for multi-line comments. Ensure comments are meaningful and provide value.</li>
<li><strong>Version Control</strong>: Follow the Git Flow branching model.</li>
</ul>
<h3 id="typescript-conventions" tabindex="-1"><a class="header-anchor" href="#typescript-conventions"><span>TypeScript Conventions</span></a></h3>
<ul>
<li><strong>Types</strong>: Always explicitly define types.</li>
<li><strong>Interfaces</strong>: Use <code v-pre>interface</code> for defining object properties.</li>
<li><strong>Enums</strong>: Use <code v-pre>enum</code> for defining sets of named constants.</li>
<li><strong>Classes</strong>: Use PascalCase for class names.</li>
<li><strong>Variables and Functions</strong>: Use camelCase for variable and function names.</li>
<li><strong>Constants</strong>: Use UPPER_CASE for constants.</li>
</ul>
<h3 id="frontend-conventions" tabindex="-1"><a class="header-anchor" href="#frontend-conventions"><span>Frontend Conventions</span></a></h3>
<h4 id="vue" tabindex="-1"><a class="header-anchor" href="#vue"><span>Vue</span></a></h4>
<ul>
<li><strong>Component Structure</strong>: Use the <code v-pre>&lt;template&gt;</code>, <code v-pre>&lt;script&gt;</code>, and <code v-pre>&lt;style&gt;</code> sections in single-file components.</li>
<li><strong>Props</strong>: Define prop types and default values.</li>
<li><strong>Events</strong>: Use <code v-pre>$emit</code> to trigger events and define event names in kebab-case.</li>
<li><strong>Lifecycle Hooks</strong>: Order lifecycle hooks as they are called (<code v-pre>created</code>, <code v-pre>mounted</code>, <code v-pre>updated</code>, <code v-pre>destroyed</code>).</li>
</ul>
<h3 id="backend-conventions" tabindex="-1"><a class="header-anchor" href="#backend-conventions"><span>Backend Conventions</span></a></h3>
<h4 id="nestjs" tabindex="-1"><a class="header-anchor" href="#nestjs"><span>NestJs</span></a></h4>
<p><strong>Modules</strong>:
Use modules to organize your application logically. Only use Global modules when it is justified. Ensure that modules export all services required by importing modules (To prevent circular dependencies)</p>
<p><strong>Controllers</strong>: Use controllers to handle incoming requests and return responses. Controllers must utilise the <code v-pre>class-validator</code> and <code v-pre>class-validator</code> libraries in order to validate and sanitize incoming requests.</p>
<p><strong>Services</strong>: Use services to handle business logic, this encompasses the role-based access and users' permissions. Services must not make queries directly to the Database, but rather through their injected <strong>Repository Class</strong>.</p>
<p><strong>Repositories</strong>: These classes must only contain queries to relevant Mongoose models related to a Service. No validation should be performed in these classes.</p>
<p><strong>Providers</strong>: Use providers for dependency injection. Only add providers that are required by the Service.</p>
<h4 id="mongodb" tabindex="-1"><a class="header-anchor" href="#mongodb"><span>MongoDB</span></a></h4>
<p><strong>Entities</strong>: They represent documents in our schema, they also specify indexes and middleware to be used with Mongoose based on specific operations.</p>
<p><strong>Dtos</strong>: These specify request/response body structure, including the data sanitation and transformation before reaching the controllers.</p>
<h2 id="file-structure" tabindex="-1"><a class="header-anchor" href="#file-structure"><span>File Structure</span></a></h2>
<p>.github/</p>
<p>├── ...</p>
<p>cypress/</p>
<p>├── ...</p>
<p>docs/</p>
<p>├── ...</p>
<p>node_modules/</p>
<p>├── ...</p>
<p>res/</p>
<p>├── ...</p>
<p>revealJS/</p>
<p>├── ...</p>
<p>src/</p>
<p>├──api-gateway/</p>
<p>│ ├── coverage/</p>
<p>│ ├── dist/</p>
<p>│ ├── node_modules/</p>
<p>│ ├── src/</p>
<p>│ │ ├── ...</p>
<p>│ ├── test/</p>
<p>│ │ ├── ...</p>
<p>│ ├── ...</p>
<p>├──frontend/</p>
<p>│ ├── cypress/</p>
<p>│ ├── dev-dist/</p>
<p>│ ├── dist/</p>
<p>│ ├── img/</p>
<p>│ ├── nginx/</p>
<p>│ ├── node_modules/</p>
<p>│ ├── public/</p>
<p>│ ├── src/</p>
<p>│ │ ├── assets</p>
<p>│ │ ├── components</p>
<p>│ │ ├── ...</p>
<p>│ ├── .env</p>
<p>│ ├── ...</p>
<p>├──docker-compose.yml</p>
<p>├──.env</p>
<p>uploads</p>
<p>├── ...</p>
<p>...</p>
<h2 id="linter-and-formatting-tools" tabindex="-1"><a class="header-anchor" href="#linter-and-formatting-tools"><span>Linter and Formatting Tools</span></a></h2>
<h3 id="frontend-vue-with-typescript" tabindex="-1"><a class="header-anchor" href="#frontend-vue-with-typescript"><span>Frontend (Vue with TypeScript)</span></a></h3>
<ul>
<li><strong>ESLint</strong>: Ensure code quality and consistency.
<ul>
<li>Configuration: <code v-pre>extends: ['plugin:vue/vue3-essential', '@vue/typescript/recommended']</code></li>
</ul>
</li>
<li><strong>Prettier</strong>: Code formatting.
<ul>
<li>Configuration: <code v-pre>.prettierrc</code><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"semi"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"singleQuote"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"printWidth"</span><span class="token operator">:</span> <span class="token number">80</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"tabWidth"</span><span class="token operator">:</span> <span class="token number">2</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h3 id="backend-nestjs-with-typescript" tabindex="-1"><a class="header-anchor" href="#backend-nestjs-with-typescript"><span>Backend (NestJS with TypeScript)</span></a></h3>
<ul>
<li><strong>ESLint</strong>: Ensure code quality and consistency.
<ul>
<li>Configuration: <code v-pre>extends: ['@nestjs/eslint-config', 'plugin:@typescript-eslint/recommended']</code></li>
</ul>
</li>
<li><strong>Prettier</strong>: Code formatting.
<ul>
<li>Configuration: <code v-pre>.prettierrc</code><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"semi"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"singleQuote"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"printWidth"</span><span class="token operator">:</span> <span class="token number">120</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"tabWidth"</span><span class="token operator">:</span> <span class="token number">2</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion"><span>Conclusion</span></a></h2>
<p>Adhering to these coding standards will ensure that the codebase remains clean, understandable, and maintainable. Consistent use of these conventions will help in achieving a uniform style, clarity, and efficiency in the development process.</p>
</div></template>


