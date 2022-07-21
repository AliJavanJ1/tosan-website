import {useNavigate, useSearchParams} from 'react-router-dom'


function Redirect() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

    console.log(searchParams.get("url"))
    window.location.href = searchParams.get("url")
    return null
}

export default Redirect;