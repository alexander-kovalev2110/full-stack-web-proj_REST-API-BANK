import { Transaction } from "./Schema.js"

class TransactionService {

    async create(transaction) {
        return Transaction.create({...transaction, date: new Date()})
    }

    async findById(transactionId) {
        const transaction = await Transaction.findById(transactionId)
        if (transaction) {
            return transaction
        } else {
            throw new Error('Transaction is not available.')
        }
    }

    async findByIdAndUpdate(transactionId, transaction) {
        if (!transactionId) {
            throw new Error('ID is not specified')
        }
        return Transaction.findByIdAndUpdate(transactionId,
            {...transaction, date: new Date()},
            {new: true})
    }

    async findByIdAndDelete(transactionId) {
        if (!transactionId) {
            throw new Error('ID is not specified')
        }
        return Transaction.findByIdAndDelete(transactionId)
    }

    async find(transaction) {
        return Transaction.find(transaction)
    }
}

export default new TransactionService()
