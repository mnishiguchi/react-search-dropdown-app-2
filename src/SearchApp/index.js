import React            from 'react'
import { EventEmitter } from 'fbemitter'
import SearchBar        from './SearchBar'
import RentSelect       from './RentSelect'
import BedBathSelect    from './BedBathSelect'

const FILTER_1 = 1
const FILTER_2 = 2
const FILTER_3 = 3

const FORM_INITIAL_STATE = {
    searchTerm: '',
    min       : null,
    max       : null,
    beds      : null,
    baths     : null,
    filterMode: 0,    // 0..2
}

class SearchApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = FORM_INITIAL_STATE
    }

    render() {
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

    shouldComponentUpdate() {
        return false
    }

    listenForChildren() {
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
        this.setState(nextState, () => console.debug(this.state))
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
