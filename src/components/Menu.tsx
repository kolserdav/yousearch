import React, { useState } from 'react';
import { NextComponentType } from 'next';
import styled, { keyframes, css } from 'styled-components';

const Menu: NextComponentType<any, any, any> = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <MenuWrapper>
      <MenuIcon
        onClick={() => {
          setShow(true);
        }}
      />
      {show ? (
        <MenuBody show={show}>
          <MenuItem>
            <MenuCloseIcon
              onClick={() => {
                setShow(false);
              }}
            />
          </MenuItem>
        </MenuBody>
      ) : (
        ''
      )}
      {show ? <MenuOpenedWrapper onClick={() => { setShow(false); }} show={show} /> : ''}
    </MenuWrapper>
  );
};

const fadeOut = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: calc(-1 * (300px + (1000 - 300) * ((100vw - 320px) / (7680 - 320))));
  }
`;

const fadeIn = keyframes`
  0% {
    left: calc(-1 * (300px + (1000 - 300) * ((100vw - 320px) / (7680 - 320))));
  }
  100% {
    left: 0;
  }
`;

interface MenuProps {
  show: boolean;
}

const pulse = '0.350s';

const animation = (props: MenuProps) =>
  css`
    ${pulse}
    ${props.show ? fadeIn : fadeOut} 
    ${props.show ? 'ease-in' : 'ease-out'}
  `;

const MenuWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuIcon = styled.div`
  cursor: pointer;
  width: calc(40px + (200 - 40) * ((100vw - 320px) / (7680 - 320)));
  height: calc(40px + (200 - 40) * ((100vw - 320px) / (7680 - 320)));
  margin: 12px;
  background: url('/img/ui/menu-white-36dp.svg');
  background-size: contain;
  background-repeat: no-repeat;
`;

const MenuCloseIcon = styled.div`
  cursor: pointer;
  width: calc(40px + (200 - 40) * ((100vw - 320px) / (7680 - 320)));
  height: calc(40px + (200 - 40) * ((100vw - 320px) / (7680 - 320)));
  background: url('/img/ui/close-black-36dp.svg');
  background-size: contain;
  margin: 12px 12px 12px auto;
`;

const wrapperOut = keyframes`
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
`;

const wrapperIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.3;
  }
`;

const animationWrapper = (props: MenuProps) =>
  css`
    ${pulse}
    ${props.show ? wrapperIn : wrapperOut} 
    ${props.show ? 'ease-in' : 'ease-out'}
  `;

const MenuOpenedWrapper = styled.div<MenuProps>`
  position: fixed;
  top: 0;
  left: calc(300px + (1000 - 300) * ((100vw - 320px) / (7680 - 320)));
  width: calc(100% - (300px + (1000 - 300) * ((100vw - 320px) / (7680 - 320))));
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  animation: ${animationWrapper};
`;

const MenuBody = styled.div<MenuProps>`
  position: fixed;
  left: ${(props) =>
    props.show ? '0' : 'calc(-1 * (300px + (1000 - 300) * ((100vw - 320px) / (7680 - 320))))'};
  top: 0;
  width: calc(300px + (1000 - 300) * ((100vw - 320px) / (7680 - 320)));
  height: 100%;
  background: white;
  animation: ${animation};
`;

const MenuItem = styled.div``;

export default Menu;
