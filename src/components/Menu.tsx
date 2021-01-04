import React, { useState, useEffect, useRef } from 'react';
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { action, store } from '../store';
import styled, { keyframes, css } from 'styled-components';
import Cookies from 'universal-cookie';
import Alert, { AlertProps } from './ui/Alert';
import IconButton from './ui/IconButton';
import * as Types from '../../next-env';

const cookies = new Cookies();

const duration = 350;

const date = new Date();
date.setFullYear(date.getFullYear() + 12);

interface MenuProps extends Types.Props {
  other?: boolean;
  load: boolean;
}

/**
 * Left menu element
 * @param props {Types.Props}
 */
const Menu: NextComponentType<any, any, MenuProps> = (props) => {
  const { t, other, load } = props;
  const confirmRef = useRef<boolean>(false);
  const emailRef = useRef<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [_show, _setShow] = useState<boolean>(false);
  const [role, setRole] = useState<Types.UserRoles>('guest');
  // Alert
  const _alert: AlertProps = {
    open: false,
    text: '',
    status: 'info',
    trigger: () => {
      setAlert(_alert);
    },
    button: <div />,
  };
  const [alert, setAlert] = useState<AlertProps>(_alert);
  const router = useRouter();
  const { pathname, locale } = router;
  const closeMenu = () => {
    setShow(false);
    document.body.style.overflow = 'auto';
  };
  const auth = () => {
    action({
      type: 'AUTH_REQUEST',
      body: {},
    });
  };
  const sendConfirmEmail = () => {
    action({
      type: 'SEND_CONFIRM_REQUEST',
      body: {
        input: {
          email: emailRef.current,
        },
        results: ['message'],
      },
    });
  };
  /**
   * Create link handler
   */
  const createLink = () => {
    if (!confirmRef.current) {
      setAlert({
        open: true,
        text: t.messages.warningEmailNotConfirm,
        status: 'warning',
        button: (
          <IconButton
            src="/img/ui/send-white-36dp.svg"
            alt={`${t.interface.send} ${t.interface.icon}`}
            title={`${t.interface.send} ${t.interface.email}`}
            onClick={sendConfirmEmail}
          />
        ),
      });
      return;
    }
    const { query } = router;
    const { v, se, l, s, ch } = query;
    if (!v) {
      setAlert({
        open: true,
        text: t.messages.warningVideoIDNotSet,
        status: 'warning',
        trigger: alert.trigger,
      });
      return;
    }
    if (!l) {
      setAlert({
        open: true,
        text: t.messages.warningSubtitlesLangNotSet,
        status: 'warning',
        trigger: alert.trigger,
      });
      return;
    }
    if (!se) {
      setAlert({
        open: true,
        text: t.messages.warningSearchValueNotSet,
        status: 'warning',
        trigger: alert.trigger,
      });
      return;
    }
    if (!s) {
      setAlert({
        open: true,
        text: t.messages.warnigTimePointNotSelect,
        status: 'warning',
        trigger: alert.trigger,
      });
      return;
    }
    const chQ = ch ? `&ch=${ch}` : '';
    const link = `/${v}?l=${l}&se=${se}${chQ}&s=${s}`;
    const { body }: Types.Action<Types.Schema.Values.SubtitlesRequest> = store.getState().SUBTITLES;
    const { subtitles } = body;
    if (!subtitles) {
      setAlert({
        open: true,
        text: t.server.subtitles.warningSubtitlesNotFound,
        status: 'error',
        trigger: alert.trigger,
      });
      return;
    }
    let description = '';
    const sReg = new RegExp(`^${s}\\.\\d*$`);
    const { items } = subtitles;
    items.map((item, index) => {
      if (sReg.test(item.start)) {
        description = `${item.text} ${items[index + 1].text} ${items[index + 2].text}`.replace(
          /[<>(/b)]+/g,
          ''
        );
      }
    });
    action<Types.Schema.Params.Link>({
      type: 'LINK_REQUEST',
      body: {
        input: {
          link,
          description,
        },
        results: ['message', 'link']
      },
    });
  };
  useEffect(() => {
    if (role === 'guest') auth();
    const storeSubs = store.subscribe(() => {
      const state: Types.Action<any> = store.getState();
      if (state.type === 'SEND_CONFIRM') {
        const { body }: Types.Action<Types.Schema.Values.SendConfirmRequest> = state;
        const { sendConfirm } = body;
        if (!sendConfirm) {
          setAlert({
            status: 'error',
            text: body.toString(),
            open: true,
            trigger: alert.trigger,
          });
          return;
        }
        setAlert({
          open: true,
          text: sendConfirm.message,
          status: sendConfirm.result,
          trigger: alert.trigger,
        });
      }
      if (state.type === 'AUTH') {
        const { body }: Types.Action<Types.Schema.Values.AuthRequest> = state;
        const { auth } = body;
        let _role: Types.UserRoles = 'guest';
        if (auth) {
          _role = auth.role;
          confirmRef.current = auth.confirm;
          emailRef.current = auth.email;
        }
        setRole(_role);
      }
      if (state.type === 'LINK') {
        const { body }: Types.Action<Types.Schema.Values.LinkRequest> = state;
        const { link } = body;
        if (!link) {
          setAlert({
            status: 'error',
            text: body.toString(),
            open: true,
            trigger: alert.trigger,
          });
          return;
        }
        let mess = link.message;
        if (link.result === 'success') {
          mess = `${window.origin}${link.link}`;
        }
        const b = (
          <IconButton
            src="/img/ui/content_copy-white-36dp.svg"
            alt={`${t.interface.close} ${t.interface.icon}`}
            title={t.interface.close}
            onClick={() => {
              navigator.clipboard
                .writeText(mess)
                .then(() => {
                  setAlert({
                    open: true,
                    text: `${t.interface.copied}: ${mess}`,
                    status: 'success',
                    button: b,
                  });
                })
                .catch(() => {
                  setAlert({
                    open: true,
                    text: `${t.interface.no} ${t.interface.copied}: ${mess}`,
                    status: 'error',
                    button: b,
                  });
                });
            }}
          />
        );
        const alertRes = {
          open: true,
          text: mess,
          status: link.result,
          button: b,
        }
        setAlert(alertRes);
      }
    });
    cookies.set('lang', locale, { expires: date, path: '*', sameSite: 'strict' });
    return () => {
      storeSubs();
    };
  }, [locale]);
  return (
    <MenuWrapper>
      <MenuIcon
        src="/img/ui/menu-white-36dp.svg"
        onClick={() => {
          document.body.style.overflow = 'hidden';
          setShow(true);
          _setShow(true);
        }}
      />
      {role === 'user' && !other && pathname === '/' && !load && (
        <MenuIconButton
          src="/img/ui/link-white-36dp.svg"
          alt={`${t.interface.link} ${t.interface.icon}`}
          title={t.interface.createAndCopyLink}
          onClick={createLink}
        />
      )}
      <Alert
        open={alert.open}
        status={alert.status}
        text={alert.text}
        trigger={alert.trigger}
        button={alert.button}
        relative={true}
      />
      {!other && (
        <LangSelect>
          <LangSelectItem selected={true}>{t.name}</LangSelectItem>
          <LangSelectItem selected={false}>&nbsp;|&nbsp;</LangSelectItem>
          <Link href={router.pathname} locale={t.value1}>
            <LangSelectItem value={t.value1} selected={false}>
              {t.name1}
            </LangSelectItem>
          </Link>
        </LangSelect>
      )}
      {_show ? (
        <MenuBody show={show}>
          <MenuItem selected={false} onClick={closeMenu}>
            <MenuItemIcon src="/img/ui/close-black-36dp.svg" alt="close icon" />
          </MenuItem>
          <Divider />
          <Link href="/">
            <MenuItem onClick={closeMenu} selected={pathname === '/'}>
              <MenuItemIcon
                src="/img/ui/home-black-36dp.svg"
                alt={`${t.interface.home} ${t.interface.icon}`}
              />
              <MenuItemText>{t.interface.home}</MenuItemText>
            </MenuItem>
          </Link>
          <Link href="/about">
            <MenuItem onClick={closeMenu} selected={pathname === '/about'}>
              <MenuItemIcon
                src="/img/ui/info-black-36dp.svg"
                alt={`${t.interface.about} ${t.interface.icon}`}
              />
              <MenuItemText>{t.interface.about}</MenuItemText>
            </MenuItem>
          </Link>
          <Divider />
          {role === 'guest' && (
            <Link href="/registration">
              <MenuItem onClick={closeMenu} selected={pathname === '/registration'}>
                <MenuItemIcon
                  src="/img/ui/how_to_reg-black-36dp.svg"
                  alt={`${t.interface.registration} ${t.interface.icon}`}
                />
                <MenuItemText>{t.interface.registration}</MenuItemText>
              </MenuItem>
            </Link>
          )}
          {role === 'guest' && (
            <Link href="/login">
              <MenuItem onClick={closeMenu} selected={pathname === '/login'}>
                <MenuItemIcon
                  src="/img/ui/login-black-36dp.svg"
                  alt={`${t.interface.login} ${t.interface.icon}`}
                />
                <MenuItemText>{t.interface.login}</MenuItemText>
              </MenuItem>
            </Link>
          )}
          {role === 'user' && (
            <Link href="/logout">
              <MenuItem onClick={closeMenu} selected={pathname === '/logout'}>
                <MenuItemIcon
                  src="/img/ui/exit_to_app-black-36dp.svg"
                  alt={`${t.interface.logout} ${t.interface.icon}`}
                />
                <MenuItemText>{t.interface.logout}</MenuItemText>
              </MenuItem>
            </Link>
          )}
        </MenuBody>
      ) : (
        ''
      )}
      {show ? <MenuOpenedWrapper onClick={closeMenu} show={show} /> : ''}
    </MenuWrapper>
  );
};

