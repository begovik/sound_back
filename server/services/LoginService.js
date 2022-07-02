import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import * as uuid from "uuid"
import MailService from "./MailService.js"
import UserDto from "../dtos/UserDto.js"
import ApiError from "../exceptions/ApiError.js"
import TokenService from "./TokenService.js";

class LoginService {
    async registration(name, email, password) {
        const candidate = await User.findOne({where: { email: email }})

        if (candidate !== null) {
            throw ApiError.BadRequest(`Пользователь с таким адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await User.create({name, email, password: hashPassword, activation_link: activationLink})

        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user) // id, name, email, isActivated
        const tokens = await TokenService.generateTokens({...userDto})
        TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await User.findOne({where: { activation_link: activationLink }})
        if (user === null) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.is_activated = true
        await user.save()
    }

    async login(email, password) {
        const user = await User.findOne({where: { email: email }})

        if (user === null) {
            throw ApiError.BadRequest(`Пользователь с адресом ${email} не найден`)
        }

        const  isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {``
            throw ApiError.BadRequest(`Не верный пароль`)
        }

        const  userDto = new UserDto(user)

        const tokens = await TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}


    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromdb = await TokenService.findToken(refreshToken)

        if (!userData || !tokenFromdb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findByPk(userData.user_id)
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}

export default new LoginService()