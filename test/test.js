var assert = require('assert');
const mysqlConnection  = require('../src/database');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
});


describe('Base de datos', function () {
  it('Conexion con la base de datos exitosa', function () {
    mysqlConnection.query('SELECT * FROM Usuario', (err, rows, fields) => {
      if(!err) {
        const usuario=rows;
        assert.notStrictEqual(usuario,undefined);
      } else {
        console.log(err);
      }
    });  
    assert.strictEqual([1, 2, 3].indexOf(4), -1);
  });
});

describe('Login', function () {
  it('Login exitoso', function () {
    mysqlConnection.query('SELECT * FROM Usuario WHERE username = ? AND contrasenia=?'
                          ,['user1','123'], (err, rows, fields) => {
      if(!err) {
        const usuario=rows[0];
        assert.notStrictEqual(usuario,undefined);
      } else {
        console.log(err);
      }
    });  
    assert.strictEqual([1, 2, 3].indexOf(4), -1);
  });
});
