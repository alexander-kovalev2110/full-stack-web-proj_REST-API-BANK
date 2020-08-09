import React from 'react'

/**
 * Rendering the second column - form for entering command attributes:
 * - Command title;
 * - One or two input fields;
 * - Submitting button
 */

const Inp = (props) => {            // Generating <input> tag
    const { lbl, type, id, text, step } = props.data

    return (
        <div className="form-group">
            <label className="col-sm-4 control-label">{lbl}</label>
            <div className="col-sm-8">
                <input type={type} className="form-control" id={id} placeholder={text} step={step} />
            </div>
        </div>
    )
}

const Butt = (props) => {            // Generating <button> tag
    return (
        <div className="form-group">
            <div className="col-sm-offset-4 col-sm-4">
                <button type="button" className="btn btn-default" onClick={props.handleSubmit}>{props.data.nam}</button>
            </div>
        </div>
    )
}

const Form = (props) => {            // Generating <form> tag
    const { title, input1, input2, button } = props.dataForm
    let tags = []                    // Array with form tags

    tags.push(<h4>{title}</h4>)
    tags.push(<Inp data={input1} />)
    if (!(input2 === undefined))
        tags.push(<Inp data={input2} />)
    tags.push(<Butt data={button} handleSubmit={props.handleSubmit}/>)

    return (
        <form className='form-horizontal'><br/>{tags}</form>
    )
}

export default Form
