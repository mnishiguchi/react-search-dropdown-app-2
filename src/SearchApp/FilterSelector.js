import React, { PropTypes as T } from 'react'

class FilterSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            min     : null,
            max     : null,
            mode    : MODE_MIN, // MODE_MIN or MODE_MAX
            expanded: false
        }
    }

    render() {
        const dropdown = this.state.mode === MODE_MAX ? this.renderMaxDropdown() : this.renderMinDropdown()

        return (
            <div>
                <a
                    className="button dropdown-trigger"
                    style={{ width: '100%' }}
                    href="#"
                    title="rents"
                    onClick={e => this._handleClickTrigger(e) }
                >
                      <div style={{ position: 'relative', width: '100%' }}>
                        {this._filterText()}
                        <span style={{ position: 'absolute', right: '0' }}>
                            {this.renderCaret()}
                        </span>
                    </div>
                </a>

                <aside className="menu">
                    { this.state.expanded ? dropdown : '' }
                </aside>
            </div>
        )
    }
}

export default FilterSelector
