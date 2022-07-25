import React from 'react';
import styled from 'styled-components';
import logo from '../assets/items/adidas_yeezy_700_wave_runner.png';
import image from '../assets/items/nike_jordan_1_travis_mocha_high.png';
import { mobile } from '../responsive';
const About = () => {
  return (
    <Wrapper>
      <AboutContainer>
        <Title>
          <Logo src={logo} />
          About SneakersShop
        </Title>
        <Info>
          Lorem ipsum dolor sit amet consectetur adipisicing elit
          <br />. Sunt quo fugiat sit consequuntur
          <br /> hic repudiandae quis? Error facere, labore, aperiam tenetur
          <br />
          necessitatibus voluptates veritatis quaerat ad vitae adipisci
          cupiditate nostrum <br />
          porro doloremque a totam facilis et! Reprehenderit quidem fugit
          delectus.
          <br /> hic repudiandae quis? Error facere, labore, aperiam tenetur
          necessitatibus
          <br /> voluptates veritatis quaerat ad vitae adipisci cupiditate
          nostrum <br />
          porro doloremque a totam facilis et! Reprehenderit quidem fugit
          delectus.
        </Info>
      </AboutContainer>
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.div`
  display: flex;
  margin-top: 5rem;
`;
const AboutContainer = styled.div`
  ${mobile({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    textAlign: 'center',
    width: '100%',
  })}
`;
const Title = styled.h1`
  display: flex;
  align-items: center;
  color: var(--clr-primary);
  ${mobile({ display: 'flex', flexDirection: 'column' })}
`;
const Logo = styled.img`
  width: 10%;
  min-width: 50px;
  margin-right: 1rem;
  ${mobile({ width: '30%' })}
`;

const Info = styled.p`
  color: var(--clr-gray);
  ${mobile({
    margin: '1rem',
  })}
`;

const ImageContainer = styled.div`
  ${mobile({ display: 'none' })}
`;
const Image = styled.img`
  height: 50vh;
  width: 35vw;
  object-fit: cover;
`;
