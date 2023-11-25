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

const cookies = new Cookies();
function ViewPrinterInfomation () {
    const {PrinterId} = useParams();
    const [printers, setPrinters] = useState([]);
    useEffect(() => {
        // lấy danh sách máy in từ backend
        axios.post('/api/viewAllPrinter')
          .then(response => setPrinters(response.data))
          .catch(error => console.error('Error fetching printers:', error));
      }, []);
      const selectedPrinter = printers.find(printer => printer.printer_id === parseInt(PrinterId));
      console.log(selectedPrinter);
      console.log(printers[0]);
    return (
      <div>
        <p>Printer ID: {PrinterId}</p>
      </div>
    );

}
export default ViewPrinterInfomation;