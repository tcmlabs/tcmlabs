import * as React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

import { Row, Col } from '../components/Grid';

class Team extends React.Component {
  render() {
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
