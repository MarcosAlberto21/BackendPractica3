const e = require('express');
const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');
const {generarAlfanumerico}  = require('../utils');

//obtener todos los usuarios
router.post('/giftcard/historial',(req,res) => {
    let idusuario = req.body.idusuario.id_usuario;
    let items = req.body.items;
    let pago = req.body.pago;
    mysqlConnection.query('SELECT * FROM TipoGiftcard', (err, tipogiftcards, fields) => {
        if(!err) {
          items.map((obj)=>{
            let existe = tipogiftcards.filter((tipo)=>tipo.id_tipogiftcard==obj.giftcard.id);
            if(!existe){
              let valuesTipoGiftcard = [obj.giftcard.id,  obj.giftcard.name, obj.giftcard.image, obj.giftcard.chargeRate, obj.giftcard.active];
              mysqlConnection.query('Insert into TipoGiftcard (id_tipogiftcard,nombre, image, chargerate, active) values (?,?,?,?,?)', valuesTipoGiftcard, (err, newtipogiftcard, fields) => {
                if(!err) {
                  var id = generarAlfanumerico();
                  let valuesGiftcard = [id, obj.giftcard.id,  obj.giftcardValue.id, idusuario];
                  mysqlConnection.query('Insert into Giftcard (id_giftcard,id_tipogiftcard,id_valor,id_usuario) values (?,?,?,?)', valuesGiftcard, (err, newgiftcard, fields) => {
                    if(!err) {
                      //exito
                    } else {
                      console.log(err);
                      res.status(409).send({ message: 'Problema al guardar Giftcard.' });
                    }
                  });  
                } else {
                  console.log(err);
                  res.status(409).send({ message: 'Problema al guardar TipoGiftcards.' });
                }
              });  
            }else{
              var id = generarAlfanumerico();
              let valuesGiftcard = [id, obj.giftcard.id,  obj.giftcardValue.id, idusuario];
              mysqlConnection.query('Insert into Giftcard (id_giftcard,id_tipogiftcard,id_valor,id_usuario) values (?,?,?,?)', valuesGiftcard, (err, newgiftcard, fields) => {
                if(!err) {
                  //exito
                } else {
                  console.log(err);
                  res.status(409).send({ message: 'Problema al guardar Giftcard.' });
                }
              });  
            }
          });
          res.status(200).json({status: 'ok'});
        } else {
          console.log(err);
          res.status(409).send({ message: 'Problema al obtener TipoGiftcards.' });
        }
    });  
});


module.exports = router;