 
module.exports={

   makeFullImageUrl(input,arrayOrNot=true){
    if(arrayOrNot){
        return  input.map(element=>{
        //for when first created and supplying stock images
        if(element.imageUrl==="newuser"){
            element.imageUrl="/hithere.jpeg"
            return element
        }
        element.imageUrl = `https://${process.env.BUCKET_NAME}${process.env.AWS_ADDRESS}${element.imageUrl}`
        return element
        })
    }else{
        if(input.imageUrl==="newuser"){
           input.imageUrl="http://localhost:3000/hithere.jpeg"
            return input
        }
        input.imageUrl = `https://${process.env.BUCKET_NAME}${process.env.AWS_ADDRESS}${input.imageUrl}`
        return input
    }      
    },
    populateResponse(model,toPopulate){

    }
}

