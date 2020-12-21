import styled, { keyframes } from 'styled-components';

const activeButton = keyframes`
0% {
  background: var(--color);;
}
100% {
  background: linear-gradient(var(--color), var(--second-color));
}
`;

/**
 * Custom button for app
 */
const Button = styled.button`
  --color: ${(props) => props.theme.main};
  --second-color: ${(props) => props.theme.light};
  --padding-left: calc(20px + (100 - 20) * ((100vw - 320px) / (7680 - 320)));
  --padding-top: calc(10px + (50 - 10) * ((100vw - 320px) / (7680 - 320)));
  --border-radius: calc(5px + (25 - 5) * ((100vw - 320px) / (7680 - 320)));
  margin: 20px;
  cursor: pointer;
  background-color: var(--color);
  font-size: var(--h5-size);
  color: var(--second-color);
  border: 0;
  padding-left: var(--padding-left);
  padding-right: var(--padding-left);
  padding-top: var(--padding-top);
  padding-bottom: var(--padding-top);
  text-transform: uppercase;
  border-radius: var(--border-radius);
  &:focus {
    outline: 0;
  }
  &:active {
    animation: 0.2s ease ${activeButton};
  }
  &:hover {
    box-shadow: 1px 1px var(--border-radius) rgba(0, 0, 0, 0.5);
  }
`;

export default Button;
