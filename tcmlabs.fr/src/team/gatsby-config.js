const plugins = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/content`,
      name: 'team',
    },
  },
  'gatsby-transformer-remark',
];

module.exports = {
  plugins,
};
