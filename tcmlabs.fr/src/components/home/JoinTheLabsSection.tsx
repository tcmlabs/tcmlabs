import * as React from 'react';

import Button from '../Button';
import ContentWrapper from '../ContentWrapper';
import JobOffer from '../JobOffer';
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
