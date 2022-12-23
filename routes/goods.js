const express = require('express');
const Cart = require('../schemas/cart');
const Goods = require('../schemas/goods');

const router = express.Router();

router.post('/goods', async (req, res) => {
  const {
    goodsId, name, thumbnailUrl, category, price,
  } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: '이미 있는 데이터입니다.' });
  }

  const createdGoods = await Goods.create({
    goodsId, name, thumbnailUrl, category, price,
  });

  return res.json({ goods: createdGoods });
});

router.post('/goods/:goodsId/cart', async (req, res) => {
  // const goodsId = req.params.goodsId;
  // const quantity = req.body.quantity;
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false, errorMesaage: '이미 장바구니에 해당하는 상품이 존재합니다.',
    });
  }

  await Cart.create({ goodsId, quantity });

  return res.json({ result: 'success' });
});

router.put('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });

  if (existsCarts.length) {
    await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
  }
  res.status(200).json({ success: true });
});

router.delete('/goods/:goodsId/cart', async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });

  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId });
  }

  res.status(200).json({ result: 'success' });
});

module.exports = router;
