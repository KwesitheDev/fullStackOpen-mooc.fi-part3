const express = require('express')
const app = express()
app.use(express.json())
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//get total number of persons
app.get('/info', (request, response) => {
  const requestTime = new Date().toString()
  const requestCount = persons.length
  const responseText = `Phonebook has info for ${requestCount} people <br/> <br/> ${requestTime}`
    response.send(responseText)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//get specific person
app.get('/api/persons/:id', (request, response) => {
    const id = (request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

//delete person
app.delete('/api/persons/:id', (request, response) => {
    const id = (request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})  

//post request
app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
  
    //name already exists
    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({ error: "Name must be unique" })
    }
  
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100000)
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log('Server running on port 3001')
})