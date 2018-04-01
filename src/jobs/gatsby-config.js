const plugins = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/content`,
      name: 'jobs',
    },
  },
  'gatsby-transformer-remark',
];

module.exports = {
  plugins,
};
