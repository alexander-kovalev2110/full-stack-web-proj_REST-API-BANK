import React from 'react'
import Menu from './Menu'
import Form from './Form'
import Info from './Info'
import Table from './Table'
import Pagehand from './Pagehand'

export const App = () => {
    return (
        <div className="row">
            <div className="column" id="wc1">
                <Menu />
            </div>
            <div className="column" id="wc2">
                <Form />
                <Info />
            </div>
            <div className="column" id="wc3">
                <Table />
                <Pagehand />
            </div>
        </div>
    )
}

export default App
