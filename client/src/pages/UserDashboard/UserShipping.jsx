import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../assets/mui/Loading';
import { mobile } from '../../responsive';
import EditingShipping from './EditingShipping';
const UserShipping = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo, isLoading } = useSelector((state) => state.user);

  const { city, address, postalCode, phoneNumber, country } =
    userInfo?.shippingAddress || '';

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {isEditing ? (
        <EditingShipping
          toggleEdit={toggleEdit}
          title='Shipping Update'
          InfoContainer={InfoContainer}
          Wrapper={Wrapper}
          TitleContainer={TitleContainer}
          Title={Title}
          EditButton={EditButton}
          Info={Info}
          Label={Label}
          Value={Value}
          userInfo={userInfo}
        />
      ) : (
        <Wrapper>
          <TitleContainer>
            <Title>Shipping Info</Title>
            <EditButton onClick={toggleEdit}>Edit</EditButton>
          </TitleContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <InfoContainer>
              <Info>
                <Label>Address</Label>
                <Value>{address || 'Not defined yet'}</Value>
              </Info>
              <Info>
                <Label>City</Label>
                <Value>{city || 'Not defined yet'}</Value>
              </Info>
              <Info>
                <Label>State/Region</Label>
                <Value>{country || 'Not defined yet'}</Value>
              </Info>
              <Info>
                <Label>Zip/Postal Code</Label>
                <Value>{postalCode || 'Not defined yet'}</Value>
              </Info>
              <Info>
                <Label>Phone Number</Label>
                <Value>{phoneNumber || 'Not defined yet'}</Value>
              </Info>
            </InfoContainer>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default UserShipping;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2rem 3rem;
  ${mobile({ padding: '1rem', margin: '0 auto', height: '80vh' })}
`;
const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--clr-border);
`;

const Title = styled.h2`
  color: var(--clr-primary-2);
`;

const EditButton = styled.button`
  width: 10%;
  height: 5vh;
  background: transparent;
  border: none;
  background-color: var(--clr-primary-2);
  cursor: pointer;
  transition: all 0.3s;
  color: white;
  font-size: 14px;
  letter-spacing: 0.5px;
  ${mobile({ width: '25%' })}
  &:hover {
    background-color: var(--clr-primary);
  }
`;

const Label = styled.h3`
  color: var(--clr-primary-2);
`;
const Value = styled.p`
  margin-top: -20px;
  .reset-btn {
    min-width: 30%;
    margin-top: 0.5rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 30vh;
`;

const Info = styled.div`
  flex: 50%;
  flex-direction: column;
  ${mobile({ flex: '100%' })}
`;
