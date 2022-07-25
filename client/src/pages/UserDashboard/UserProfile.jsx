import { PasswordModal } from '../../assets/mui/PasswordModal';
import React, { useState } from 'react';
import styled from 'styled-components';
import EditingProfile from './EditingProfile';
import { useSelector } from 'react-redux';
import Loading from '../../assets/mui/Loading';
import { mobile } from '../../responsive';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo, isLoading } = useSelector((state) => state.user);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {isEditing ? (
        <EditingProfile
          toggleEdit={toggleEdit}
          title='Profile Update'
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
            <Title>Profile</Title>
            <EditButton onClick={toggleEdit}>Edit</EditButton>
          </TitleContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <InfoContainer>
              <Info>
                <Label>First Name</Label>
                <Value>{userInfo.firstName || 'Not defined yet'}</Value>
              </Info>
              <Info>
                <Label>Last Name</Label>
                <Value>{userInfo.lastName || 'Not defined yet'}</Value>
              </Info>
              <Info>
                <Label>Email Address</Label>
                <Value>{userInfo.email}</Value>
              </Info>
              <Info>
                <Label>Shoe Size(US)</Label>
                <Value>{userInfo.shoeSize || 'Not defined yet'}</Value>
              </Info>
              <Info>
                <Label>Username</Label>
                <Value>{userInfo.username}</Value>
              </Info>

              <Info>
                <Label>
                  <PasswordModal />
                </Label>
              </Info>
            </InfoContainer>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default UserProfile;

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
  &:hover {
    background-color: var(--clr-primary);
  }
  ${mobile({ width: '25%' })}
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
