import React, { PropTypes as T } from 'react'

// Mode codes
const MODE_BEDS  = 0
const MODE_BATHS = 1

// Bed codes
const STUDIO = 0
const BEDS_1 = 1
const BEDS_2 = 2
const BEDS_3 = 3
const BEDS_4 = 4

// Bath codes
const BATHS_1 = 1
const BATHS_2 = 2
const BATHS_3 = 3

function bedText(code) {
    switch (code) {
        case STUDIO: return 'Studio'
        case BEDS_1: return '1 Bed'
        case BEDS_2: return '2 Beds'
        case BEDS_3: return '3 Beds'
        case BEDS_4: return '4+ Beds'
        default:     return 'All beds'
    }
}

function bathText(code) {
    switch (code) {
        case BATHS_1: return '1+ Baths'
        case BATHS_2: return '2+ Baths'
        case BATHS_3: return '3+ Baths'
        default:      return 'All baths'
    }
}

class BedBathSelect extends React.Component {

    static propTypes = {
        dispatchStateChange: T.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            beds    : null,      // null means all
            baths   : null,      // null means all
            mode    : MODE_BEDS, // MODE_BEDS or MODE_BATHS
            expanded: false
        }
    }

    render() {
        return (
            <div>
                <a
                    className="button dropdown-trigger"
                    style={{ width: '100%' }}
                    href="#"
                    title="rents"
                    onClick={e => this._handleClickTrigger(e)}
                >
                    <div style={{ position: 'relative', width: '100%' }}>
                        {this._filterText()}
                        <span style={{ position: 'absolute', right: '0' }}>
                            {this.renderCaret()}
                        </span>
                    </div>
                </a>

                <aside className="menu">
                    {this.state.expanded ? this.renderBedsDropdown() : ''}
                    {this.state.expanded ? this.renderBathsDropdown() : ''}
                </aside>
            </div>
        )
    }

    renderCaret() {
        return (this.state.expanded
            ? <i className="fa fa-caret-up" aria-hidden="true"></i>
            : <i className="fa fa-caret-down" aria-hidden="true"></i>
        )
    }

    renderBedsDropdown() {
        const {beds} = this.state

        return (
            <div>
                <h4 className='subtitle' style={{ margin: '1rem 0 0.5rem 0' }}>
                    Beds
                </h4>
                <ul className="menu-list beds-options">
                    <li style={{ padding: '0.5rem 0' }}>
                        <label className="radio" htmlFor="ALL_BEDS">
                            <input id="ALL_BEDS" type="radio" checked={beds === null} onChange={e => this._updateBeds(null)}/>
                            {bedText(null)}
                        </label>
                    </li>
                    <li style={{ padding: '0.5rem 0' }}>
                        <label className="radio" htmlFor="STUDIO">
                            <input id="STUDIO" type="radio" checked={beds === STUDIO} onChange={e => this._updateBeds(STUDIO)}/>
                            {bedText(STUDIO)}
                        </label>
                    </li>
                    <li style={{ padding: '0.5rem 0' }}>
                        <label className="radio" htmlFor="BEDS_1">
                            <input id="BEDS_1" type="radio" checked={beds === BEDS_1} onChange={e => this._updateBeds(BEDS_1)}/>
                            {bedText(BEDS_1)}
                        </label>
                    </li>
                    <li style={{ padding: '0.5rem 0' }}>
                        <label className="radio" htmlFor="BEDS_2">
                            <input id="BEDS_2" type="radio" checked={beds === BEDS_2} onChange={e => this._updateBeds(BEDS_2)}/>
                            {bedText(BEDS_2)}
                        </label>
                    </li>
                    <li style={{ padding: '0.5rem 0' }}>
                        <label className="radio" htmlFor="BEDS_3">
                            <input id="BEDS_3" type="radio" checked={beds === BEDS_3} onChange={e => this._updateBeds(BEDS_3)}/>
                            {bedText(BEDS_3)}
                        </label>
                    </li>
                    <li style={{ padding: '0.5rem 0' }}>
                        <label className="radio" htmlFor="BEDS_4">
                            <input id="BEDS_4" type="radio" checked={beds === BEDS_4} onChange={e => this._updateBeds(BEDS_4)}/>
                            {bedText(BEDS_4)}
                        </label>
                    </li>
                </ul>
            </div>
        )
    }

    renderBathsDropdown() {
        const {baths} = this.state

        return (
            <div>
                <h4 className='subtitle' style={{ margin: '1rem 0 0.5rem 0' }}>
                    Baths
                </h4>
                <ul className="menu-list baths-options">
                    <li style={{ padding: '0.5rem 0' }}>
                        <label className="radio" htmlFor="ALL_BATHS">
                            <input id="ALL_BATHS" type="radio" checked={baths === null} onChange={e => this._updateBaths(null)}/>
                            {bathText(null)}
                        </label>
                    </li>
                    <li style={{ padding: '0.5rem 0' }}>
                        <label className="radio" htmlFor="BATHS_1">
                            <input id="BATHS_1" type="radio" checked={baths === BATHS_1} onChange={e => this._updateBaths(BATHS_1)}/>
                            {bathText(BATHS_1)}
                        </label>
                    </li>
                    <li style={{ padding: '0.5rem 0' }}>
                        <label className="radio" htmlFor="BATHS_2">
                            <input id="BATHS_2" type="radio" checked={baths === BATHS_2} onChange={e => this._updateBaths(BATHS_2)}/>
                            {bathText(BATHS_2)}
                        </label>
                    </li>
                    <li style={{ padding: '0.5rem 0' }}>
                        <label className="radio" htmlFor="BATHS_3">
                            <input id="BATHS_3" type="radio" checked={baths === BATHS_3} onChange={e => this._updateBaths(BATHS_3)}/>
                            {bathText(BATHS_3)}
                        </label>
                    </li>
                </ul>
            </div>
        )
    }

    // ---
    // LIFECYCLE METHODS
    // ---

    componentDidUpdate(prevProps, prevState) {
        const {dispatchStateChange} = this.props

        // Notify the parent component about the new state.
        dispatchStateChange(this.state)
    }

    // ---
    // FORM EVENT HANDLERS
    // ---

    // Show beds baths if those values exist
    // if value exists, set state
    _filterText() {
        const {beds, baths} = this.state

        return `${bedText(beds)} x ${bathText(baths)}`
    }

    _handleClickTrigger(e) {
        e.preventDefault()
        this.setState({
            expanded: !this.state.expanded,
            mode: MODE_BEDS
        })
    }

    _updateBeds(value) {
        this.setState({expanded: true, mode: MODE_BATHS, beds: value})
    }

    _updateBaths(value) {
        this.setState({expanded: false, mode: MODE_BEDS, baths: value})
    }
}

export default BedBathSelect
