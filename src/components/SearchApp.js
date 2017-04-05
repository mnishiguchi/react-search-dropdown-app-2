import React          from 'react'
import SearchBar      from './SearchBar'
import RentSelect     from './RentSelect'
import BedBathSelect  from './BedBathSelect'

const FORM_INITIAL_STATE = {
    searchTerm: '',
    min       : null,
    max       : null,
    beds      : null,
    baths     : null,
}

function reducer(formState = FORM_INITIAL_STATE, action) {
    const { type, payload } = action

    switch (type) {
        case 'SearchBar':
            const { searchTerm } = payload
            return {
                ...formState,
                searchTerm
            }
        case 'RentSelect':
            const { min, max } = payload
            return {
                ...formState,
                min,
                max
            }
        case 'BedBathSelect':
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

class SearchApp extends React.Component {
    constructor(props) {
        super(props)

        // The form object.
        this._form = FORM_INITIAL_STATE
    }

    render() {
        return (
          <section className="section">
            <div className="container">
              <div className="heading">
                <h2 className="title">Search dropdown</h2>

                <section className="section">
                    <div className="columns is-mobile box">
                        <div className="column is-9">
                            <SearchBar dispatchStateChange={payload => this.updateState({ type: 'SearchBar', payload })} />
                        </div>

                        <div className="column is-3">
                            <a className="button is-primary search-button" style={{ width: '100%' }}>Search</a>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="columns is-mobile box">
                        <div className="column is-6">
                            <RentSelect dispatchStateChange={payload => this.updateState({ type: 'RentSelect', payload })} />
                        </div>

                        <div className="column is-6">
                            <BedBathSelect dispatchStateChange={payload => this.updateState({ type: 'BedBathSelect', payload })} />
                        </div>
                    </div>
                </section>
              </div>
            </div>
          </section>
        )
    }

    updateState(action) {
        // Create a new form state using the reducer.
        this._form = reducer(this._form, action)

        console.debug(this._form)
    }
}

export default SearchApp
