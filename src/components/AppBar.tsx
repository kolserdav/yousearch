import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { NextComponentType } from 'next';

const AppBar: NextComponentType<any, any, any> = () => {
  const [cls, setCls] = useState<string[]>(['app-bar']);
  useEffect(() => {
    setTimeout(() => {
      setCls(['app-bar', 'hidden']);
    }, 3000)
  }, []);
  return (
    <div className={clsx(cls)}></div>
  );
}
// <Container className="app-bar" show={show}></Container>
interface ContainerProps {
  show: boolean;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: ${(props) =>
    props.show ? '0px' : 'calc(-1 * (60px + (80 - 60) * ((100vw - 1200px) / (1920 - 1200))))'};
  left: 0;
  height: calc(60px + (80 - 60) * ((100vw - 1200px) / (1920 - 1200)));
  width: 100%;
  background-color: purple;
`;

export default AppBar;
