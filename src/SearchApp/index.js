import React            from 'react'
import { EventEmitter } from 'fbemitter'
import FilterContainer  from './FilterContainer'
import SearchBar        from './SearchBar'

/**
 * The top-level component of the search widget.
 * Responsible to collect all the form inputs and submit the query to back end.
 */
class SearchApp extends React.PureComponent {

    static defaultProps = {
        searchTerm : '',
        min        : null,
        max        : null,
        beds       : null,
        baths      : null,
        reset      : false, // Tell FilterContainer to close the filter pane.
    }

    constructor(props) {
        super(props)
        this.state = this.defaultProps
    }

    render() {
        return (
            <div className="SearchApp section">
                <div className="columns box">
                    <div className="column is-9">
                        <SearchBar emitter={this.emitter} />
                    </div>

                    <div className="column is-3">
                        <a
                            className="button is-primary"
                            style={{ width: '100%' }}
                            onClick={e => this._handleSubmit()}
                        >
                            Search
                        </a>
                    </div>
                </div>

                <div>
                    <FilterContainer emitter={this.emitter} {...this.state} />
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.emitter = new EventEmitter()
        this.listenForChildren()
    }

    componentWillUnmount() {
        this.emitter.removeAllListeners()
    }

    componentDidUpdate() {
        console.debug(this.state)
    }

    listenForChildren() {
        this.emitter.addListener('FilterButton:clicked', payload => {
            this.setState((prevState, props) => {
                const expandedFilter = prevState.expandedFilter === payload.id ? null : payload.id
                return { expandedFilter }
            })
        })
        this.emitter.addListener('SearchBar:updated', payload => {
            this._update({ type: 'SearchBar:updated', payload })
        })
        this.emitter.addListener('RentSelect:updated', payload => {
            this._update({ type: 'RentSelect:updated', payload })
        })
        this.emitter.addListener('BedBathSelect:updated', payload => {
            this._update({ type: 'BedBathSelect:updated', payload })
        })
    }

    // Update state using the reducer.
    _update(action) {
        const nextState = reducer(this.state, action)
        this.setState(nextState)
    }

    _handleSubmit() {
        this.setState({ ...this.defaultProps, reset: true }, () => console.info(this.state))
    }
}

function reducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case 'SearchBar:updated':
            const { searchTerm } = payload
            return {
                ...state,
                searchTerm,
                reset: false,
            }
        case 'RentSelect:updated':
            const { min, max } = payload
            return {
                ...state,
                min,
                max,
                reset: false,
            }
        case 'BedBathSelect:updated':
            const { beds, baths } = payload
            return {
                ...state,
                beds,
                baths,
                reset: false,
            }
        default:
            return state
    }
}

export default SearchApp
