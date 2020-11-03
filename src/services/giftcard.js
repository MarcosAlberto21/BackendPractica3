
const mysqlConnection  = require('../database.js');

module.exports = {
    getTiposGiftCard: async ()=>{
        try{
            let tiposGiftCard = new Promise((resolved, rejected)=>{
                mysqlConnection.query('SELECT * FROM TipoGiftcard', (err, tipogiftcards, fields) => {
                    if(!err) {
                        resolved(tipogiftcards)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await tiposGiftCard;
        }catch(e){
            console.log("Error getTiposGiftCard", e);
            throw new Error(e);
        }
    },
    insertTiposGiftCard: async (valuesTipoGiftcard)=>{
        try{
            let tiposGiftCard = new Promise((resolved, rejected)=>{
                mysqlConnection.query('Insert into TipoGiftcard (id_tipogiftcard,nombre, imagen, chargerate, active) values (?,?,?,?,?)', valuesTipoGiftcard, (err, newtipogiftcard, fields) => {
                    if(!err) {
                        resolved(newtipogiftcard)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await tiposGiftCard;
        }catch(e){
            console.log("Error insertTiposGiftCard", e);
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
    },
    insertGiftCard: async (valuesGiftcard)=>{
        try{
            let giftCard = new Promise((resolved, rejected)=>{
                mysqlConnection.query('Insert into Giftcard (id_giftcard,id_tipogiftcard,id_valor,id_usuario) values (?,?,?,?)', valuesGiftcard, (err, newgiftcard, fields) => {
                    if(!err) {
                        resolved(newgiftcard)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await giftCard;
        }catch(e){
            console.log("Error insertGiftCard", e);
            throw new Error(e);
        }
    },
    getGiftCardValor: async (id_tipogiftcard)=>{
        try{
            let giftCardvalores = new Promise((resolved, rejected)=>{
                mysqlConnection.query('SELECT * FROM GiftcardValor WHERE id_giftcard = ?', [id_tipogiftcard], (err, rows, fields) => {
                    if(!err) {
                        resolved(rows)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await giftCardvalores;
        }catch(e){
            console.log("Error getGiftCardValor", e);
            throw new Error(e);
        }
    },
    insertGiftCardValor: async (valuesGiftcardValor)=>{
        try{
            let giftCardvalor = new Promise((resolved, rejected)=>{
                mysqlConnection.query('Insert into GiftcardValor (id_giftcard,id_valor) values (?,?)', valuesGiftcardValor, (err, rows, fields) => {
                    if(!err) {
                        resolved(rows)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await giftCardvalor;
        }catch(e){
            console.log("Error insertGiftCardValor", e);
            throw new Error(e);
        }
    },
    getValores: async ()=>{
        try{
            let valores = new Promise((resolved, rejected)=>{
                mysqlConnection.query('SELECT * FROM Valor', (err, rows, fields) => {
                    if(!err) {
                        resolved(rows)
                    } else {
                        rejected(err);
                    }
                });
            });
            console.log("valores",await valores)
            return await valores;
        }catch(e){
            console.log("Error getValores", e);
            throw new Error(e);
        }
    },
    insertValor: async (valueValor)=>{
        try{
            let valor = new Promise((resolved, rejected)=>{
                mysqlConnection.query('Insert into Valor (id_valor,total) values (?,?)', valueValor, (err, rows, fields) => {
                    if(!err) {
                        resolved(rows)
                    } else {
                        rejected(err);
                    }
                });
            });
            return await valor;
        }catch(e){
            console.log("Error insertValor", e);
            throw new Error(e);
        }
    },
}