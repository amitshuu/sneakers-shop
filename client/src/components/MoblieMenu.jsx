import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { toggleMobileMenu } from '../features/filterSlice';
import { Logo, SearchBar } from './';
import { Link } from 'react-router-dom';
import { useLogout } from '../utils/customHooks';

const MoblieMenu = () => {
  const { mobileMenu } = useSelector((state) => state.filter);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { handleLogout } = useLogout();

  const logoutHandler = () => {
    handleLogout();
    dispatch(toggleMobileMenu());
  };

  // eslint-disable-next-line
  const display = new Boolean();

  return (
    <>
      {mobileMenu && (
        <Wrapper>
          <Header>
            <Logo />
            <CloseIcon
              className='close-icon'
              onClick={() => dispatch(toggleMobileMenu())}
              style={{ color: 'red' }}
            />
          </Header>
          <SearchBar display={display} />
          <LinksContainer>
            <MenuLink>
              <Link onClick={() => dispatch(toggleMobileMenu())} to='/'>
                Home
              </Link>
            </MenuLink>
            <MenuLink>
              <Link onClick={() => dispatch(toggleMobileMenu())} to='/shop'>
                Shop
              </Link>
            </MenuLink>
            {userInfo && (
              <MenuLink>
                <Link
                  onClick={() => dispatch(toggleMobileMenu())}
                  to='/profile'
                >
                  Profile
                </Link>
              </MenuLink>
            )}
            {userInfo && userInfo.isAdmin && (
              <MenuLink>
                <Link
                  onClick={() => dispatch(toggleMobileMenu())}
                  to='/new-item'
                >
                  Admin Panel
                </Link>
              </MenuLink>
            )}
          </LinksContainer>
          <UserLinks>
            {userInfo ? (
              <MenuLink>
                <Link
                  onClick={logoutHandler}
                  to='/'
                  style={{ color: 'var(--clr-primary-2)' }}
                >
                  <PersonOutlineOutlinedIcon />
                  Sign Out
                </Link>
              </MenuLink>
            ) : (
              <MenuLink>
                <Link
                  onClick={() => dispatch(toggleMobileMenu())}
                  to='/login'
                  style={{ color: 'var(--clr-primary-2)' }}
                >
                  <PersonOutlineOutlinedIcon />
                  Sign in
                </Link>
              </MenuLink>
            )}
            {userInfo && (
              <MenuLink>
                <Link
                  onClick={() => dispatch(toggleMobileMenu())}
                  to='/cart'
                  style={{ color: 'var(--clr-primary-2)' }}
                >
                  <ShoppingCartOutlinedIcon />
                  Cart
                </Link>
              </MenuLink>
            )}
          </UserLinks>
        </Wrapper>
      )}
    </>
  );
};

export default MoblieMenu;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 1;
  background-color: var(--bgc-main);
  top: 0;
  left: 0;
  overflow-x: hidden;
  flex-direction: column;
  @media only screen and (min-width: 780px) {
    display: none;
  }
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 20px 40px;
  border-bottom: 2px solid var(--clr-border);

  .close-icon {
    background-color: transparent;
    border: transparent;
    font-size: 30px;
    color: darkred;
    cursor: pointer;
  }
`;

const LinksContainer = styled.div`
  padding: 1rem;
  width: 100%;
`;

const MenuLink = styled.p`
  padding: 1rem;
  display: flex;
  align-items: center;

  a {
    display: flex;
    color: var(--clr-mocha);
    border-radius: 4px;
    line-height: 1.75;
    letter-spacing: 0.02em;
  }
`;

const UserLinks = styled.div`
  display: flex;
  justify-content: center;
`;
