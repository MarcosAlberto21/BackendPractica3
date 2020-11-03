const e = require('express');
const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');
const {generarAlfanumerico}  = require('../utils');
const giftcardService  = require('../services/giftcard');

//obtener todos los usuarios
router.post('/giftcard/historial', async (req,res) => {
    let idusuario = req.body.idusuario.id_usuario;
    let items = req.body.items;
    let pago = req.body.pago;
    console.log("idusuario",idusuario);
    console.log("items",items);
    console.log("pago",pago);

    let result = [];
    try{
      //Obtener todos los tipos giftcard existentes
      let tipogiftcards = await giftcardService.getTiposGiftCard();
      console.log("tipogiftcards",tipogiftcards);
      //Recorrer items comprados y verificar si ya existen en base de datos
      const asyncRes = await Promise.all(items.map(async (obj)=>{
        let existe = tipogiftcards.filter((tipo)=>tipo.id_tipogiftcard==obj.giftcard.id);
        console.log("existe",existe);
        if(!existe.length>0){
          //Si no existe crear tipo giftcard
          let valuesTipoGiftcard = [obj.giftcard.id,  obj.giftcard.name, obj.giftcard.image, obj.giftcard.chargeRate, obj.giftcard.active];
          let newtipogiftcard = await giftcardService.insertTiposGiftCard(valuesTipoGiftcard);
          console.log("newtipogiftcard",newtipogiftcard);
          if(!!newtipogiftcard){
            //Al crear nuevo tipo giftcard
              //Crear valor si no existe
              let valores = await giftcardService.getValores();
              console.log("valores",valores);
              let existeValor = valores.filter((valor)=>valor.id_valor==obj.giftcardValue.id);
              console.log("existeValor",existeValor);
              if(!existeValor.length>0){
                let valuesValor = [obj.giftcardValue.id, obj.giftcardValue.total];
                let newValor= await giftcardService.insertValor(valuesValor);
                console.log("newValor",newValor);
              }

            //Crear tipo giftcard valor
            let valuesGiftcardValor = [obj.giftcard.id,  obj.giftcardValue.id];
            let giftcardValor = await giftcardService.insertGiftCardValor(valuesGiftcardValor);
            console.log("giftcardValor",giftcardValor);

            if(!!giftcardValor){
              //Asociar tipo giftcard a usuario
              var id = generarAlfanumerico();
              let valuesGiftcard = [id, obj.giftcard.id,  obj.giftcardValue.id, idusuario];
              let newgiftcard = await giftcardService.insertGiftCard(valuesGiftcard);
              console.log("newgiftcard",newgiftcard);
              return obj;
            }else{
              throw new Error("No insertGiftCardValor")
            }
          }else{
            throw new Error("No insertTiposGiftCard")
          }
        }else{
          //Actualizar valores de tipoGiftcard
          let valuesTipoGiftcard = [obj.giftcard.name, obj.giftcard.image, obj.giftcard.chargeRate, obj.giftcard.active, obj.giftcard.id];
          let newtipogiftcard = await giftcardService.updateTiposGiftCard(valuesTipoGiftcard);
          console.log("newtipogiftcard",newtipogiftcard);

          //Crear valor si no existe
          let valores = await giftcardService.getValores();
          console.log("valores1",valores);
          let existeValor = valores.filter((valor)=>valor.id_valor==obj.giftcardValue.id);
          console.log("existeValor1",existeValor);
          if(!existeValor.length>0){
            let valuesValor = [obj.giftcardValue.id, obj.giftcardValue.total];
            let newValor= await giftcardService.insertValor(valuesValor);
            console.log("newValor1",newValor);

            //Crear tipo giftcard valor
            let valuesGiftcardValor = [obj.giftcard.id,  obj.giftcardValue.id];
            let giftcardValor = await giftcardService.insertGiftCardValor(valuesGiftcardValor);
            console.log("giftcardValor1",giftcardValor);
          }

          var id = generarAlfanumerico();
          let valuesGiftcard = [id, obj.giftcard.id,  obj.giftcardValue.id, idusuario];
          let newgiftcard = await giftcardService.insertGiftCard(valuesGiftcard);
          console.log("newgiftcard1",newgiftcard);
          return obj;
        }
      }));
      res.status(200).send({ message: 'ok', data: items});
    }catch(e){
      res.status(500).send({ message: 'Problema al guardar historial.', data: e});
    }    
});


module.exports = router;