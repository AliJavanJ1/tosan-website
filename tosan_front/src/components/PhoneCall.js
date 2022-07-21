import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";


function PhoneCall() {
    const {number} = useParams()
    const navigate = useNavigate()
    console.log("tel")
    window.location.href = 'tel:' + number;
    useEffect(() => {
        navigate(-1)
    }, []);
    return null;
}

export default PhoneCall;