import React from 'react';
import ReactMarkdown from 'react-markdown';
import objectAssign from 'object-assign';

var MDEditor = React.createClass({
  getDefaultProps(){
    return {
      enableHTML: true,
      textAreaStyle: {},
      buttonStyle: {}
    };
  },
  propTypes: {
    value: React.PropTypes.string.isRequired,
    enableHTML: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    textAreaStyle: React.PropTypes.object,
    buttonStyle: React.PropTypes.object
  },
  getInitialState(){
    return {
      preview: false
    };
  },
  componentWillReceiveProps(nP){
    if (nP.imageImport !== this.props.imageImport) {
      this.insertAtCursor(`![](${nP.imageImport}`, true, null, ')', nP.imageImport.length + 4);
    }
  },
  setCaretPosition(caretPos) {
    var textarea = this.refs.text;
    if (textarea !== null) {
      if (textarea.createTextRange) {
        var range = textarea.createTextRange();
        range.move('character', caretPos);
        range.select();
      } else {
        if (textarea.selectionStart) {
          textarea.focus();
          textarea.setSelectionRange(caretPos, caretPos);
        } else {
          textarea.focus();
        }
      }
    }
  },
  getSelection(value){
    var cursorIndexStart = this.refs.text.selectionStart;
    var cursorIndexEnd = this.refs.text.selectionEnd;
    var selection = value.substring(cursorIndexStart, cursorIndexEnd);
    return {
      cursorIndexStart: cursorIndexStart,
      cursorIndexEnd: cursorIndexEnd,
      selection: selection
    };
  },
  insertAtCursor(markdownLeftOrLR, right, _selection, markdownRight, cursorPosOffset) {
    var value = this.props.value;
    var selectionProps = this.getSelection(value);
    var cursorIndexStart = selectionProps.cursorIndexStart;
    var cursorIndexEnd = selectionProps.cursorIndexEnd;
    var selection = _selection ? _selection : selectionProps.selection;
    value = value.substring(0, cursorIndexStart)
      + `${markdownLeftOrLR}${selection.length > 0 ? selection : ''}${right ? markdownRight ? markdownRight :  markdownLeftOrLR : ''}`
      + value.substring(cursorIndexEnd, value.length);
    this.props.onChange(value);
    if (selection.length === 0) {
      setTimeout(()=>{
        this.setCaretPosition(cursorIndexStart + markdownRight ? cursorIndexEnd + cursorPosOffset : markdownLeftOrLR.length);
      }, 0);
    }
  },
  handleList(ordered){
    var list = this.getSelection(this.props.value).selection.split(/\r?\n/);
    console.log(list);
    var newList = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].length > 0) {
        newList.push(`${ordered ? i + 1 + '.' : '-'} ${list[i]}`); 
      }
    }
    newList = newList.join('\n');
    this.insertAtCursor('', false, newList);
  },
  handleYoutube(){
    var url = prompt('Enter a YouTube URL.');
    console.log(url);
    var videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoId === null) {
      return;
    }
    this.insertAtCursor(`[![](https://img.youtube.com/vi/${videoId[1]}/0.jpg)](https://www.youtube.com/watch?v=${videoId[1]}`, true, null, ')', 4);
  },
  handleTextChange(e){
    this.props.onChange(e.target.value);
  },
  render:function(){
    var p = this.props;
    var s = this.state;
    const textAreaStyle = {
      width: '100%',
      outline: '0',
      border: '1px solid #cccccc',
      height: '500px',
      padding: '4px 8px'
    };
    objectAssign(textAreaStyle, p.textAreaStyle);
    const buttonStyle = {
      outline: '0',
      border: '1px solid #cccccc',
      margin: '0px 2px',
      padding: '4px 8px',
      cursor: 'pointer',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
      marginLeft: '4px',
      lineHeight: '1'
    };
    objectAssign(buttonStyle, p.buttonStyle);
    return (
      <div>
        <div style={{marginLeft: '-4px', marginBottom: '4px'}}>
          <button style={buttonStyle} onClick={()=>this.insertAtCursor('**', true)}><i className="fa fa-bold" /></button>
          <button style={buttonStyle} onClick={()=>this.insertAtCursor('_', true)}><i className="fa fa-italic" /></button>
          <button style={buttonStyle} onClick={()=>this.insertAtCursor('### ', false)}><i className="fa fa-header" /></button>
          <button style={buttonStyle} onClick={()=>this.handleList(false)}><i className="fa fa-list" /></button>
          <button style={buttonStyle} onClick={()=>this.handleList(true)}><i className="fa fa-list-ol" /></button>
          {p.enableHTML ? <button style={buttonStyle} onClick={()=>this.insertAtCursor('<blockquote>', true, null, '</blockquote>', 12)}><i className="fa fa-quote-right" /></button> : null}
          <button style={buttonStyle} onClick={()=>this.insertAtCursor('```', true, null, '```', 3)}><i className="fa fa-code" /></button>
          <button style={buttonStyle} onClick={()=>this.insertAtCursor('[', true, null, ']()', 3)}><i className="fa fa-link" /></button>
          <button style={buttonStyle} onClick={()=>this.insertAtCursor('![](', true, null, ')', 4)}><i className="fa fa-file-image-o" /></button>
          <button style={buttonStyle} onClick={this.handleYoutube}><i className="fa fa-youtube" /></button>
          <button style={buttonStyle} onClick={()=>this.setState({preview: !this.state.preview})}><i className={`fa fa-${s.preview ? 'pencil' : 'eye'}`} /><span style={{marginLeft: '6px'}}>{s.preview ? 'Editor' : 'Preview'}</span></button>
        </div>
        <div>
          {s.preview ?
          <ReactMarkdown source={p.value} escapeHtml={!p.enableHTML}/>
          :
          <textarea ref="text" style={textAreaStyle} value={p.value} onChange={this.handleTextChange} placeholder={`Use Markdown ${p.enableHTML ? 'or HTML ' : ''}for formatting...`}/>}
        </div>
      </div>
    );
  }
});

window.MDEditor = MDEditor;
export default MDEditor;