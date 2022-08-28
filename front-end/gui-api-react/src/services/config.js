import serv_data from "./serv_data"

export const Config = (index, customerId) => {              // Setting config for axios function (see apiModule)
    const domen = 'http://127.0.0.1:8000'

    const { method, db, input1, input2 } = serv_data[index]
    const path = (db === 'transaction') ? `/transaction/${customerId}` : `/customer`

    const atr1 = (input1.key) ? `/?${input1.key}=${document.getElementById(input1.id).value}` :
        `/${document.getElementById(input1.id).value}`

    const atr2 = (input2) ? (input2.key) ? `&${input2.key}=${document.getElementById(input2.id).value}` :
        `/${document.getElementById(input2.id).value}` : ''

    return ({
        method: method,
        url: `${domen}${path}${atr1}${atr2}`
    })
}

export default Config
