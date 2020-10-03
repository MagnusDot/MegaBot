/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'ESGI',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/esgi.jpg',
    infoLink: 'https://www.esgi.fr/',
    pinned: true,
  },
];

const siteConfig = {
  title: 'MegaBot', // Title for your website.
  tagline: 'A Moderation and fun discord BOT',
  url: 'https://magnusdot.github.io/', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'MegaBot',
  organizationName: 'magnusdot',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'doc1', label: 'Docs'},
    {blog: true, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/jason.png',
  footerIcon: 'img/jason.png',
  favicon: 'img/jason.png',

  /* Colors for website */
  colors: {
    primaryColor: '#18191B',
    secondaryColor: '#2F5270',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Aloïs Marcellin`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/jason.png',
  twitterImage: 'img/jason.png',
  docsSideNavCollapsible: true,
  twitterUsername: "Magnus_TheDev",
   enableUpdateBy: true,
   enableUpdateTime: true,
  repoUrl: 'https://github.com/MagnusDot/MegaBot',
};

module.exports = siteConfig;
