var mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

var CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
      required: true,
    },
    businessId: { type: ObjectId, ref: "businesss", default: null },
    // subCategoryId : [{type : ObjectId, ref : 'subCategory',default: null}],
  },
  { usePushEach: true }
);

var Category = mongoose.model("category", CategorySchema);

module.exports = Category;
