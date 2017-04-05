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

    constructor(props) {
        super(props)
        this.state = {
          expandedFilter: null,
        }
    }

    render() {
        const { emitter } = this.props
        const { expandedFilter } = this.state

        return (
            <div className="FilterContainer">
                <div className="columns">
                    <div className="column is-4">
                        <FilterButton emitter={emitter} id={FILTER_1} active={expandedFilter === FILTER_1}>
                            {FILTER_1}
                        </FilterButton>
                    </div>
                    <div className="column is-4">
                        <FilterButton emitter={emitter} id={FILTER_2} active={expandedFilter === FILTER_2}>
                            {FILTER_2}
                        </FilterButton>
                    </div>
                    <div className="column is-4">
                        <FilterButton emitter={emitter} id={FILTER_3} active={expandedFilter === FILTER_3}>
                            {FILTER_3}
                        </FilterButton>
                    </div>
                </div>

                <div className="SearchFilters columns">
                    <div className="column is-6">
                        <RentSelect emitter={emitter} />
                    </div>

                    <div className="column is-6">
                        <BedBathSelect emitter={emitter} />
                    </div>
                </div>
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false // Do not re-render by default
    }
}

export default FilterContainer
