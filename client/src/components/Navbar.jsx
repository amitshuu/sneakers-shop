import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import UserMenu from '../assets/mui/UserMenu';
import { mobile } from '../responsive';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo, SearchBar } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { useQuery } from '@apollo/client';
import { toggleMobileMenu } from '../features/filterSlice';
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { data } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
    skip: !userInfo,
  });

  // eslint-disable-next-line
  const display = new Boolean();

  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Logo />
      <LinkContainer>
        <NavLink>
          <Link className='link' to='/'>
            Home
          </Link>
        </NavLink>
        <NavLink>
          <Link className='link' to='/shop'>
            Shop
          </Link>
        </NavLink>
      </LinkContainer>
      <SearchBarContainer>
        <SearchBar display={display} />
      </SearchBarContainer>

      <UserContainer>
        {userInfo ? (
          <UserMenu />
        ) : (
          <Icon>
            <Link to='/login'>
              <UserLinks>
                <PersonOutlineOutlinedIcon
                  style={{ color: 'black', fontSize: '26px' }}
                />
                Sign in
              </UserLinks>
            </Link>
          </Icon>
        )}
        {userInfo && (
          <UserLinks>
            <Link to='/cart' style={{ color: 'var(--clr-mocha-2)' }}>
              <Badge
                sx={{ color: 'var(--clr-mocha)' }}
                color='primary'
                style={{ paddingRight: '10px', marginTop: '3px' }}
                badgeContent={data?.getUserCart.cartProducts.length || 0}
              >
                <Icon>
                  <ShoppingCartOutlinedIcon style={{ color: 'black' }} />
                </Icon>
                Cart
              </Badge>
            </Link>
          </UserLinks>
        )}
      </UserContainer>
      <MobileMenu>
        <MenuIcon
          onClick={() => dispatch(toggleMobileMenu())}
          style={{ cursor: 'pointer', fontSize: '36px' }}
        />
      </MobileMenu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
  border-bottom: 2px solid var(--clr-border);
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  justify-content: center;
  ${mobile({ display: 'none' })}
`;

const NavLink = styled.p`
  margin: 0.5rem;
  cursor: pointer;
  .link {
    color: var(--clr-gray);
    padding: 6px 8px;
    border-radius: 4px;
    line-height: 1.75;
    letter-spacing: 0.02em;
    transition: all 0.3s;
    &:hover {
      color: var(--clr-mocha-2);
      background-color: var(--clr-mocha-hover);
    }
  }
`;

const UserContainer = styled.div`
  display: flex;
  width: 35%;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ display: 'none' })}
`;
const UserLinks = styled.div`
  display: flex;
  color: var(--clr-mocha-2);
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  padding: 6px 8px;
  border-radius: 4px;
  letter-spacing: 0.02em;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: var(--clr-mocha-hover);
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileMenu = styled.div`
  display: none;
  ${mobile({
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  })}
`;
const SearchBarContainer = styled.div`
  height: 0px;
  width: 30%;
  margin: 1rem;
  ${mobile({ display: 'none' })}
`;
export default Navbar;
