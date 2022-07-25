import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, LeftSidebar, MobileProfileBar } from '../../components';
import styled from 'styled-components';
const MainLayout = () => {
  return (
    <>
      <div className='section-center'>
        <Navbar />
        <MobileProfileBar />
        <Wrapper>
          <LeftSidebar />
          <Outlet />
        </Wrapper>
      </div>
    </>
  );
};

export default MainLayout;

const Wrapper = styled.div`
  display: flex;
`;
