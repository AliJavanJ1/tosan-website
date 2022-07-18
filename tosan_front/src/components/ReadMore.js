import {useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {ExpandLess, KeyboardArrowLeft} from "@mui/icons-material";

function ReadMore({content, maxsize, mainfontfamily, color, readmorefontfamily, readmorecolor, readmoresize, sx}) {
    const [open, setOpen] = useState(false);
    const final_sx = Object.assign({}, sx, {
        direction: "ltr"
    });
    return (
        <Box sx={final_sx}>
            <Typography variant={mainfontfamily} color={color}>
                {
                    open && content
                }
                {
                    !open && (content.slice(0, maxsize) + "...")
                }
            </Typography>
            {
                !open && (
                    <Grid
                        container
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        onClick={() => setOpen(true)}
                    >
                        <Typography color={readmorecolor} variant={readmorefontfamily} >
                            بیشتر بخوانید
                        </Typography>
                        <KeyboardArrowLeft color={readmorecolor} sx={{ fontSize: readmoresize }}/>
                    </Grid>
                )
            }
            {
                open && (
                    <Grid
                        container
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        onClick={() => setOpen(false)}
                    >
                        <Typography color={readmorecolor} variant={readmorefontfamily} >
                            بستن
                        </Typography>
                        <ExpandLess color={readmorecolor} sx={{ fontSize: readmoresize }}/>
                    </Grid>
                )
            }
        </Box>
    );
}

export default ReadMore;