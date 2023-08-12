import React, { Component } from 'react';
import axios from 'axios';

class ProjectsForm extends Component {
  state = {
    imageFile: null,
    title: '', 
    description: '',
    stacks: '',
    year: '',
    code: '',
    link: '',
    confirm: false,
  }

  fileSelectedHandler = event => {
    this.setState({
      imageFile: event.target.files[0]
    });
  }

  // Generic function to update state for any field
  handleFieldChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value
    });
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('title', this.state.title);
    fd.append('description', this.state.description);
    fd.append('stacks', this.state.stacks);
    fd.append('year', this.state.year);
    fd.append('code', this.state.code);
    fd.append('link', this.state.link);
    fd.append('image', this.state.imageFile, this.state.imageFile.name);
  
    axios.post('http://localhost:3000/api/admin/projects', fd).then(res => {
      console.log(res);
    });
  }
  
  render() {
    return (
      <div>
        <input type="file" onChange={this.fileSelectedHandler} />

        <label htmlFor="title">Project Title:</label>
        <input
          type="text"
          id="title"
          value={this.state.title}
          placeholder="Auctions Web Application"
          onChange={e => this.handleFieldChange('title', e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={this.state.description}
          onChange={e => this.handleFieldChange('description', e.target.value)}
          placeholder="Developed a web application in Python's Django framework that allows users to create auctions and bid on other auctions."
          required
          className="big-input"
        ></textarea>

        <label htmlFor="techStacks">Tech Stacks:</label>
        <input
          type="text"
          id="techStacks"
          value={this.state.stacks}
          placeholder="Django, Python, HTML, CSS, Bootstrap, SQLite"
          onChange={e => this.handleFieldChange('stacks', e.target.value)}
          required
        />

        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          value={this.state.year}
          onChange={e => this.handleFieldChange('year', e.target.value)}
          placeholder="2022"
          required
        />

        <label htmlFor="githubLink">GitHub Link:</label>
        <input
          type="text"
          id="githubLink"
          value={this.state.code}
          onChange={e => this.handleFieldChange('code', e.target.value)}
          placeholder="https:/github.com/username/project"
          required
        />

        <label htmlFor="webLink">Web Link:</label>
        <input
          type="text"
          id="webLink"
          value={this.state.link}
          placeholder="Optional"
          onChange={e => this.handleFieldChange('link', e.target.value)}
        />

        <button onClick={this.fileUploadHandler}>Submit</button>
      </div>
    );
  }
}

export default ProjectsForm;
