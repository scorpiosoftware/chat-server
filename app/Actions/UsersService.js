module.exports = class ItemsService {
  constructor(db) {
    this.db = db; // The knex instance passed from Fastify
  }

  // Create a new item
  async createUser(data) {
    const [newItem] = await this.db('users').insert(data).returning('*');
    return newItem;
  }

  // Read all items
  async getUsers() {
    return this.db('users').select('*');
  }

  // Read a single item by ID
  async getUser(id) {
    return this.db('users').where({ id }).first();
  }

  // Update an item by ID
  async updateUser(id, data) {
    const [updatedItem] = await this.db('users').where({ id }).update(data).returning('*');
    return updatedItem;
  }

  // Delete an item by ID
  async deleteUser(id) {
    const [deletedItem] = await this.db('users').where({ id }).del().returning('*');
    return deletedItem;
  }
}