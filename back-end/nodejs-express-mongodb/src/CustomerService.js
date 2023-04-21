import { Customer } from "./Schema.js"

class CustomerService {

    async create(customer) {
        const createCustomer = await Customer.create(customer)
        return createCustomer._id
    }

    async findOne(customer) {
        const loginCustomer = await Customer.findOne(customer)
        if (loginCustomer) {
            return loginCustomer._id
        } else {
            throw new Error('Customer is not available.')
        }
    }
}

export default new CustomerService()
