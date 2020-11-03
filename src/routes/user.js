const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');

//obtener todos los usuarios
router.get('/user',(req,res) => {
    mysqlConnection.query('SELECT * FROM Usuario', (err, rows, fields) => {
        if(!err) {
          res.status(200).json(rows);
        } else {
          console.log(err);
          res.status(409).send({ message: 'Problema al solicitar usuarios.' });
        }
      });  
});

router.get('/user/:id',(req,res) => {
  const { id }=req.params;
  mysqlConnection.query('SELECT * FROM Usuario WHERE id_usuario=?',id, (err, rows, fields) => {
      if(!err) {
        res.status(200).json(rows);
      } else {
        console.log(err);
        res.status(409).send({ message: 'Problema al solicitar usuarios.' });
      }
    });  
});
router.put('/actualizarUsuario/:id',(req,res) => {
  const { id }=req.params;
  const val = [req.body.username,req.body.correo,req.body.contrasenia,req.body.nombre,req.body.apellido,req.body.dpi,req.body.edad,id];
  
  console.log('*****',val);
  mysqlConnection.query("UPDATE Usuario set username=?, correo=?, contrasenia=?,"+
                        "nombre=?, apellido=?, dpi=?, edad=? WHERE id_usuario=?",val, (err, rows, fields) => {
      if(!err) {
        res.status(200).json(rows);
      } else {
        console.log(err);
        res.status(409).send({ message: 'Problema al actualizar usuario.' });
      }
    });  
});


//ingresar usuario
router.post('/user', (req, res) => {
    const { username,correo, contrasenia,nombre,apellido,dpi,edad,id_tipousuario} = req.body;
    const val=[ username,correo, contrasenia,nombre,apellido,dpi,edad,id_tipousuario];
    console.log(val);
    const query = `INSERT INTO Usuario(username, correo, contrasenia,nombre,apellido,dpi,edad,id_tipousuario) VALUES (?,?,?,?,?,?,?,?)`;
    
    mysqlConnection.query(query, val, (err, rows, fields) => {
      if(!err) {
        res.status(200).json({status: 'Usuario guardado'});
      } else {
        console.log(err);
        res.status(409).send({ message: 'Problema al registrarse.' });
      }
    });
  
  });


//login res.status(200).send({ dataU });
router.post('/login', (req, res) => {
    const { correo, contrasenia} = req.body;
    const val=[ correo, contrasenia];
    console.log(val);
    const query = `SELECT * FROM Usuario WHERE correo = ? AND contrasenia=?`;
    
    mysqlConnection.query(query, val, (err, rows, fields) => {
      if(!err) {
        const usuario=rows[0];
        console.log('**',usuario);
        if(usuario==undefined){            
            res.status(409).send({ message: 'Error al ingresar credenciales.' });
        }
        res.status(200).json(usuario);
      } else {
        console.log(err);
        res.status(409).send({ message: 'Problemas al iniciar sesión.' });
      }
    });
});


router.get('/catalogo',(req,res) => {
  const { id }=req.params;
  mysqlConnection.query('SELECT * FROM TipoGiftcard',id, (err, rows, fields) => {
      if(!err) {
        res.status(200).json(rows);
      } else {
        console.log(err);
        res.status(409).send({ message: 'Problema al solicitar catalogo.' });
      }
    });  
});

router.get('/detallecompras',(req,res) => {
  const { id }=req.params;
  mysqlConnection.query('SELECT * FROM DetalleFactura inner join Factura on DetalleFactura.id_factura=Factura.id_factura inner join Usuario on Factura.id_usuario=Usuario.id_usuario inner join Giftcard on DetalleFactura.id_giftcard=Giftcard.id_giftcard inner join TipoGiftcard on Giftcard.id_tipogiftcard = TipoGiftcard.id_tipogiftcard',id, (err, rows, fields) => {
      if(!err) {
        res.status(200).json(rows);
      } else {
        console.log(err);
        res.status(409).send({ message: 'Problema al solicitar detalles de compras.' });
      }
    });  
});

module.exports = router;