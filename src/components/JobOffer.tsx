import * as React from 'react';
import styled from 'styled-components';

export default function JobOffer() {
  return (
    <JobOfferWrapper>
      <Title>Offer title</Title>
      <Excerpt>
        This screen is visible only in development. It will not appear if the app crashes in production.
      </Excerpt>
    </JobOfferWrapper>
  );
}

const JobOfferWrapper = styled.div``;

const Title = styled.h3``;

const Excerpt = styled.p``;
