import React from "react";
import { useState } from "react";

const printerData = {
  printer_id: "1",
  brand: "Canon",
  model: "GH370",
  description: "This is a printer",
  campusName: "BK CS2",
  roomNumber: "102",
  buildingName: "BK.B1",
  printer_status: "Working",
};

const userData = {
  user_id: '2110586',
  user_name: 'Trần Thanh Trọng Tín',
  email: 'abc@gmail.com',
}

const configData = {

}

const PrintingRequest = () => {
  const [buttonState, setButtonState] = useState([true, false, false]);

  const handleTabClick = (index) => {
    const newButtonStates = buttonState.map((state, i) => i === index);
    setButtonState(newButtonStates);
  };

  const handleAccept = () => {

  }

  const handleReject = () => {

  }

  return (
    <section className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <div className="w-100">
        <div className="d-flex justify-content-between">
        <p className="mb-1 fs-2 fw-bold">Yêu cầu in số 1</p>
        <div>
          <button type="button" className="p-2 me-3 btn btn-danger" onClick={() => {handleReject()}}>Từ chối</button>
          <button type="button" className="p-2 btn btn-success" onClick={() => {handleAccept()}}>Chấp nhận</button>
        </div>
        </div>
        <div className="border-top border-dark-subtle"></div>
      </div>
      <div className="w-100">
        <p className="mt-2 fs-3 fw-bold">File in</p>
      </div>
      <div className="w-100">
        <p className="mt-2 fs-3 fw-bold">Thông tin</p>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <div
              role="button"
              className={`mr-2 nav-link ${buttonState[0] ? "active" : ""}`}
              onClick={() => {
                handleTabClick(0);
              }}
            >
              Máy in
            </div>
          </li>
          <li className="nav-item">
            <div
              role="button"
              className={`mr-2 nav-link ${buttonState[1] ? "active" : ""}`}
              onClick={() => {
                handleTabClick(1);
              }}
            >
              Người yêu cầu
            </div>
          </li>
          <li className="nav-item">
            <div
              role="button"
              className={`mr-2 nav-link ${buttonState[2] ? "active" : ""}`}
              onClick={() => {
                handleTabClick(2);
              }}
            >
              Cấu hình
            </div>
          </li>
        </ul>
        {buttonState[0] && (<ul class="list-group list-group-flush">
          <li class="list-group-item fw-bold">ID: {printerData.printer_id}</li>
          <li class="list-group-item">Trạng thái: {printerData.printer_status}</li>
          <li class="list-group-item">Thương hiệu: {printerData.brand}</li>
          <li class="list-group-item">Tên máy: {printerData.model}</li>
          <li class="list-group-item">Cơ sở: {printerData.campusName}</li>
          <li class="list-group-item">Tòa: {printerData.buildingName}</li>
          <li class="list-group-item">Phòng: {printerData.roomNumber}</li>
          <li class="list-group-item">Miêu tả: {printerData.description}</li>
        </ul>)}
        {buttonState[1] && (<ul class="list-group list-group-flush">
          <li class="list-group-item fw-bold">ID: {userData.user_id}</li>
          <li class="list-group-item">Họ và tên: {userData.user_name}</li>
          <li class="list-group-item">Email: {userData.email}</li>
        </ul>)}
      </div>
    </section>
  );
};

export default PrintingRequest;
