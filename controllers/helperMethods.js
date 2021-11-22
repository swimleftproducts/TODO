 
module.exports={

   makeFullImageUrl(input,array=true){
   
    if(array){
        return  input.map(element=>{
        //for when first created and supplying stock images
        if(element.imageUrl==="newuser"){
            element.imageUrl="/hithere.jpeg"
            return element
        }else if(element.imageUrl==="blank"){
            element.imageUrl="/blank.png"
            return element
        }else{
        
        element.imageUrl = `https://${process.env.BUCKET_NAME}${process.env.AWS_ADDRESS}${element.imageUrl}`
        return element
        }}
        )
    }else{
        if(input.imageUrl==="newuser"){
           input.imageUrl="/hithere.jpeg"
            return input
        }else if(input.imageUrl==="blank"){
            input.imageUrl="/blank.png"
            return input
        }else{
        
        input.imageUrl = `https://${process.env.BUCKET_NAME}${process.env.AWS_ADDRESS}${input.imageUrl}`
        return input
        }
    }      
    },
    
    

}

