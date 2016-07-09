<p align="center">
  <a href="https://npmjs.org/package/react-markdown-editor-hybrid">
    <img src="https://img.shields.io/npm/v/react-markdown-editor-hybrid.svg?style=flat-square"
         alt="NPM Version">
  </a>
  <!-- <a href="https://travis-ci.org/jaszhix/react-markdown-editor-hybrid">
    <img src="https://img.shields.io/travis/jaszhix/react-markdown-editor-hybrid.svg?style=flat-square"
         alt="Build Status">
  </a> -->
  <a href="https://npmjs.org/package/react-markdown-editor-hybrid">
    <img src="http://img.shields.io/npm/dm/react-markdown-editor-hybrid.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/jaszhix/react-markdown-editor-hybrid.svg">
    <img src="https://david-dm.org/jaszhix/react-markdown-editor-hybrid.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/jaszhix/react-markdown-editor-hybrid/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-markdown-editor-hybrid.svg?style=flat-square"
         alt="License">
  </a>
</p>

[Demo](http://jaszhix.com/react-markdown-editor-hybrid/)

### Install Using NPM

```sh
npm install --save react-markdown-editor-hybrid
```

```js
import MDEditor from 'react-markdown-editor-hybrid';
```

### Features

  * Bold, italics, header, ordered/unordered lists, code block, link, image, and YouTube buttons.
  * Quote block HTML button.
  * Clicking an editor button with no text selected will position the cursor where you can start typing with formatted Markdown.
  * Preview mode rendered with [react-markdown](https://github.com/rexxars/react-markdown).

### Example Usage

```js
var Component = React.createClass({
  getInitialState(){
    return {
      value: ''
    };
  },
  render:function(){
    return (
      <MDEditor value={this.state.value} onChange={(e)=>this.setState({value: e})} />
    );
  }
});
```

### Props

  * ```value```: Provides state to the editor. Required.
  * ```onChange```: Fires when text input has changed. Required.
  * ```enableHTML```: Enables the blockquote button, and HTML rendering in the react-markdown preview. Default is ```true```. Optional.
  * ```textAreaStyle```: Assigns style properties to the text area. Optional.
  * ```buttonStyle```: Assigns style properties to the button elements. Optional.
  * ```buttonContainerStyle```: Assigns style properties to the buttons container. Optional.