import styled from 'styled-components';

interface GridProps {
  direction: 'row' | 'column';
  align: 'flex-start' | 'center' | 'flex-end';
}

const Grid = styled.div<GridProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) => props.align};
`;

export default Grid;
