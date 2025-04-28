import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'abcd1234',   
    database: 'leaflinkapp_db'
});

// Define a testConnection function
export async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully!');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

export default pool;
