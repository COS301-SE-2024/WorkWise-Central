import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),

  lang: 'en-US',
  title: 'WorkWise Central',
  description: 'The is the offical documentation for the WorkWise Central project',
  theme: defaultTheme({
    locales: {
      '/': {
        lang: 'en-US',
      },
      '/zh/': {
        lang: 'zh-CN',
      },
    },
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/guide/' },
      // { text: 'About', link: '/about/' },
      { text: 'GitHub', link: 'https://github.com/COS301-SE-2024/WorkWise-Central' },
      { text: 'Figma', link: 'https://www.figma.com/design/A2DXLoJH7QvZ6RzI711zUC/WorkWise?node-id=0-1&t=mAFPbit2in8F1o5m-0' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        prefix: '/guide/',
        link: '/guide/',
      },
      {
        text: 'Design Documentation',
        prefix: '/designDocs/',
        link: '/designDocs/',
        children: [
          {
            text: 'Wireframes',
            link: '/designDocs/wireframes.md',
          },
          {
            text: 'Class diagrams',
            link: '/designDocs/classDiagrams.md',
          },
        ],
      },
      {
        text: 'Business Documentation',
        prefix: '/businessDocs/',
        link: '/businessDocs/',
        children: [
          {
            text: 'User characteristics',
            link: '/businessDocs/userCharacteristics.md',
          },
          {
            text: 'User stories',
            link: '/businessDocs/userStories.md',
          },
          {
            text: 'Use case diagrams',
            link: '/businessDocs/usecaseDiagrams.md',
          },
          {
            text: 'Functional requirement specifications',
            link: '/businessDocs/functionalRequirements.md',
          },
          {
            text: 'Service contract',
            link: '/businessDocs/serviceContract.md',
          },
          {
            text: 'Market Research',
            link: '/businessDocs/marketResearch.md',
          },
        ],
      },
      {
        text: 'Database Documentation',
        prefix: '/databaseDocs/',
        link: '/databaseDocs/',
        children: [
          {
            text: 'Database functional requirements',
            link: '/databaseDocs/dbFunctionalRequirements.md',
          },
          {
            text: 'Database non-functional requirements',
            link: '/databaseDocs/dbNonFunctionalRequirements.md',
          },
          {
            text: 'Constraints',
            link: '/databaseDocs/constraints.md',
          },
          {
            text: 'Data Model',
            link: '/databaseDocs/dataModel.md',
          },
          {
            text: 'ER Diagram',
            link: '/databaseDocs/ERDiagrams.md',
          },
          {
            text: 'Database Schema',
            link: '/databaseDocs/dbSchema.md',
          },
        ],
      },
      {
        text: 'Architetural Documentation',
        prefix: '/architeturalDocs/',
        link: '/architeturalDocs/',
        children: [
          {
            text: 'Quality Requirements',
            link: '/architeturalDocs/qualityRequirements.md',
          },
          {
            text: 'Architectural Patterns',
            link: '/architeturalDocs/architecturalPatterns.md',
          },
          {
            text: 'Design Patterns',
            link: '/architeturalDocs/designPatterns.md',
          },
          {
            text: 'Constraints',
            link: '/architeturalDocs/constraints.md',
          },
        ],
      },
    ]
  }),
})
