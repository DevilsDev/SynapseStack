// @ts-check

const config = {
  title: 'SynapseStack Docs',
  tagline: 'Modular RAG pipelines. CLI-first. Dev-ready.',
  url: 'https://synapsestack.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'DevilsDev',
  projectName: 'SynapseStack',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

module.exports = config;
