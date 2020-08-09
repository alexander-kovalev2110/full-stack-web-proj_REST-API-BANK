import React, {Component} from 'react'
import Table from './Table'
import Pagehend from './Pagehend'

const PAGE1 = 5
const PAGE2 = 10

/**
 * Rendering the third column:
 * - Output of the database table;
 * - Pagination - batons "Next page", "Previous page";
 * - Page size selection
 */

class PageDB extends Component {
    state = {
        offset: 0,          // Page offset on the screen
        page: PAGE1,        // Page size
        selected: "page1"   // Name of selected page
    }

    pageNext = () => {                      // Next page
        let {offset, page} = this.state
        if ((offset + page) <= this.props.dbData.length)
            this.setState({offset: offset + page})
    }

    pagePrevious = () => {                  // Previous page
        let {offset, page} = this.state
        if ((offset - page) >= 0)
            this.setState({offset: offset - page})
    }

    pageSet = (event) => {                  // Page size selection
        const new_state = {
            offset: 0,
            page: (event.target.value === "page1") ? PAGE1 : PAGE2,
            selected: event.target.value
        }
        this.setState(new_state)
    }

    render() {
        return (
            <div>
                <Table dbData={this.props.dbData} pageState={this.state} />
                <Pagehend pageNext={this.pageNext} pagePrevious={this.pagePrevious}
                          pageSet={this.pageSet} selected={this.state.selected}/>
            </div>
        )
    }
}

export default PageDB