import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function PringtingReqCard({ id,  status }) {
    return (
        <a href='/' className='printing-req-card'>
            <p className='flex-item'>Yêu cầu in số {id}</p>
            <p className='flex-item'>{status}</p>
        </a>
    )
}