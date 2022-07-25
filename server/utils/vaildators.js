export const registerInputValidator = (
  username,
  email,
  password,
  confirmedPassword
) => {
  const errors = {};

  if (!username) {
    errors.username = 'Username must not be empty ';
  } else if (username.length < 6) {
    errors.username = 'Username field must be minimum 6 letters';
  }
  if (!email) {
    errors.email = 'Email must not be empty ';
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (!password) {
    errors.password = 'Password must not be empty ';
  } else if (password.length < 6) {
    errors.password = 'Password field must be minimum 6 letters or numbers';
  } else if (password !== confirmedPassword) {
    errors.confirmedPassword = 'Password must be matched';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const loginInputValidator = (username, password) => {
  const errors = {};
  if (!username) {
    errors.username = 'Username must not be empty';
  }
  if (!password) {
    errors.password = 'Password must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
