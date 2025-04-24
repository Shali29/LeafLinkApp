import db from '../config/db.js'; 

class Driver {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Driver', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Driver WHERE D_RegisterID = ?', [id], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  }

  static create(driverData) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Driver (
          D_RegisterID, D_FullName, D_ContactNumber, Email, VehicalNumber, Route, Serial_Code
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        query,
        [
          driverData.D_RegisterID,
          driverData.D_FullName,
          driverData.D_ContactNumber,
          driverData.Email,
          driverData.VehicalNumber,
          driverData.Route,
          driverData.Serial_Code
        ],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static update(id, driverData) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Driver SET 
          D_FullName = ?, 
          D_ContactNumber = ?, 
          Email = ?, 
          VehicalNumber = ?, 
          Route = ?, 
          Serial_Code = ?
        WHERE D_RegisterID = ?
      `;

      db.query(
        query,
        [
          driverData.D_FullName,
          driverData.D_ContactNumber,
          driverData.Email,
          driverData.VehicalNumber,
          driverData.Route,
          driverData.Serial_Code,
          id
        ],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Driver WHERE D_RegisterID = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

export default Driver;
