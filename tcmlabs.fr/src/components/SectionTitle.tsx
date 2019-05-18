import styled from 'styled-components';

export const SectionTitle = styled.h2`
  font-size: 30px;
  text-align: center;
  font-weight: 300;
  margin-top: 50px;
  color: #e1e1e1;
  text-shadow: 0 -1px 0 #ccc, 0 -2px 0 #bfbfbf, 0 -3px 0 #9f9f9f, 0 -4px 0 #a6a6a6, 0 -1px 0 #999999,
    0 -6px 1px rgba(0, 0, 0, 0.1), 0 -0 5px rgba(0, 0, 0, 0.1), 0 -1px 3px rgba(0, 0, 0, 0.3),
    0 -3px 5px rgba(0, 0, 0, 0.2), 0 -5px 10px rgba(0, 0, 0, 0.25), 0 -10px 10px rgba(0, 0, 0, 0.2),
    0 -20px 20px rgba(0, 0, 0, 0.15);

  @media (min-width: 768px) {
    font-size: 90px;
    margin-top: 150px;
  }
`;
