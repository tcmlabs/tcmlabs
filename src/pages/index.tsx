import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import Link from 'gatsby-link';

import { Title, SubTitle } from '../components/Typography';
import '../globalStyles';

const Content = styled.div`
  text-align: center;
`;

class Index extends React.Component {
  render() {
    return (
      <div>
        <Title>TCMLabs</Title>
        <SubTitle>DevOps, automation, WebDev, graphs.</SubTitle>
        <Link to="/team">./team</Link>
      </div>
    );
  }
}

export default Index;
