exports.generarAlfanumerico = ()=>{
    var crypto = require("crypto");
    return crypto.randomBytes(4).toString('hex');
}

exports.enamascararTarjeta = (cc)=>{
    return `${cc.substr(0,4)}${'#'.repeat(cc.length - 8)}${cc.substr(cc.length - 4)}`;
}