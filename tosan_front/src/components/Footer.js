import {Container, Divider, Grid} from "@mui/material";
import {Instagram, WhatsApp, Telegram} from '@mui/icons-material';
import SvgIcon from '@mui/material/SvgIcon';
import {Link} from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logos/tosan-logo-2.svg";
import { ReactComponent as Contact } from "../assets/icons/contact.svg";
// import { ReactComponent as Contact } from "../assets/icons/dino.svg";
// import Logo from "../assets/tosan-logo.png";


const Footer = () => {

    const socialMediaItems = [
        {
            id: 0,
            icon: <Telegram fontSize="large" />,
            link: '/',
        },
        {
            id: 1,
            icon: <WhatsApp fontSize="large" />,
            link: '/',
        },
        {
            id: 2,
            icon: <Instagram fontSize="large" />,
            link: '/',
        },
    ]

    return (
        <Container component="footer" maxWidth={false} sx={{
            backgroundColor: "primary",
            bgcolor: 'secondary.main',
            // gap: 100,
        }}>
            <Grid // hole footer
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Grid // footer first row
                    container
                    item
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                >
                    <Grid // social media
                        container
                        item
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                        xs="auto"
                    >
                        {socialMediaItems.map(item => (
                            <Link to={item.link} key={item.id}>
                                {item.icon}
                            </Link>
                        ))}
                    </Grid>
                    <Grid // logo and phone
                        container
                        item
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        xs="auto"
                    >
                        <Grid item>
                            <SvgIcon component={Logo} inheritViewBox sx={{ fontSize: 72 }}/>
                        </Grid>
                        <Grid item>
                            <SvgIcon component={Contact} inheritViewBox sx={{ fontSize: 80 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid // subsidiaries
                    container
                    item
                >
                    2
                </Grid>
                <Divider flexItem/>
                <Grid // under divider TODO
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    3
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;