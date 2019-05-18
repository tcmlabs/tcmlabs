import * as React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';

export default function JobsPage() {
  return (
    <div>
      <ContentWrapper>
        <Title>
          <Prompt>$></Prompt> Offres d'emploi<Carret>_</Carret>
        </Title>

        <OfferContent>
          <Navbar>
            <NavItem active>Titre de l'offre en quelques mots</NavItem>
            <NavItem>Titre de l'offre en quelques mots</NavItem>
            <NavItem>Titre de quelques mots</NavItem>
            <NavItem>Titre de l'offre en Title mots</NavItem>
            <NavItem>Titre de l'offre en quelques mots mots</NavItem>
          </Navbar>

          <OfferDetails>
            <AnswerOffer>
              <Button>Répondre à cette offre</Button>
            </AnswerOffer>
          </OfferDetails>
        </OfferContent>
      </ContentWrapper>

      <Footer />
    </div>
  );
}

const Title = styled.h1`
  margin: 100px 0;
  text-align: center;
  font-size: 60px;
`;

const Prompt = styled.span`
  opacity: 0.7;
`;

const Carret = styled.span`
  color: #65c93b;
  animation: blinker 1s linear infinite;
  @keyframes blinker {
    50% {
      opacity: 0;
    }
    51% {
      opacity: 1;
    }
  }
`;

const OfferContent = styled.div`
  display: flex;
  margin-bottom: 100px;
`;

const Navbar = styled.nav`
  flex: 0 0 250px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding-right: 50px;
  margin-right: 50px;
`;

const NavItem = styled.div`
  margin-bottom: 20px;
  opacity: 0.6;
  ${({ active }) =>
    active && {
      opacity: 1,
    }}
`;

const OfferDetails = styled.article`
  flex: 1;
`;

const AnswerOffer = styled.div`
  margin-top: 50px;
`;
