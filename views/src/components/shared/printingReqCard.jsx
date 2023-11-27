import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './printingReqCard.css'
import { Link } from 'react-router-dom';

export default function PringtingReqCard({ id,  status }) {
    return (
        <Link to={`/printing-queue/printing-request/${id}`} className='card-hover row rounded-pill mb-3 p-2 fs-4 w-75 border border-primary float-animation hover:bg-light-blue hover-overlay'>
            <p className='float-start col text-start m-0'>Yêu cầu in số {id}</p>
            <p className='float-end col text-end m-0'>{status}</p>
        </Link>
    )
}