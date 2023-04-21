import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    pw: {type: String, maxLength: 8, required: true}
})

const transactionSchema = new mongoose.Schema({
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
})

// Mongoose models to perform CRUD
export const Customer = mongoose.model('Customer', customerSchema)
export const Transaction = mongoose.model('Transaction', transactionSchema)
