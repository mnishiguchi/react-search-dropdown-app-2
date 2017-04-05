import React            from 'react'
import { EventEmitter } from 'fbemitter'
import SearchBar        from './SearchBar'
import RentSelect       from './RentSelect'
import BedBathSelect    from './BedBathSelect'
import FilterButton     from './FilterButton'

const FILTER_1 = 'rent'
const FILTER_2 = 'beds_baths'
const FILTER_3 = 'amenities'

class FilterContainer extends React.Component {
    render() {
        const { emitter, expandedFilter } = this.props

        console.debug(this.props)

        return (
            <div className="FilterContainer">
                <div className="columns">
                    <div className="column is-4">
                        <FilterButton emitter={emitter} id={FILTER_1} active={expandedFilter === FILTER_1}>
                            {this.rentText()}
                        </FilterButton>
                    </div>
                    <div className="column is-4">
                        <FilterButton emitter={emitter} id={FILTER_2} active={expandedFilter === FILTER_2}>
                            {this.bedBathText()}
                        </FilterButton>
                    </div>
                    <div className="column is-4">
                        <FilterButton emitter={emitter} id={FILTER_3} active={expandedFilter === FILTER_3}>
                            {this.amenityText()}
                        </FilterButton>
                    </div>
                </div>

                { this.renderFilter() }
            </div>
        )
    }

    //---
    // RENDERING HELPERS
    //---

    // TODO
    //
    renderFilter() {
        switch (this.props.expandedFilter) {
            case FILTER_1: return <RentSelect {...this.props} />
            case FILTER_2: return <div>{FILTER_2}</div>
            case FILTER_3: return <div>{FILTER_3}</div>
            default: return null
        }
    }

    //---
    // UTILS
    //---

    // Return beds baths if those values exist
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

    // Return min max if those values exist.
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

    amenityText() {
      return 'AmenityText'
    }
}

export default FilterContainer
