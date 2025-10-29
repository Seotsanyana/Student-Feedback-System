import fs from 'fs';
import path from 'path';

const DB_PATH = './feedback.json';

// Initialize database file if it doesn't exist
export async function initDatabase() {
    try {
        if (!fs.existsSync(DB_PATH)) {
            fs.writeFileSync(DB_PATH, JSON.stringify([]));
            console.log('Database initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// Read all feedback from JSON file
export async function dbAll(query: string): Promise<any[]> {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        throw error;
    }
}

// Get a single feedback item
export async function dbGet(query: string, id: string): Promise<any> {
    try {
        const data = await dbAll('');
        const item = data.find((item: any) => item.id === parseInt(id));
        return item || null;
    } catch (error) {
        console.error('Error getting item:', error);
        throw error;
    }
}

// Insert a new feedback item
export async function dbRun(query: string, ...params: any[]): Promise<any> {
    try {
        const data = await dbAll('');
        const newItem = {
            id: Date.now(), // Simple ID generation
            studentName: params[0],
            courseCode: params[1],
            comments: params[2],
            rating: params[3],
            createdAt: new Date().toISOString(),
        };
        data.push(newItem);
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        return { lastID: newItem.id, changes: 1 };
    } catch (error) {
        console.error('Error inserting item:', error);
        throw error;
    }
}

// Delete a feedback item
export async function dbDelete(id: string): Promise<boolean> {
    try {
        const data = await dbAll('');
        const index = data.findIndex((item: any) => item.id === parseInt(id));
        if (index !== -1) {
            data.splice(index, 1);
            fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}
