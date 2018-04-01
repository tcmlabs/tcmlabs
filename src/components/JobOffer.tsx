import * as React from 'react';
import styled from 'styled-components';

import Link from 'gatsby-link';

export default function JobOffer(props) {
  const { title } = props;

  return (
    <JobOfferWrapper>
      <Title>{title}</Title> · <Link to={props.path}>Voir l'offre</Link>
    </JobOfferWrapper>
  );
}

const JobOfferWrapper = styled.div``;

const Title = styled.h3``;

const Excerpt = styled.p``;
