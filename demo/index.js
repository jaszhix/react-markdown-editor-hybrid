import React from 'react';
import ReactDOM from 'react-dom';
import MDEditor from '../src/index';

var Component = React.createClass({
  getInitialState(){
    return {
      value: ''
    };
  },
  handleTextChange(e){
    this.setState({value: e});
  },
  render:function(){
    return (
      <MDEditor value={this.state.value} onChange={this.handleTextChange} textAreaStyle={{width: '800px'}} />
    );
  }
});

ReactDOM.render(<Component />, document.getElementById('editor'));

