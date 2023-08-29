const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// controllers/api/users.js
module.exports = {
    create,
    login,
    checkToken
}

// POST /api/users
async function create(req, res) {
   try {
    // add user to db
    const user = await User.create(req.body)
    const token = createJWT(user)
    res.json(token)
   } catch (error) {
    // client will catch non 2xx status codes
    // 400 = Bad Request
    res.status(400).json(error)
   }
}

async function login(req, res) {
    let user

    try {
        user = await User.findOne({
            email: req.body.email
        })
    } catch (error) {
        res.status(400).json(error)
    }

    const match = await bcrypt.compare(req.body.password, user.password)


    if (match) {
        const token = createJWT(user)
        res.json(token)
    }

    res.status(400).json("Bad Credentials")
}

// Helper Functions //

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
  }
  