import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import $ from 'jquery';

function FillMe(props) {
    return <h1>FILL ME UP PLEASE</h1>;
}

// class GenericList extends React.Component {
//
//     loadFromServer() {
//         $.ajax({
//             url: this.props.url,
//             datatype: 'json',
//             cache: false,
//             success: function (data) {
//                 this.setState({data: data})
//             }.bind(this)
//         })
//     }
//
//     getInitialState() {
//         return {data: []}
//     }
//
//     componentDidMount() {
//         this.loadFromServer();
//         setInterval(this.loadFromServer,
//             this.props.pollInterval)
//     }
//
// }

class TargetList extends React.Component {

    constructor(props) {
    super(props);
    this.loadFromServer = this.loadFromServer.bind(this);
    this.state = { data: [] };
  }

  loadFromServer() {
        $.ajax({
            url: this.url,
            datatype: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data})
            }.bind(this)
        })
    }

    componentDidMount() {
        this.loadFromServer();
        setInterval(this.loadFromServer,
            this.pollInterval)
    }

    render() {
        if (this.state.data) {
            console.log("Refreshing compound load")
            //
            return this.state.data.map(data => (
                <h3>{data}</h3>
            ));
        }
        else {
            return (<FillMe />)
        }
    }
}

function Welcome(props) {
  return <h1>Hello there, {props.name}</h1>;
}

const element = <Welcome name="anthony" />;
const target_div = <TargetList url='/v0.1/targets/' pollInterval={1000} />;

// The links between data and what is rendered
ReactDOM.render(element, document.getElementById('react'));
ReactDOM.render(target_div, document.getElementById('targets'))