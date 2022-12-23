const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true, // 존재 해야함
    unique: true, // 유일성
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model('Goods', goodsSchema);
