import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const TeamMember = (): React.FunctionComponentElement<{}> => {
  return (
    <Container>
      <ImagePlaceholder />
      <div>
        <h3>Member Name</h3>
        <p>
          This screen is visible only in development. It will not appear if the app crashes in
          production.
        </p>
      </div>
    </Container>
  );
};

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

const Container = styled.div`
  text-align: center;
  padding: 0 50px;
  flex: 0 0 200px;
  max-width: 300px;
  min-width: 200px;
`;

const ImagePlaceholder = styled.div`
  background-color: #eaeaea;
  background-image: url('https://www.placecage.com/200/200');
  background-size: cover;
  width: 200px;
  display: inline-block;

  height: 200px;
  border-radius: 100%;
  margin-right: 10px;
`;
