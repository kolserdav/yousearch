import styled from 'styled-components';

/**
 * Page header styled element
 */
const H1 = styled.h1`
  text-transform: capitalize;
  font-size: var(--h1-size);
  color: ${(props) => props.theme.dark};
`;

export default H1;
