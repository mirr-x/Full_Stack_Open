const mongoose = require('mongoose')

function add_new_user_to_db(name_, number_, PhoneBookModel) {
    const phoneBook = new PhoneBookModel({
        name: name_,
        number: number_
    })
    phoneBook.save()
        .then((ruselt) => {
            console.log(ruselt)
            console.log(`✅ added ${name_} number ${number_} to phonebook`)
        })
        .catch((err) => {
            console.error(`❌ Failed of adding new Document: ${err.message}`);
            process.exit(1);
        })
        .finally(() => {
            mongoose.connection.close()
        })
}

function display_all_db(PhoneBookModel) {
    PhoneBookModel.find({})
        .then((rus) => {
            console.log(rus)
            console.log(`✅ Dispaly full phonebook`)
        })
        .catch((err) => {
            console.error(`❌ Failed of adding new Document: ${err.message}`);
            process.exit(1);
        })
        .finally(() => {
            mongoose.connection.close()
        })
}

const argv = process.argv

if (argv.length === 3 || argv.length == 5) {
    const password = argv[2]
    const URI_STRING = `mongodb+srv://open_full_stack:${password}@cluster0.1ftmfcd.mongodb.net/?appName=Cluster0`

    const name = argv[3]
    const number = argv[4]

    mongoose.connect(URI_STRING, { family: 4 })
        .then(() => {
            console.log('✅ Connected to MongoDB')
        })
        .catch((err) => {
            const cleanMessage = err.message;
            console.error(`❌ Connection Failed of auth: ${cleanMessage}`);
            process.exit(1);
        });
    const phoneBookSchema = new mongoose.Schema({
        name: String,
        number: String
    })
    const PhoneBookModel = mongoose.model('PhoneBook', phoneBookSchema)
    if (argv.length == 5) {
        add_new_user_to_db(name, number, PhoneBookModel);
    } else if (argv.length == 3) {
        console.log('only password provided, fetching all users from phonebook');
    }
} else {
    console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>')
}
