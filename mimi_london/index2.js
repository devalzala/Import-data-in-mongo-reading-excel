const mongoose = require('mongoose');
const xlsx = require('xlsx');
const fs = require('fs');

// Connect to MongoDB
mongoose.connect('mongodb+srv://poly9:Q5yPne8Jtewrw8jg@productiondbserver.wwjuyjh.mongodb.net/production?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

let AttributeSchema = new mongoose.Schema({
    attrRef: { type: String, index: true },
    name: String,
    type: String,
    value: String,
})

// Define schema
const productSchema = new mongoose.Schema({
    uniqueCode: { type: String },
    name: { type: String, trim: true },
    sku: { type: String, trim: true },
    price: { type: String, trim: true },
    images: { type: [String] },
    description: { type: String },
    attributes: [AttributeSchema],
    manufacturer: { type: String, index: true },
    company: { type: String, index: true },
    createdAt: Date,
    createdBy: { type: String, index: true, ref: "users" },
    createdByUserName: { type: String },
    modifiedAt: Date,
    modifiedBy: { type: String, index: true, ref: "users" },
    modifiedByUserName: { type: String },
    createdRef: { type: String, index: true, ref: "users" }, // specially used to identify the original creator of  user
    modifiedRef: { type: String, index: true, ref: "users" }, // specially used to identify the original modifier of  user
    productCategory: { type: String, index: true },
    productCategoryName: { type: String },
});

// Define model
const Product = mongoose.model('products', productSchema);

// Load data from xlsx file
const workbook = xlsx.readFile('Mimi London_web.xlsx');
const sheetName = workbook.SheetNames[0];
const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Map data to schema fields
const mappedData = sheetData.map((data, item) => {

    console.log(data, "Excel Data")

    const date = new Date()
    item++ // for uniquecode to start from 1

    // let obj;

    // if (data["Product Name"].includes("Chair")) {
    //     obj = "Pcs"
    // } else if (data["Product Name"].includes("Lounge")) {
    //     obj = "Pcs"
    // }

    return ({
        uniqueCode: `P${item}`,
        name: data["Product Name"],
        sku: data.SKU,
        description: data.DESCRIPTION,
        attributes: [
            { attrRef: "6461ff720c2460d36b8f3479", name: 'Width', type: 'text', value: data.Width },
            { attrRef: "6461ff7a0c2460d36b8f3482", name: 'Depth', type: 'text', value: data.Depth },
            { attrRef: "6461ff820c2460d36b8f348b", name: 'Height', type: 'text', value: data.Height },
            { attrRef: "6461ff890c2460d36b8f3494", name: 'Length', type: 'text', value: data.Length },
            { attrRef: "6461ff8f0c2460d36b8f349d", name: 'Diameter', type: 'text', value: data.Diameter },
            { attrRef: "6461ff970c2460d36b8f34a6", name: 'Pdf_Link', type: 'text', value: data.Pdf_Link },
            { attrRef: "64622183e52026ff32f44312", name: 'Page_URL', type: 'text', value: data.Page_URL },
        ],
        manufacturer: "64618ac378e6603c00d8e99a",
        company: "6442f3e2e506034c603a9ee9",
        createdAt: date,
        createdBy: "630e29a492fd71b7e0f4b133",
        createdByUserName: "Brian MacLaggan",
        modifiedAt: date,
        modifiedBy: "630e29a492fd71b7e0f4b133",
        modifiedByUserName: "Brian MacLaggan",
        createdRef: "630e29a492fd71b7e0f4b133",
        price: "",
        productCategory: "",
        productCategoryName: ""
    })
});

// Insert data into MongoDB
Product.insertMany(mappedData)
    .then(function () {
        console.log("Successfully saved products to DB");
    })
    .catch(function (err) {
        console.log(err);
    });