const MenuIconButton = styled.img`
  position: relative;
  cursor: pointer;
  vertical-align: middle;
  margin: auto var(--item-padding);
  width: var(--icon-width);
  height: var(--icon-width);
`;

const LangSelect = styled.div`
  margin: 0 20px 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
`;

interface LangSelectItemProps {
  selected: boolean;
  value?: Types.LanguageValue;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: React.MouseEvent<HTMLDivElement, React.MouseEvent>) => void;
}

const LangSelectItem = styled.div<LangSelectItemProps>`
  cursor: pointer;
  font-size: var(--h5-size);
  color: ${(props) => props.theme.white};
  text-transform: capitalize;
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
`;

/**
 * Close menu animation
 */
const fadeOut = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: calc(-1 * var(--menu-body-width));
  }
`;

/**
 * Open menu animation
 */
const fadeIn = keyframes`
  0% {
    left: calc(-1 * var(--menu-body-width));
  }
  100% {
    left: 0;
  }
`;

interface MenuStyledProps {
  show: boolean;
}

const pulse = `0.${duration}s`;

/**
 * Open and cloese menu animation handler
 * @param props {MenuStyledProps}
 */
const animation = (props: MenuStyledProps) =>
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

const MenuIcon = styled.img`
  cursor: pointer;
  width: var(--icon-width);
  height: var(--icon-width);
  margin: 12px;
