import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { sidebarLinks, adminSidebarLinks } from '../utils/constants';
import { useLogout } from '../utils/customHooks';
import { mobile } from '../responsive';
const LeftSidebar = ({ admin }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { handleLogout } = useLogout();

  const mapValue = admin ? adminSidebarLinks : sidebarLinks;

  return (
    <Wrapper>
      <UserTitle>
        {`Hello ${userInfo.firstName ? userInfo.firstName : userInfo.username}`}
      </UserTitle>
      {mapValue?.map((link) => {
        const { name, id, icon, path, handler } = link;
        return (
          <LinksContainer key={id}>
            <SidebarLink>
              <NavLink
                activeclassname='active'
                style={{
                  display: 'flex',
                  width: '100%',
                }}
                to={`${path}`}
                onClick={() => handler && handleLogout()}
              >
                <Icon>{icon}</Icon>
                <LinkTitle>{name}</LinkTitle>
              </NavLink>
            </SidebarLink>
          </LinksContainer>
        );
      })}
    </Wrapper>
  );
};

export default LeftSidebar;

const Wrapper = styled.div`
  background-color: var(--clr-gray-3);
  width: 30%;
  height: 75vh;
  transition: all 0.3s;
  border-radius: 0.25rem;
  ${mobile({ display: 'none' })}
`;

const UserTitle = styled.h2`
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  letter-spacing: 0.5px;
  color: var(--clr-primary-2);
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  .active {
    background-color: var(--clr-light-gray);
    width: 100%;
    border-radius: 0.25rem;
    padding-left: 10px;
    transition: all 0.2s;
  }
`;

const SidebarLink = styled.div`
  display: flex;
  width: 80%;
  height: auto;
  align-items: center;
  transition: all 0.3s;
  margin-bottom: 0.6rem;
  border-radius: 0.25rem;

  cursor: pointer;
  &:hover {
    padding-left: 10px;
    background-color: var(--clr-light-gray);
  }
`;

const LinkTitle = styled.h4`
  font-weight: 500;
`;

const Icon = styled.p`
  padding-right: 2.5px;
`;
