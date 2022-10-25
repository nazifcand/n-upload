import { useState } from "react"
import classNames from "classnames"
import Progressbar from './Progressbar'
import Button from "./Button"

const PROCESS_STATUSES = {
  waiting: 'Waiting',
  uploading: 'Uploading',
  uploaded: 'Uploaded',
  error: 'Error'
}

const NUpload = () => {

  const [files, setFiles] = useState([])

  const onChangeHandler = event => {
    const newFiles = [...event.target.files].map(file => {

      file['preview'] = URL.createObjectURL(file)
      file['uploadedSize'] = 0
      file['status'] = 'waiting'

      return file;
    })
    setFiles(newFiles)
  }

  const removeFileHandler = file => {
    setFiles(files.filter(item => item.name != file.name))
  }

  const UploadInput = () => {
    return <div className="upload-input">
      <label htmlFor="uploadInput">
        <i className="icon ion-ios-cloud-upload upload-icon"></i>
        <span className="upload-text">
          <strong>Click to Upload </strong>
          or drag and drop
        </span>
        <span className="limit-text">Maximum file size 50 MB.</span>
      </label>

      <input type="file" id="uploadInput" onChange={(e) => onChangeHandler(e)} multiple />
    </div>
  }

  const ListFiles = () => {
    if (!files.length) return

    return <div className="list-files">
      {files.map(file => {
        return <FileItem key={file.name} removeFile={() => removeFileHandler(file)} file={file} />
      })}
    </div>
  }

  const FileItem = ({ file, removeFile }) => {
    return <div className={classNames({
      'file': true,
    })}>
      <div className="file-preview">
        <img src={file.preview} alt="" />
      </div>

      <div className="file-detail">
        <div className="file-name">{file.name}</div>
        <div className="file-size">
          {(file.size / (1024 * 1024)).toFixed(2)} MB</div>
        <div className="file-status">
          <Progressbar value={file.uploadedSize} max={file.size} />
          <span className={classNames({
            'file-status-text': true,
            [file.status]: true
          })}>
            {PROCESS_STATUSES[file.status]}
          </span>
        </div>
      </div>

      <i className="icon ion-md-close remove-icon" onClick={() => removeFile()}></i>
    </div>
  }

  const Footer = () => {
    if (!files.length) return;

    return <div className="upload-footer">
      <Button label='Clear' color="danger" onClick={e => setFiles([])} />
      <Button label='Upload' onClick={() => uploadHandler()} />
    </div>
  }

  const uploadHandler = async () => {
    alert('upload file')
  }

  return (
    <div className="upload-wrapper">
      <UploadInput />
      <ListFiles />
      <Footer />
    </div>
  )
}

export default NUpload;