import * as React from 'react';
import styled from 'styled-components';

export default function JobOfferTemplate(props) {
  const offer = props.data.markdownRemark;

  return (
    <JobOfferWrapper>
      <Title>{offer.frontmatter.title}</Title>

      <div dangerouslySetInnerHTML={{ __html: offer.html }} />
    </JobOfferWrapper>
  );
}

export const pageQuery = graphql`
  query JobOfferByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;

const JobOfferWrapper = styled.div``;

const Title = styled.h1``;

const Excerpt = styled.p``;
