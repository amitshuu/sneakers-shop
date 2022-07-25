import styled from 'styled-components';
import { useForm } from '../../utils/customHooks';
import { useMutation } from '@apollo/client';
import { UPDATE_SHIPPING } from '../../graphql/Mutations/userMutations';
import Loading from '../../assets/mui/Loading';
import { GET_USER_CART } from '../../graphql/Queries/cartQueries';
import { GET_USER_DETAILS } from '../../graphql/Queries/userQueries';

const EditingShipping = ({
  toggleEdit,
  title,
  Wrapper,
  TitleContainer,
  Title,
  EditButton,
  Info,
  Label,
  userInfo,
}) => {
  const { city, address, postalCode, phoneNumber, country } =
    userInfo.shippingAddress;

  const initialState = {
    city,
    address,
    postalCode,
    phoneNumber,
    country,
  };

  const { values, onChange, onSubmit } = useForm(
    updateShippingCallback,
    initialState
  );

  const [updateShipping, { loading }] = useMutation(UPDATE_SHIPPING, {
    onCompleted() {
      toggleEdit();
    },
    variables: values,
    refetchQueries: [
      {
        query: GET_USER_CART,
        variables: { userId: userInfo?.id },
      },
      {
        query: GET_USER_DETAILS,
        variables: { userId: userInfo?.id },
      },
    ],
  });

  function updateShippingCallback() {
    updateShipping();
  }

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <Title>{title}</Title>
          <EditButton onClick={toggleEdit}>Cancel</EditButton>
        </TitleContainer>
        <Form onSubmit={onSubmit}>
          <Info>
            <Label>Address</Label>
            <Input
              name='address'
              value={values.address || ''}
              onChange={onChange}
              type='text'
            />
          </Info>
          <Info>
            <Label>City</Label>
            <Input
              name='city'
              type='text'
              value={values.city || ''}
              onChange={onChange}
            />
          </Info>
          <Info>
            <Label>State/Region</Label>
            <Input
              name='country'
              value={values.country || ''}
              onChange={onChange}
              type='text'
            />
          </Info>
          <Info>
            <Label>Zip/Postal Code</Label>
            <Input
              name='postalCode'
              value={values.postalCode || ''}
              onChange={onChange}
              type='text'
            />
          </Info>
          <Info>
            <Label>Phone Number</Label>
            <Input
              name='phoneNumber'
              value={values.phoneNumber || ''}
              onChange={onChange}
              type='text'
            />
          </Info>
          <Info>
            <Label>
              {loading ? (
                <Loading style={{ margin: '0 auto' }} />
              ) : (
                <SubmitButton disabled={loading}>Submit</SubmitButton>
              )}
            </Label>
          </Info>
        </Form>
      </Wrapper>
    </>
  );
};

export default EditingShipping;

const Input = styled.input`
  margin-top: -2rem;
  border-radius: 0.25rem;
  padding: 0.357rem 0.75rem;
  border: 1px solid var(--clr-gray);
  background-color: transparent;
  font-size: 100%;
  line-height: 1.15;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  height: 5vh;
  margin-top: 1.8rem;
  min-width: 50%;
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
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 30vh;
`;
