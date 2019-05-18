import * as React from 'react';

import ContentWrapper from '../ContentWrapper';
import JobOffer from '../JobOffer';
import Button from '../Button';
import { SectionTitle } from '../SectionTitle';

const JoinTheLabsSection = (): React.FunctionComponentElement<{}> => (
  <ContentWrapper>
    <SectionTitle>Nous rejoindre</SectionTitle>
    <JobOffer />
    <JobOffer />
    <Button>Toutes les offres</Button>
  </ContentWrapper>
);

export default JoinTheLabsSection;
