import {modalConstants} from '../constants/modalConstants'

const toggleModal =(page) =>async (dispatch)=>{
    try{
        dispatch({type:modalConstants.toggleModal,payload:page})
     
    }catch(err){
        console.log(err)
    }
}

const setPage = (page) =>async (dispatch)=>{
  
    try{
        dispatch({type:modalConstants.setModalPage,payload:page})
     
    }catch(err){
        console.log(err)
    }
}
export const modalActions= {
   toggleModal,
   setPage
}