import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AccordionSection extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Object).isRequired,
        isOpen: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }

    onClick = (ev) => {
        this.props.onClick(this.props.label)
    }

    render () {
        const { onClick, props: { isOpen, label }} = this

        return(
            <div style={{
                background: isOpen ? '#FF7C60' : '#FF9B6D',
                border: '1px solid #FF9B6D',
                padding: '5px 10px',
                color: isOpen ? '#000000': '#F2F1DC'
            }}>
                <div onClick={onClick} style={{ cursor: 'pointer' }}>
                    {label}
                    <div style={{ float: 'right' }}>
                        {!isOpen && <span>&#9650;</span>}
                        {isOpen && <span>&#9660;</span>}
                    </div>
                </div>

                {isOpen && (
                    <div style={{
                        background: '#FF9B6D',
                        border: '10px solid #FF9B6D',
                        marginTop: 10
                    }}>
                        {this.props.children}
                    </div>
                )}
            </div>
        );
    }

}

export default AccordionSection;