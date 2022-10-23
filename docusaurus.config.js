// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Yaossg\'s Site',
  tagline: 'documentation repository',
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
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
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
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Document',
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/Yaossg/site',
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
                label: '🖥️ CNSS Recruit 2022 Dev',
                to: 'docs/cnss/0',
              },
              {
                label: '1.13 worldgen',
                href: 'https://yaossg.com/blog/1-13-worldgen/',
              },
              {
                label: 'Biome',
                href: 'https://yaossg.com/biome',
              },
              {
                label: 'Cripple C',
                href: 'https://yaossg.com/doc/cripplec',
              },
            ],
          },
          {
            title: 'Related Sites',
            items: [
              {
                label: 'Yaossg\'s Homepage',
                href: 'https://yaossg.com/',
              },
              {
                label: 'Yaossg\'s Blog',
                href: 'https://yaossg.com/blog/',
              },
              {
                label: 'Yaossg\'s Doc',
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
      },
    }),
};

module.exports = config;
