import React, { PropTypes as T } from 'react'
import ClassNames                from 'classnames'

class FilterButton extends React.Component {

    static propTypes = {
        children : T.any,
        active   : T.any,
        filterId : T.any,
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        // console.debug(this.props)

        const caretClassNames = ClassNames({
            "fa"           : true,
            "fa-caret-up"  : this.props.active,
            "fa-caret-down": !this.props.active,
        })

        const buttonClassNames = ClassNames({
            "button"               : true,
            "is-active is-primary" : this.props.active,
        })

        return (
            <div
                className={buttonClassNames}
                style={{ width: '100%' }}
                href="#"
                title=""
                onClick={e => this.props.onClick(e) }
            >
                  <div style={{ position: 'relative', width: '100%' }}>
                    {this.props.children}
                    <span style={{ position: 'absolute', right: '0' }}>
                        <i className={caretClassNames} aria-hidden="true"></i>
                    </span>
                </div>
            </div>
        )
    }
}

export default FilterButton
