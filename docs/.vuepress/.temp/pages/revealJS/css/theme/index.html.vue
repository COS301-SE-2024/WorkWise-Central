<template><div><h2 id="dependencies" tabindex="-1"><a class="header-anchor" href="#dependencies"><span>Dependencies</span></a></h2>
<p>Themes are written using Sass to keep things modular and reduce the need for repeated selectors across files. Make sure that you have the reveal.js development environment installed before proceeding: https://revealjs.com/installation/#full-setup</p>
<h2 id="creating-a-theme" tabindex="-1"><a class="header-anchor" href="#creating-a-theme"><span>Creating a Theme</span></a></h2>
<p>To create your own theme, start by duplicating a <code v-pre>.scss</code> file in <a href="https://github.com/hakimel/reveal.js/blob/master/css/theme/source" target="_blank" rel="noopener noreferrer">/css/theme/source</a>. It will be automatically compiled from Sass to CSS (see the <a href="https://github.com/hakimel/reveal.js/blob/master/gulpfile.js" target="_blank" rel="noopener noreferrer">gulpfile</a>) when you run <code v-pre>npm run build -- css-themes</code>.</p>
<p>Each theme file does four things in the following order:</p>
<ol>
<li>
<p><strong>Include <a href="https://github.com/hakimel/reveal.js/blob/master/css/theme/template/mixins.scss" target="_blank" rel="noopener noreferrer">/css/theme/template/mixins.scss</a></strong>
Shared utility functions.</p>
</li>
<li>
<p><strong>Include <a href="https://github.com/hakimel/reveal.js/blob/master/css/theme/template/settings.scss" target="_blank" rel="noopener noreferrer">/css/theme/template/settings.scss</a></strong>
Declares a set of custom variables that the template file (step 4) expects. Can be overridden in step 3.</p>
</li>
<li>
<p><strong>Override</strong>
This is where you override the default theme. Either by specifying variables (see <a href="https://github.com/hakimel/reveal.js/blob/master/css/theme/template/settings.scss" target="_blank" rel="noopener noreferrer">settings.scss</a> for reference) or by adding any selectors and styles you please.</p>
</li>
<li>
<p><strong>Include <a href="https://github.com/hakimel/reveal.js/blob/master/css/theme/template/theme.scss" target="_blank" rel="noopener noreferrer">/css/theme/template/theme.scss</a></strong>
The template theme file which will generate final CSS output based on the currently defined variables.</p>
</li>
</ol>
</div></template>


