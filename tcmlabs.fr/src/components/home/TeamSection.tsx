import * as React from 'react';
import styled from 'styled-components';

import ContentWrapper from '../ContentWrapper';
import { SectionTitle } from '../SectionTitle';
import TeamMember from '../TeamMember';

const TeamSection: React.FunctionComponent = () => (
  <ContentWrapper>
    <SectionTitle>{"L'equipe"}</SectionTitle>
    <TeamMemberList>
      <TeamMember />
      <TeamMember />
      <TeamMember />
      <TeamMember />
    </TeamMemberList>
  </ContentWrapper>
);

export default TeamSection;

const TeamMemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
