

module.exports={
    getDevDbConnectionString:function(){     
        if(process.env.NODE_ENV ==="production"){
        return `mongodb+srv://${process.env.DBUNAME}:${process.env.DBPWD}@cluster0.d6dt5.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`}else{
        return `mongodb+srv://${process.env.DBUNAME}:${process.env.DBPWD}@cluster0.d6dt5.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
    }
    }
}
