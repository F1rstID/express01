const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true, // 존재 해야함
    unique: true, // 유일성
  },
  quantity: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Cart', cartSchema); // DB에 Cart로 저장.
