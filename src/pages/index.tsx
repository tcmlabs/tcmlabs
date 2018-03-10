import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';

import './globalStyles';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Col = styled.div`
  display: flex;
  /* align-items: center; */
`;

const Title = styled.h1`
  font-size: 43px;
`;

const SubTitle = styled.h3`
  font-size: 14px;
`;

const Content = styled.div`
  text-align: center;
`;

class Index extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <Content>
            <Title>TCMLabs</Title>
            <SubTitle>DevOps and automation</SubTitle>
          </Content>
        </Col>
      </Row>
    );
  }
}

export default Index;
