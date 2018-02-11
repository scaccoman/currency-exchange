import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchExchange, fetchStats } from "../actions";

import Input from "../components/Input.js";
import CurrencySelect from "../components/CurrencySelect.js";
import Currencies from "../components/Currencies.js";

class Converter extends Component {
    constructor(props){
        super(props);
        
        this.state = {amount: 1, base: "USD", target: "EUR"};
        this.onInputChange = this.onInputChange.bind(this);
        this.onBaseChange = this.onBaseChange.bind(this);
        this.onTargetChange = this.onTargetChange.bind(this);
    }
    
    componentWillMount() {
        this.props.fetchExchange(this.state.amount, this.state.base, this.state.target);
    }
    
    onInputChange(event) {
        this.setState({ amount: event.target.value });
        this.props.fetchExchange(event.target.value, this.state.base, this.state.target);
        this.props.fetchStats();
    }
    
    onBaseChange(event) {
        if (event && event.value){
            this.setState({ base: event.value });
            this.props.fetchExchange(this.state.amount, event.value, this.state.target);
            this.props.fetchStats();
        }
    }
    
    onTargetChange(event) {
        if (event && event.value){
            this.setState({ target: event.value });
            this.props.fetchExchange(this.state.amount, this.state.base ,event.value);
            this.props.fetchStats();
        }
    }
    
    render() {
        return (
            <div>
                <div>
                    <Input
                        inputValue={this.state.amount}
                        onInputChange={this.onInputChange}
                    />
                    <CurrencySelect 
                        selected={this.state.base}
                        onChange={this.onBaseChange}
                        currencies={Currencies}
                    />
                </div>
                <div>
                    <Input
                        inputValue={this.props.amount || 0}
                    />
                    <CurrencySelect 
                        selected={this.state.target}
                        onChange={this.onTargetChange}
                        currencies={Currencies}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ currency }){
    return { amount: currency };
}

export default connect(mapStateToProps, { fetchExchange, fetchStats })(Converter);