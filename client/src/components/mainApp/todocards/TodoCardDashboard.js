import React ,{useState} from 'react'
import { connect } from 'react-redux';

import TodoCard from './TodoCard';
import TodoCardDetail from './TodoCardDetail';

 function TodoCardDashboard(props) {

   const [detailId,setDetailId]= useState(11111)
    

    const renderTodos = ()=>{
         
        return(
            props.todos.map((todo) => {
                if(todo._id===detailId){
                    return( <TodoCardDetail setShowEdit={props.setShowEdit}  key={todo._id} config={todo} detailId={detailId} setDetailId={setDetailId}/>)
                }else{
                 return <TodoCard config={todo}  detailId={detailId} setShowEdit={props.setShowEdit} key={todo._id}  setDetailId={setDetailId}/>
                }
            })
        )
    }
 
 
    return (
        <div className="col-12 mt-4">
            <div className={`tododashboard ${props.modal?"test-wrapper-modalActive":""}`}>
                {renderTodos()}
            </div>
        </div>
      
    )
}
function mapPropsToState(state){
    return{
        todos:state.user.todos||[],
        modal:state.modal.show
    }
}
const actionCreators={
   
} 

export default connect(mapPropsToState,actionCreators)(TodoCardDashboard)