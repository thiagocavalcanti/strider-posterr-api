import UserRepository from "../../business/repository/UserRepository"
import User from "../../business/entities/User"
import _, { dbClient } from "../config/database"

const getByIdImpl = async (id: number) => {
    const client = await dbClient()
    let response
    try{
        response = await dbClient().query("SELECT * FROM users where id = $1", [id])
    } finally{
        client.release()
        console.log(`Get user with id ${id} with success`)
    }
    return response.rows[0] as User 
}


const UserRepositoryImpl: UserRepository = {
    getById: getByIdImpl
}

export default UserRepositoryImpl