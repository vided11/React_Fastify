import {createItem, deleteItem, getItem, getItems, getMaxId, updateItem} from '../services/ItemService.js';

async function itemRoutes(fastify, options) {
    fastify.get('/items', async (request, reply) => {
        try {
            const items = await getItems();
            if (request.query.name) {
                return items.filter(item =>
                    item.name.toLowerCase() === request.query.name.toLowerCase()
                );
            }
            return items;
        } catch (error) {
            console.error('Error fetching items:', error);
            reply.code(500);
            return {error: 'Error fetching items'};
        }
    });

    fastify.get('/items/:id', async (request, reply) => {
        try {
            const item = await getItem(request.params.id);
            if (item) {
                return item;
            }
            reply.code(404);
            return {error: 'Item not found'};
        } catch (error) {
            console.error('Error fetching item:', error);
            reply.code(500);
            return {error: 'Error fetching item'};
        }
    });

    fastify.post('/items', async (request, reply) => {
        try {
            const {name, price, status, link} = request.body;

            const existingItems = await getItems();
            const nameExists = existingItems.some(item =>
                item.name.toLowerCase() === name.toLowerCase()
            );

            if (nameExists) {
                reply.code(400);
                return {error: 'An item with this name already exists'};
            }

            const maxId = await getMaxId();
            const newId = maxId + 1;

            const newItem = await createItem({id: newId, name, price, status, link});
            reply.code(201);
            return newItem;
        } catch (error) {
            console.error('Error creating item:', error);
            reply.code(500);
            return {error: 'Error creating item'};
        }
    });

    fastify.put('/items/:id', async (request, reply) => {
        try {
            const {id} = request.params;
            const updateData = request.body;

            console.log('Updating item:', id, updateData); // Add this log

            const updatedItem = await updateItem(id, updateData);

            if (updatedItem) {
                return updatedItem;
            } else {
                reply.code(204);
            }
        } catch (error) {
            console.error('Error updating item:', error);
            reply.code(500);
            return {error: 'Error updating item'};
        }
    });

    fastify.delete('/items/:id', async (request, reply) => {
        try {
            const deleted = await deleteItem(request.params.id);
            if (deleted) {
                reply.code(204);
                return;
            }
            reply.code(404);
            return {error: 'Item not found'};
        } catch (error) {
            console.error('Error deleting item:', error);
            reply.code(500);
            return {error: 'Error deleting item'};
        }
    });
}

export default itemRoutes;