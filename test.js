import { Database, JSONStorage } from './src/index.js'

// Creating the db
var students = new Database({
    Storage: {
        method: JSONStorage,
        settings: {
            file: process.cwd() + '/students.json'
        }
    }
})

students.schema.setProp('firstname', 'string')
students.schema.setProp('lastname', 'string')
students.schema.setProp('age', 'int')

console.log(students.get('1')) // => {firstname: null, lastname: null, age: null}

students.get('1').update('firstname', 'John')
students.get('1').update('lastname', 'Doe')
students.get('1').update('age', 16)

console.log(students.get('1')) // => {firstname: 'John', lastname: 'Doe, age: 16}

students.save()