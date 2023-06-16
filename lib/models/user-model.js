const {
  model,
  Schema,
  models
} = require('mongoose');
const mongooseUniqueValidation = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/app-config');

const UserSchema = new Schema({
  name: {
    type: Schema.Types.String,
    caseFirst: true,
    require: [true, 'can\'t be blank'],
  },
  lastname: {
    type: Schema.Types.String,
    caseFirst: true,
    require: [true, 'can\'t be blank'],
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    lowerCase: true,
    require: [true, 'can\'t be blank'],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  password: {
    type: Schema.Types.String,
  },
}, { timestamps: true });

UserSchema.plugin(mongooseUniqueValidation, { message: 'This email is registered please login.' });

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, function (err, hash) {
    this.password = hash;
  });
});

UserSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16)
    .toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    email: this.email,
    exp: exp.getTime() / 1000,
  }, JWT_SECRET);
};

UserSchema.methods.toAuthJSON = function () {
  return {
    name: this.name,
    lastname: this.lastname,
    email: this.email,
    token: this.generateJWT(),
  };
};

const User = models.User || model('User', UserSchema);

module.exports = User;
