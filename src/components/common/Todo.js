import { far } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Todo = ({todo,onDelete}) => {
    return (
       
            <div className="mt-4 bg-gray-900 shadow-md rounded-lg text-left sm:w-11/12 mx-6">
                        
                <div className="h-2 bg-indigo-400 rounded-t-md"> </div>
                
                <div className="px-8 py-6 ">

                    <h1 className="text-white font-bold">{todo.name}</h1>
                    <h3 className="text-white ">{todo.description}</h3>

                    <h3 className="text-white">Time <b>{todo.time} </b> days</h3>

                    <h3 className="text-white">Status <b>{todo.status}</b></h3>

                    <div className="flex justify-between items-baseline">
                        <a href={`/todo/${todo.id}`} className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600"> <FontAwesomeIcon icon={"edit"}/> Edit </a>
                        <button onClick={() => onDelete(todo.id)} className="mt-4 bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-500"><FontAwesomeIcon icon={"times"}/>  Delete</button>
                    </div>
                </div>
            </div>
    )
}

export default Todo;