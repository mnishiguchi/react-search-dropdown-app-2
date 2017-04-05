import React            from 'react'
import { EventEmitter } from 'fbemitter'
import SearchBar        from './SearchBar'
import RentSelect       from './RentSelect'
import BedBathSelect    from './BedBathSelect'
import FilterButton     from './FilterButton'

const FILTER_1 = 'FILTER_1'
const FILTER_2 = 'FILTER_2'
const FILTER_3 = 'FILTER_3'

class FilterContainer extends React.Component {
    render() {
        const { emitter, expandedFilter } = this.props

        console.debug(this.props)

        return (
            <div className="FilterContainer">
                <div className="columns">
                    <div className="column is-6">
                        <FilterButton emitter={emitter} id={FILTER_1} active={expandedFilter === FILTER_1}>
                            {this.rentText()}
                        </FilterButton>
                    </div>
                    <div className="column is-6">
                        <FilterButton emitter={emitter} id={FILTER_2} active={expandedFilter === FILTER_2}>
                            {this.bedBathText()}
                        </FilterButton>
                    </div>
                </div>

                {/*
                  <div className="SearchFilters columns">
                      <div className="column is-6">
                          <RentSelect emitter={emitter} />
                      </div>

                      <div className="column is-6">
                          <BedBathSelect emitter={emitter} />
                      </div>
                  </div>
                */}
            </div>
        )
    }

    // Show beds baths if those values exist
    // if value exists, set state
    bedBathText() {
        const {beds, baths} = this.props

        return `${bedText(beds)} x ${bathText(baths)}`

        function bedText(code) {
            switch (code) {
                case 0: return 'Studio'
                case 1: return '1 Bed'
                case 2: return '2 Beds'
                case 3: return '3 Beds'
                case 4: return '4+ Beds'
                default: return 'All beds'
            }
        }

        function bathText(code) {
            switch (code) {
                case 1: return '1+ Baths'
                case 2: return '2+ Baths'
                case 3: return '3+ Baths'
                default: return 'All baths'
            }
        }
    }

    // Show min max if those values exist.
    rentText() {
        const min = parseInt(this.props.min, 10)
        const max = parseInt(this.props.max, 10)

        if (min && max) {
            return `$${min} - ${max}`
        } else if (min) {
            return `$${min} <`
        } else if (max) {
            return `< $${max}`
        }

        return 'Rent range'
    }
}

export default FilterContainer
