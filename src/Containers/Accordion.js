import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AccordionSection from '../Components/AccordionSection'

class Accordion extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Object).isRequired
    }

    constructor(props) {
        super(props)

        const openSections = {}

        this.state = {openSections}
    }

    onClick = (label) => {
        const {state: {openSections }} = this
        const isOpen = !!openSections[label]

        this.setState({ openSections: { [label]: !isOpen } });
    }

    render () {
        const { onClick, props: { children }, state: { openSections } } = this

        return (
            <div style={{ 
                border: '2px solid #FF9B6D',
                background: '#FF9B6D'
            }}>
                {children.map((child, index) => (
                    <AccordionSection
                        isOpen={!!openSections[child.props.label]}
                        label={child.props.label}
                        onClick={onClick}
                        key={index}
                    >
                        {child.props.children}
                    </AccordionSection>
                ))}
            </div>
        )
    }
}

export default Accordion;