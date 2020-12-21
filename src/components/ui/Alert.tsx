import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { NextComponentType } from 'next';
import Grid from './Grid';
import * as Types from '../../../next-env';

export interface AlertProps {
  open: boolean;
  status: Types.Result | 'info';
  text: string;
  button: React.ReactElement;
  trigger: () => void;
}

const Alert: NextComponentType<any, any, AlertProps> = (props) => {
  const { open, status, text, button, trigger } = props;
  const Button = () => button;
  trigger();
  return (
    <Wrapper>
      {open ? (
        <Grid direction="row" align="center">
          <AlertStyled status={status}>
            {text}
            <Button />
          </AlertStyled>
        </Grid>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  margin: var(--item-padding);
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
  color: ${(props) => props.theme.dark};
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
