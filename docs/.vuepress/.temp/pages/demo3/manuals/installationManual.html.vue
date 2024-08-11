<template><div><h1 id="technical-installation-manual" tabindex="-1"><a class="header-anchor" href="#technical-installation-manual"><span>Technical Installation Manual</span></a></h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction"><span>Introduction</span></a></h2>
<p>WorkWise is a PWA designed to be a management tool for service delivery businesses. This is the technical installation manual for the project</p>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h2>
<h3 id="node-js-npm" tabindex="-1"><a class="header-anchor" href="#node-js-npm"><span>Node.js &amp; npm</span></a></h3>
<p>To be able to run this project you will need to install <a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer">node 18.18.0</a> &amp; <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">npm</a>.</p>
<h4 id="on-windows" tabindex="-1"><a class="header-anchor" href="#on-windows"><span>On Windows</span></a></h4>
<ol>
<li>Download Node.js Installer
<ul>
<li>Visit the Node.js website: Go to the official <a href="https://nodejs.org/en/download/package-manager/current" target="_blank" rel="noopener noreferrer">Node.js website</a>.</li>
<li>Choose the version: Download the latest LTS (Long Term Support) version, as it's recommended for most users.
<img src="/nodejsInstallation.png" alt="node installation image"></li>
</ul>
</li>
<li>Install Node.js
<ul>
<li>Run the installer: Locate the downloaded .msi file and double-click it to start the installation.</li>
<li>Follow the prompts: The installer will guide you through the installation process.</li>
</ul>
</li>
<li>Verify Installation
<ul>
<li>Open Command Prompt or PowerShell</li>
<li>Check Node.js installation:<div class="language-PowerShell line-numbers-mode" data-highlighter="prismjs" data-ext="PowerShell" data-title="PowerShell"><pre v-pre class="language-PowerShell"><code><span class="line">node -v</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>This should display the installed version of Node.js.</li>
</ul>
</li>
</ul>
<ol start="4">
<li>Update npm (Optional)
<ul>
<li>If you want to ensure you have the latest version of npm, you can update it by running:</li>
</ul>
<div class="language-PowerShell line-numbers-mode" data-highlighter="prismjs" data-ext="PowerShell" data-title="PowerShell"><pre v-pre class="language-PowerShell"><code><span class="line">  npm install -g npm</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ol>
</li>
</ol>
<h4 id="on-linux" tabindex="-1"><a class="header-anchor" href="#on-linux"><span>On Linux</span></a></h4>
<ol>
<li>Update Your Package List
<ul>
<li>First, update the package list to make sure you have the latest information:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">  <span class="token function">sudo</span> <span class="token function">apt</span> update</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>Install Node.js and npm
<ul>
<li>You can install both Node.js and npm using the following command:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">   <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> nodejs <span class="token function">npm</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>Verify the Installation
<ul>
<li>To check the Node.js version:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">   <span class="token function">node</span> <span class="token parameter variable">-v</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>To check the npm version:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">   <span class="token function">npm</span> <span class="token parameter variable">-v</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>Update npm (Optional)
<ul>
<li>If you want to ensure you have the latest version of npm, you can update it using npm itself:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">   <span class="token function">sudo</span> <span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> <span class="token function">npm</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ol>
<h4 id="on-macos" tabindex="-1"><a class="header-anchor" href="#on-macos"><span>On MacOS</span></a></h4>
<ol>
<li>Install Node.js via Homebrew (Recommended)
<ul>
<li>Install Homebrew (if not already installed)
<ul>
<li>If you haven't installed Homebrew yet, you can install it by running the following command in your Terminal:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">    /bin/bash <span class="token parameter variable">-c</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh<span class="token variable">)</span></span>"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>Install Node.js (includes npm)
<ul>
<li>Once Homebrew is installed, you can install Node.js by running:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">    brew <span class="token function">install</span> <span class="token function">node</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>Verify the Installation
<ul>
<li>Check the Node.js version:<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">    <span class="token function">node</span> <span class="token parameter variable">-v</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>Check the npm version:<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">   <span class="token function">npm</span> <span class="token parameter variable">-v</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>Update npm (Optional)
<ul>
<li>To ensure you have the latest version of npm, you can update it by running:<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">   <span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> <span class="token function">npm</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
</ol>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2>
<p>You will need to install the project from <a href="https://github.com/COS301-SE-2024/WorkWise-Central" target="_blank" rel="noopener noreferrer">this</a> repository.</p>
<ol>
<li>Clone the Repository
<ul>
<li>First, you need to clone the repository to your local machine. Open your terminal and use the following command:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">     <span class="token function">git</span> clone https://github.com/COS301-SE-2024/WorkWise-Central</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>Navigate to the Project Directory
<ul>
<li>Once the repository is cloned, navigate to the project directory:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">     <span class="token builtin class-name">cd</span> WorkWise-Central</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>Install Dependencies
<ul>
<li>To install all the dependencies, run the following command:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">     <span class="token function">npm</span> <span class="token function">install</span> <span class="token operator">&amp;&amp;</span></span>
<span class="line">     <span class="token builtin class-name">cd</span> src/api-gateway <span class="token operator">&amp;&amp;</span></span>
<span class="line">     <span class="token function">npm</span> <span class="token function">install</span> <span class="token operator">&amp;&amp;</span></span>
<span class="line">     <span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/frontend <span class="token operator">&amp;&amp;</span></span>
<span class="line">     <span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="running" tabindex="-1"><a class="header-anchor" href="#running"><span>Running</span></a></h2>
<p>To run the project you need to add .env files in the appropriate places. Make sure to add all the appropriate values to the keys</p>
<h3 id="env-files" tabindex="-1"><a class="header-anchor" href="#env-files"><span>.env files</span></a></h3>
<p>You will need to add .env files in the following places in the project.</p>
<h4 id="in-the-src-folder" tabindex="-1"><a class="header-anchor" href="#in-the-src-folder"><span>In the &quot;src&quot; folder</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">ANON_KEY=</span>
<span class="line">SUPER_KEY=</span>
<span class="line">SERVER_LOGIN=</span>
<span class="line"></span>
<span class="line">#Basic mail</span>
<span class="line">EMAIL_HOST=</span>
<span class="line">EMAIL_USERNAME=</span>
<span class="line">EMAIL_PASSWORD=</span>
<span class="line">EMAIL_PORT=</span>
<span class="line"></span>
<span class="line">#Final mail</span>
<span class="line">MAIL_HOST=</span>
<span class="line">MAIL_USER=</span>
<span class="line">MAIL_PASSWORD=</span>
<span class="line">MAIL_FROM=</span>
<span class="line">MAIL_TRANSPORT=</span>
<span class="line"></span>
<span class="line">FB_PRIVATE_KEY=</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="in-the-api-gateway-folder" tabindex="-1"><a class="header-anchor" href="#in-the-api-gateway-folder"><span>In the &quot;api-gateway&quot; folder</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">ANON_KEY=</span>
<span class="line">SUPER_KEY=</span>
<span class="line">SERVER_LOGIN=</span>
<span class="line"></span>
<span class="line">#Basic mail</span>
<span class="line">EMAIL_HOST=</span>
<span class="line">EMAIL_USERNAME=</span>
<span class="line">EMAIL_PASSWORD=</span>
<span class="line">EMAIL_PORT=</span>
<span class="line"></span>
<span class="line">#Final mail</span>
<span class="line">MAIL_HOST=</span>
<span class="line">MAIL_USER=</span>
<span class="line">MAIL_PASSWORD=</span>
<span class="line">MAIL_FROM=</span>
<span class="line">MAIL_TRANSPORT=</span>
<span class="line"></span>
<span class="line">CLOUDINARY_CLOUD_NAME=</span>
<span class="line">CLOUDINARY_API_KEY=</span>
<span class="line">CLOUDINARY_API_SECRET=</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="running-1" tabindex="-1"><a class="header-anchor" href="#running-1"><span>Running</span></a></h3>
<ol>
<li>Move to the root directory of the project<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">    <span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/<span class="token punctuation">..</span>/</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>Run the following command<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">    <span class="token builtin class-name">cd</span> <span class="token function">npm</span> run start:dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>Open the website by going to <a href="http://localhost:5173/" target="_blank" rel="noopener noreferrer">http://localhost:5173/</a></li>
</ol>
</div></template>


