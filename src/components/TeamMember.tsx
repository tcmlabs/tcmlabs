import * as React from 'react';
import styled from 'styled-components';

function TeamMember({ firstName, description }) {
  return (
    <Container>
      <ImagePlaceholder />
      <div>
        <h3>{firstName}</h3>
        <p>{description}</p>
      </div>
    </Container>
  );
}

export default TeamMember;

const Container = styled.div`
  text-align: center;
  padding: 0 50px;
  flex: 0 0 200px;
  max-width: 300px;
  min-width: 200px;
`;

const ImagePlaceholder = styled.div`
  background-color: #eaeaea;
  background-image: url('https://www.placecage.com/200/200');
  background-size: cover;
  width: 200px;
  display: inline-block;

  height: 200px;
  border-radius: 100%;
  margin-right: 10px;
`;
