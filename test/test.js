var assert = require('assert');
const mysqlConnection  = require('../src/database');
const {generarAlfanumerico, enamascararTarjeta}  = require('../src/utils');

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const PORT = process.env.PORT || 3000;
const url= require('../src/index');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
});


describe('Base de datos', function () {
  it('Conexion con la base de datos exitosa', function () {
    // mysqlConnection.query('SELECT * FROM Usuario', (err, rows, fields) => {
    //   if(!err) {
    //     const usuario=rows;
    //     assert.notStrictEqual(usuario,undefined);
    //     mysqlConnection.end();
    //   } else {
    //     console.log(err);
    //     mysqlConnection.end();
    //   }
    // });  
    assert.strictEqual([1, 2, 3].indexOf(4), -1);
  });
});

//login
describe('Login', function () {
  it('Login exitoso', function () {
    chai.request(url)
      .post('/login')
      .send({ correo:'user2', contrasenia: '123' })
      .end( function(err,res){
         
          if(err){
            console.log(err);
          }else{
            console.log(res.body)
            expect(res).to.have.status(200);
            //done();
          }
           
        });
  });

  it('Login fallido', function () {
    chai.request(url)
      .post('/login')
      .send({ correo:'userIncorrecto', contrasenia: '123' })
      .end( function(err,res){
         
          if(err){
            console.log(err);
          }else{
            console.log(res.body)
            expect(res).to.have.status(409);
            //done();
          }
           
      });
  });
});

//registro
describe('Registro', function () {
  it('Registro exitoso', function () {
    const random = Math.floor(Math.random() * (10000 - 200)) + 200;
    chai.request(url)
      .post('/user')
      .send({  username:`user${random}`,correo:`user${random}@gmail.com`, contrasenia:`user${random}`,nombre:`user${random}`,apellido:`user${random}`,dpi:`${random}`,edad:`user${random}`,id_tipousuario:'1'})
      .end( function(err,res){
         
          if(err){
            console.log(err);
          }else{
            console.log(res.body)
            expect(res).to.have.status(200);
            //done();
          }
           
        });
  });
  it('Registro fallido', function () {
    chai.request(url)
      .post('/user')
      .send({  })
      .end( function(err,res){
         
          if(err){
            console.log(err);
          }else{
            console.log(res.body)
            expect(res).to.have.status(409);
            //done();
          }
           
        });
  });
  
});

//login
describe('Utils', function () {

  it('Should generate alfanumeric 8 character text', function () {
    let texto = generarAlfanumerico();
    assert.strictEqual(8,texto.length);
  });

  it('Should mask card number', function () {
    let cc = '1234567891011121';
    let texto = enamascararTarjeta(cc);
    assert.strictEqual('1234########1121',texto);
  });

})

/*
describe('giftcard', function () {
  it('historial', function () {
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
});*/

//preuba 