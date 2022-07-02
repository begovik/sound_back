import User from "../models/UserModel.js"
import Token from "../models/TokenModel.js";

class UserService {

    async createUser(user) {
        const createdUser = await User.create(user)
        return createdUser
    }

    async getAllUsers() {
        const users = await User.findAll()
        return users
    }

    async getOneUser(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const user = await User.findByPk(id)
        return user
    }

    async updateUser(user) {

        if (!user.id) {
            throw new Error('Не указан ID')
        }

        const updatedUser = await User.findByPk(user.id)

        if (user.name) updatedUser.name = user.name
        if (user.email) updatedUser.email = user.email
        if (user.password) updatedUser.password = user.password
        if (user.is_activated) updatedUser.is_activated = user.is_activated
        if (user.activation_link) updatedUser.activation_link = user.activation_link

        await updatedUser.save()

        return updatedUser
    }

    async deleteUser(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const userToken = await Token.findOne({where: { user_id: id }})
        await userToken.destroy()

        const user = await User.findByPk(id)
        await user.destroy()

        return user
    }

    async deleteAllUsers() {

        const users = await User.findAll()

        for (let oneUser in users) {

            if(users.hasOwnProperty(oneUser)){

                const userToken = await Token.findOne({where: { user_id: users[oneUser].id }})
                if (userToken !== null) await userToken.destroy()

                const user = await User.findByPk(users[oneUser].id)
                await user.destroy()

            }

        }

        return 'Users was deleted'
    }

}

export default new UserService()