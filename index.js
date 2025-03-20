const express = require('express')
const app = express()

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

const PORT = 3001

app.listen(PORT, () => {
    console.log('Server running on port 3001')
})