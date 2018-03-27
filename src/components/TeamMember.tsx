import * as React from 'react';
import Link from 'gatsby-link';

function TeamMember({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter: member, html } = markdownRemark;
  return (
    <div>
      <div>
        <h1>{member.firstName}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Link to="/team">../</Link>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query TeamMemberByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        firstName
      }
    }
  }
`;

export default TeamMember;
