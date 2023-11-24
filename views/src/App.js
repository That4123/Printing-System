import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/shared/header'
import Homepage from './components/homepage/homepage';
import NoPage from './components/nopage/nopage';
import SignIn from './components/signin/signin'
import axios from 'axios'
import PrivateRoutes from './components/shared/private_routes';
import ProtectedTest from './components/(test_only)protected_test/protected_test';
import PublicTest from './components/(test_only)public_test/public_test';
import SignUp from './components/signup/signup';
import FileUpload from './components/printing_request/file_upload/file_upload.js';
import ChoosePrinter from './components/printing_request/choose_printer/choose_printer.js';
import PrintFile from './components/printing_request/print_file/print_file.js'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Homepage />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='fileupload' element={<FileUpload />} />
        <Route path='chooseprinter' element={<ChoosePrinter />} />
        <Route path='printfile' element={<PrintFile />} />
        <Route path='publicTest' element={<PublicTest />} />
        <Route element={<PrivateRoutes validateRoute={"protectedTest"} />} >
          <Route path='protectedTest' element={<ProtectedTest />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;

