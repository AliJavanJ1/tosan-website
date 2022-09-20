import {Box, Container, Divider, Grid, Link, TextField, Typography, Button} from "@mui/material";
import {Instagram, WhatsApp, Telegram} from '@mui/icons-material';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as Logo } from "../assets/logos/tosan-logo-2.svg";
import { ReactComponent as Contact } from "../assets/icons/contact.svg";
import { ReactComponent as ENemad} from "../assets/icons/enamad.svg";
import Phone from "./Phone";
import ReadMore from "./ReadMore";
import {useSelector} from "react-redux";
import {getProductUrl} from "../utils";

const Footer = () => {

    const socialMediaItems = [
        {
            id: 0,
            icon: <Telegram sx={{ fontSize: 35}}  color="secondary"/>,
            link: useSelector(store => (store.app ? store.app.general_data.tosan_telegram_link.value : '')),
        },
        {
            id: 1,
            icon: <WhatsApp sx={{ fontSize: 35 }} color="secondary"/>,
            link: useSelector(store => (store.app ? store.app.general_data.tosan_whatsapp_link.value : '')),
        },
        {
            id: 2,
            icon: <Instagram sx={{ fontSize: 35 }} color="secondary"/>,
            link: useSelector(store => (store.app ? store.app.general_data.tosan_instagram_link.value : '')),
        },
    ]

    const subsidiaries = useSelector(store => (store.app && store.app.subsidiaries))
    const serverURL = useSelector(store => store.static.domain)

    const pages = [
        {
            id: 0,
            url: "/contact-us",
            name: "تماس با توسن"
        },
        {
            id: 1,
            url: "/about-us",
            name: "درباره توسن"
        },
        {
            id: 2,
            url: "/job-offers",
            name: "فرصت‌های شغلی"
        },
        {
            id: 3,
            url: "/blog",
            name: "بلاگ"
        },
        {
            id: 4,
            url: "/gallery",
            name: "گالری"
        },
        {
            id: 5,
            url: "/downloads",
            name: "دانلود ها"
        },
        {
            id: 6,
            url: "/events",
            name: "رویداد ها"
        },
    ]

    const products = useSelector(store => (store.app ? store.app.main_product : []))
    const allProducts = useSelector(store => store.app && store.app["all_products"])

    const footer_company_description = useSelector(store => (store.app && store.app.general_data.footer_company_description.value))
    let footer_company_description_title, footer_company_description_content
    if(footer_company_description) {
        footer_company_description_title = footer_company_description.split("\r\n")[0]
        footer_company_description_content = footer_company_description.split("\r\n").slice(1).join("\r\n")
    }

    return (
        <Container component="footer" maxWidth={false} disableGutters sx={{
            bgcolor: "primary.shade4",
            direction: "rtl",
            paddingTop: 11,
            paddingBottom: 8,
        }}>
            <Grid // hole footer
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                sx={{
                    paddingX: 13
                }}
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
                            <Link href={item.link ? "&&" + item.link : "#"} key={item.id} sx={{
                                paddingRight: 3
                            }}>
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
                        <Grid container // logo
                              item
                              direction="row"
                              justifyContent="flex-end"
                              alignItems="flex-end"
                              sx={{
                                  marginBottom: 3,
                        }}>
                            <Typography color="secondary.shade3" dir="rtl" variant="bold">
                                گروه توسن
                            </Typography>
                            <SvgIcon component={Logo} inheritViewBox sx={{
                                fontSize: 72,
                                marginRight: 3
                            }}/>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                        >
                            <Typography component="div">
                                <Phone color="secondary.shade3"/>
                                <Typography color="white.main" dir="rtl" variant="demiBold1X">
                                    برای مشاوره و سفارش تماس بگیرید.
                                </Typography>
                            </Typography>
                            <SvgIcon component={Contact} inheritViewBox sx={{
                                fontSize: 80,
                                marginRight: 3
                            }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid // subsidiaries
                    container
                    item
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    flexWrap="nowrap"
                    sx={{ marginTop: 15 }}
                >
                    {
                        subsidiaries && subsidiaries.map(subsidiary => (
                            <Grid
                                container
                                item
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                key={subsidiary.name}
                                sx={theme => ({
                                    width: theme.spacing(14),
                                    "& svg.MuiSvgIcon-root:hover": {
                                        filter: "drop-shadow(3px 5px 3px black)",
                                        boxShadow: 4,
                                        borderRadius: "100%",
                                        fontSize: 81,
                                    },
                                })}
                            >


                                <SvgIcon inheritViewBox sx={{
                                    fontSize: 81,
                                }}>
                                    <image href={serverURL + subsidiary.icon_gold} width={81} />
                                </SvgIcon>
                                <Typography variant="regularX" color="secondary" paragraph={true} sx={{
                                    textAlign: "center",
                                    marginTop: 2,
                                    marginBottom: 0,
                                }}>
                                    {subsidiary.name}
                                </Typography>
                            </Grid>
                    ))}
                </Grid>
                <Divider flexItem variant="middle" sx={{ bgcolor: "grey.shade3", marginTop: 7, marginBottom: 9 }}/>
                <Grid // simple menu & newsletter
                    container
                    item
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="nowrap"
                >
                    <Grid // newsletter
                        container
                        item
                        direction="column"
                        justifyContent="center"
                        alignItems="start"
                        dir="rtl"
                        width="fit-content"
                    >
                        <Typography color="white.main" variant="demiBoldX">
                            ثبت‌نام در خبرنامه توسن
                        </Typography>
                        <Typography color="white.main" variant="regular" sx={{
                            marginTop: 1,
                            marginBottom: 3,
                        }}>
                            با ثبت‌نام در خبرنامه توسن از جدیدترین پیشنهادات ما با خبر شوید.
                        </Typography>
                        <Grid
                            container
                            item
                            flexWrap="nowrap"
                        >
                            <TextField
                                label="آدرس ایمیل یا شماره موبایل"
                                variant="outlined"
                                color="secondary"
                                size="small"
                                sx={{
                                    marginRight: 2,
                                    width: 292,
                                    "& label, fieldset, :hover fieldset": {
                                        fontFamily: theme => (theme.typography.regular),
                                        color: "white.main",
                                        borderColor: "white.main",
                                    },
                                    "& div:hover > fieldset.MuiOutlinedInput-notchedOutline": {
                                        borderColor: "secondary.main"
                                    },
                                    "& div > input.MuiOutlinedInput-input, input.MuiInputBase-input": {
                                        color: "white.shade2",
                                        direction: "rtl",
                                    }
                                }}/>
                            <Button variant="contained" color="secondary" sx={{
                                fontFamily: theme => (theme.typography.demiBoldS),
                                width: 79,
                                height: 40,
                            }}>
                                ثبت‌نام
                            </Button>
                        </Grid>

                    </Grid>
                    <Grid // simple menu
                        container
                        item
                        direction="row-reverse"
                    >
                        <Box // simple menu pages
                            dir="rtl"
                            sx={{
                                display: "grid",
                                gridTemplateRows: "repeat(6, auto)",
                                gridAutoColumns: "155px",
                                rowGap: "15px",
                                gridAutoFlow: "column",
                                placeItems: "start",
                                marginRight: 11
                            }}
                        >
                            <Typography variant="demiBoldX" color="white.main" sx={{
                                gridColumn: "1/" + (Math.ceil(pages.length / 5) + 1),
                            }}>
                                توسن فولاد
                            </Typography>
                            {pages.map(page => (
                                <Link
                                    href={page.url}
                                    key={page.id}
                                    variant="regularX"
                                    color="white.shade2"
                                    underline="hover"
                                >
                                    {page.name}
                                </Link>
                            ))}
                        </Box>
                        <Box // simple menu products
                            dir="rtl"
                            sx={{
                                display: "grid",
                                gridTemplateRows: "repeat(6, auto)",
                                gridAutoColumns: "155px",
                                rowGap: "15px",
                                gridAutoFlow: "column",
                                placeItems: "start",
                            }}
                        >
                            {
                                <Typography variant="demiBoldX" color="white.main" sx={{
                                    gridColumn: "1/" + (products ? (Math.ceil(products.length / 5) + 1) : -1),
                                }}>
                                    محصولات
                                </Typography>
                            }
                            {products && products.map(product => (
                                <Link
                                    href={(() => {
                                        const firstProduct = allProducts.find(prod => prod["main_name"] === product["product_main_name"])
                                        return firstProduct ? getProductUrl(firstProduct["main_name"],
                                                                            firstProduct["sub_name1"],
                                                                            firstProduct["full_name"]) : "#"
                                    })()}
                                    key={product.product_main_name}
                                    variant="regularX"
                                    color="white.shade2"
                                    underline="hover"
                                >
                                    {product.product_main_name}
                                </Link>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                <Grid // ENemad & Tosan bio
                    container
                    item
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    flexWrap="nowrap"
                    sx={{ marginTop: 11 }}
                >
                    <SvgIcon component={ENemad} inheritViewBox sx={{ // Enemad
                        fontSize: 139,
                    }}/>
                    <Grid // Tosan bio
                        container
                        item
                        direction="column"
                        justifyContent="center"
                        alignItems="end"
                        flexWrap="nowrap"
                        sx={{ marginTop: 0 }}
                    >
                        {
                            footer_company_description_title && <Typography variant="demiBoldX" color="white.main" sx={{
                                marginBottom: 1.5,
                            }}>
                                {footer_company_description_title}
                            </Typography>
                        }
                        {
                            footer_company_description_content && <ReadMore
                                content={footer_company_description_content}
                                maxlines={2}
                                mainfontfamily="regularX"
                                color="white.shade2"
                                readmorefontfamily="regular"
                                readmorecolor="secondary"
                                readmoresize={20}
                                sx={{
                                    width: 721,
                                }}
                            />
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;