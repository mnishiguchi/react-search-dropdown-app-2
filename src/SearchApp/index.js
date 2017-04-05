import React            from 'react'
import { EventEmitter } from 'fbemitter'
import SearchBar        from './SearchBar'
import RentSelect       from './RentSelect'
import BedBathSelect    from './BedBathSelect'
import FilterButton     from './FilterButton'

const FILTER_1 = 'FILTER_1'
const FILTER_2 = 'FILTER_2'
const FILTER_3 = 'FILTER_3'

const FORM_INITIAL_STATE = {
    searchTerm    : '',
    min           : null,
    max           : null,
    beds          : null,
    baths         : null,
    expandedFilter: null,
}

class SearchApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = FORM_INITIAL_STATE
    }

    render() {
        const { expandedFilter } = this.state

        return (
            <section className="SearchApp section">
                <div className="columns is-mobile box">
                    <div className="column is-9">
                        <SearchBar emitter={this.emitter} />
                    </div>

                    <div className="column is-3">
                        <a className="button is-primary" style={{ width: '100%' }}>Search</a>
                    </div>
                </div>

                <div className="columns is-mobile box">
                    <div className="column is-4">
                        <FilterButton emitter={this.emitter} id={FILTER_1} active={expandedFilter === FILTER_1}>
                            {FILTER_1}
                        </FilterButton>
                    </div>
                    <div className="column is-4">
                        <FilterButton emitter={this.emitter} id={FILTER_2} active={expandedFilter === FILTER_2}>
                            {FILTER_2}
                        </FilterButton>
                    </div>
                    <div className="column is-4">
                        <FilterButton emitter={this.emitter} id={FILTER_3} active={expandedFilter === FILTER_3}>
                            {FILTER_3}
                        </FilterButton>
                    </div>
                </div>

                <div className="SearchFilters columns is-mobile box">
                    <div className="column is-6">
                        <RentSelect emitter={this.emitter} />
                    </div>

                    <div className="column is-6">
                        <BedBathSelect emitter={this.emitter} />
                    </div>
                </div>
            </section>
        )
    }

    componentWillMount() {
        this.emitter = new EventEmitter()
        this.listenForChildren()
    }

    componentWillUnmount() {
        this.emitter.removeAllListeners();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.expandedFilter !== nextState.expandedFilter) {
            return true
        }

        return false // Do not re-render by default
    }

    listenForChildren() {
        this.emitter.addListener('FilterButton:clicked', payload => {
            this.setState((prevState, props) => {
                const expandedFilter = prevState.expandedFilter === payload.id ? null : payload.id
                return { expandedFilter }
            })
        })
        this.emitter.addListener('SearchBar:updated', payload => {
            this.update({ type: 'SearchBar:updated', payload })
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
