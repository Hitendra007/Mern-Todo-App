import { Todo } from '../models/todo.model.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'



const createTodo = async (req, res) => {
    try {
        // const userid = req.user._id
        const { task,_id } = req.body
        const userid=_id
        if (!task) {
            throw new ApiError(400, error?.message || "Todo is required !!")
        }
        const createdTodo = await Todo.create({
            task,
            user: userid
        })
        console.log(createTodo)
        return res.status(200).json(new ApiResponse(
            200, createdTodo, "New Todo Created !!"
        ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Internal server error !!")
    }
}

// const getTodos = async (req, res) => {
//     try {
//         console.log(req.body)
//         const userid = req.body._id
//         const todos = await Todo.find({ user: userid })
//         return res.status(200).json(
//             new ApiResponse(200, todos, "Todos retrieved successfully")
//         )

//     } catch (error) {
//         throw new ApiError(500, error?.message || "Internal server error !!")
//     }
// }


const getTodos = async (req, res) => {
    try {
        const userEmail = req.query.email; // Access email from query parameters
        console.log(userEmail)
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json(
                new ApiResponse(404, null, "User not found")
            );
        }

        const todos = await Todo.find({ user: user._id });
        return res.status(200).json(
            new ApiResponse(200, todos, "Todos retrieved successfully")
        );
    } catch (error) {
        throw new ApiError(500, error?.message || "Internal server error !!");
    }
};

const deleteTodo = async (req, res) => {
    try {
        const {id} = req.body;
        console.log(id)
        if (!id) {
            throw new ApiError(401, 'Required todo id !!')
        }
        const deletedTodo = await Todo.deleteOne({ _id: id })
        if (deletedTodo.deletedCount === 1) {
            return res.status(200).json(new ApiResponse(200, {}, 'Todo deleted !!'))
        }
        else {
            return res.status(404).json(new ApiResponse(404, {}, 'Todo  not found !!'))
              
        }
    } catch (error) {
        throw new ApiError(500, "Internal Server Error !!")
    }
}
export { getTodos, createTodo ,deleteTodo}