`;

const MenuItemIcon = styled.img`
  cursor: pointer;
  width: var(--icon-width);
  height: var(--icon-width);
`;

/**
 * Close menu wrapper right
 */
const wrapperOut = keyframes`
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
`;

/**
 * Open menu wrapper right
 */
const wrapperIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.3;
  }
`;

const animationWrapper = (props: MenuStyledProps) =>
  css`
    ${pulse}
    ${props.show ? wrapperIn : wrapperOut} 
    ${props.show ? 'ease-in' : 'ease-out'}
  `;

const MenuOpenedWrapper = styled.div<MenuStyledProps>`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: var(--menu-body-width);
  width: calc(100% - var(--menu-body-width));
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  animation: ${animationWrapper};
`;

const MenuBody = styled.div<MenuStyledProps>`
  z-index: 12;
  position: fixed;
  left: ${(props) =>
    props.show ? '0' : 'calc(-1 * (300px + (1000 - 300) * ((100vw - 320px) / (7680 - 320))))'};
  top: 0;
  width: var(--menu-body-width);
  height: 100%;
  background: white;
  animation: ${animation};
  overflow-y: auto;
`;

interface MenuItemProps {
  selected: boolean;
}

const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  width: calc(100% - 40px);
  margin: auto;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: var(--menu-item-size);
  padding-top: var(--item-padding);
  padding-bottom: var(--item-padding);
  color: ${(props) => props.theme.main};
  background: ${(props) => (props.selected ? props.theme.bg : 'inherit')};
  &:hover {
    background: ${(props) => props.theme.bg};
  }
`;

const MenuItemText = styled.span`
  margin-left: 36px;
  text-transform: uppercase;
`;

const Divider = styled.div`
  position: relative;
  width: calc(100% - 40px);
  border-radius: 1px;
  margin: 0 20px 0 20px;
  height: 1px;
  background: rgba(0, 0, 0, 0.5);
`;

export default Menu;
