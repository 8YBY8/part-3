const express = require("express");
const app = express();

// Express json-parser
app.use(express.json())

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/info", (request, response) => {
    const numOfPersons = persons.length;
    const now = new Date();

    response.send(`Phonebook has info for ${numOfPersons} people <br/> ${now}`);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);  
    const person = persons.find((person) => Number(person.id) === id);
    if (person) {
        console.log("find");
        response.json(person);
    } 
    else {
        console.log("x");
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => Number(person.id) !== id)    

    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const person = request.body

    if(!person.name || !person.number) {
        return response.status(400).json({
            error:'The name or number is missing'
        })
    }

    const nameExist = persons.find(p => p.name === person.name)
    
    if(nameExist) {
        return response.status(400).json({
            error:'name must be unique'
        })
    }

    person.id = Math.floor(Math.random() * 10000)
    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
