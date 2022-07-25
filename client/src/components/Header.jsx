import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import image from '../assets/items/adidas_yeezy_700_mauve.png';
import { mobile } from '../responsive';

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Buy A New Shoes</Title>
        <Info>
          Take the time to be sure the shoes you buy are <br />
          right for your feet
        </Info>
        <Link to='/shop'>
          <Button>Buy Now</Button>
        </Link>
      </Container>

      <ImageContainer>
        <ImageTitle>
          YEEZY
          <br /> BOOST 700
        </ImageTitle>
        <Image src={image} />
      </ImageContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  border-bottom: 2px solid var(--clr-border);
`;

const Container = styled.div`
  flex: 1;
  ${mobile({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '5rem',
  })}
`;
const Title = styled.h1`
  color: var(--clr-primary);
  font-weight: 800;
`;

const Info = styled.p`
  color: var(--clr-gray);
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  background-color: var(--clr-primary);
  color: white;
  font-weight: 500;
  font-size: 16px;
  border-radius: 10px;
  padding: 8px 30px;
  border: none;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: var(--clr-primary-2);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  margin-right: 5rem;
  margin-bottom: 2rem;
  width: 100%;
  ${mobile({ display: 'none' })}
`;
const Image = styled.img`
  transform: rotateY(180deg);
  width: 100%;
  height: 40vh;
  object-fit: cover;
  /* z-index: -1; */
  background-color: transparent;
`;

const ImageTitle = styled.h1`
  display: flex;
  justify-content: center;
  overflow: none;
  align-items: center;
  width: 77%;
  height: 35vh;
  position: absolute;
  transform: rotate(-90deg);
  z-index: -200;
  color: var(--clr-primary);
  font-weight: 800;
  font-size: 48px;
  margin: 0 auto;
`;
