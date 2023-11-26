import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import PringtingReqCard from '../shared/printingReqCard';

const data = [
    {
        id: 1,
        status: "Chờ duyệt",
    },
    {
        id: 2,
        status: "Chờ duyệt",
    },
    {
        id: 3,
        status: "Chờ duyệt",
    },
    {
        id: 4,
        status: "Chờ duyệt",
    },
]

const PringtingQueue = () => {
    
    
    return (
        data.map((printingReq) => (
            <PringtingReqCard id={printingReq.id} status={printingReq.status} />
        ))
    );
}

export default PringtingQueue;