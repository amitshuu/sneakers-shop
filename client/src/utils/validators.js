export const validateShippingAddress = (
  address,
  city,
  phoneNumber,
  postalCode,
  country
) => {
  const errors = {};
  if (!address || !city || !phoneNumber || !postalCode || !country) {
    errors.general = 'You must update your shipping info in order to continue.';
  }

  return {
    errors,
  };
};
