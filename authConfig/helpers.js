var crypto = require('crypto')

function validPassword(password,hash,salt){
    var hashVerify = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');
    return hash === hashVerify
}

function genPassword(password){
   
    var salt = crypto.randomBytes(32).toString('hex')
    
    var genHash = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')
   
    return{
        salt: salt,
        hash:genHash
    }
}

function compare(newPassword,oldSalt,oldHash){
    var genHash = crypto.pbkdf2Sync(newPassword,oldSalt,1000,64,'sha512').toString('hex')
    if(genHash===oldHash){
        return false
    }else{
        return true
    }
}

module.exports = { validPassword, genPassword,compare}