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
import { useParams } from 'react-router-dom';

const cookies = new Cookies();

function ViewAllPrinter() {
  const [printers, setPrinters] = useState([]);

  useEffect(() => {
    // lấy danh sách máy in từ backend
    axios.post('/api/viewAllPrinter')
      .then(response => setPrinters(response.data))
      .catch(error => console.error('Error fetching printers:', error));
  }, []);
  const setColorByStatus = (status)=> {
    const colorMap = {
        'Enabled': 'Green',
        'Disabled': 'Red',
    };
    return {backgroundColor: `${colorMap[status]}`};
  };
  const handleToggle = (printerId) => {
    setPrinters((prevPrinters) => {
      return prevPrinters.map(printer => {
        if (printer.id === printerId) {
          return { ...printer, status: !printer.status };
          // Gửi yêu cầu API để cập nhật trạng thái trong cơ sở dữ liệu với printerId và !printer.status
        }
        return printer;
      });
    });
  };
  const [searchCriteria, setSearchCriteria] = useState({
    printer_id: '',
    campusName: '',
    buildingName: '',
    roomNumber: '',
    printer_status: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  const handleSearch = () => {
    // Thực hiện tìm kiếm dựa trên searchCriteria
  };
  const navigate = useNavigate();
  const handleViewDetail = (PrinterId) => {
   navigate(`/ViewPrinterInformation/${PrinterId}`);
  }

    
    return (
    <div >
      <h1>Printer List</h1>
      <div>
        <button className='btn add-btn'>
          <i className='ti-plus'></i>
          Add new printer
        </button>
        <div className='search-box'>
      <label>
        Printer ID: 
        <input type="text"name="printer_id" placeholder = 'Eg: 123' value={searchCriteria.id} onChange={handleInputChange}/>
      </label>
      <label>
        Campus:
        <select name="campusName" value={searchCriteria.campusName} onChange={handleInputChange}>
        <option value="">All</option>
          <option value="BK.CS1">BK.CS1</option>
          <option value="BK.CS2">BK.CS2</option>
        </select>
      </label>
      <label>
        Building Name:
        <input type="text"name="buildingName" placeholder='Eg: BK.B1' value={searchCriteria.buildingName} onChange={handleInputChange}/>
      </label>
      <label>
        Room Number:
        <input type='text' name="roomNumber" placeholder='Eg: 301' value={searchCriteria.roomNumber} onChange={handleInputChange}/>
      </label>
      <label>
        Status:
        <select name="printer_status" value={searchCriteria.printer_status} onChange={handleInputChange}>
          <option value="">All</option>
          <option value="On">On</option>
          <option value="Off">Off</option>
        </select>
      </label>
      <button  onClick={handleSearch}> <i className='ti-search'></i> Search</button>
        </div>
      </div>
      <ul className='Printer-List'>
        {printers.map(printer => (
          <li key={printer.id} className='Printer-Block'>
            <i className='ti-printer'></i>
            <p id='Printer-header'> Printer ID: {printer.printer_id}</p>
            <div class='status-dot' style={setColorByStatus(printer.printer_status)}></div>
            <div className='Printer-body'>
              Campus: {printer.campusName}<br></br> 
              Building: {printer.buildingName} <br></br>
              Room: {printer.roomNumber} <br></br>
              Status: {printer.printer_status==='Enabled' ? 'On' : 'Off'}
            </div>
            <button  className ='Switch-status-btn' onClick={() => handleToggle(printer.printer_id)}>
              {printer.printer_status ==='Enabled' ? 'Disable' : 'Enable'}
            </button>
            <button className='Switch-status-btn' onClick={()=>handleViewDetail(printer.printer_id)}>
              Detail
            </button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewAllPrinter;
