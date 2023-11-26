
import FileUpload from '../file_upload/file_upload.js';
import ChoosePrinter from '../choose_printer/choose_printer.js';
import PrintingConfig from '../print_config/print_config.js';
import { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import "./print_file.css"
import "../print_config/print_config.css"
import Modal from 'react-modal'
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const PrintingFile = () => {
  const token = cookies.get("TOKEN");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('upload');
  const [sharedState, setSharedState] = useState({
    printer_id: 1,
    file_path: '',
    file_name: '',
    paper_size:'',
    pages_to_print:'',
    is_double_side:'',
    number_of_copies:'',
    print_type:'',
  });
  const [completeState,setCompleteState]=useState(sharedState);
  const handleValueChange = (name, value) => {
    setSharedState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'upload':
        return <FileUpload value={[sharedState.file_name, sharedState.file_path]} onValueChange={handleValueChange}/>;
        break;
        case 'printer':
        // return <ChoosePrinter value={sharedState.printer_id} onValueChange={handleValueChange}/>;
        break;
      case 'config':
        return <PrintingConfig sharedState={sharedState}
          setSharedState={handleValueChange} 
          handleSubmit={handleSubmit}/>;
        break;
      default:
        return <FileUpload value={[sharedState.file_name, sharedState.file_path]} onValueChange={handleValueChange}/>;
    }
  };  
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [isModalCompleteOpen, setModalCompleteOpen] = useState(false);

  const handleComplete = () =>{
      // onValueChange('paper_size',paper_size);
      // onValueChange('is_double_side',(is_double_side===2));
    console.log(sharedState);
    console.log("completeState: ",completeState);
    axios.post("/api/printfile/makeUpdateRequest", {
      sharedState,
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            console.log(response);
            setCompleteState(sharedState);
            setModalCompleteOpen(true);
            setErrorMessage();
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          }
        })
      
  }

  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = () => {
    axios.post("/api/printfile/makePrintRequest", {
      completeState,
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            // console.log("user_id:",response);
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          }
        })
  }

  

  return (
    <div>
        <div className="title-config-container">
            <h1>In ấn</h1>
            <h5>Vui lòng thiết lập các thông tin sau đây</h5>
        </div>
        <div className="prtview-button-container">
            <span className='config-button-span'>
                <button className='configbtn' onClick={() => setCurrentPage('upload')}>Tải file lên</button>
                <button className='configbtn' onClick={() => setCurrentPage('printer')}>Chọn máy in</button>
                <button className='configbtn' onClick={() => setCurrentPage('config')}>Cấu hình in</button>
            </span>
            <span className='config-printbtn-span'>
                <button className='config-printbtn' onClick={openModal}> In! </button>
                    <Modal className={"popup-confirm-config"} overlayClassName={"cfm-config-ctn"}
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        ariaHideApp={false}
                    >
                        <h2>Xác nhận in ấn</h2>
                        <div className='upload-file-ctn'>
                          <label className='upload-file-lb'>File tải lên</label>
                          <div className='upload-file-name'>tên file</div>
                        </div>
                        <label className='selected-printer-confirm-lb'>Máy in đã chọn</label>
                        <div className='selected-printer-confirm-ctn'>
                          <h6>Máy in ID</h6>
                          <div className='slt-prt-info'>
                            <span className='slt-prt-cfm-left'>
                              <p className='cfm-config-p'>Tên thương hiệu: Canon</p>
                              <p className='cfm-config-p'>Mẫu: brandname</p>
                              <p className='cfm-config-p'>Cơ sở: campus</p>
                              <p className='cfm-config-p'>Tòa: abc</p>
                              <p className='cfm-config-p'>Phòng: abc</p>
                            </span>
                            <span className='slt-prt-cfm-right'>
                              <p className='cfm-config-p'>Mô tả: mới ,không lem ...</p>
                              <p className='cfm-config-p'>Tình trạng: Đang kích hoạt </p>
                            </span>
                          </div>
                        </div>
                        <label className='selected-printer-confirm-lb'>Cấu hình in</label>
                        <div className='selected-printer-confirm-ctn'>
                          <div className='slt-cfg-cfm-left'>
                            <p className='cfm-config-p'>Khổ giấy: {completeState.paper_size}</p>
                            <p className='cfm-config-p'>{ (completeState.is_double_side)? 'In hai mặt':'In một mặt'}</p>
                            <p className='cfm-config-p'>Số bản in: {completeState.number_of_copies}</p>
                            <p className='cfm-config-p'>Trang in: {completeState.pages_to_print}</p>
                            <p className='cfm-config-p'>Loại in: {completeState.print_type}</p>
                          </div>
                        </div>
                        <div className='btn-ctn-cfm-cfg'>
                          <p className='cfm-config-p'>Chắc chắn đây là thiết lập của bạn?</p>
                          <button onClick={() => {closeModal(); handleSubmit()}} className="cfm-config-btn">Đúng. Yêu cầu in</button>
                        </div>
                    </Modal>
            </span>
        </div>
      <div>
        {renderPage()}
        {currentPage === 'config' && (
          <div className='config-container'>
            <div className="attribute-config side-page-config">
              <button value="1" className="back-btn">
                Quay lại
              </button>
              <button value="2" className="complete-btn" onClick={() => handleComplete()}>
                Hoàn thành
              </button>
              <Modal
                className={"popup-complete-config"}
                overlayClassName={"complete-config-ctn"}
                isOpen={isModalCompleteOpen}
                onRequestClose={() => setModalCompleteOpen(false)}
                ariaHideApp={false}
              >
                <h2>Thông báo</h2>
                <span className="span-complete-config">
                  <p className="complete-noti-content">Thiết lập cấu hình in thành công</p>
                  <button onClick={() => setModalCompleteOpen(false)} className="complete-noti-btn">
                    OK
                  </button>
                </span>
              </Modal>
            </div>
            <p>{errorMessage ? errorMessage : ""}</p>
          </div>
        )}
        
        {console.log(sharedState.printer_id)}
        {console.log(sharedState.file_path)}
      </div>
    </div>
  );
};

export default PrintingFile;