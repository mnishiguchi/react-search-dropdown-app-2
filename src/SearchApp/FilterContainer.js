import React            from 'react'
import { EventEmitter } from 'fbemitter'

import SearchBar        from './SearchBar'
import RentSelect       from './RentSelect'
import BedBathSelect    from './BedBathSelect'
import FilterButton     from './FilterButton'
import StaticContainer  from './StaticContainer'

const FILTER_1 = 'rent'
const FILTER_2 = 'beds_baths'
const FILTER_3 = 'amenities'

class FilterContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            expandedFilter: props.initialize
        }
    }

    render() {
        const { expandedFilter } = this.state

        return (
            <div className="FilterContainer">
                { this.renderButtons() }
                { this.renderFilter() }
            </div>
        )
    }

    //---
    // RENDERING HELPERS
    //---

    renderButtons() {
        const { expandedFilter } = this.state

        console.debug(this.state)

        return (
            <div className="columns">
                <div className="column is-mobile">
                    <FilterButton onClick={e => this.handleButtonClick(FILTER_1)} filterId={FILTER_1} active={expandedFilter === FILTER_1}>
                        {this.rentText()}
                    </FilterButton>
                </div>
                <div className="column is-mobile">
                    <FilterButton onClick={e => this.handleButtonClick(FILTER_2)} filterId={FILTER_2} active={expandedFilter === FILTER_2}>
                        {this.bedBathText()}
                    </FilterButton>
                </div>
                <div className="column is-mobile">
                    <FilterButton onClick={e => this.handleButtonClick(FILTER_3)} filterId={FILTER_3} active={expandedFilter === FILTER_3}>
                        {this.amenityText()}
                    </FilterButton>
                </div>
            </div>
        )
    }

    renderFilter() {
        switch (this.state.expandedFilter) {
            case FILTER_1: return <RentSelect {...this.props} />
            case FILTER_2: return <BedBathSelect {...this.props} />
            case FILTER_3: return <div>{FILTER_3}</div>
            default: return null
        }
    }

    handleButtonClick(expandedFilter) {
        this.setState((prevState, props) => {
            if (prevState.expandedFilter === expandedFilter)
                return { expandedFilter: null }
            else {
                return { expandedFilter }
            }
        })
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
