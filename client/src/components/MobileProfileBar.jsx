import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../utils/customHooks';

import styled from 'styled-components';
import { sidebarLinks } from '../utils/constants';
const MobileProfileBar = () => {
  const { handleLogout } = useLogout();
  return (
    <Wrapper>
      <ProfileBar>
        {sidebarLinks.map((links) => {
          const { name, path, id, handler } = links;
          return (
            <NavLink
              className='nav_link'
              key={id}
              to={path}
              onClick={() => handler && handleLogout()}
            >
              {name}
            </NavLink>
          );
        })}
      </ProfileBar>
    </Wrapper>
  );
};

export default MobileProfileBar;

const Wrapper = styled.div`
  @media only screen and (min-width: 780px) {
    display: none;
  }
  display: 'flex';
  width: 100%;
  align-items: center;
  .nav_link {
    margin-bottom: 1rem;
  }
`;

const ProfileBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid var(--clr-border);
`;
