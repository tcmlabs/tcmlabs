import * as React from 'react';
import styled from 'styled-components';

const JobOffer: React.FunctionComponent = () => {
  return (
    <JobOfferWrapper>
      <Title>Offer title</Title>
      <Excerpt>
        This screen is visible only in development. It will not appear if the app crashes in
        production.
      </Excerpt>
    </JobOfferWrapper>
  );
};

export default JobOffer;

const JobOfferWrapper = styled.div``;

const Title = styled.h3``;

const Excerpt = styled.p``;
