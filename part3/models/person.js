const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const url = process.env.MONGODB_URI

mongoose.connect(url, {family: 4})
    .then((rus) => {
        console.log('connected to MongoDB')
    })
    .catch((err) => {
        console.log(`error connecting to MongoDB ${err.message}`)
        process.exit(1)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// personSchema.set('toJson', {
//     transform: (doc, retObj) => {
//         retObj.id = retObj._id.toString()
//         delete retObj.
//     }
// })

module.exports = mongoose.model('Persons', personSchema)