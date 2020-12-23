import styled from 'styled-components';

/**
 * Page header styled element
 */
export const H1 = styled.h1`
  font-size: var(--h1-size);
  color: ${(props) => props.theme.dark};
  &:first-letter {
    text-transform: capitalize;
  }
`;

/**
 * Page description styled element
 */
export const Description = styled.p`
  font-size: var(--h5-size);
  color: ${(props) => props.theme.dark};
  &:first-letter {
    text-transform: capitalize;
  }
`;
