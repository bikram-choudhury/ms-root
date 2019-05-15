import React, { Component } from 'react';

export default class InputComponent extends Component {
    /*constructor(props){
        super(props);
    }*/
    render() {
        // console.log(this.props);
        return <input type={this.props.type} className={this.props.classList} placeholder={this.props.placeholder} onChange={this.props.onChange} value={this.props.value} />
    }
}