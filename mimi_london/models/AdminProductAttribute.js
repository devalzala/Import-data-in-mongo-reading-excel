const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * AdminProductAttribute schema
 * @module AdminProductAttribute
 *
 */

if (mongoose.models.admin_product_attributes) {
    module.exports = mongoose.model('admin_product_attributes');
} else {

    const AdminProductAttributeSchema = new mongoose.Schema({
        name: { type: String, trim: true },
        type: { type: String, enum: ['text'] },
        createdAt: Date,
        createdBy: String,
        createdByUserName: String,
        modifiedAt: Date,
        modifiedBy: String,
        modifiedByUserName: String,
        createdRef: String, // specially used to identify the original creator of  user
        modifiedRef: String, // specially used to identify the original modifier of  user
    }, { timestamps: { createdAt: "createdAt", updatedAt: "modifiedAt" } });

    // AdminProductAttributeSchema.pre('save', function (next) {
    //   let currentDate = Date.now();
    //   this.createdAt = currentDate;
    //   this.modifiedAt = currentDate;
    //   next();
    // });

    // AdminProductAttributeSchema.pre('update', function (next) {
    //   let update = this.getUpdate();
    //   try {
    //     update.$set.modifiedAt = new Date();
    //     this.update(update);
    //     next();
    //   } catch (e) {
    //     throw new Error('Data update error');
    //   }
    // });

    // AdminProductAttributeSchema.pre('updateOne', function (next) {
    //   let update = this.getUpdate();
    //   try {
    //     update.$set.modifiedAt = new Date();
    //     this.update(update);
    //     next();
    //   } catch (e) {
    //     throw new Error('Data update error');
    //   }
    // });

    AdminProductAttributeSchema.plugin(mongoosePaginate);
    module.exports = mongoose.model('admin_product_attributes', AdminProductAttributeSchema);
}