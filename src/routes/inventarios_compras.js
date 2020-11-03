const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');



router.get('/detallecomprasporusuario/:correo',(req,res) => {
    const { correo }=req.params;
    mysqlConnection.query('SELECT * FROM DetalleFactura inner join Factura on DetalleFactura.id_factura=Factura.id_factura inner join Usuario on Factura.id_usuario=Usuario.id_usuario inner join Giftcard on DetalleFactura.id_giftcard=Giftcard.id_giftcard inner join TipoGiftcard on Giftcard.id_tipogiftcard = TipoGiftcard.id_tipogiftcard where Usuario.correo=\''+correo+"\'",correo, (err, rows, fields) => {
        if(!err) {
          res.status(200).json(rows);
        } else {
          console.log(err);
          res.status(409).send({ message: 'Problema al solicitar detalles de compras.' });
        }
      });  
  });


  router.get('/detalletransacciones/:correo',(req,res) => {
    const { correo }=req.params;
    mysqlConnection.query('SELECT * FROM DetalleFactura inner join Factura on DetalleFactura.id_factura=Factura.id_factura inner join Usuario on Factura.id_usuario=Usuario.id_usuario inner join Giftcard on DetalleFactura.id_giftcard=Giftcard.id_giftcard inner join TipoGiftcard on Giftcard.id_tipogiftcard = TipoGiftcard.id_tipogiftcard inner join TarjetaCredito on Factura.id_tarjeta=TarjetaCredito.id_tarjeta where Usuario.correo=\''+correo+"\'",correo, (err, rows, fields) => {
        if(!err) {
          res.status(200).json(rows);
        } else {
          console.log(err);
          res.status(409).send({ message: 'Problema al solicitar detalles de compras.' });
        }
      });  
  });

module.exports = router;