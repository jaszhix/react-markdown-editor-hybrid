import React from 'react';
import ReactDOM from 'react-dom';
import MDEditor from '../src/index';

class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
  }
  handleTextChange = (e) => {
    this.setState({value: e});
  }
  render(){
    return (
      <MDEditor value={this.state.value} onChange={this.handleTextChange} textAreaStyle={{width: '800px'}} />
    );
  }
};

ReactDOM.render(<Component />, document.getElementById('editor'));

