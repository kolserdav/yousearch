import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { NextComponentType } from 'next';
import Grid from './Grid';
import * as Types from '../../../next-env';

export interface AlertProps {
  open: boolean;
  status: Types.Result | 'info';
  text: string;
  button?: React.ReactElement;
  trigger?: () => void;
}

const Alert: NextComponentType<any, any, AlertProps> = (props) => {
  const { open, status, text, button, trigger } = props;
  const Button = () => (button ? button : <div />);
  const Trigger =
    typeof trigger === 'function'
      ? trigger
      : () => {
          /**1 */
        };
  useEffect(() => {
    Trigger();
  }, [trigger]);
  return (
    <Wrapper open={open}>
      <Grid direction="row" align="center">
        <AlertStyled status={status}>
          {text}
          <Button />
        </AlertStyled>
      </Grid>
    </Wrapper>
  );
};

const alertIn = keyframes`
  0% {
    bottom: -100px;
  },
  100% {
    bottom: 0;
  }
`;

const alertOut = keyframes`
  0% {
    bottom: 0;
  },
  100% {
    bottom: -100px;
  }
`;

interface WraperProps {
  open: boolean;
}

const pulse = '0.25s';

const animation = (props: WraperProps) =>
  css`
    ${pulse}
    ${props.open ? alertIn : alertOut} 
    ${props.open ? 'ease-in' : 'ease-out'}
  `;

const Wrapper = styled.div<WraperProps>`
  position: fixed;
  bottom: ${(props) => (props.open ? '0' : '-100px')};
  margin: var(--item-padding);
  animation: ${animation};
`;

interface AlertStyledProps {
  status: Types.Result | 'info';
  theme: Types.Theme;
}

const AlertStyled = styled.div<AlertStyledProps>`
  height: 100%;
  width: 100%;
  padding: var(--item-padding);
  font-size: var(--p-size);
  border-radius: var(--border-radius);
  color: ${(props) => props.theme.white};
  background: ${(props) => {
    const { status, theme } = props;
    if (status === 'error') {
      return theme.error;
    } else if (status === 'warning') {
      return theme.warning;
    } else if (status === 'success') {
      return theme.success;
    }
  }};
  &:first-letter {
    text-transform: uppercase;
  }
`;

export default Alert;
