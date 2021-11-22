import axios from 'axios'
export const s3Helpers ={
    async getPresignedUrl(file){
        if(file){ 
            const fileType = file.type.split('/')[1]

            const uploadConfig= await axios.get(`/api/getpresignedurl/${fileType}`, { withCredentials: true}).catch((err) => {
               console.log(err.response)
               return err.response.data
            })
            
            if(uploadConfig.code){
                console.log("uploadconfig",uploadConfig)
                return uploadConfig
            }else{
                const URL=uploadConfig.data.url
                const imgKey = uploadConfig.data.key 
                return {imgKey,URL}
            }
        }else{
            return {imgKey:"",URL:null}
        }
    },
    async uploadPhoto(URL,file){
       return axios.put (URL,file,{
            headers:{
                  'Content-Type':file.type
        }}).then(() => {
            return "success"
        }).catch((err) => {
            return  "error"
        })
    }
}