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
const cookies = new Cookies();

function ProtectedTest() {
    const [message, setMessage] = useState(null);
    const token = cookies.get("TOKEN");
    const navigate = useNavigate();
    useEffect(() => {
        axios.post("/api/protectedTest", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setMessage(response.data.message);

        }).catch((error) => {
            console.log(error.response);
        })
    }, [])
    return (
        <>
            <h1>Đây là trang dành riêng cho Quản trị viên, và chỉ Quản trị viên có thể thấy được</h1>
            <button className="btn btn-primary" onClick={() => { cookies.remove("TOKEN", { path: "/" }); navigate("/"); }}>
                Đăng xuất
            </button>
            <h6>{message ? message : "Chờ server authorize quyền..."}</h6>
        </>

    )
}

export default ProtectedTest;