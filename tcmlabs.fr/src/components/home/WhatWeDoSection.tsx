import * as React from 'react';
import styled from 'styled-components';

import ContentWrapper from '../ContentWrapper';
import { SectionTitle } from '../SectionTitle';

const cloudIllustration = require('../static/cloud.svg') as string;
const webdevIllustration = require('../static/webdev.svg') as string;
const devopsIllustration = require('../static/devops.svg') as string;
const dataIllustration = require('../static/data.svg') as string;

const logoBnp = require('../components/customers/logo-bnpparibas.svg') as string;

const WhatWeDoSection = (): React.FunctionComponentElement<{}> => (
  <ContentWrapper>
    <SectionTitle>Savoir-faire</SectionTitle>

    <KnowledgeSection>
      <KnowledgeIllustration backgroundImage={cloudIllustration} />
      <div>
        <KnowledgeTitle>Cloud</KnowledgeTitle>
        <p>
          Something for your mind, your body and your soul! Stay See tradition continues for the
          last day of the year and let me wish you all the best in 2018! #danceallnight #nylounge
        </p>
        <p>
          Something for your mind, your body and your soul! Stay See tradition continues for the
          last day of the year and let me wish you all the best in 2018! #danceallnight #nylounge
        </p>
        <ClientLogo src={logoBnp} />
      </div>
    </KnowledgeSection>

    <KnowledgeSection>
      <KnowledgeIllustration backgroundImage={devopsIllustration} />
      <div>
        <KnowledgeTitle>Devops</KnowledgeTitle>
        <p>
          Something for your mind, your body and your soul! Stay See tradition continues for the
          last day of the year and let me wish you all the best in 2018! #danceallnight #nylounge
        </p>
        <p>
          Something for your mind, your body and your soul! Stay See tradition continues for the
          last day of the year and let me wish you all the best in 2018! #danceallnight #nylounge
        </p>
        <ClientLogo src={logoBnp} />
      </div>
    </KnowledgeSection>

    <KnowledgeSection>
      <KnowledgeIllustration backgroundImage={webdevIllustration} />
      <div>
        <KnowledgeTitle>WebDev</KnowledgeTitle>
        <p>
          Something for your mind, your body and your soul! Stay See tradition continues for the
          last day of the year and let me wish you all the best in 2018! #danceallnight #nylounge
        </p>
        <p>
          Something for your mind, your body and your soul! Stay See tradition continues for the
          last day of the year and let me wish you all the best in 2018! #danceallnight #nylounge
        </p>
        <ClientLogo src={logoBnp} />
      </div>
    </KnowledgeSection>

    <KnowledgeSection>
      <KnowledgeIllustration backgroundImage={dataIllustration} />
      <div>
        <KnowledgeTitle>Data</KnowledgeTitle>
        <p>
          Something for your mind, your body and your soul! Stay See tradition continues for the
          last day of the year and let me wish you all the best in 2018! #danceallnight #nylounge
        </p>
        <p>
          Something for your mind, your body and your soul! Stay See tradition continues for the
          last day of the year and let me wish you all the best in 2018! #danceallnight #nylounge
        </p>
        <ClientLogo src={logoBnp} />
        <ClientLogo src={logoBnp} />
        <ClientLogo src={logoBnp} />
      </div>
    </KnowledgeSection>
  </ContentWrapper>
);

export default WhatWeDoSection;

interface WithBackgroundImage {
  backgroundImage: string;
}

const KnowledgeIllustration = styled.div<WithBackgroundImage>`
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  flex: 0 0 300px;
  margin-right: 50px;
  height: 300px;
  position: relative;

  &:before {
    content: '';
    z-index: -1;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 0 350px 100px rgb(56, 76, 113);
  }
`;

const KnowledgeSection = styled.div`
  display: flex;
  margin-bottom: 100px;
`;

const KnowledgeTitle = styled.h3`
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  font-size: 40px;
  margin: 0;
`;

const ClientLogo = styled.img`
  width: 150px;
  height: 60px;
  display: inline-block;
  margin-right: 20px;
  opacity: 0.4;
`;
