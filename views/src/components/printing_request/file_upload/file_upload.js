import "./file_upload.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {useState } from "react";
import Modal from 'react-modal'
function FileUpload({ value, onValueChange }){
    const [selectedFileName, setSelectedFileName] = useState('Chưa có file được chọn');
    const permittedFileType = ["pdf", "img", "jpg"];
    const getExtension = (filename) => {
        return filename.split('.').pop()
      }
        
      
    const [checkFileType, setCheckFileType] = useState(true)
    const handleFileChange = (event) => {
    const files = event.target.files;
        if (files.length > 0) {
        setSelectedFileName(files[0].name);
        } else {
        setSelectedFileName('');
        }
        onValueChange('file_name', files[0].name);
        onValueChange('file_path', files[0].size);
        if (!permittedFileType.includes(getExtension(files[0].name))){
            setCheckFileType(false)
        }
        else {
            
        }
    };
    const handleToClose = () => {
        setCheckFileType(true);
    };
    return(
        <div>
            <div className="mb-3" style = {{margin: "45px"}}>
                <div className="input-group">
                    <label className="input-group-text" htmlFor="formFileMultiple">
                    Chọn file
                    </label>
                    <input
                    type="file"
                    className="form-control"
                    id="formFileMultiple"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    />
                    <span className="input-group-text" style = {{minWidth: '400px', backgroundColor: 'white'}}>{selectedFileName}</span>
                </div>
            </div>
            <Modal
                isOpen={!checkFileType}
                contentLabel="Example Modal"
                onRequestClose={handleToClose}
                className={"popup-complete-config"} overlayClassName={"complete-config-ctn"}
            >
                <div>Thông báo</div>
                <div>Loại tệp tin không hợp lệ</div>
               
            </Modal>
</div>
        )
}
export default FileUpload;