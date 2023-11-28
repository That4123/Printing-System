import "./choose_printer.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import cardPrinter from '../../../img/card_printer.png' ;
import arrowRTL from '../../../img/ArrowRTL.png'
import arrowLTR from '../../../img/ArrowLTR.png'
import printerFill from '../../../img/printer-fill.png'
import { useRef, useState, useEffect } from "react";

import axios from "axios";

const ChoosePrinter = ({ value, onValueChange }) => {
  const containerRef = useRef(null);
  const [listPrinter, setListPrinter] = useState([])
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300; // Adjust the scroll distance as needed
    }
  };
  const handleChange = (id) => {
    onValueChange('printer_id', id);
  };
  /*
  useEffect(() => {
    axios.get('/api/chooseprinter')
      .then((respond) => {
        console.log(respond.data);
        setListPrinter(respond.data);
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      })
  }, []);
  */
  useEffect(() => {
    // lấy danh sách máy in từ backend
    axios.post('/api/viewAllPrinter')
      .then(response => setListPrinter(response.data))
      .catch(error => console.error('Error fetching printers:', error));
  }, []);
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300; // Adjust the scroll distance as needed
    }
  };
  const [showDetail, setShowDetail] = useState(false)
  const [numberPrinter, setNumber] = useState(0)
  const [numberPrinterDetail, setPrinterDetail] = useState(0)
  const [showChoosePrinter, setShowChoosePrinter] = useState(false)
  return (
    <>
    {showChoosePrinter && listPrinter[numberPrinter] && ( 
    <>
    
    <h2>Máy in đã chọn</h2>
    <div className="info-printer">
        <img src={printerFill}  alt={`Printer ${numberPrinter}`}/>
        <div className="info-printer-name">
        <div style={{fontSize:"30px", fontWeight: "700", marginLeft: "5vw"}}>Máy in {listPrinter[numberPrinter].printer_id}</div>
        <div className="info-printer-text">
            <div className="info-printer-text-1">
              <div>Tên thương hiệu: {listPrinter[numberPrinter].brand}</div>
              <div>Mẫu: {listPrinter[numberPrinter].model}</div>
              <div>Cơ sở: {listPrinter[numberPrinter].campusName}</div>
              <div>Phòng: {listPrinter[numberPrinter].roomNumber}</div>
            </div>
            <div className="info-printer-text-1">
              <div>Mô tả: {listPrinter[numberPrinter].description}</div>
              <div>Tình trạng: {listPrinter[numberPrinter].printer_status}</div>
           
           </div>
        </div>
        </div>
    </div>
    </>)} 
    <h2>Danh sách các máy in</h2>
    <div className = "scroll-printer">
        <button onClick={scrollLeft} className="scroll-btn">
            <img src={arrowRTL} alt ={"arrowRTL"}/>
        </button>
        <div ref={containerRef} style={{ overflowX: 'hidden', whiteSpace: 'nowrap', border: 'none', marginTop: '20px' }}>
        {listPrinter.map((card, i) => (
            <div className="card-printer" key={card.printer_id}>
                <div className="img-printer-container"> 
                <img src={cardPrinter} alt={`Printer ${numberPrinter}`}/>
                <div className="name-printer"> Máy in {card.printer_id} </div>
                </div>
                <div className="btn-area">
                    <button type="button" className="btn btn-dark" onClick={() => {setPrinterDetail(i); setShowDetail(true)}}>Xem</button>
                    <button type="button" className="btn btn-dark" style = {{backgroundColor: "#9999FF", border: "none"}}  onClick={() => {setNumber(i); setShowChoosePrinter(true); setShowDetail(false); handleChange(card.printer_id);}}>Chọn</button>
                </div>
            </div>
          )
          )
        }
        </div>
      <button onClick={scrollRight} className="scroll-btn" style={{marginLeft: "20px"}}>
            <img src={arrowLTR}  alt ={"arrowLTR"}/>
        </button>
    </div>
    {showDetail && listPrinter[numberPrinterDetail] && (
    <div className="info-printer" key={numberPrinterDetail}>
      <img src={printerFill} alt={`Printer ${numberPrinterDetail}`} />
      <div className="info-printer-name">
        <div style={{ fontSize: "30px", fontWeight: "700", marginLeft: "5vw" }}>
          Máy in {listPrinter[numberPrinterDetail].printer_id}
        </div>
        <div className="info-printer-text">
          <div className="info-printer-text-1">
            <div>Tên thương hiệu: {listPrinter[numberPrinterDetail].brand}</div>
            <div>Mẫu: {listPrinter[numberPrinterDetail].model}</div>
            <div>Cơ sở: {listPrinter[numberPrinterDetail].campusName}</div>
            <div>Phòng: {listPrinter[numberPrinterDetail].roomNumber}</div>
          </div>
          <div className="info-printer-text-1">
            <div>Mô tả: {listPrinter[numberPrinterDetail].description}</div>
            <div>Tình trạng: {listPrinter[numberPrinterDetail].printer_status}</div>
          </div>
        </div>
      </div>
    </div>
)}

    </>
  );
};

export default ChoosePrinter;