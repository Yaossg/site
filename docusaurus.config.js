// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes} from 'prism-react-renderer';
const lightTheme = themes.github;
const darkTheme = themes.dracula;

import math from 'remark-math';
import katex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yaossg\'s Site',
  tagline: 'Blog & Docs',
  url: 'https://yaossg.com',
  baseUrl: '/site/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/sausage.png',

  // deployment
  organizationName: 'Yaossg',
  projectName: 'yaossg.github.io',
  deploymentBranch: 'master',
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
          blogSidebarCount: 0,
          postsPerPage: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Yaossg\'s Site',
        logo: {
          alt: 'Yaossg\'s Site',
          src: 'img/sausage-128.png',
        },
        items: [
          {
            to: '/blog', 
            label: 'Blog', 
            position: 'left'
          },
          {
            type: 'doc',
            docId: 'index',
            label: 'Docs',
            position: 'left',
          },
          {
            to: 'friends',
            label: 'Friends', 
            position: 'left'
          },
          {
            href: 'https://space.bilibili.com/282144386',
            label: 'Bilibili',
            position: 'right',
          },
          {
            href: 'https://github.com/Yaossg/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Quick Access',
            items: [
              {
                label: 'Site Source Code',
                href: 'https://github.com/Yaossg/site',
              },
            ]
          },
          {
            title: 'Related Sites',
            items: [
              {
                label: 'Online End Poem',
                href: 'https://yaossg.com/end-poem/',
              },
            ],
          },
        ],
        copyright: 'Yaossg\'s Site',
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['scheme', 'kotlin', 'java', 'nasm', 'bash', 'csharp', 'pascal', 'ocaml'],
      },
    }),
};

export default config;