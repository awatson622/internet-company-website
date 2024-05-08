const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    // be sure to include its associated Product data
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new tag
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const [affectedRows] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Tag updated successfully' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete one tag by its `id` value
    const deletedRowCount = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedRowCount > 0) {
      res.status(200).json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

