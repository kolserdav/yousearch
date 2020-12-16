import React, { useState } from 'react';
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';
import { Props } from '../../next-env';

const duration = 350;

/**
 * Left menu element
 * @param props {Props}
 */
const Menu: NextComponentType<any, any, Props> = (props) => {
  const { t } = props;
  const [show, setShow] = useState<boolean>(false);
  const [_show, _setShow] = useState<boolean>(false);
  const router = useRouter();
  const { pathname } = router;
  return (
    <MenuWrapper>
      <MenuIcon
        onClick={() => {
          setShow(true);
          _setShow(true);
        }}
      />
      {_show ? (
        <MenuBody show={show}>
          <MenuItem
            selected={false}
            onClick={() => {
              setShow(false);
              setTimeout(() => {
                _setShow(false);
              }, duration);
            }}>
            <MenuItemIcon src="/img/ui/close-black-36dp.svg" alt="close icon" />
          </MenuItem>
          <Link href="/registration">
            <MenuItem selected={pathname === '/registration'}>
              <MenuItemIcon
                src="/img/ui/how_to_reg-black-36dp.svg"
                alt={`${t.interface.registration} ${t.interface.icon}`}
              />
              <MenuItemText>{t.interface.registration}</MenuItemText>
            </MenuItem>
          </Link>
          <Link href="/login">
            <MenuItem selected={pathname === '/login'}>
              <MenuItemIcon
                src="/img/ui/login-black-36dp.svg"
                alt={`${t.interface.login} ${t.interface.icon}`}
              />
              <MenuItemText>{t.interface.login}</MenuItemText>
            </MenuItem>
          </Link>
        </MenuBody>
      ) : (
        ''
      )}
      {show ? (
        <MenuOpenedWrapper
          onClick={() => {
            setShow(false);
            setTimeout(() => {
              _setShow(false);
            }, duration);
          }}
          show={show}
        />
      ) : (
        ''
      )}
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

const pulse = `0.${duration}s`;

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

const MenuItemIcon = styled.img`
  cursor: pointer;
  width: calc(40px + (200 - 40) * ((100vw - 320px) / (7680 - 320)));
  height: calc(40px + (200 - 40) * ((100vw - 320px) / (7680 - 320)));
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

interface MenuItemProps {
  selected: boolean;
}

const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: calc(14px + (100 - 14) * ((100vw - 320px) / (7680 - 320)));
  padding: 20px;
  color: ${(props) => props.theme.main};
  background: ${(props) => (props.selected ? props.theme.bg : 'inherit')};
  &:hover {
    background: ${(props) => props.theme.bg};
  }
`;

const MenuItemText = styled.span`
  margin-left: 15px;
  text-transform: uppercase;
`;

export default Menu;
