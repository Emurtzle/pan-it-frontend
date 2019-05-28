import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Section, Content } from 'react-bulma-components'

class OpenModal extends Component {
    static propTpes = {
        modal: PropTypes.object,
        children: PropTypes.node.isRequired
    }

    static defaultProps = {
        modal: {}
    }

    state = {
        show: false
    }

    open = () => this.setState({ show: true })
    open = () => this.setState({ show: false })

    render() {
        return(
            <div>
                <
            </div>
        )
    }
}

export default OpenModal;