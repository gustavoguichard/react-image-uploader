import React from 'react'

const ImageUploader = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired
  },
  getInitialState() {
    return {
      loading: false,
      fileURL: null
    }
  },
  componentDidMount() {
    this.reader = new FileReader()
    this.reader.onload = this.fileLoaded
  },
  fileLoaded(event) {
    this.setState({ fileURL: event.target.result, loading: false })
  },
  getClassName() {
    return this.state.loading ? 'image-uploader loading' : 'image-uploader'
  },
  handleChange(event) {
    if(event.target.files && event.target.files[0]) {
      this.setState({ loading: true, fileURL: null })
      this.reader.readAsDataURL(event.target.files[0])
    }
  },
  renderImage() {
    if(!!this.state.fileURL)
      return <img src={this.state.fileURL} className="img-preview" alt="Uploaded Image" />
  },
  render() {
    return (
      <div className={this.getClassName()}>
        <input {...this.props} type="file" onChange={this.handleChange} />
        {this.renderImage()}
      </div>
    )
  }
})

module.exports = ImageUploader