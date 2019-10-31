import React, {Component} from 'react'

import {DropzoneArea} from 'material-ui-dropzone'

export default class FileUploadForm extends Component{
    constructor(props){
        super(props);
        this.state = {
          files: []
        };
      }
      handleChange(files){
        this.setState({
          files: files
        });
      }
  render(){
    return (
      <DropzoneArea 
        onChange={this.handleChange.bind(this)}
        />
    )  
  }
} 

