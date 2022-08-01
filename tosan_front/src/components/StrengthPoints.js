import {Grid, Paper, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {objectToList} from "../utils";
import SvgIcon from "@mui/material/SvgIcon";

function StrengthPoints() {
    const serverURL = useSelector(store => store.static.domain)
    let strengthPoints = useSelector(store => (store.app && store.app.main_page_data.strength_points))
    if(strengthPoints)
        strengthPoints = objectToList(strengthPoints)

    return (
        <Paper
            elevation={5}
            sx={{
                marginX: 13,
                marginBottom: 10,
                paddingX: 20,
                paddingY: 2,
                boxShadow: "1px 3px 12px rgba(56, 56, 56, 0.2)",
                borderRadius: "3px",
                backgroundColor: "secondary.main"
            }}
        >
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="nowrap"
            >
                {strengthPoints && strengthPoints.map((strengthPoint, index) => (
                    <Grid
                        container
                        item
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        key={index}
                    >
                        <SvgIcon inheritViewBox sx={{
                            fontSize: 80,
                        }}>
                            <image href={serverURL + strengthPoint.file} />
                        </SvgIcon>
                        <Typography variant="regularX" color="primary.shade4" paragraph={true} sx={{
                            textAlign: "center",
                            marginTop: 2,
                            marginBottom: 0,
                        }}>
                            {strengthPoint.value}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}

export default StrengthPoints;