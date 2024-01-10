import { Schema, model } from 'mongoose'

const customerSchema = new Schema({
    name: {type: String, required: true},
    pw: {type: String, maxLength: 8, required: true}
})

const transactionSchema = new Schema({
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
})

// Mongoose models to perform CRUD
export const Customer = model('Customer', customerSchema)
export const Transaction = model('Transaction', transactionSchema)
