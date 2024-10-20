import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  bundler: viteBundler(),
  lang: "en-US",
  title: "WorkWise Central",
  description: "The official documentation for the WorkWise Central project",
  theme: defaultTheme({
    locales: {
      "/": {
        lang: "en-US",
      },
      "/zh/": {
        lang: "zh-CN",
      },
    },
    navbar: [
      { text: "Home", link: "/" },
      {
        text: "Docs",
        children: [
          {
            text: "Demo 1",
            link: "/demo1/guide/",
          },
          {
            text: "Demo 2",
            link: "/demo2/guide/",
          },
          {
            text: "Demo 3",
            link: "/demo3/guide/",
          },
          {
            text: "Demo 4",
            link: "/demo4/guide/",
          },
        ],
      },
      {
        text: "GitHub",
        link: "https://github.com/COS301-SE-2024/WorkWise-Central",
      },
      {
        text: "Figma",
        link: "https://www.figma.com/design/A2DXLoJH7QvZ6RzI711zUC/WorkWise?node-id=0-1&t=mAFPbit2in8F1o5m-0",
      },
    ],
    sidebar: {
      "/demo1/": [
        {
          text: "Introduction",
          link: "/demo1/guide/",
        },
        {
          text: "Design Documentation",
          link: "/demo1/designDocs/",
          children: [
            { text: "Wireframes", link: "/demo1/designDocs/wireframes.md" },
            {
              text: "Class diagrams",
              link: "/demo1/designDocs/classDiagrams.md",
            },
          ],
        },
        {
          text: "Business Documentation",
          link: "/demo1/businessDocs/",
          children: [
            {
              text: "User characteristics",
              link: "/demo1/businessDocs/userCharacteristics.md",
            },
            {
              text: "User stories",
              link: "/demo1/businessDocs/userStories.md",
            },
            {
              text: "Use case diagrams",
              link: "/demo1/businessDocs/usecaseDiagrams.md",
            },
            {
              text: "Functional requirement specifications",
              link: "/demo1/businessDocs/functionalRequirements.md",
            },
            {
              text: "Service contract",
              link: "/demo1/businessDocs/serviceContract.md",
            },
            {
              text: "Market Research",
              link: "/demo1/businessDocs/marketResearch.md",
            },
          ],
        },
        {
          text: "Architectural Documentation",
          link: "/demo1/architeturalDocs/",
          children: [
            {
              text: "Quality Requirements",
              link: "/demo1/architeturalDocs/qualityRequirements.md",
            },
            {
              text: "Architectural Patterns and Design Patterns",
              link: "/demo1/architeturalDocs/architecturalPatterns.md",
            },
            {
              text: "Constraints",
              link: "/demo1/architeturalDocs/constraints.md",
            },
            {
              text: "Technology Requirements",
              link: "/demo1/architeturalDocs/techSpec.md",
            },
          ],
        },
        {
          text: "Database Documentation",
          link: "/demo1/databaseDocs/",
          children: [
            {
              text: "Database functional requirements",
              link: "/demo1/databaseDocs/dbFunctionalRequirements.md",
            },
            {
              text: "Database non-functional requirements",
              link: "/demo1/databaseDocs/dbNonFunctionalRequirements.md",
            },
            { text: "Constraints", link: "/demo1/databaseDocs/constraints.md" },
            { text: "Data Model", link: "/demo1/databaseDocs/dataModel.md" },
            { text: "ER Diagram", link: "/demo1/databaseDocs/ERDiagrams.md" },
            {
              text: "Database Schema",
              link: "/demo1/databaseDocs/dbSchema.md",
            },
          ],
        },
        {
          text: "DevOps",
          link: "/demo1/devOps/",
          children: [
            {
              text: "Git originisation and management",
              link: "/demo1/devOps/gitOrgMan.md",
            },
            { text: "Branching Strategy", link: "/demo1/devOps/branching.md" },
            { text: "CI/CD", link: "/demo1/devOps/cicd.md" },
          ],
        },
      ],
      "/demo2/": [
        {
          text: "Introduction",
          link: "/demo2/guide/",
        },
        {
          text: "Design Documentation",
          link: "/demo2/designDocs/",
          children: [
            { text: "Wireframes", link: "/demo2/designDocs/wireframes.md" },
            {
              text: "Class diagrams",
              link: "/demo2/designDocs/classDiagrams.md",
            },
          ],
        },
        {
          text: "Business Documentation",
          link: "/demo2/businessDocs/",
          children: [
            {
              text: "User characteristics",
              link: "/demo2/businessDocs/userCharacteristics.md",
            },
            {
              text: "User stories",
              link: "/demo2/businessDocs/userStories.md",
            },
            {
              text: "Use case diagrams",
              link: "/demo2/businessDocs/usecaseDiagrams.md",
            },
            {
              text: "Functional requirement specifications",
              link: "/demo2/businessDocs/functionalRequirements.md",
            },
            {
              text: "Class diagrams",
              link: "/demo2/businessDocs/classDiagrams.md",
            },
            {
              text: "Service contract",
              link: "/demo2/businessDocs/serviceContract.md",
            },
            {
              text: "Market Research",
              link: "/demo2/businessDocs/marketResearch.md",
            },
            { text: "User Manual", link: "/demo2/businessDocs/userManual.md" },
          ],
        },
        {
          text: "Architectural Documentation",
          link: "/demo2/architeturalDocs/",
          children: [
            {
              text: "Architectural Design Strategy",
              link: "/demo2/architeturalDocs/designStrategy.md",
            },
            {
              text: "Architectural Styles",
              link: "/demo2/architeturalDocs/styles.md",
            },
            {
              text: "Architectural Quality Requirements",
              link: "/demo2/architeturalDocs/qualityRequirements.md",
            },
            {
              text: "Architectural Design & Patterns",
              link: "/demo2/architeturalDocs/architecturalDesignPattern.md",
            },
            {
              text: "Architectural Constraints",
              link: "/demo2/architeturalDocs/constraints.md",
            },
            {
              text: "Technology Choices",
              link: "/demo2/architeturalDocs/techSpec.md",
            },
          ],
        },
        {
          text: "Database Documentation",
          link: "/demo2/databaseDocs/",
          children: [
            {
              text: "Database functional requirements",
              link: "/demo2/databaseDocs/dbFunctionalRequirements.md",
            },
            {
              text: "Database non-functional requirements",
              link: "/demo2/databaseDocs/dbNonFunctionalRequirements.md",
            },
            { text: "Constraints", link: "/demo2/databaseDocs/constraints.md" },
            { text: "Data Model", link: "/demo2/databaseDocs/dataModel.md" },
            { text: "ER Diagram", link: "/demo2/databaseDocs/ERDiagrams.md" },
            {
              text: "Database Schema",
              link: "/demo2/databaseDocs/dbSchema.md",
            },
          ],
        },
        {
          text: "DevOps",
          link: "/demo2/devOps/",
          children: [
            {
              text: "Coding Standards",
              link: "/demo2/devOps/codingStandards.md",
            },
            {
              text: "Git originisation and management",
              link: "/demo2/devOps/gitOrgMan.md",
            },
            { text: "Branching Strategy", link: "/demo2/devOps/branching.md" },
            { text: "CI/CD", link: "/demo2/devOps/cicd.md" },
          ],
        },
      ],
      "/demo3/": [
        {
          text: "Introduction",
          link: "/demo3/guide/",
        },
        {
          text: "Manuals",
          link: "/demo3/manuals/",
          children: [
            { text: "User Manual", link: "/demo3/manuals/userManual.md" },
            {
              text: "Technical installation Manual",
              link: "/demo3/manuals/installationManual.md",
            },
          ],
        },
        {
          text: "Design Documentation",
          link: "/demo3/designDocs/",
          // children: [
          //   { text: 'Wireframes', link: '/demo3/designDocs/wireframes.md' },
          //   { text: 'Style document', link: '/demo3/designDocs/styles.md' },
          // ],
        },
        {
          text: "Business Documentation",
          link: "/demo3/businessDocs/",
          children: [
            {
              text: "User characteristics",
              link: "/demo3/businessDocs/userCharacteristics.md",
            },
            {
              text: "User stories",
              link: "/demo3/businessDocs/userStories.md",
            },
            {
              text: "Use case diagrams",
              link: "/demo3/businessDocs/usecaseDiagrams.md",
            },
            {
              text: "Functional requirement specifications",
              link: "/demo3/businessDocs/functionalRequirements.md",
            },
            {
              text: "Service contract",
              link: "/demo3/businessDocs/serviceContract.md",
            },
            {
              text: "Market Research",
              link: "/demo3/businessDocs/marketResearch.md",
            },
          ],
        },
        {
          text: "Architectural Documentation",
          link: "/demo3/architeturalDocs/",
          children: [
            {
              text: "Architectural Design Strategy",
              link: "/demo3/architeturalDocs/designStrategy.md",
            },
            {
              text: "Architectural Styles",
              link: "/demo3/architeturalDocs/styles.md",
            },
            {
              text: "Architectural Quality Requirements",
              link: "/demo3/architeturalDocs/qualityRequirements.md",
            },
            {
              text: "Architectural Design & Patterns",
              link: "/demo3/architeturalDocs/architecturalDesignPattern.md",
            },
            {
              text: "Architectural Constraints",
              link: "/demo3/architeturalDocs/constraints.md",
            },
            {
              text: "Technology Choices",
              link: "/demo3/architeturalDocs/techSpec.md",
            },
          ],
        },
        {
          text: "Database Documentation",
          link: "/demo3/databaseDocs/",
          children: [
            {
              text: "Database functional requirements",
              link: "/demo3/databaseDocs/dbFunctionalRequirements.md",
            },
            {
              text: "Database non-functional requirements",
              link: "/demo3/databaseDocs/dbNonFunctionalRequirements.md",
            },
            { text: "Constraints", link: "/demo3/databaseDocs/constraints.md" },
            // { text: 'Data Model', link: '/demo3/databaseDocs/dataModel.md' },
            {
              text: "Database Schema",
              link: "/demo3/databaseDocs/dbSchema.md",
            },
            { text: "Diagram", link: "/demo3/databaseDocs/ERDiagrams.md" },
          ],
        },
        {
          text: "DevOps",
          link: "/demo3/devOps/",
          children: [
            {
              text: "Coding Standards",
              link: "/demo3/devOps/codingStandards.md",
            },
            {
              text: "Git originisation and management",
              link: "/demo3/devOps/gitOrgMan.md",
            },
            { text: "Branching Strategy", link: "/demo3/devOps/branching.md" },
            { text: "CI/CD", link: "/demo3/devOps/cicd.md" },
          ],
        },
      ],
      "/demo4/": [
        {
          text: "Introduction",
          link: "/demo4/guide/",
        },
        {
          text: "Manuals",
          link: "/demo4/manuals/",
          children: [
            { text: "User Manual", link: "/demo4/manuals/userManual.md" },
            {
              text: "Technical installation Manual",
              link: "/demo4/manuals/installationManual.md",
            },
          ],
        },
        {
          text: "Design Documentation",
          link: "/demo4/designDocs/",
        },
        {
          text: "Business Documentation",
          link: "/demo4/businessDocs/",
          children: [
            {
              text: "User characteristics",
              link: "/demo4/businessDocs/userCharacteristics.md",
            },
            {
              text: "User stories",
              link: "/demo4/businessDocs/userStories.md",
            },
            {
              text: "Use case diagrams",
              link: "/demo4/businessDocs/usecaseDiagrams.md",
            },
            {
              text: "Functional requirement specifications",
              link: "/demo4/businessDocs/functionalRequirements.md",
            },
            {
              text: "Service contract",
              link: "/demo4/businessDocs/serviceContract.md",
            },
            {
              text: "Market Research",
              link: "/demo4/businessDocs/marketResearch.md",
            },
          ],
        },
        {
          text: "Architectural Documentation",
          link: "/demo4/architeturalDocs/",
          children: [
            {
              text: "Architectural Design Strategy",
              link: "/demo4/architeturalDocs/designStrategy.md",
            },
            {
              text: "Architectural Styles",
              link: "/demo4/architeturalDocs/styles.md",
            },
            {
              text: "Architectural Quality Requirements",
              link: "/demo4/architeturalDocs/qualityRequirements.md",
            },
            {
              text: "Architectural Design & Patterns",
              link: "/demo4/architeturalDocs/architecturalDesignPattern.md",
            },
            {
              text: "Architectural Constraints",
              link: "/demo4/architeturalDocs/constraints.md",
            },
            {
              text: "Technology Choices",
              link: "/demo4/architeturalDocs/techSpec.md",
            },
            {
              text: "Deployment Diagram",
              link: "/demo4/architeturalDocs/deploymentDiagram.md",
            },
          ],
        },
        {
          text: "Database Documentation",
          link: "/demo4/databaseDocs/",
          children: [
            {
              text: "Database functional requirements",
              link: "/demo4/databaseDocs/dbFunctionalRequirements.md",
            },
            {
              text: "Database non-functional requirements",
              link: "/demo4/databaseDocs/dbNonFunctionalRequirements.md",
            },
            { text: "Constraints", link: "/demo4/databaseDocs/constraints.md" },
            // { text: 'Data Model', link: '/demo4/databaseDocs/dataModel.md' },
            {
              text: "Database Schema",
              link: "/demo4/databaseDocs/dbSchema.md",
            },
            { text: "Diagram", link: "/demo4/databaseDocs/ERDiagrams.md" },
          ],
        },
        {
          text: "DevOps",
          link: "/demo4/devOps/",
          children: [
            {
              text: "Coding Standards",
              link: "/demo4/devOps/codingStandards.md",
            },
            {
              text: "Git originisation and management",
              link: "/demo4/devOps/gitOrgMan.md",
            },
            { text: "Branching Strategy", link: "/demo4/devOps/branching.md" },
            { text: "CI/CD", link: "/demo4/devOps/cicd.md" },
            { text: "Testing Policy", link: "/demo4/devOps/testing.md" },
          ],
        },
        {
          text: "Project management Documentation",
          link: "/demo4/projectManagementDocs/",
        },
      ],
    },
  }),
});
