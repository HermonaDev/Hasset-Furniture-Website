const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    
    // Find the index of the cart item to be removed
    const itemIndex = cart.products.findIndex(product => product.productId === req.body.productId);

    if (itemIndex !== -1) {
      // Remove the cart item from the products array using its index
      cart.products.splice(itemIndex, 1);
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.put('/:id', async (req, res) => {
//   // const productId = req.params.id;
//     const updatedCart = await Cart.findOneAndUpdate(
//       req.params.id,
//     { $pull: { products: { productId } } },
//     { new: true }
//   )
//     .then(updatedCart => {
//       if (updatedCart) {
//         res.status(200).json(updatedCart);
//       } else {
//         res.status(404).json({ error: 'Cart item not found' });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET USER CART
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
