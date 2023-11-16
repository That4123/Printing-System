import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header'

function Homepage() {
  const [greetingFromServer, setGreetingFromServer] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/homepage')
      .then((respond) => {
        console.log(respond);
        setGreetingFromServer(respond.data.greeting);
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      })
  }, []);
  console.log(greetingFromServer);
  return (
    <>
      <h1>Trang chủ nè</h1>
      <h6>Trang này chưa có gì đâu, chứa nút để đăng nhập đăng ký thôi</h6>
      <button className="btn btn-primary" onClick={() => { navigate("/signin"); }}>
        Đăng nhập
      </button>
      <button className="btn btn-primary" onClick={() => { navigate("/signup"); }}>
        Đăng ký
      </button>
    </>
  );
}
export default Homepage