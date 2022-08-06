import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Divider, Grid, Link, Stack, styled, SvgIcon} from "@mui/material";
import {ReactComponent as logo} from "../assets/logos/tosan-logo.svg"
import {experimental_sx as esx,} from '@mui/system';
import Phone from "./Phone";
import {ReactComponent as headsetIcon} from "../assets/icons/contact.svg";
import ProductsDropdown from "./productsDropdown";
import HeaderSearchbox from "./HeaderSearchbox";

const StyledToolbar = styled(Toolbar)(
    esx({
        justifyContent: 'space-between',
        marginRight: 13,
        marginLeft: 13,
        "@media (min-width: 600px)": {
            padding: 0,
        }
    }),
)

const StyledButton = styled(Button)(
    esx({
        minWidth: 0,
        paddingX: 0,
    })
)

export default function Header() {
    return (
        <AppBar position="sticky" sx={{
            bgcolor: 'white.shade3',
            color: 'grey.shade3',
            boxShadow: `0px 2px 8px rgba(0, 0, 0, .15)`,
            zIndex: 2,
        }}>
            <StyledToolbar sx={{
                height: (theme) => theme.spacing(11),
            }}>
                <Stack direction={'row'} spacing={4} sx={{
                    height: '100%'
                }}>
                    <StyledButton href={'/blog'}>
                        <Typography variant={'demiBold'}>
                            بلاگ
                        </Typography>
                    </StyledButton>
                    <StyledButton href={'/gallery'}>
                        <Typography variant={'demiBold'}>
                            گالری
                        </Typography>
                    </StyledButton>
                    <StyledButton href={'/catalog'}>
                        <Typography variant={'demiBold'}>
                            کاتالوگ
                        </Typography>
                    </StyledButton>
                    <StyledButton href={'/job-offers'}>
                        <Typography variant={'demiBold'}>
                            فرصت‌های شغلی
                        </Typography>
                    </StyledButton>
                </Stack>
                <HeaderSearchbox/>
            </StyledToolbar>
            <Divider variant={'middle'} flexItem={true}/>
            <StyledToolbar sx={{
                height: (theme) => theme.spacing(13.75),
            }}>
                <Link href={'/'} underline={'none'}>
                    <Grid container item xs={'auto'} alignItems={'center'}>
                        <Grid item>
                            <SvgIcon component={logo} inheritViewBox sx={{
                                fontSize: 61,
                                marginLeft: `-10px`,
                            }}/>
                        </Grid>
                        <Grid item>
                            <Typography variant={'extraBold'} sx={{
                                color: 'primary.shade4',
                                marginLeft: 1,
                            }}>
                                توسن
                            </Typography>
                        </Grid>
                    </Grid>
                </Link>
                <Stack direction={'row'} marginLeft={8} spacing={4} sx={{
                    height: '100%'
                }}>
                    <Stack alignItems={'center'} direction={'row'} color={'grey.shade4'}>
                        <ProductsDropdown/>
                    </Stack>
                    <Divider orientation={'vertical'} flexItem={true} sx={{
                        borderColor: 'grey.shade1',
                        borderWidth: `1px`,
                        height: `25px`,
                        alignSelf: 'center'
                    }}/>
                    {/*<StyledButton href={'#'}>*/}
                    {/*    <Typography variant={'demiBold'}>*/}
                    {/*        زیرمجموعه‌ها*/}
                    {/*    </Typography>*/}
                    {/*</StyledButton>*/}
                    <StyledButton href={'/contact-us'}>
                        <Typography variant={'demiBold'}>
                            تماس با ما
                        </Typography>
                    </StyledButton>
                    <StyledButton href={'/about-us'}>
                        <Typography variant={'demiBold'}>
                            درباره ما
                        </Typography>
                    </StyledButton>
                </Stack>
                <Box sx={{flexGrow: 1}}/>
                <Stack direction={'row'} sx={{direction: 'rtl'}} alignItems={'center'}>
                    <SvgIcon component={headsetIcon} inheritViewBox sx={{
                        fontSize: 55,
                        marginLeft: 2,
                        marginRight: 1,
                        // filter: 'invert(200%) sepia(50%) saturate(70%) hue-rotate(20deg) brightness(20%) contrast(20%)'
                    }}/>
                    <Phone color={'primary.shade3'}/>
                </Stack>
            </StyledToolbar>
        </AppBar>
    );
}