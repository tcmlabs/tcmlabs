const Team = require('./src/team/gatsby-config');
const Job = require('./src/jobs/gatsby-config');

const config = {
  siteMetadata: {
    siteName: 'TCMLabs.fr',
  },
  plugins: [
    ...new Set([
      'gatsby-plugin-typescript',
      'gatsby-plugin-styled-components',
      'gatsby-plugin-netlify',
      ...Team.plugins,
      ...Job.plugins,
    ]),
  ],
};

module.exports = config;
