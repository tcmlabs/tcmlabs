/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

exports.onCreateWebpackConfig = function({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        // This should be handled by gatsby-typescript-plugin
        // See: https://github.com/gatsbyjs/gatsby/issues/4357
        '#components': path.resolve(__dirname, 'src/components'),
        '#tcmlabs.fr': path.resolve(__dirname, 'src'),
      },
    },
  });
};
