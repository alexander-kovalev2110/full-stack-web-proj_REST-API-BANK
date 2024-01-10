import TransactionService from "./TransactionService.js"

class TransactionController {

    async create(req, res) {
        try {
            const createdTransaction = await TransactionService.create(req.body)
            res.json(createdTransaction)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async get(req, res) {
        try {
            const transaction = await TransactionService.findById(req.params.id)
            res.json(transaction)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async update(req, res) {
        try {
            const updatedTransaction = await TransactionService.findByIdAndUpdate(req.params.id, req.body)
            res.json(updatedTransaction)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async delete(req, res) {
        try {
            const deletedTransaction = await  TransactionService.findByIdAndDelete(req.params.id)
            res.json(deletedTransaction)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async getByFilter(req, res) {
        try {
            const transactions = await TransactionService.find(req.body)
            res.json(transactions)
        } catch (e) {
            res.status(400).json(e)
        }
    }
}

export default new TransactionController()
