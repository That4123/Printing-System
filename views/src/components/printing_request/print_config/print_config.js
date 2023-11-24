
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import "./print_config.css"

function PrintingConfig() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [activeButton, setActiveButton] = useState(null);

    const toggleActive = (value) => {
        setActiveButton(value);
    };
    const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
        
        <div className="config-container">
            <div className="attribute-config">
                <label>Khổ giấy </label>
                <select value={selectedOption} onChange={handleChange}>
                    <option value="">Lựa chọn khổ giấy</option>
                    <option value="A3">A3</option>
                    <option value="A4">A4</option>
                    <option value="A5">A5</option>
                </select>
            </div>
            <div className="attribute-config side-page-config">
                <button
                    value={1}
                    onClick={() => toggleActive(1)}
                    className={activeButton === 1 ? 'active' : ''}
                >
                    In một mặt
                </button>
                <button
                    value={2}
                    onClick={() => toggleActive(2)}
                    className={activeButton === 2 ? 'active' : ''}
                >
                    In hai mặt
                </button>
            </div>
            <div className="attribute-config">
                <label>Trang in</label>
                <input type="text" placeholder="e.g. 1-3,5,6-8"/>
            </div>
            <div className="attribute-config">
                <label>Số bản in</label>
                <input type="number" />
            </div>
            <div className="attribute-config">
                <label>Loại in</label>
                <select value={selectedOption} onChange={handleChange}>
                    <option value="">Lựa chọn loại in</option>
                    <option value="In màu">In màu</option>
                    <option value="In thường">In thường</option>
                </select>
            </div>
            <div class="attribute-config side-page-config">
                <button value="1" class="back-btn">Quay lại</button>
                <button value="2" class="complete-btn" onClick={openModal}>Hoàn thành</button>
                    <Modal className={"popup-complete-config"} overlayClassName={"complete-config-ctn"}
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}

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