<template><div><h1 id="design-documentation" tabindex="-1"><a class="header-anchor" href="#design-documentation"><span>Design Documentation</span></a></h1>
<h2 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h2>
<p>This document details the design of the frontend</p>
<h3 id="colour-scheme" tabindex="-1"><a class="header-anchor" href="#colour-scheme"><span>Colour Scheme</span></a></h3>
<p><strong>Primary Colour:</strong> Blue</p>
<div style="width: 100px; height: 100px; background-color: #227D9B;"></div>.
<p><strong>Secondary Colour:</strong> Orange</p>
<div style="width: 100px; height: 100px; background-color: #F0984D;"></div>. 
<h3 id="font-scheme" tabindex="-1"><a class="header-anchor" href="#font-scheme"><span>Font Scheme</span></a></h3>
<p>Our pimary font it <strong>Nunito</strong></p>
<p>Example: <p style="font-family: 'Nunito', sans-serif; font-size: 18px;">The quick brown fox jumped over the lazy dog.</p></p>
<h3 id="configuration-defaults" tabindex="-1"><a class="header-anchor" href="#configuration-defaults"><span>Configuration Defaults</span></a></h3>
<p>This section details the default settings applied across various components in our application. These
settings ensure a consistent and visually appealing design.</p>
<table>
<thead>
<tr>
<th>Component</th>
<th>Class</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>VDialog</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>VCard</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>VCardTitle</td>
<td><code v-pre>text-h5 font-weight-regular bg-primary justify-end</code></td>
<td>Sets card title text to heading 5 size, regular weight, primary background, aligned to end.</td>
</tr>
<tr>
<td>VCardText</td>
<td><code v-pre>text-h7 font-weight-regular justify-center bg-cardColor</code></td>
<td>Sets card text to heading 7 size, regular weight, centered, with card color background.</td>
</tr>
<tr>
<td>VCardActions</td>
<td><code v-pre>text-h6 font-weight-regular justify-center bg-cardColor</code></td>
<td>Sets card actions text to heading 6 size, regular weight, centered, with card color background.</td>
</tr>
<tr>
<td>VSheet</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>VCardTitle</td>
<td><code v-pre>text-h5 font-weight-regular bg-primary justify-center</code></td>
<td>Sets sheet card title text to heading 5 size, regular weight, primary background, centered.</td>
</tr>
<tr>
<td>VTextField</td>
<td><code v-pre>bg-primary</code></td>
<td>Applies primary background color to text fields.</td>
</tr>
<tr>
<td>VCard</td>
<td><code v-pre>elevation: 14, rounded: 'md', height: 'auto'</code></td>
<td>Applies elevation level 14, medium rounding to corners, height set to auto for cards.</td>
</tr>
<tr>
<td>VCardTitle</td>
<td><code v-pre>text-h5 font-weight-regular d-flex justify-center bg-cardColor text-secondary</code></td>
<td>Sets card title text to heading 5 size, regular weight, flexbox alignment, centered, card color background, secondary text color.</td>
</tr>
<tr>
<td>VCardText</td>
<td><code v-pre>bg-cardColor</code></td>
<td>Applies card color as background for card text.</td>
</tr>
<tr>
<td>VList</td>
<td><code v-pre>bg-cardColor</code></td>
<td>Applies card color as background for list within card.</td>
</tr>
<tr>
<td>VBtn</td>
<td><code v-pre>rounded: 'md', variant: 'text', class: 'text-none font-weight-regular hello', size: 'large'</code></td>
<td>Sets button properties: medium rounding, text variant, no visible text, regular font weight, 'hello' class, large size.</td>
</tr>
<tr>
<td>VSheet</td>
<td><code v-pre>elevation: 14, rounded: 'md', height: 'auto'</code></td>
<td>Applies elevation level 14, medium rounding to corners, height set to auto for sheets.</td>
</tr>
<tr>
<td>VDivider</td>
<td><code v-pre>thickness: 3</code></td>
<td>Sets divider thickness to 3.</td>
</tr>
<tr>
<td>VAutocomplete</td>
<td><code v-pre>density: 'compact', rounded: 'md', variant: 'solo'</code></td>
<td>Sets autocomplete properties: compact density, medium rounding, solo variant.</td>
</tr>
<tr>
<td>VIcon</td>
<td><code v-pre>color: 'secondary'</code></td>
<td>Sets icon color tosecondary.</td>
</tr>
<tr>
<td>VTextField</td>
<td><code v-pre>variant: 'solo', rounded: 'md', density: 'compact', clearable: true, color: 'cardColor'</code></td>
<td>Sets text field properties: solo variant, medium rounding, compact density, clearable, color based on card color.</td>
</tr>
<tr>
<td>VRow</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>VCol</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>Label</td>
<td><code v-pre>class: 'font-weight-bold', style: 'font-size: 20px'</code></td>
<td>Sets label text to bold font weight, font size of 20px.</td>
</tr>
<tr>
<td>VChip</td>
<td><code v-pre>rounded: 'md'</code></td>
<td>Applies medium rounding to corners of chips.</td>
</tr>
</tbody>
</table>
<h3 id="theme-configuration" tabindex="-1"><a class="header-anchor" href="#theme-configuration"><span>Theme Configuration</span></a></h3>
<table>
<thead>
<tr>
<th>Light Theme</th>
<th>Hex Code</th>
<th>Dark Theme</th>
<th>Hex Code</th>
</tr>
</thead>
<tbody>
<tr>
<td>background</td>
<td><div style="width: 100px; height: 100px; background-color: #F7F8F9;"></div></td>
<td>background</td>
<td><div style="width: 100px; height: 100px; background-color: #161A1D;"></div></td>
</tr>
<tr>
<td>primary</td>
<td><div style="width: 100px; height: 100px; background-color: #F0984D;"></div></td>
<td>primary</td>
<td><div style="width: 100px; height: 100px; background-color: #F38A3F;"></div></td>
</tr>
<tr>
<td>secondary</td>
<td><div style="width: 100px; height: 100px; background-color: #227D9B;"></div></td>
<td>secondary</td>
<td><div style="width: 100px; height: 100px; background-color: #4C9FC3;"></div></td>
</tr>
<tr>
<td>accent</td>
<td><div style="width: 100px; height: 100px; background-color: #82B1FF;"></div></td>
<td>accent</td>
<td><div style="width: 100px; height: 100px; background-color: #448AFF;"></div></td>
</tr>
<tr>
<td>error</td>
<td><div style="width: 100px; height: 100px; background-color: #e63946;"></div></td>
<td>error</td>
<td><div style="width: 100px; height: 100px; background-color: #E63946;"></div></td>
</tr>
<tr>
<td>info</td>
<td><div style="width: 100px; height: 100px; background-color: #2196F3;"></div></td>
<td>info</td>
<td><div style="width: 100px; height: 100px; background-color: #64B5F6;"></div></td>
</tr>
<tr>
<td>success</td>
<td><div style="width: 100px; height: 100px; background-color: #37471F;"></div></td>
<td>success</td>
<td><div style="width: 100px; height: 100px; background-color: #81C784;"></div></td>
</tr>
<tr>
<td>warning</td>
<td><div style="width: 100px; height: 100px; background-color: #FFC107;"></div></td>
<td>warning</td>
<td><div style="width: 100px; height: 100px; background-color: #FFD54F;"></div></td>
</tr>
<tr>
<td>cardColor</td>
<td><div style="width: 100px; height: 100px; background-color: #F1F2F4;"></div></td>
<td>cardColor</td>
<td><div style="width: 100px; height: 100px; background-color: #22272B;"></div></td>
</tr>
<tr>
<td>elementTextColor</td>
<td><div style="width: 100px; height: 100px; background-color: #4C9FC3;"></div></td>
<td>elementTextColor</td>
<td><div style="width: 100px; height: 100px; background-color: #B6C2CF;"></div></td>
</tr>
<tr>
<td>headingTextColor</td>
<td><div style="width: 100px; height: 100px; background-color: #091E42;"></div></td>
<td>headingTextColor</td>
<td><div style="width: 100px; height: 100px; background-color: #DCDFE4;"></div></td>
</tr>
<tr>
<td>n_elementTextColor</td>
<td><div style="width: 100px; height: 100px; background-color: #8C9BAB;"></div></td>
<td>n_elementTextColor</td>
<td><div style="width: 100px; height: 100px; background-color: #8C9BAB;"></div></td>
</tr>
<tr>
<td>highlighter</td>
<td><div style="width: 100px; height: 100px; background-color: #DEE4EA;"></div></td>
<td>highlighter</td>
<td><div style="width: 100px; height: 100px; background-color: #DEE4EA;"></div></td>
</tr>
</tbody>
</table>
</div></template>


