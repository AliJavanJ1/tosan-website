import {useState} from "react";
import parse from "html-react-parser";
import {CircularProgress, Stack} from "@mui/material";
import {useSelector} from "react-redux";


function AboutUs() {
    const [content, setContent] = useState()
    const serverURL = useSelector(store => store.static.wpDomain)

    return (
        content ? parse(content) : <Stack direction="column" alignItems="center" justifyContent="center" height="fit-content" width="100%" minHeight="100vh">
            <iframe
                name="report"
                src={serverURL + "/contact-us"}
                onLoad={iframe => {
                    console.log("0 kir: ", iframe.target)
                    setTimeout(() => console.log("3000 cos: ", iframe.target), 3000)
                    setTimeout(() => setContent(iframe.target.contentDocument.documentElement.innerHTML), 1)
                }}
                style={{
                    border: 0,
                    height: 0,
                    width: 0,
            }}/>
            <CircularProgress size={100} sx={{ color: "primary.shade3" }}/>
        </Stack>
    );
}

export default AboutUs;