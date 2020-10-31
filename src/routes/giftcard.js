const e = require('express');
const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');

var insertTipoGriftcard = (tipogiftcard) => {
  let values = [id_tipogiftcard,  nombre, image, chargerate, active];
  mysqlConnection.query('Insert into TipoGiftcard values (?,?,?,?,?)', values, (err, tipogiftcards, fields) => {
    if(!err) {
      //
    } else {
      console.log(err);
      res.status(409).send({ message: 'Problema al guardar TipoGiftcards.' });
    }
  });  
}

//obtener todos los usuarios
router.post('/giftcard/historial',(req,res) => {
    let idusuario = req.body.idusuario.id_usuario;
    let items = req.body.items;
    console.log("idusuario",idusuario);
    console.log("items",items);
    mysqlConnection.query('SELECT * FROM TipoGiftcard', (err, tipogiftcards, fields) => {

        console.log("err",err);
        console.log("tipogiftcards",tipogiftcards);
        if(!err) {
          items.map((obj)=>{
            let existe = tipogiftcards.filter((tipo)=>tipo.id_tipogiftcard==obj.giftcard.id);
            if(!existe){
              let valuesTipoGiftcard = [obj.giftcard.id,  obj.giftcard.name, obj.giftcard.image, obj.giftcard.chargeRate, obj.giftcard.active];
              mysqlConnection.query('Insert into TipoGiftcard (id_tipogiftcard,nombre, image, chargerate, active) values (?,?,?,?,?)', valuesTipoGiftcard, (err, newtipogiftcard, fields) => {
                console.log("err",err);
                console.log("newtipogiftcard",newtipogiftcard);
                if(!err) {
                  var crypto = require("crypto");
                  var id = crypto.randomBytes(8).toString('hex');
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
              var crypto = require("crypto");
              var id = crypto.randomBytes(8).toString('hex');
              let valuesGiftcard = [id, obj.giftcard.id,  obj.giftcardValue.id, idusuario];
              mysqlConnection.query('Insert into Giftcard (id_giftcard,id_tipogiftcard,id_valor,id_usuario) values (?,?,?,?)', valuesGiftcard, (err, newgiftcard, fields) => {
                console.log("err1",err);
                console.log("newtipogiftcard1",newgiftcard);
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