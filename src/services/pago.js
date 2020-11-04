
const mysqlConnection  = require('../database.js');

module.exports = {
    getTarjetaCredito: async (no_tarjeta)=>{
        try{
            let tarjeta = new Promise((resolved, rejected)=>{
                mysqlConnection.query(`SELECT * FROM TarjetaCredito ${!!no_tarjeta? 'WHERE no_tarjeta = '+no_tarjeta :''}`, (err, rows, fields) => {
                    if(!err) {
                        resolved(rows)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await tarjeta;
        }catch(e){
            console.log("Error getTarjetaCredito", e);
            throw new Error(e);
        }
    },
    insertTarjetaCredito: async (valuesTarjetaCredito)=>{
        try{
            let tarjetaCredito = new Promise((resolved, rejected)=>{
                mysqlConnection.query('Insert into TarjetaCredito (no_tarjeta, fecha_expiracion, cvv) values (?,?,?)', valuesTarjetaCredito, (err, rows, fields) => {

                    if(!err) {
                        resolved(rows)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await tarjetaCredito;
        }catch(e){
            console.log("Error insertTarjetaCredito", e);
            throw new Error(e);
        }
    },
    insertFactura: async (valuesFactura)=>{
        try{
            let factura = new Promise((resolved, rejected)=>{
                mysqlConnection.query('Insert into Factura (fecha, id_usuario, id_tarjeta) values (?,?,?)', valuesFactura, (err, rows, fields) => {

                    if(!err) {
                        resolved(rows)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await factura;
        }catch(e){
            console.log("Error insertFactura", e);
            throw new Error(e);
        }
    },
    insertDetalleFactura: async (valuesDetalleFactura)=>{
        try{
            let factura = new Promise((resolved, rejected)=>{
                mysqlConnection.query('Insert into DetalleFactura (id_factura, id_giftcard) values (?,?)', valuesDetalleFactura, (err, rows, fields) => {

                    if(!err) {
                        resolved(rows)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await factura;
        }catch(e){
            console.log("Error insertDetalleFactura", e);
            throw new Error(e);
        }
    },
    updateTiposGiftCard: async (valuesTipoGiftcard)=>{
        try{
            let tiposGiftCard = new Promise((resolved, rejected)=>{
                mysqlConnection.query('Update TipoGiftcard set nombre = ?, imagen = ?, chargerate = ?, active = ? where id_tipogiftcard = ?', valuesTipoGiftcard, (err, newtipogiftcard, fields) => {
                    if(!err) {
                        resolved(newtipogiftcard)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await tiposGiftCard;
        }catch(e){
            console.log("Error updateTiposGiftCard", e);
            throw new Error(e);
        }
    }
}