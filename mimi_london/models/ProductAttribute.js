const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * ProductAttribute schema
 * @module ProductAttribute
 *
 */

if (mongoose.models.product_attributes) {
    module.exports = mongoose.model('product_attributes');
} else {

    const ProductAttributeSchema = new mongoose.Schema({
        name: { type: String, trim: true },
        type: { type: String, enum: ['text'] },
        company: { type: String, index: true, ref: 'companies' },
        adminProductAttributeRef: { type: String, index: true, ref: 'admin_product_attributes' },
        createdAt: Date,
        createdBy: String,
        createdByUserName: String,
        modifiedAt: Date,
        modifiedBy: String,
        modifiedByUserName: String,
        createdRef: String, // specially used to identify the original creator of  user
        modifiedRef: String, // specially used to identify the original modifier of  user
    }, { timestamps: { createdAt: "createdAt", updatedAt: "modifiedAt" } });

    // ProductAttributeSchema.pre('save', function (next) {
    //   let currentDate = Date.now();
    //   this.createdAt = currentDate;
    //   this.modifiedAt = currentDate;
    //   next();
    // });

    // ProductAttributeSchema.pre('update', function (next) {
    //   let update = this.getUpdate();
    //   try {
    //     update.$set.modifiedAt = new Date();
    //     this.update(update);
    //     next();
    //   } catch (e) {
    //     throw new Error('Data update error');
    //   }
    // });

    // ProductAttributeSchema.pre('updateOne', function (next) {
    //   let update = this.getUpdate();
    //   try {
    //     update.$set.modifiedAt = new Date();
    //     this.update(update);
    //     next();
    //   } catch (e) {
    //     throw new Error('Data update error');
    //   }
    // });

    ProductAttributeSchema.plugin(mongoosePaginate);
    module.exports = mongoose.model('product_attributes', ProductAttributeSchema);
}