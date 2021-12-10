import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { NextComponentType } from 'next';
import Menu from './Menu';

let oldY = 0;

interface AppBarProps extends Props {
  load: boolean;
  other?: boolean;
}

const AppBar: NextComponentType<any, any, AppBarProps> = (props) => {
  const { t, load, other } = props;
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
        <Menu t={t} other={other} load={load} />
      </Container>
      {load ? (
        <LinearProgress>
          <Line />
        </LinearProgress>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

interface ContainerProps {
  show: boolean;
}

const loaded = keyframes`
  0% {
		left: -10%;
    width: 10%;
	}
	100% {
		left: 100%;
    width: 100%;
	}
`;

const LinearProgress = styled.div`
  background: ${(props) => props.theme.main};
  z-index: 11;
  position: fixed;
  top: 0;
  height: var(--progress-height);
  width: 100%;
`;

const Line = styled.div`
  width: 10%;
  height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.light};
  left: -10%;
  animation: ${loaded} 1s linear infinite;
`;

const fadeOut = keyframes`
  0% {
    top: 0;
  }
  100% {
    top: calc(-1 * var(--app-bar-height));
  }
`;

const fadeIn = keyframes`
  0% {
    top: calc(-1 * var(--app-bar-height));
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
  top: ${(props) => (props.show ? '0px' : 'calc(-1 * var(--app-bar-height))')};
  left: 0;
  height: var(--app-bar-height);
  width: 100%;
  background-color: ${(props) => props.theme.main};
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
  height: calc(var(--app-bar-height) + var(--progress-height));
`;

export default AppBar;
