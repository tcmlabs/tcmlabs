import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import 'normalize.css';

import Button from '../components/Button';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';
import JobOffer from '../components/JobOffer';
import Logo from '../components/Logo';
import TeamMember from '../components/TeamMember';
import JobApplicationForm, { FORM_NAME } from '../components/JobApplicationForm';

const cloudIllustration = require('../static/cloud.svg') as string;
const webdevIllustration = require('../static/webdev.svg') as string;
const devopsIllustration = require('../static/devops.svg') as string;
const dataIllustration = require('../static/data.svg') as string;
const logoBnp = require('../components/customers/logo-bnpparibas.svg') as string;

const calloutBackground = require('../static/background.svg') as string;

class Index extends React.Component {
  render() {
    return (
      <div>
        <Callout>
          <ContentWrapper>
            <Logo />
            <Introduction>
              Something for your mind, your body and your soul! Stay See tradition continues for the last day of the
              year and let me wish you all the best in 2018! #danceallnight #nylounge
            </Introduction>
            <a href={`#${FORM_NAME}`}>
              <Button>Rejoignez-nous</Button>
            </a>
            <Button>Contactez-nous</Button>
          </ContentWrapper>
        </Callout>

        <ContentWrapper id={FORM_NAME}>
          <SectionTitle>Join the labs</SectionTitle>

          <FormWrapper>
            <JobApplicationForm />
          </FormWrapper>
        </ContentWrapper>
      </div>
    );
  }
}

export default Index;

injectGlobal`
	body {
		font-family: Menlo, "Courier New", monospace;
		font-size: 16px;
		line-height: 1.2;
		box-sizing: border-box;
		color:#bdc7d6;
		background:linear-gradient(120deg, #142d3d, #1b3549);
		background-attachment: fixed;
	}
	h1, 
	h2,
	h3 {
		text-rendering: optimizeLegibility;
		font-family: "Bebas", Monaco, monospace;
	}
`;

const Callout = styled.div`
	background-color: rgba(0,0,0,.3);
	background-image: 
		radial-gradient(circle, rgba(20,45,61,1), transparent),
		
		url('${calloutBackground}');
	background-size: 100%, 30%;
  text-align: center;
	padding: 	200px 0;
	color: #ffffff;
`;

const Introduction = styled.p`
  margin: 20px auto 50px;
  max-width: 500px;
`;

const SectionTitle = styled.h2`
  font-size: 90px;
  text-align: center;
  font-weight: 300;
  margin-top: 150px;
  color: #e1e1e1;
  text-shadow: 0 -1px 0 #ccc, 0 -2px 0 #bfbfbf, 0 -3px 0 #9f9f9f, 0 -4px 0 #a6a6a6, 0 -5px 0 #999999,
    0 -6px 1px rgba(0, 0, 0, 0.1), 0 -0 5px rgba(0, 0, 0, 0.1), 0 -1px 3px rgba(0, 0, 0, 0.3),
    0 -3px 5px rgba(0, 0, 0, 0.2), 0 -5px 10px rgba(0, 0, 0, 0.25), 0 -10px 10px rgba(0, 0, 0, 0.2),
    0 -20px 20px rgba(0, 0, 0, 0.15);
`;

const KnowledgeIllustration = styled.div`
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

const TeamMemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const FormWrapper = styled.div`
  margin: 0px auto;
  width: 60%;
  margin-bottom: 100px;
`;
