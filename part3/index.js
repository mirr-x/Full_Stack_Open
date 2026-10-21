const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person.js')
// const cors = require('cors')

function handleMongoosError(error, res) {
    console.error("Database Error:", error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({ 
      success: false, 
      message: "Validation failed", 
      details: error.message 
    });
  }

  // 2. If the ID format is completely broken
  if (error.name === 'CastError') {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID format provided" 
    });
  }

  // 3. Fallback for unexpected server or connection failures
  return res.status(500).json({ 
    success: false, 
    message: "Internal server error" 
  });
}
const app = express()

// app.use(cors({origin: 'http://localhost:5173'}))
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (req, res) => {
    res.send(`
        <p> Welcome to the Home Page </p>
    `)
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then((persons) => {
            res.json(persons)
        })
        .catch((err) => {
            res.json({ error: `Failed Displaying persons: ${err.message}` })
        })
});

app.get('/info', (req, res) => {
    const timeNow = new Date()
    Person.countDocuments({})
        .then((length_) => {
            res.send(`
                <p> Phonebook ha info for ${length_} people </p>
                <p> ${timeNow} </p>
            `)
        })
        .catch((err) => {
            handleMongoosError(err, res)
        })

});

app.get('/api/persons/:id', (req, res) => {
    const ide = req.params.id
    Person.findById(ide)
        .then((person) =>{
            if (person) {
                res.json(person)
            } else {
                res.status(404).json({error: 'person not found in db'})
            }
        })
        .catch((err) => {
            handleMongoosError(err, res)
        })
})

app.delete('/api/persons/:id', (req, res) => {
    const id_ = req.params.id
    Person.findByIdAndDelete(id_)
        .then((person) => {
            res.status(200).json({message: `${person.name} successfully deleted`})
        })
        .catch((err) => {
            handleMongoosError(err, res)
        })
})

app.post("/api/persons", (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ error: "name or number is missing" })
    }

    Person.exists({ name: body.name })
        .then((personExists) => {
            if (personExists) {
                return res.status(400).json({ warning: "name must be unique" })
            }

            Person.create({
                name: body.name,
                number: body.number
            }).then((person) => {
                return res.json(person)
            })
        })
        .catch((err) => {
            handleMongoosError(err, res)
        })

})

app.put('/api/persons/:id', (req, res) => {
    const body = req.body
    const id_ = req.params.id

    if (!body.name || !body.number) {
        return res.status(400).json({ error: "name or number is missing" })
    }

    Person.findByIdAndUpdate(
        id_,
        { $set: {name: body.name, number: body.number} },
        { returnDocument: 'after', runValidators: true }
    )
    .then((updatedPerson) => {
        if (!updatedPerson) {
            return res.status(404).json({warning: 'person not found'})
        }
        res.json(updatedPerson)
    })
    .catch((err) => {
        handleMongoosError(err, res)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT,
    console.log(`Server running on port ${PORT}`)
)
