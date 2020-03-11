import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchHomeData } from '../actions/homeActions';
import ItemList from '../components/ItemList';

const mapStateToProps = state => {
    return {
        data: state.homeReducer.data,
        status: state.homeReducer.status
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchHomeData())
    };
}

class Home extends Component {
    componentDidMount = () => {
        this.props.fetchData();
    }

    render() {
        let component = null;

        if(this.props.status === "REQUEST")
            component = (
                <div>Loading</div>
            );
        else if(this.props.status === "SUCCESS" && this.props.data.length > 0)
            component = (
                <ItemList data={this.props.data} />
            )
        else if(this.props.status === "ERROR")
            component = (
                <div>{this.props.status}</div>
            );
        else
            component = (
                <div>No data</div>
            );

        return (
            <div>
                {component}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);