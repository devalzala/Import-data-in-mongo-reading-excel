var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

if (mongoose.models.products) {
    module.exports = mongoose.model("products")
} else {

    let AttributeSchema = new Schema({
        attrRef: { type: String, index: true, ref: 'product_attributes' },
        name: String,
        type: String,
        value: String,
    })

    let ProductSchema = new Schema({
        uniqueCode: { type: String },
        name: { type: String, trim: true },
        sku: { type: String, trim: true },
        price: { type: String, trim: true },
        unit: { type: String, trim: true },
        images: { type: [String] },
        description: { type: String },
        productCategory: { type: String, index: true, ref: 'product_categories' },
        productCategoryName: { type: String },
        productCategoryPath: { type: String },
        attributes: [AttributeSchema],
        manufacturer: { type: String, index: true, ref: "manufacturers" },
        company: { type: String, index: true, ref: "companies" },
        createdAt: Date,
        createdBy: { type: String, index: true, ref: "users" },
        createdByUserName: { type: String },
        modifiedAt: Date,
        modifiedBy: { type: String, index: true, ref: "users" },
        modifiedByUserName: { type: String },
        createdRef: { type: String, index: true, ref: "users" }, // specially used to identify the original creator of  user
        modifiedRef: { type: String, index: true, ref: "users" }, // specially used to identify the original modifier of  user
    }, { timestamps: { createdAt: "createdAt", updatedAt: "modifiedAt" } })

    // ProductSchema.pre('save', function (next) {
    //     let currentDate = new Date();
    //     this.createdAt = currentDate;
    //     this.modifiedAt = currentDate;
    //     next();
    // })

    // ProductSchema.pre('update', function (next) {
    //     let update = this.getUpdate();
    //     try {
    //         update.$set.modifiedAt = new Date();
    //         this.update(update);
    //         next();
    //     } catch (e) {
    //         throw new Error('Data update error');
    //     }
    // })

    ProductSchema.plugin(mongoosePaginate);
    module.exports = ProductSchema;

}