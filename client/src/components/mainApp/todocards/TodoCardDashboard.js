import React ,{useState} from 'react'
import { connect } from 'react-redux';

import TodoCardModified from './TodoCard';
import TodoCardModifiedDetail from './TodoCardDetail';

 function TodoCardDashboard(props) {

   const [detailId,setDetailId]= useState(11111)
    

    const renderTodos = ()=>{
         
        return(
            props.todos.map((todo) => {
                if(todo._id===detailId){
                    return( <TodoCardModifiedDetail setShowEdit={props.setShowEdit}  key={todo._id} config={todo} detailId={detailId} setDetailId={setDetailId}/>)
                }else{
                 return <TodoCardModified config={todo}  detailId={detailId} setShowEdit={props.setShowEdit} key={todo._id}  setDetailId={setDetailId}/>
                }
            })
        )
    }
 
 
    return (
        <div className="col-12">
            <div className="test-wrapper">
                {renderTodos()}
            </div>
        </div>
      
    )
}
function mapPropsToState(state){
    return{
        todos:state.user.todos||[]
    }
}
const actionCreators={
   
} 

export default connect(mapPropsToState,actionCreators)(TodoCardDashboard)