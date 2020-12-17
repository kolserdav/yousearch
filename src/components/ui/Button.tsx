import styled, { keyframes } from 'styled-components';

const activeButton = keyframes`
0% {
  background: var(--color);;
}
100% {
  background: linear-gradient(var(--color), var(--second-color));
}
`;

const Button = styled.button`
  --color: ${(props) => props.theme.main};
  --second-color: ${(props) => props.theme.light};
  margin: 20px;
  cursor: pointer;
  background-color: var(--color);
  font-size: var(--h5-size);
  color: var(--second-color);
  border: 0;
  padding: 10px 20px 10px 20px;
  text-transform: uppercase;
  border-radius: 10px;
  &:focus {
    outline: 0;
  }
  &:active {
    animation: 0.2s ease ${activeButton};
  }
`;

export default Button;
