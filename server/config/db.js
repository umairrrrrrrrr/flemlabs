const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isConnected = false;
let useFallback = false;
const DATA_DIR = path.join(__dirname, '../data');

// Ensure data folder exists for fallback
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read and write fallback files
const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

const readData = (collection) => {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${collection} JSON database file:`, err);
    return [];
  }
};

const writeData = (collection, data) => {
  const filePath = getFilePath(collection);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error(`Error writing ${collection} JSON database file:`, err);
    return false;
  }
};

// Generic JSON-based Model Mock that mimics basic Mongoose methods
class JSONModel {
  constructor(collectionName) {
    this.collection = collectionName;
  }

  async find(query = {}) {
    const records = readData(this.collection);
    return records.filter(item => {
      for (let key in query) {
        if (query[key] !== undefined && item[key] !== query[key]) {
          if (Array.isArray(item[key])) {
            if (!item[key].includes(query[key])) return false;
          } else {
            return false;
          }
        }
      }
      return true;
    });
  }

  async findOne(query = {}) {
    const records = readData(this.collection);
    return records.find(item => {
      for (let key in query) {
        if (query[key] !== undefined && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    }) || null;
  }

  async findById(id) {
    const records = readData(this.collection);
    return records.find(item => item._id === id || item.id === id) || null;
  }

  async create(data) {
    const records = readData(this.collection);
    if (Array.isArray(data)) {
      const newRecords = data.map(item => ({
        _id: Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
        createdAt: new Date().toISOString(),
        ...item
      }));
      records.push(...newRecords);
      writeData(this.collection, records);
      return newRecords;
    } else {
      const newRecord = {
        _id: Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
        createdAt: new Date().toISOString(),
        ...data
      };
      records.push(newRecord);
      writeData(this.collection, records);
      return newRecord;
    }
  }

  async findByIdAndUpdate(id, update, options = { new: true }) {
    const records = readData(this.collection);
    const index = records.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;
    
    const current = records[index];
    const updated = { ...current, ...update };
    
    records[index] = updated;
    writeData(this.collection, records);
    return updated;
  }

  async findByIdAndDelete(id) {
    const records = readData(this.collection);
    const index = records.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;
    const deleted = records.splice(index, 1)[0];
    writeData(this.collection, records);
    return deleted;
  }

  async deleteOne(query = {}) {
    const records = readData(this.collection);
    const index = records.findIndex(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
    if (index === -1) return { deletedCount: 0 };
    records.splice(index, 1);
    writeData(this.collection, records);
    return { deletedCount: 1 };
  }
}

// Connect function
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/flemlabs';
  try {
    mongoose.set('strictQuery', false);
    // Connect with a 3-second timeout so it fails quickly if MongoDB is not installed
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    console.log('MongoDB successfully connected.');
  } catch (err) {
    useFallback = true;
    console.warn('MongoDB connection failed. Activating seamless local JSON database fallback.');
  }
};

// Export active database connection & access helpers
module.exports = {
  connectDB,
  getDBStatus: () => ({ isConnected, useFallback }),
  getModel: (name, schema) => {
    const mongooseModel = mongoose.models[name] || mongoose.model(name, schema);
    const jsonModel = new JSONModel(name.toLowerCase() + 's');

    // Return a ES6 Proxy that resolves the database model dynamically at runtime.
    // This perfectly solves the asynchronous boot issue since useFallback changes after require() runs!
    return new Proxy({}, {
      get: (target, prop) => {
        if (useFallback) {
          if (typeof jsonModel[prop] === 'function') {
            return jsonModel[prop].bind(jsonModel);
          }
          return jsonModel[prop];
        } else {
          if (typeof mongooseModel[prop] === 'function') {
            return mongooseModel[prop].bind(mongooseModel);
          }
          return mongooseModel[prop];
        }
      }
    });
  }
};
