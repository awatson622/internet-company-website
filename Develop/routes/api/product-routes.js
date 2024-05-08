const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // find all products
    // be sure to include its associated Category and Tag data
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
    const newProduct = await Product.create(req.body);

    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    const [affectedRows] = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (affectedRows > 0 && req.body.tagIds && req.body.tagIds.length) {
      // Update product tags
      await ProductTag.destroy({ where: { product_id: req.params.id } });

      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete one product by its `id` value
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

