import * as React from 'react';
import styled from 'styled-components';
import ContentWrapper from './ContentWrapper';

export default function Footer(): React.FunctionComponentElement<{}> {
  return (
    <FooterWrapper>
      <ContentWrapper>
        <FooterColumn>
          <h3>Contact</h3>
          <address>128 rue de la boetie 75008 Paris</address>
          <a href="mailto:contact@tcmlabs.fr">contact@tcmlabs.fr</a>
        </FooterColumn>

        <FooterColumn>
          <h3>Social</h3>
          <ul>
            <li>Twitter</li>
            <li>Likedin</li>
            <li>Github</li>
            <li>Medium</li>
          </ul>
        </FooterColumn>
      </ContentWrapper>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  display: flex;
  margin-top: 200px;
  padding: 100px 0;
  background-color: #132533;
`;

const FooterColumn = styled.div`
  flex: 1;
`;
