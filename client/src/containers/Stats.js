import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchStats } from "../actions";

class BaseInput extends Component {
    componentWillMount() {
        this.props.fetchStats();
    }
    
    render() {
        return (
            <div>
                <h3>Stats</h3>
                <p>The most converted currency is {this.props.topCurrency}, requested {this.props.highestNum} times</p>
                <p>The total number of conversions made is {this.props.totalReq}, for a total {this.props.totalUSD}$</p>
            </div>
        );
    }
}

function mapStateToProps({stats}){
    return { 
        highestNum: stats.highestNum,
        topCurrency: stats.topCurrency,
        totalReq: stats.totalReq,
        totalUSD: stats.totalUSD ? stats.totalUSD.toFixed(2) : stats.totalUSD
    };
}

export default connect(mapStateToProps, { fetchStats })(BaseInput);