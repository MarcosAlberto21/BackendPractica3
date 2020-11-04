const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');

router.put('/regalarGiftcard',(req, res)=>{

    const val = [req.body.para, req.body.tarjeta]
    //console.log(`UPDATE Giftcard SET id_usuario = ${para} WHERE id_giftcard = ${idTarjeta}`)
    //console.log(req.body)
    mysqlConnection.query(`UPDATE Giftcard SET id_usuario = ? WHERE id_giftcard = ?`, val,
    (err, rows, fields)=>{
        if(!err) {
            res.status(200).send({ code:200, status: 'ok' });
        } else {
            console.log(err);
            res.status(409).send({ message: 'Problema al actualizar usuario.' });
        }
    })
})

router.get('/getOtherUsers/:id',(req, res)=>{
    const { id }=req.params;
    const val = [id]
    mysqlConnection.query(`SELECT us.id_usuario, us.username
                            FROM Usuario AS us
                            WHERE us.id_usuario != ?`, val, 
                            (err, rows, fields)=>{
                                if(!err) {
                                    res.status(200).json(rows);
                                } else {
                                    console.log(err);
                                    res.status(409).send({ message: 'Problema al actualizar usuario.' });
                                }
                            })
})



module.exports = router;