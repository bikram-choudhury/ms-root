import React, { Component } from 'react';

export default class ButtonComponent extends Component {
    render() {
        console.log(this.props);
        return <input type={this.props.type} className={this.props.classList} value={this.props.value} onClick={this.props.onClick} />
    }
}