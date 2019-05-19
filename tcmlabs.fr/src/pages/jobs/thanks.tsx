import * as React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import Logo from '../../components/Logo';

const ThanksPage: React.FunctionComponent = () => (
  <div>
    <ContentWrapper>
      <Logo />
      <Thanks>Merci! Nous avons bien reçu ton message de candidature.</Thanks>
      <a href="/">
        <Button>Back to home</Button>
      </a>
    </ContentWrapper>
  </div>
);

export default ThanksPage;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 150px auto;

  text-align: center;
`;

const Thanks = styled.div`
  margin: 100px auto;
`;
