import CustomerService from "./CustomerService.js"

class CustomerController {

    async create(req, res) {
        try {
            const customerId = await CustomerService.create(req.body)
            res.json(customerId)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async login(req, res) {
        try {
            const customerId = await CustomerService.findOne(req.body)
            res.json(customerId)
        } catch (e) {
            res.status(400).json(e)
        }
    }
}

export default new CustomerController()
