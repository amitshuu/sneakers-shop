import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minLength: 6,
      maxLength: 14,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },

    shippingAddress: {
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      postalCode: {
        type: String,
        default: '',
      },
      country: { type: String, default: '' },
      phoneNumber: { type: String, default: '' },
    },

    shoeSize: {
      type: Number,
      default: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    topPicks: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcryptjs.genSalt(12);
  this.password = bcryptjs.hashSync(this.password, salt);
});

userSchema.methods.comparePasswords = async function (password) {
  return bcryptjs.compareSync(password, this.password);
};

userSchema.post('save', function (error, _, next) {
  next(error.code === 11000 ? new Error('User is already exist') : error);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      firstName: this.firstName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
};

export default mongoose.model('User', userSchema);
