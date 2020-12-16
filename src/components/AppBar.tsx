import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { NextComponentType } from 'next';
import { Props } from '../../next-env';
import Menu from './Menu';

let oldY = 0;

const AppBar: NextComponentType<any, any, Props> = (props) => {
  const { t } = props;
  const container: React.Ref<any> = useRef();
  const [show, setShow] = useState<boolean>(true);
  const hideOnScroll = () => {
    const rects = document.body.getBoundingClientRect();
    const { y } = rects;
    if (y > oldY || oldY === 0) {
      setShow(true);
    } else {
      setShow(false);
    }
    oldY = y;
  };
  useEffect(() => {
    window.addEventListener('scroll', hideOnScroll);
    return () => {
      window.removeEventListener('scroll', hideOnScroll);
    };
  }, []);
  return (
    <Wrapper>
      <Container ref={container} show={show}>
        <Menu t={t} />
      </Container>
    </Wrapper>
  );
};
//  <div className={clsx(cls)}></div>
interface ContainerProps {
  show: boolean;
}

const fadeOut = keyframes`
  0% {
    top: 0;
  }
  100% {
    top: calc(-1 * (80px + (220 - 80) * ((100vw - 1200px) / (7680 - 1200))));
  }
`;

const fadeIn = keyframes`
  0% {
    top: calc(-1 * (80px + (220 - 80) * ((100vw - 1200px) / (7680 - 1200))));
  }
  100% {
    top: 0;
  }
`;

const pulse = '0.25s';

const animation = (props: ContainerProps) =>
  css`
    ${pulse}
    ${props.show ? fadeIn : fadeOut} 
    ${props.show ? 'ease-in' : 'ease-out'}
  `;

const Container = styled.div<ContainerProps>`
  overflow-y: auto;
  position: fixed;
  top: ${(props) =>
    props.show ? '0px' : 'calc(-1 * (80px + (220 - 80) * ((100vw - 1200px) / (7680 - 1200))))'};
  left: 0;
  height: calc(80px + (220 - 80) * ((100vw - 1200px) / (7680 - 1200)));
  width: 100%;
  background-color: purple;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: ${animation};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  top: 0;
  width: 100%auto;
  height: calc(80px + (220 - 80) * ((100vw - 1200px) / (7680 - 1200)));
`;

export default AppBar;
