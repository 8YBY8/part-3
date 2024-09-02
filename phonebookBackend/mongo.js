// Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, 
// and for listing all of the existing entries in the phonebook
// mongodb+srv://yby:<db_password>@cluster0.9px7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

// const url =
//   `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
const url = `mongodb+srv://yby:${password}@cluster0.9px7a.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length === 5) {
  

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  // adding entries to the phonebook
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })

}


// listing all of the existing entries in the phonebook
if (process.argv.length === 3) {
  

  Person
    .find({})
    .then(persons=> {
      console.log("phonebook:");
      persons.forEach(p => {
        console.log(p.name, p.number);
      })
      mongoose.connection.close()
    })
}