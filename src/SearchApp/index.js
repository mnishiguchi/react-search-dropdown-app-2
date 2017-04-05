import React            from 'react'
import { EventEmitter } from 'fbemitter'
import FilterContainer  from './FilterContainer'
import SearchBar        from './SearchBar'
import RentSelect       from './RentSelect'
import BedBathSelect    from './BedBathSelect'

const FORM_INITIAL_STATE = {
    searchTerm    : '',
    min           : null,
    max           : null,
    beds          : null,
    baths         : null,
    expandedFilter: null,
}

/**
 * The top-level component of the search widget.
 * Responsible to collect all the form inputs and submit the query to back end.
 */
class SearchApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = FORM_INITIAL_STATE
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
                            onClick={e => console.info(this.state)}
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
        this.emitter.removeAllListeners();
    }

    componentDidUpdate() {
        console.debug(this.state)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.expandedFilter !== nextState.expandedFilter) {
          return true
        }

        return false // By default, do not re-render for avoiding stack overflow. 
    }

    listenForChildren() {
        this.emitter.addListener('FilterButton:clicked', payload => {
            console.debug('FilterButton:clicked:id=' + payload.id)

            this.setState((prevState, props) => {
                const expandedFilter = prevState.expandedFilter === payload.id ? null : payload.id
                return { expandedFilter }
            })
        })
        this.emitter.addListener('SearchBar:updated', payload => {
            // FIXME: this causes stack overflow.
            // this.update({ type: 'SearchBar:updated', payload })
        })
        this.emitter.addListener('RentSelect:updated', payload => {
            this.update({ type: 'RentSelect:updated', payload })
        })
        this.emitter.addListener('BedBathSelect:updated', payload => {
            this.update({ type: 'BedBathSelect:updated', payload })
        })

        // TODO: closed event for each filter
    }

    // Update state using the reducer.
    update(action) {
        const nextState = reducer(this.state, action)
        this.setState(nextState)
    }
}

function reducer(formState = FORM_INITIAL_STATE, action) {
    const { type, payload } = action

    switch (type) {
        case 'SearchBar:updated':
            const { searchTerm } = payload
            return {
                ...formState,
                searchTerm
            }
        case 'RentSelect:updated':
            const { min, max } = payload
            return {
                ...formState,
                min,
                max
            }
        case 'BedBathSelect:updated':
            const { beds, baths } = payload
            return {
                ...formState,
                beds,
                baths
            }
        default:
            return formState
    }
}

export default SearchApp
