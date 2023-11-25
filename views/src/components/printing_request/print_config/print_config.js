
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import "./print_config.css"

const PrintingConfig=({ sharedState, setSharedState, setCompleteState }) => {
    const navigate = useNavigate();
    
    const handleChange = (event,name) => setSharedState(name, event.target.value);
    const toggleActive = (value) => setSharedState("is_double_side", value);

    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);  
    };

    const handleComplete = () =>{
        // onValueChange('paper_size',paper_size);
        // onValueChange('is_double_side',(is_double_side===2));
        console.log(sharedState);
        setCompleteState(sharedState);
        openModal();
    }
    

  return (
    <>
        
        <div className="config-container">
            <div className="attribute-config">
                <label>Khổ giấy </label>
                <select value={sharedState.paper_size} onChange={(e)=>{handleChange(e,"paper_size")}}>
                    <option value="">Lựa chọn khổ giấy</option>
                    <option value="A3">A3</option>
                    <option value="A4">A4</option>
                    <option value="A5">A5</option>
                </select>
            </div>
            <div className="attribute-config side-page-config">
                <button
                    value={false}
                    onClick={() => toggleActive(false)}
                    className={sharedState.is_double_side===false ? 'active' : ''}
                >
                    In một mặt
                </button>
                <button
                    value={true}
                    onClick={() => toggleActive(true)}
                    className={sharedState.is_double_side===true ? 'active' : ''}
                >
                    In hai mặt
                </button>
            </div>
            <div className="attribute-config">
                <label>Trang in</label>
                <input type="text" placeholder="e.g. 1-3,5,6-8" value={sharedState.pages_to_print} onChange={(e)=>setSharedState('pages_to_print',e.target.value)}/>
            </div>
            <div className="attribute-config">
                <label>Số bản in</label>
                <input type="number" value={sharedState.number_of_copies} onChange={(e)=>setSharedState('number_of_copies',e.target.value)}/>
            </div>
            <div className="attribute-config">
                <label>Loại in</label>
                <select value={sharedState.print_type} onChange={(e)=>{handleChange(e,'print_type')}}>
                    <option value="null">Lựa chọn loại in</option>
                    <option value="In màu">In màu</option>
                    <option value="In thường">In thường</option>
                </select>
            </div>
            <div className="attribute-config side-page-config">
                <button value="1" className="back-btn">Quay lại</button>
                <button value="2" className="complete-btn" onClick={()=>{handleComplete();}}>Hoàn thành</button>
                    <Modal className={"popup-complete-config"} overlayClassName={"complete-config-ctn"}
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        ariaHideApp={false}
                    >
                        <h2>Thông báo</h2>
                        <span className="span-complete-config">
                            <p className="complete-noti-content">Thiết lập cấu hình in thành công</p>
                            <button onClick={closeModal} className="complete-noti-btn">OK</button>
                        </span>
                    </Modal>
            </div>
        </div>
    </>
  );
}
export default PrintingConfig