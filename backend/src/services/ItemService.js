import { models } from '../models/Index.js';

const { Item } = models;

const getItems = async () => {
  return await Item.findAll();
};

export const getMaxId = async () => {
  const items = await getItems();
  if (items.length === 0) {
    return 0;
  }
  return Math.max(...items.map(item => item.id));
};

const getItem = async (id) => {
  return await Item.findByPk(id);
};

const createItem = async (item) => {
  return await Item.create(item);
};

const updateItem = async (id, item) => {
  const [updatedItems] = await Item.update(item, {
    where: { id },
    returning: true,
  });
  console.log(updatedItems)
  return updatedItems[0];
};

const deleteItem = async (id) => {
  const deletedRowsCount = await Item.destroy({
    where: { id },
  });
  return deletedRowsCount > 0;
};

export {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
};