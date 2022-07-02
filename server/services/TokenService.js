import jwt from "jsonwebtoken"
import Token from "../models/TokenModel.js"

class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            return  userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY)
            return  userData
        } catch (e) {
            return null
        }
    }

    // Здесь реализован механизм: один токен на одного пользователя
    // и если пользователь войдёт с нового устройства, то токен со старого устройства перезапишется
    // и на старом устройстве пользователя выкинет из системы
    async saveToken(userId, refreshToken) {

        const tokenData = await Token.findOne({where: { user_id: userId }})
        if (tokenData !== null) {
            tokenData.refresh_token = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({ user_id: userId, refresh_token: refreshToken })
        return token
    }

    async findToken(refreshToken) {
        const userToken = await Token.findOne({where: { refresh_token: refreshToken }})
        return userToken
    }

    async removeToken(refreshToken) {
        const userToken = await Token.findOne({where: { refresh_token: refreshToken }})
        await userToken.destroy()
        return userToken
    }
}

export default new TokenService()