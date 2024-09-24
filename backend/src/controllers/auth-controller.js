import authService from "../services/auth-service"

const authController = {
    register: async (req, res, next) => {
        try {
            const message = await authService.register(req.body);
            res.json(message)
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const token = await authService.login(req.body)
            res.json(token)
        } catch (error) {
            next(error)
        }
    }
}

export default authController;