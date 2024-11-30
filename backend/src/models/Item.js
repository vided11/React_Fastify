import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.TEXT,
    unique: true
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true
  },
  price: DataTypes.FLOAT,
  link: DataTypes.TEXT,
  status: DataTypes.TEXT,
  image_url: DataTypes.TEXT,
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'items',
  timestamps: true
});

export default Item;