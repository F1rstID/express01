const express = require('express');

const Cart = require('../schemas/cart');
const Goods = require('../schemas/goods');

const router = express.Router();

// localhost:3000/api/carts GET Method
router.get('/carts', async (req, res) => {
  const carts = await Cart.find({});
  // [{goodsId, quntity}]
  const goodsIds = carts.map((cart) => cart.goodsId);
  // 배열로 goodsId를 가지고 있음.
  const goods = await Goods.find({ goodsId: goodsIds });
  // Goods에 해당하는 모든 정보를 가지고 온후,
  // 만약 goodsIds 변수 안에 존재하는 값만 조회하라.
  const results = carts.map((cart) => ({
    quantity: cart.quantity,
    goods: goods.find((item) => item.goodsId === cart.goodsId), // 스키마.find와는 다른것
  }));
  res.json({
    carts: results,

  });
});

module.exports = router;
