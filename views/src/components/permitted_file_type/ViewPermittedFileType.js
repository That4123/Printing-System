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

const cookies = new Cookies();

function ViewPermittedFileType() {
    const [permittedFileTypes, setPermittedFileTypes] = useState([]);

    useEffect(() => {
        axios.post('/api/viewPermittedFileType')
        .then(response => setPermittedFileTypes(response.data))
        .catch(error => console.error('Error fetching permitted file types:', error));
    }, []);

    return (
        <>
            <h1>Cấu hình giới hạn in ấn</h1>
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
                            <td>Chỉnh sửa</td>
                            <td>Xóa</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button clássName='btn btn-primary'>Thêm</button>
        </>
    );
}

export default ViewPermittedFileType;
