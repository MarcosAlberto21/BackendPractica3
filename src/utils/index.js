exports.generarAlfanumerico = ()=>{
    var crypto = require("crypto");
    return crypto.randomBytes(4).toString('hex');
}

exports.enamascararTarjeta = (cc)=>{
    return `${cc.substr(0,4)}${'#'.repeat(cc.length - 8)}${cc.substr(cc.length - 4)}`;
}

exports.current_date_dd_mm_yyy = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}