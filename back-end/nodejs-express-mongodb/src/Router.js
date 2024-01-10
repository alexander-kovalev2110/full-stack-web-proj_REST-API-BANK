import Router from 'express'
import CustomerController from './CustomerController.js'
import TransactionController from './TransactionController.js'

const router = new Router()

// Customer's routers
router.post('/customer', CustomerController.create)
router.get('/customer', CustomerController.login)

// Transaction's routers
router.post('/transaction', TransactionController.create)
router.get('/transaction/:id', TransactionController.get)
router.patch('/transaction/:id', TransactionController.update)
router.delete('/transaction/:id', TransactionController.delete)
router.get('/transaction', TransactionController.getByFilter)

export default router
