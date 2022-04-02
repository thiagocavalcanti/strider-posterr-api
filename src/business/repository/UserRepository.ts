import User from "../entities/User"

type GetById = (id: number) => Promise<User>
export default interface UserRepository{
    getById: GetById
}