import * as React from 'react';
import styled from 'styled-components';

const Logo: React.FunctionComponent = () => {
  return (
    <LogoWrapper>
      TCM<Labs>Labs</Labs>
      <Baseline>cloud · devOps · WebDev · data</Baseline>
    </LogoWrapper>
  );
};

export default Logo;

const LogoWrapper = styled.h1`
  font-size: 80px;
  font-weight: normal;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.15),
    0 5px 7px rgba(0, 0, 0, 0.3);
`;

const Labs = styled.span`
  color: #ffa133;
  margin-left: 8px;
`;

const Baseline = styled.div`
  font-size: 19px;
  text-shadow: none;
  opacity: 0.4;
`;
