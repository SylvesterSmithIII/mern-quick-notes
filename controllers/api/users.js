const User = require('../../models/user')
const Note = require('../../models/note')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// controllers/api/users.js
module.exports = {
    create,
    login,
    checkToken,
    getNotes,
    addNote,
    deleteNote
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
        return res.status(400).json(error)
    }

    const match = await bcrypt.compare(req.body.password, (user ? user.password : ''))


    if (match) {
        const token = createJWT(user)
        return res.json(token)
    }

    return res.status(400).json("Bad Credentials")
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

async function getNotes(req, res) {
    try {
        const notes = await Note.find({ user: req.user._id })
        return res.json(notes)
    } catch (error) {
        res.status(400).json(error)
    }
}

async function addNote(req, res) {
    try {
        const newNote = await Note.create({
            text: req.body.text,
            user: req.user._id
        })
        
        res.json(newNote)

    } catch (error) {
        res.status(400).json(error);
    }
}

async function deleteNote(req, res) {
    try {
        await Note.deleteOne({ _id: req.body._id })
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(400).json(error);
    }
}