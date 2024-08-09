# Design Documentation

## Description
This document details the design of the frontend

### Colour Scheme
**Primary Colour:** Blue
<div style="width: 100px; height: 100px; background-color: #227D9B;"></div>.

**Secondary Colour:** Orange
<div style="width: 100px; height: 100px; background-color: #F0984D;"></div>. 


### Font Scheme
Our pimary font it **Nunito**

Example: <p style="font-family: 'Nunito', sans-serif; font-size: 18px;">The quick brown fox jumped over the lazy dog.</p>


### Configuration Defaults
This section details the default settings applied across various components in our application. These
settings ensure a consistent and visually appealing design.

| Component | Class | Description                                                                                                                      |
|-----------------|---------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| VDialog | - | -                                                                                                                                |
| VCard | - | -                                                                                                                                |
| VCardTitle | `text-h5 font-weight-regular bg-primary justify-end` | Sets card title text to heading 5 size, regular weight, primary background, aligned to end.                                      |
| VCardText | `text-h7 font-weight-regular justify-center bg-cardColor`| Sets card text to heading 7 size, regular weight, centered, with card color background.                                          |
| VCardActions | `text-h6 font-weight-regular justify-center bg-cardColor`| Sets card actions text to heading 6 size, regular weight, centered, with card color background.                                  |
| VSheet | - | -                                                                                                                                |
| VCardTitle | `text-h5 font-weight-regular bg-primary justify-center` | Sets sheet card title text to heading 5 size, regular weight, primary background, centered.                                      |
| VTextField | `bg-primary` | Applies primary background color to text fields.                                                                                 |
| VCard | `elevation: 14, rounded: 'md', height: 'auto'` | Applies elevation level 14, medium rounding to corners, height set to auto for cards.                                            |
| VCardTitle | `text-h5 font-weight-regular d-flex justify-center bg-cardColor text-secondary` | Sets card title text to heading 5 size, regular weight, flexbox alignment, centered, card color background, secondary text color. |
| VCardText | `bg-cardColor` | Applies card color as background for card text.                                                                                  |
| VList | `bg-cardColor` | Applies card color as background for list within card.                                                                           |
| VBtn | `rounded: 'md', variant: 'text', class: 'text-none font-weight-regular hello', size: 'large'` | Sets button properties: medium rounding, text variant, no visible text, regular font weight, 'hello' class, large size.          |
| VSheet | `elevation: 14, rounded: 'md', height: 'auto'` | Applies elevation level 14, medium rounding to corners, height set to auto for sheets.                                           |
| VDivider | `thickness: 3` | Sets divider thickness to 3.                                                                                                     |
| VAutocomplete | `density: 'compact', rounded: 'md', variant: 'solo'` | Sets autocomplete properties: compact density, medium rounding, solo variant.                                                    |
| VIcon | `color: 'secondary'` | Sets icon color tosecondary.                                                                                                     |
| VTextField | `variant: 'solo', rounded: 'md', density: 'compact', clearable: true, color: 'cardColor'`| Sets text field properties: solo variant, medium rounding, compact density, clearable, color based on card color.                |
| VRow | - | -                                                                                                                                |
| VCol | - | -                                                                                                                                |
| Label | `class: 'font-weight-bold', style: 'font-size: 20px'` | Sets label text to bold font weight, font size of 20px.                                                                          |
| VChip | `rounded: 'md'` | Applies medium rounding to corners of chips.                                                                                     |


### Theme Configuration

| Light Theme | Hex Code | Dark Theme | Hex Code |
|----------------------|--------------|----------------------|--------------|
| background | #F7F8F9 | background | #161A1D |
| primary | #F0984D | primary | #F38A3F |
| secondary | #227D9B | secondary | #4C9FC3 |
| accent | #82B1FF | accent | #448AFF |
| error | #e63946 | error | #E63946 |
| info | #2196F3 | info | #64B5F6 |
| success | #37471F | success | #81C784 |
| warning | #FFC107 | warning | #FFD54F |
| cardColor | #F1F2F4 | cardColor | #22272B |
| elementTextColor | #4C9FC3 | elementTextColor | #B6C2CF |
| headingTextColor | #091E42 | headingTextColor | #DCDFE4 |
| n_elementTextColor | #8C9BAB | n_elementTextColor | #8C9BAB |
| highlighter | #DEE4EA | highlighter | #DEE4EA |