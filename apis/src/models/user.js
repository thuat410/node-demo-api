const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
        validate: [
            {
                validator: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
                message: '{VALUE} is not a valid email address!'
            },
            {
                validator: email => User.doesNotExist({email}),
                message: 'Email already exists'
            }
        ],
        minlength: [8, 'Email must be at least 8 characters long'],
    }
    username: {
        type: String,
        required: true,
        trim: true,
        validate: [
            {
                validator: value => /^[a-zA-Z0-9]+$/.test(value),
                message: 'Username only cointain number and charactor'
            },
        ],
        minlength: [4, 'Username must be at least 4 characters long'],
    }
    password: {
        minlength: [6, 'Password must be at least 6 characters long'],
        required: true,
        select: false,
        trim: true,
        type: String
    }
}, {timestamps: true})

// hash password before save into DB
userSchema.post('validate', function (doc, next) {
    if (this.isModified('password')) {
        doc.password = bcrypt.hashSync(doc.password, 10)
    }
    return next()
})

userSchema.statics.protectedFields = [
    '_id',
    '__v',
    'password'
]

userSchema.statics.doesNotExist = async (field) => {
    const users = await User.find(field)
    return users.length === 0
}

const User = mongoose.model('User', userSchema)

module.exports = User

