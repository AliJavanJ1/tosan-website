import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";


function PhoneCall() {
    const {number} = useParams()
    const navigate = useNavigate()
    window.location.href = 'tel:' + number;
    useEffect(() => {
        navigate(-1)
    });
    return null;
}

export default PhoneCall;