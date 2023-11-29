// client/src/App.js
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header';
import Cookies from "universal-cookie";
import './ViewAllPrinter.css'
import '../../styles/themify-icons/themify-icons.css';
import {useParams} from 'react-router-dom';
function ViewPrinterInfomation () {
    const {PrinterId} = useParams();
    const [printers, setPrinters] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [removePrinterId, setRemovePrinterId] = useState(null);
    const [editContent, setEditContent] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        // lấy danh sách máy in từ backend
        axios.post('/api/viewAllPrinter')
          .then(response => setPrinters(response.data))
          .catch(error => console.error('Error fetching printers:', error));
      }, []);
    const handleConfirmRemove = (id) => {
      //Thực hiện việc xoá máy in thông qua id máy in
      //
      //Trả về trang View All Printer
      navigate('/viewAllPrinter')
    }
    const handleSaveClick = (printer) => {
      // Thực hiện lưu thông tin máy in, ví dụ: gọi API để cập nhật thông tin máy in
      console.log('Đã lưu thông tin máy in:', printer.printer_id);
      // Kết thúc chế độ chỉnh sửa
      setIsEditing(false);
    };
    const handleEditClick = (printer) => {
      setEditContent(printer);
      setIsEditing(true);

    };
    const handleRemovePrinter =(id)=>{
      setRemovePrinterId(id);
    }
    const handleReturnBack= () => {
      navigate('/viewAllPrinter')
    }
    const selectedPrinter = printers.find(printers => printers.printer_id === parseInt(PrinterId))
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditContent((prevPrinter) => ({ ...prevPrinter, [name]: value }));
    };
    
    
    return (
      <div>
        {selectedPrinter&&(
          <div className='view-information'>
            <h1>Thông tin máy in {selectedPrinter.printer_id}</h1>
            <i className='ti-printer'></i>
            <div className='printer-information'>
              <div>
                <label>Printer ID:</label> {selectedPrinter.printer_id}
              </div>
              <div>
                <label>Thương hiệu:</label> {isEditing ? (
                <input type="text" name="brand" value={editContent.brand} onChange={handleInputChange} />
                ) : (
                  <span>{selectedPrinter.brand}</span>
                )}
              </div>
              <div>
                <label>Loại máy in:</label> {isEditing ? (
                <input type="text" name="model" value={editContent.model} onChange={handleInputChange} />
                ) : (
                  <span>{selectedPrinter.model}</span>
                )}
              </div>
              <div>
                <label>Cơ sở:</label> {isEditing ? (
                <select name="campusName" value={editContent.campusName} onChange={handleInputChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                ) : (
                  <span>{selectedPrinter.campusName}</span>
                )}
              </div>
              <div>
                <label>Toà:</label> {isEditing ? (
                  <input type="text" name="buildingName" value={editContent.buildingName} onChange={handleInputChange} />
                ) : (
                  <span>{selectedPrinter.buildingName}</span>
                )}
              </div>
              <div>
                <label>Phòng:</label> {isEditing ? (
                  <input type="text" name="roomNumber" value={editContent.roomNumber} onChange={handleInputChange} />
                ) : (
                  <span>{selectedPrinter.roomNumber}</span>
                )}
              </div>
              <div>
                <label>Mô tả:</label> {isEditing ? (
                  <input type="text" name="description"  value={editContent.description} onChange={handleInputChange} />
                ) : (
                  <span>{selectedPrinter.description}</span>
                )}
              </div>
              <div>
                <label>Trạng thái:</label> {isEditing ? (
                  <div className='Edit-status'>
                    <span>{editContent.printer_status}</span>
                    <select name="printer_status" value={editContent.printer_status} onChange={handleInputChange}>
                      <option value="Đang hoạt động">Bật</option>
                      <option value="Không hoạt động">Tắt</option>
                    </select>
                  </div>
                ) : (
                  <span>{selectedPrinter.printer_status}</span>
                )}
              </div>
              {isEditing ? (
                  <button className= "btn1" onClick={() => handleSaveClick(editContent)}>Lưu</button>
                ) : (
                  <button className= "btn1" onClick={() => handleEditClick(selectedPrinter)}>Chỉnh sửa</button>
                )}
              <button className='btn1' onClick={()=>handleReturnBack()}>Trở về</button>
              <button className= "btn1 huy" onClick={()=> handleRemovePrinter(selectedPrinter.printer_id)}> Xoá</button>
              
            </div>
          </div>
        )}
        {removePrinterId && (
        <div className='overlay'>  
        <div className="confirm-dialog">
          <div className="confirm-content">
            <p>Bạn có chắc chắn muốn xoá máy in này?</p>
            <button className = "btn1 huy"onClick={()=>handleConfirmRemove(selectedPrinter.printer_id)}>Xác nhận</button>
            <button className= "btn1 "onClick={()=> setRemovePrinterId(null)}>Không</button>
          </div>
        </div>
        </div>
      )}
      </div>
    );
}
export default ViewPrinterInfomation;