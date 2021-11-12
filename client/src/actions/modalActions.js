import {modalConstants} from '../constants/modalConstants'

const toggleModal =() =>async (dispatch)=>{
    try{
        dispatch({type:modalConstants.toggleModal,payload:null})
     
    }catch(err){
        console.log(err)
    }

}
export const modalActions= {
   toggleModal
}