import React, { PropTypes as T } from 'react'

class RentSelect extends React.Component {

    static propTypes = {
        emitter: T.object.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            min: props.min,      // null means all
            max: props.max,      // null means all
        }
    }

    render() {
        const { min, max } = this.props

        return (
            <div className="RentSelect">
                {this.renderRange()}

                <div className="columns">
                    <div className="column is-6">
                        <ul className="menu-list min-options" style={{ textAlign: 'left' }}>
                            <li onClick={ e => this._updateMin(null) }><a className={!min         ? 'is-active' : ''}>No Min</a></li>
                            <li onClick={ e => this._updateMin(500)  }><a className={min === 500  ? 'is-active' : ''}>$500</a></li>
                            <li onClick={ e => this._updateMin(700)  }><a className={min === 700  ? 'is-active' : ''}>$700</a></li>
                            <li onClick={ e => this._updateMin(900)  }><a className={min === 900  ? 'is-active' : ''}>$900</a></li>
                            <li onClick={ e => this._updateMin(1100) }><a className={min === 1100 ? 'is-active' : ''}>$1100</a></li>
                            <li onClick={ e => this._updateMin(1300) }><a className={min === 1300 ? 'is-active' : ''}>$1300</a></li>
                            <li onClick={ e => this._updateMin(1500) }><a className={min === 1500 ? 'is-active' : ''}>$1500</a></li>
                        </ul>
                    </div>
                    <div className="column is-6">
                        <ul className="menu-list max-options" style={{ textAlign: 'right' }}>
                            <li onClick={ e => this._updateMax(500)  }><a className={max === 500  ? 'is-active' : ''}>$500</a></li>
                            <li onClick={ e => this._updateMax(700)  }><a className={max === 700  ? 'is-active' : ''}>$700</a></li>
                            <li onClick={ e => this._updateMax(900)  }><a className={max === 900  ? 'is-active' : ''}>$900</a></li>
                            <li onClick={ e => this._updateMax(1100) }><a className={max === 1100 ? 'is-active' : ''}>$1100</a></li>
                            <li onClick={ e => this._updateMax(1300) }><a className={max === 1300 ? 'is-active' : ''}>$1300</a></li>
                            <li onClick={ e => this._updateMax(1500) }><a className={max === 1500 ? 'is-active' : ''}>$1500</a></li>
                            <li onClick={ e => this._updateMax(null) }><a className={!max         ? 'is-active' : ''}>No Max</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    renderRange() {
        return (
            <div
                className="columns"
                style={{ padding: '0', margin: '0' }}
                onKeyDown={e => this._handleKeyDown(e)}
            >
                <div className="column is-6 left-input">
                    <input
                        className="input minRentInput active"
                        maxLength={6}
                        placeholder="Min"
                        type="tel"
                        ref={ input => { this.minInputNode = input }}
                    />
                </div>
                <div className="column is-6 right-input">
                    <input
                        className="input maxRentInput"
                        maxLength={6}
                        placeholder="Max"
                        type="tel"
                        ref={ input => { this.maxInputNode = input }}
                    />
                </div>
            </div>
        )
    }

    renderCaret() {
        return (
            this.props.expanded ? <i className="fa fa-caret-up" aria-hidden="true"></i>
                                : <i className="fa fa-caret-down" aria-hidden="true"></i>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        this._notifyNewStateToRoot()
        this.minInputNode.value = this.props.min
        this.maxInputNode.value = this.props.max
    }

    _handleKeyDown(e) {
        // Reject if the field is blank.
        if(!e.target.value) {
            return null
        }

        // Update the form if Enter or Tab key was pressed.
        if(e.key === 'Enter' || e.key === 'Tab') {
            if (this.minInputNode.value) {
                this._updateMin(this.minInputNode.value)
            }
            if (this.maxInputNode.value) {
                this._updateMax(this.maxInputNode.value)
            }
        }
    }

    _updateMin(value) {
        console.debug(`_updateMin:${value}`)
        const min = parseInt(value, 10)

        // Refect invalid input.
        if (this.props.max && this.props.max <= min) {
            alert("Must be min < max")
            return
        }

        this.setState({ min })
    }

    _updateMax(value) {
        const max = parseInt(value, 10)

        // Refect invalid input.
        if (this.props.min && this.props.min >= max) {
            alert("Must be min < max")
            return
        }

        this.setState({ max })
    }

    _notifyNewStateToRoot() {
        this.props.emitter.emit('RentSelect:updated', this.state)
    }
}

export default RentSelect
