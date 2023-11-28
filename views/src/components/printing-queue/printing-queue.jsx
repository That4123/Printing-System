import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useState, useEffect } from "react";
import PringtingReqCard from "../shared/printingReqCard";

const PringtingQueue = () => {
  const [printRequestList, setPrintRequestList] = useState([]);

  useEffect(() => {
    axios.get('/api/printRequest').then((res) => {
      if (res.status === 200) {
        setPrintRequestList(res.data)
      }
      else {
        console.log("Something happen");
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <section className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <p className="fs-2 fw-bold">Hàng chờ in</p>
        {printRequestList.map((printingReq) => (
        <PringtingReqCard id={printingReq.request_id} status={printingReq.request_status} />
        ))}
    </section>
  );
};

export default PringtingQueue;
