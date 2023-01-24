// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yaossg\'s Site',
  tagline: 'blog & doc',
  url: 'https://yaossg.com',
  baseUrl: '/site/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

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
          src: 'img/logo.svg',
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
            label: 'Doc',
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
              // {
              //   label: '🖥️ CNSS Recruit 2022 Dev',
              //   to: 'docs/cnss/0',
              // },
              // {
              //   label: '1.13 worldgen',
              //   href: 'https://yaossg.com/blog/1-13-worldgen/',
              // },
              // {
              //   label: 'Biome',
              //   href: 'https://yaossg.com/biome',
              // },
              // {
              //   label: 'Cripple C',
              //   href: 'https://yaossg.com/doc/cripplec',
              // },
            ],
          },
          {
            title: 'Related Sites',
            items: [
              {
                label: 'Yaossg\'s Alternative Doc',
                href: 'https://yaossg.com/doc/',
              },
            ],
          },
        ],
        copyright: 'Yaossg\'s Site',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['scheme', 'kotlin', 'java', 'nasm'],
      },
    }),
};

module.exports = config;
