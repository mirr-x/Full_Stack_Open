const mongoose = require('mongoose')

if (1 >= process.argv.length > 3) {
    console.log('Invalid Number of Arguments')
    process.exit(1)
}

const argv = process.argv
const password = argv[0]
console.log(password)