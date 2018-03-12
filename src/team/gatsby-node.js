const path = require('path');

function createPages({ boundActionCreators, graphql }) {
  const { createPage } = boundActionCreators;

  const teamMemberTemplate = path.resolve(__dirname, `./templates/teamMember.tsx`);

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___firstName] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: teamMemberTemplate,
          context: {}, // additional data can be passed via context
        });
      });
    })
    .catch(e => console.error(e));
}

module.exports = { createPages };
