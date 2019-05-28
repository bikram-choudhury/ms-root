import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputComponent extends Component {
    /*constructor(props){
        super(props);
    }*/
    render() {
        return <input type={this.props.type} name={this.props.name} className={this.props.classList} placeholder={this.props.placeholder} onChange={this.props.onChange} value={this.props.value} readOnly={this.props.readonly} />
 }
}

InputComponent.defaultProps = {
    type: 'text',
    placeholder: 'No Value',
    readonly: false
}

InputComponent.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    classList: PropTypes.string,
    onChange: PropTypes.func,
    readonly: PropTypes.bool
}