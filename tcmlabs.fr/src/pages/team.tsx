import * as React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';

class Team extends React.Component {
  render(): React.ReactNode {
    const { edges: members } = this.props.data.allMarkdownRemark;

    return (
      <div>
        <h1>Team</h1>
        <div>
          {members.map(({ node: { frontmatter: member } }) => (
            <div key={member.firstName}>
              {member.firstName} <Link to={`${member.path}`}>.{member.path}</Link>
            </div>
          ))}
          <Link to="../">../</Link>
        </div>
      </div>
    );
  }
}

export default Team;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___firstName] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            firstName
            path
          }
        }
      }
    }
  }
`;
