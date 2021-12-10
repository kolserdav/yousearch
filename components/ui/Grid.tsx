import styled from 'styled-components';

interface GridProps {
  direction: 'row' | 'column';
  align: 'flex-start' | 'center' | 'flex-end';
  justifyContent?: 'center';
  minHeight?: string;
}

const Grid = styled.div<GridProps>`
  display: flex;
  min-height: ${(props) => props.minHeight || 'auto'};
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justifyContent || 'center'};
`;

export default Grid;
