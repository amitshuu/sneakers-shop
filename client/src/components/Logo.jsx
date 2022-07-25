import React from 'react';
import styled from 'styled-components';
import logo from '../assets/items/adidas_yeezy_700_wave_runner.png';
import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <Wrapper>
      <Image src={logo} />
      <Title>
        <Link to='/'>SneakersShop</Link>
      </Title>
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  min-width: 245px;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  padding-left: 5px;
`;
const Image = styled.img`
  width: 7%;
  min-width: 80px;
`;
