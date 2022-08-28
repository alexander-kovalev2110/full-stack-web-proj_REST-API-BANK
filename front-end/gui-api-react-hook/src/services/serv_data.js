/**
 * Screen pages size
 */
export const PAGE1 = 5
export const PAGE2 = 10

/**
* Data array for generation:
* - menu   (title)
* - forms  (title, input1, input2, button)
* - API    (method, db, input.id, input.key)
*/
const serv_data = [
  {
    title: "Login",
    input1: {lbl: "Name", type: "text", id: "name", text: "Input Name"},
    input2: {lbl: "Password", type: "password", id: "pw", text: "Input Password"},
    button: "Login",
    method: 'GET',
    db: 'customer'
  },
  {
    title: "Add Customer",
    input1: {lbl: "Name", type: "text", id: "name", text: "Input Name"},
    input2: {lbl: "Password", type: "password", id: "pw", text: "Input Password"},
    button: "Register",
    method: 'POST',
    db: 'customer'
  },
  {
    title: "Add Transaction",
    input1: {lbl: "Amount", type: "number", id: "amount", text: "Input Amount", step:"0.01"},
    button: "Submit",
    method: 'POST',
    db: 'transaction'
  },
  {
    title: "Get Transaction",
    input1: {lbl: "TransactionId", type: "number", id: "transactionId", text: "Input TransactionId"},
    button: "Submit",
    method: 'GET',
    db: 'transaction'
  },
  {
    title: "Get Transaction by Filter",
    input1: {lbl: "Amount", type: "number", id: "amount", text: "Input Amount", key: "amount", step:"0.01"},
    input2: {lbl: "Date", type: "date", id: "date", text: "Input Date", key: "date"},
    button: "Submit",
    method: 'GET',
    db: 'transaction'
  },
  {
    title: "Update Transaction",
    input1: {lbl: "TransactionId", type: "number", id: "transactionId", text: "Input TransactionId"},
    input2: {lbl: "Amount", type: "number", id: "amount", text: "Input Amount", step:"0.01"},
    button: "Submit",
    method: 'PATCH',
    db: 'transaction'
  },
  {
    title: "Delete Transaction",
    input1: {lbl: "TransactionId", type: "number", id: "transactionId", text: "Input TransactionId"},
    button: "Submit",
    method: 'DELETE',
    db: 'transaction'
  }
]

export default serv_data
