import React, { PropTypes as T } from 'react'

class StaticContainer extends React.Component {

    static propTypes = {
        shouldUpdate: T.bool,
        children: T.any,
    }

    render() {
        return this.props.children
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.shouldUpdate
    }
}

export default StaticContainer
