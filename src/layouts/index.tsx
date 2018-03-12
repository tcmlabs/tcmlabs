import * as React from 'react';
import styled from 'styled-components';
import { Row, Col } from '../components/Grid';

const Content = styled.div`
  text-align: center;
`;

export default class Template extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <Content>{this.props.children()}</Content>
        </Col>
      </Row>
    );
  }
}
