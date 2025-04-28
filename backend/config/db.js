import mysql from 'mysql2/promise';

const dbURI = 'mysql://root:abcd1234@127.0.0.1:3306/leaflinkapp_db';

const pool = mysql.createPool(dbURI);

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
