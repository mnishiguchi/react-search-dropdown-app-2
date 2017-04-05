import React, { PropTypes as T } from 'react'

class SearchBar extends React.Component {

    static propTypes = {
        dispatchStateChange: T.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ''
        }

        // Store reference to the text input node.
        this._inputNode = null
    }

    render() {
        const { searchTerm } = this.state

        return (
            <p className="control">
                <input
                    className="input"
                    id="q"
                    type="text"
                    placeholder="Address, City, State"
                    ref={ input => { this._inputNode = input }}
                    onChange={e => {
                        e.preventDefault()
                        this.handleInputChange(this._inputNode.value)
                    }}
                />
                <span className="help">{searchTerm}</span>
            </p>
        )
    }

    // ---
    // LIFECYCLE METHODS
    // ---

    componentDidUpdate(prevProps, prevState) {
        const { dispatchStateChange } = this.props
        dispatchStateChange(this.state)
    }

    // ---
    // PRIVATE METHODS
    // ---

     handleInputChange(searchTerm) {
        this.setState({
            searchTerm
        })
    }
}

export default SearchBar
