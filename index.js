require('dotenv').config()

const Person = require('./models/person')

const express = require('express')
const morgan = require('morgan')
//const cors = require('cors')

const app = express()
app.use(express.static('dist'))
//app.use(cors())

//creating a  morgan token
morgan.token('body', (req) => {
    return req.method === 'POST'  ? JSON.stringify(req.body) : ''
})


app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => { 
    response.send("Backend is running")
})

//get total number of persons
/*app.get('/info', (request, response) => {
  const requestTime = new Date().toString()
  const requestCount = persons.length
  const responseText = `Phonebook has info for ${requestCount} people <br/> <br/> ${requestTime}`
    response.send(responseText)
})*/

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
        response.json(persons)
        }).catch(error => next(error))
})
//Error HAndling, with get ID
app.get('/api/persons/:id',(req,res,next)=>{
    Person.findById(req.params.id)
        .then(person => {
            if (person){
                res.json(person)
            } else {
                res.status(404).json.end()
            }
            
            }).catch(error=>next(error))
})

//deleting person
app.delete('/api/persons/:id',(request, response,next)=>{
    Person.findByIdAndDelete(request.params.id)
        .then(result=>{
            response.status(204).end()
        })
    .catch(error=>next(error))
})

//get specific person
/* app.get('/api/persons/:id', (request, response) => {
    const id = (request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
 */
/* //delete person
app.delete('/api/persons/:id', (request, response) => {
    const id = (request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})  */ 


//post request
app.post('/api/persons', (request, response,next) => {
    const body = request.body
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
  
   

    //name already exist
    Person.findOne({name: body.name})
        .then(existingPerson => {
            if (existingPerson) {
            console.log("Person exists in db")
            existingPerson.number = body.number
            return existingPerson.save().then(updatedPerson => {
                response.json(updatedPerson)
            })
            } else {
                
            const person = new Person ({
                name: body.name,
                number: body.number,
            })

            
           person.save()
        .then(savedPerson=>{
        response.json(savedPerson)
        })
        .catch(error => next(error));
     
        }
    })
    
})
app.put('/api/persons/:id', (request, response, next) => {
    const { number } = request.body;

    if (!number) {
        return response.status(400).json({ error: 'number missing' });
    }

    Person.findByIdAndUpdate(
        request.params.id,
        { number },
        { new: true, runValidators: true, context: 'query' }
    )
    .then(updatedPerson => {
        if (updatedPerson) {
            response.json(updatedPerson);
        } else {
            response.status(404).end();
        }
    })
    .catch(error => next(error));
});


// Error handler middleware
const errorHandler =()=>(error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    response.status(500).json({ error: 'internal server error' });
};

app.use(errorHandler());
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server running on port 3001')
})