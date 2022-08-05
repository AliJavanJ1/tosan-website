import {useEffect, useState} from "react";
import parse from "html-react-parser";
import {CircularProgress, Stack} from "@mui/material";
import {useSelector} from "react-redux";


function AboutUs() {
    const [content, setContent] = useState()
    const wpDomain = useSelector(store => store.static.wpDomain)
    const wpPageURL = wpDomain + + "/contact-us"

    useEffect(() => {
        const iframe = document.getElementById("about-us-iframe")
        iframe.postMessage('Request DOM manipulation', wpPageURL);

        iframe.addEventListener('message', (event) => {
            if (event.origin !== wpDomain) {
                console.log("wrong_origin", event.origin)
                return
            }
            console.log("data", event.data)
            setContent(event.data)
        })
    }, [])


    return (
        <Stack direction="column" alignItems="center" justifyContent="center" height="fit-content" width="100%">
            {content ? parse(content) : <>
                <iframe
                    id="about-us-iframe"
                    name="report"
                    src={wpPageURL}
                    // onLoad={iframe => {
                    //     console.log("0 kir: ", iframe.target)
                    //     // setTimeout(() => console.log("3000 cos: ", iframe.target), 3000)
                    //     console.log(iframe.target.contentDocument)
                    //     console.log(iframe.target.contentDocument.documentElement)
                    //     console.log(iframe.target.contentDocument.documentElement.innerHTML)
                    //     setTimeout(() => setContent(iframe.target.contentDocument.documentElement.innerHTML), 1)
                    // }}
                    style={{
                        border: 0,
                        height: 0,
                        width: 0,
                    }}/>
                <CircularProgress
                    size="30vw"
                    sx={{
                        color: "primary.shade3",
                        marginY: "15vw",
                    }}
                />
            </>}
        </Stack>
    );
}

export default AboutUs;