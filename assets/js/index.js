import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import $ from 'jquery';

function FillMe(props) {
    return <h1>FILL ME UP PLEASE</h1>;
}

class GenericList extends React.Component {

    constructor(props) {
    super(props);
        this.url = '/v0.1/'
        this.interval = 1000
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
            this.interval)
    }

    render() {
        if (this.state.data) {
            console.log(this.props.message)
            //
            return this.state.data.map((data, index) => (
                this.render_method(data,index)
            ));
        }
        else {
            return (<FillMe />)
        }
    }

}

class TargetList extends GenericList {
        constructor(props) {
            super(props);
            this.url = '/v0.1/targets/'
            this.interval = 1000
            this.render_method = function (data, index) {
                return <h3 key={index}>{data.title}</h3>
            }
        }
};

class TargetListLink extends TargetList {
        constructor(props) {
            super(props);
            this.render_method = function (data, index) {
                return <a key={index}>{data.title}</a>
            }
        }
};




function Welcome(props) {
  return <h1>Hello there, {props.name}</h1>;
}

const element = <Welcome name="anthony" />;
const target_div = <TargetListLink />;

// The links between data and what is rendered
ReactDOM.render(element, document.getElementById('react'));
ReactDOM.render(target_div, document.getElementById('targets'))