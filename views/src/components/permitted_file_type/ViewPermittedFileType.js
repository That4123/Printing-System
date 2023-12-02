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
import '../../styles/themify-icons/themify-icons.css';
import { useParams } from 'react-router-dom';
import "./ViewPermittedFileType.css";

const cookies = new Cookies();

function ViewPermittedFileType() {
    const [permittedFileTypes, setPermittedFileTypes] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [file_type, setFileType] = useState('');
    const [max_file_size, setMaxFileSize] = useState('');

    useEffect(() => {
        axios.post('/api/viewPermittedFileType')
        .then(response => {console.log(response.data); setPermittedFileTypes(response.data)})
        .catch(error => console.error('Error fetching permitted file types:', error));
    }, []);

    const handleAddButtonClick = () => {
        setShowPopup(true);
    }

    const handlePopupClose = () => {
        setShowPopup(false);
        setFileType('');
        setMaxFileSize('');
    }
    const handleAddFileSubmit = () => {
        axios.post('/api/viewPermittedFileType/add', {
            file_type,
            max_file_size
        }).then(axios.post('/api/viewPermittedFileType').then(response => setPermittedFileTypes(response.data)))
        .catch(error => console.error('Error fetching permitted file types:', error));

        handlePopupClose();
    };
    
    const handleRemoveType = (permittedId) => {
        axios.post('/api/viewPermittedFileType/remove', {
            permitted_id: permittedId
        }).then(axios.post('/api/viewPermittedFileType').then(response => setPermittedFileTypes(response.data)))
        .catch(error => console.error('Error fetching permitted file types:', error));
    };

    return (
        <div className='m-5'>
            <h1 className='text-center m-4' style={{color: "black"}}>Cấu hình giới hạn in ấn</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>Loại file được phép in</th>
                        <th>Kích thước tối đa</th>
                        <th>Chỉnh sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {permittedFileTypes.map(permittedFileType => (
                        <tr key={permittedFileType.id}>
                            <td>{permittedFileType.permitted_id}</td>
                            <td>{permittedFileType.file_type}</td>
                            <td>{permittedFileType.max_file_size}</td>
                            <td>
                                <button className='modifyButton'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-down-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M9.636 2.5a.5.5 0 0 0-.5-.5H2.5A1.5 1.5 0 0 0 1 3.5v10A1.5 1.5 0 0 0 2.5 15h10a1.5 1.5 0 0 0 1.5-1.5V6.864a.5.5 0 0 0-1 0V13.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                                        <path fill-rule="evenodd" d="M5 10.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1H6.707l8.147-8.146a.5.5 0 0 0-.708-.708L6 9.293V5.5a.5.5 0 0 0-1 0z"/>
                                    </svg>
                                </button>
                            </td>
                            <td>
                                <button className='modifyButton' onClick={() => handleRemoveType(permittedFileType.permitted_id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={handleAddButtonClick}>Thêm</button>

            {showPopup && (
                <div className="popup-overlay">
                <div className="popup">
                    <h2 className="mt-1">Thêm loại file</h2>
                    <form>
                    <table>
                        <tbody>
                        <tr>
                            <td>Loại file:</td>
                            <td>
                            <input
                                type="text"
                                value={file_type}
                                onChange={(e) => setFileType(e.target.value)}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td>Kích thước tối đa:</td>
                            <td>
                            <input
                                type="text"
                                value={max_file_size}
                                onChange={e => setMaxFileSize(e.target.value)}
                            />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-primary mt-2" onClick={handleAddFileSubmit}>Xác nhận</button>
                    </form>
                </div>
                </div>
            )}
        </div>
    );
}

export default ViewPermittedFileType;
