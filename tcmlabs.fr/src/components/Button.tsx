import styled from 'styled-components';

export default styled.button`
  border: 2px solid #bdc7d6;
  border-radius: 3px;
  color: #bdc7d6;
  background-color: #142d3d;
  padding: 10px 25px;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }

  &:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 5px 12px rgba(0, 0, 0, 0.28);
    color: #ffffff;
  }
  &:active {
    outline: none;
  }
`;
