const XLSX = require('xlsx');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://poly9:Q5yPne8Jtewrw8jg@productiondbserver.wwjuyjh.mongodb.net/testing?retryWrites=true&w=majority';
const dbName = 'testing';
const collectionName = 'products_mimi_london';
const filePath = 'Mimi London_web.xlsx';

// Read the xlsx file
const workbook = XLSX.readFile(filePath);

console.log(workbook, "workbook")

const sheet = workbook.Sheets[workbook.SheetNames[0]];

console.log(sheet, "sheet")

const rows = XLSX.utils.sheet_to_json(sheet);

console.log(rows, "rows")

// Connect to MongoDB and insert the data
MongoClient.connect(url, function (err, client) {

    console.log("inside function");

    if (err) throw err;

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.insertMany(rows, function (err, result) {
        if (err) throw err;

        console.log(`Inserted ${result.insertedCount} rows into ${collectionName} collection`);
        client.close();
    });
});