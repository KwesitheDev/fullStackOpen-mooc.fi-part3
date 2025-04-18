const mongoose = require("mongoose")
if (process.argv.length < 3) {
  console.log('Argument missing')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])
const name = String(process.argv[3])
const number =String(process.argv[4])

const url = `mongodb+srv://kwesithedev:${password}@cluster0.hjm2ei5.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

const phonebook = new Phonebook({
  name,
  number,
})

/*phonebook.save().then(result => {
  console.log('phone number saved!')
  console.log(`added ${name} ${number} to database`)
  mongoose.connection.close()
})*/

 /*Phonebook.find({}).then(result => {
  console.log("phonebook:")
  result.forEach(phonebook => {
    console.log(phonebook.name, phonebook.number)
  })
  mongoose.connection.close()
 })
   */

 if (process.argv.length === 5) {
  phonebook.save().then(result => {
    console.log('phone number saved!')
    console.log(`added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
}else if (process.argv.length === 3) {
  Phonebook.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(phonebook => {
      console.log(phonebook.name, phonebook.number)
    })
    mongoose.connection.close()
   })
}