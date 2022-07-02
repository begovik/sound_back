import UserService from "../services/UserService.js"

class UserController {
    async createUser(req, res) {
        try {
            const newPerson = await UserService.createUser(req.body)
            res.json(newPerson)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await UserService.getAllUsers()
            return res.json(users)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOneUser(req, res) {
        try {
            const user = await UserService.getOneUser(req.params.id)
            return res.json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateUser(req, res) {
        try {
            const updatedUser = await UserService.updateUser(req.body)
            return res.json(updatedUser)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await UserService.deleteUser(req.params.id)
            return res.json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteAllUsers(req, res) {
        try {
            const user = await UserService.deleteAllUsers()
            return res.json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController()