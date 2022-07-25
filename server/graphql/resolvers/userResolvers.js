import { UserInputError } from 'apollo-server-express';
import User from '../../models/User.js';
import { auth } from '../../utils/auth.js';

import {
  loginInputValidator,
  registerInputValidator,
} from '../../utils/vaildators.js';

export const users = {
  Query: {
    getUserById: async (_, {}, context) => {
      const user = await auth(context);
      return {
        ...user._doc,
        id: user._id,
        token: user.createJWT(),
      };
    },
  },
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmedPassword } }
    ) => {
      const { valid, errors } = registerInputValidator(
        username,
        email,
        password,
        confirmedPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const existUser = await User.findOne({ username });
      const existEmail = await User.findOne({ email });
      if (existUser) {
        throw new UserInputError('User is already exist', {
          errors: {
            username: 'Username is already exist',
          },
        });
      } else if (existEmail) {
        throw new UserInputError('Email is already exist', {
          errors: {
            email: 'Email is already exist',
          },
        });
      }
      const newUser = new User({
        username,
        email,
        password,
      });
      const res = await newUser.save();

      return {
        ...res._doc,
        id: res._id,
        token: res.createJWT(),
      };
    },
    login: async (_, { username, password }, { res }) => {
      const { valid, errors } = loginInputValidator(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username }).select('+password');

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('No user ', { errors });
      }

      if (!(await user.comparePasswords(password))) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      return {
        ...user._doc,
        id: user._id,
        token: user.createJWT(),
      };
    },
    updateUser: async (
      _,
      {
        updateUserInput: {
          email,
          username,
          firstName,
          lastName,
          shoeSize,
          password,
          currentPassword,
        },
      },
      context
    ) => {
      const userAuth = await auth(context);
      const user = await User.findOne(userAuth);

      if (user) {
        user.email = email || user.email;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.username = username || user.username;
        user.shoeSize = shoeSize || user.shoeSize;
        if (password) {
          if (password.length < 6 || currentPassword.length < 6) {
            throw new UserInputError(
              'Password field must be minimum 6 letters'
            );
          }
          const isMatch = await user.comparePasswords(currentPassword);
          if (isMatch) {
            user.password = password || user.password;
          } else {
            throw new UserInputError('Invalid input');
          }
        }
      }
      await user.save();
      return {
        ...user._doc,
        id: user._id,
        token: user.createJWT(),
        isAdmin: user.isAdmin,
      };
    },
    updateShipping: async (
      _,
      {
        updateShippingInput: {
          city,
          postalCode,
          address,
          country,
          phoneNumber,
        },
      },
      context
    ) => {
      const user = await auth(context);
      if (user) {
        user.shippingAddress.city = city;
        user.shippingAddress.country = country;
        user.shippingAddress.address = address;
        user.shippingAddress.phoneNumber = phoneNumber;
        user.shippingAddress.postalCode = postalCode;
      }

      await user.save();
      return {
        ...user._doc,
        id: user._id,
        token: user.createJWT(),
      };
    },
  },
};
