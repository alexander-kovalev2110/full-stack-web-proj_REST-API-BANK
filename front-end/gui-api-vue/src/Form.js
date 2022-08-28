import React from 'react'
import { connect } from 'react-redux'
import store from "./index"
import { fetchData } from "./store/actions/apiAction"
import serv_data from './services/serv_data'

/**
 * Rendering the 2-nd column - form for entering attributes:
 * - form title;
 * - one or two input tags;
 * - submitting button tag
 * Texts for generation are taken from the serv_data array
 */

const Inp = (props) => {            // Generating <input> tag
    const { lbl, type, id, text, step } = props.inputData

    return (
        <div className="form-group">
            <label className="col-sm-4 control-label">{lbl}</label>
            <div className="col-sm-6">
                <input type={type} className="col-sm-8 form-control" id={id} placeholder={text} step={step} />
            </div>
        </div>
    )
}

const Butt = (props) => {            // Generating <button> tag
    const { button, index } = props

    return (
        <div className="form-group">
            <div className="col-sm-offset-4 col-sm-4">
                <button type="button" className="btn btn-default"
                        onClick={() => store.dispatch(fetchData(index))}>{button}</button>
            </div>
        </div>
    )
}

export const Form = (props) => {            // Generating <form> tags
    const { index } = props
    const { title, input1, input2, button } = serv_data[index]
    const inp2 = (!(input2 === undefined)) ? <Inp inputData={input2} /> : null

    return (
        <form className='form-horizontal'>
            <br/>
            <h4>{title}</h4>
            <Inp inputData={input1} />
            {inp2}
            <Butt button={button} index={index}/>
        </form>
    )
}

export default connect(state => ({index: state.indexRed.index}))(Form)
