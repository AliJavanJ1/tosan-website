import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {Icon, ListItemIcon, ListItemText, Stack, SvgIcon} from "@mui/material";
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import {
    usePopupState,
    bindHover,
    bindMenu, bindPopover,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import DropdownPaneLayout from "./dropdownPaneLayout";
import ElderlyWomanIcon from '@mui/icons-material/ElderlyWoman';
// import { ReactComponent as headsetIcon } from 'http://localhost:8000/media/products_icon_files/logo-naked.cab1df1a.svg'
// import {ReactComponent as headsetIcon} from "../assets/icons/contact.svg";


export default function ProductsDropdown() {
    const popupStateMenu = usePopupState({
        variant: 'popover',
        popupId: 'menuPopup',
    })
    const popupStatePane = usePopupState({
        variant: 'popover',
        popupId: 'panePopup',
    })
    const menuRef = useRef(null);
    const [menuPaper, setMenuPaper] = useState(null)
    useEffect(() => {
        if (menuRef.current) {
            const tempPaper = menuRef.current.getElementsByClassName('MuiPaper-root')[0]
            popupStatePane.setAnchorEl(tempPaper)
            setMenuPaper(tempPaper)
        }
    }, [menuRef, popupStatePane])

    const [hoveredProduct, setHoveredProduct] = useState(-1)
    const [submittedHoveredProduct, setSubmittedHoveredProduct] = useState(-1)
    const [timerId, setTimerId] = useState(null)
    const onItemMouseEnter = (id) => {
        setHoveredProduct(id)
        if (timerId)
            clearTimeout(timerId)
        const tId = setTimeout(() => {
            setSubmittedHoveredProduct(id)
        }, 100)
        setTimerId(tId)
    }
    const [isPaneHovered, setIsPaneHovered] = useState(false)
    const onPaneMouseEnter = () => {
        setIsPaneHovered(true)
        if (timerId)
            clearTimeout(timerId)
        setTimerId(null)
    }
    const onPaneMouseLeave = () => {
        setIsPaneHovered(false)
    }
    const onRootMouseEnter = () => {
        popupStatePane.close()
        setHoveredProduct(-1)
        setSubmittedHoveredProduct(-1)
        if (timerId)
            clearTimeout(timerId)
        setTimerId(null)
    }
    const mainProducts = useSelector(store => store.app ? store.app['main_product'] : [])

    // console.log(StarIcon)
    return (
        <>
            <Stack
                direction={'row'}
                alignItems={'center'}
                sx={{
                    height: '100%'
                }}
                {...bindHover(popupStateMenu)}
                onMouseEnter={onRootMouseEnter}
            >
                <MenuIcon/>
                <Typography variant={'demiBold'} marginLeft={1}>
                    محصولات
                </Typography>
            </Stack>
            <HoverMenu
                {...bindMenu(popupStateMenu)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    zIndex: 1,
                    '& .MuiMenu-paper': {
                        boxShadow: 0,
                        bgcolor: 'white.shade3',

                        borderWidth: '0px 1px 1px 1px',
                        borderStyle: 'solid',
                        borderColor: 'grey.shade2',
                        borderRightColor: popupStatePane.isOpen ? 'white.shade1' : '',
                        borderRadius: '0 0 0 8px'
                    },
                    '& .MuiMenu-list': {
                        paddingY: 0
                    },
                }}
                ref={menuRef}
            >
                {
                    mainProducts.map((product) => {
                        return (
                            <MenuItem
                                {...bindHover(popupStatePane)}
                                onMouseEnter={() => onItemMouseEnter(product['product_main_name'])}
                                key={product['product_main_name']}
                                sx={{
                                    height: (theme) => theme.spacing(7),
                                    width: menuPaper && menuPaper.clientWidth ? menuPaper.clientWidth : null,
                                    // ...(menuPaper && menuPaper.clientWidth && {width: menuPaper.clientWidth}),
                                    paddingLeft: 1,
                                    cursor: 'default',
                                }}
                            >
                                <ListItemIcon>
                                    <img src={product.icon} style={{
                                        height: '24px',
                                        width: '24px',
                                    }}/>
                                    {/*<ElderlyWomanIcon sx={{color:'grey.shade3'}}/>*/}
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant={'regular'} sx={{
                                        fontFamily: hoveredProduct === product['product_main_name']
                                            ? 'IRANSansXMedium'
                                            : 'IRANSansXRegular',
                                        color: 'grey.shade4'
                                    }}>
                                        {product['product_main_name']}
                                    </Typography>
                                </ListItemText>
                            </MenuItem>
                        )
                    })
                }
                <HoverPopover
                    {...bindPopover(popupStatePane)}
                    onMouseEnter={onPaneMouseEnter}
                    onMouseLeave={onPaneMouseLeave}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    sx={{
                        zIndex: 1,
                        '& .MuiPopover-paper': {
                            height: menuPaper
                                ? menuPaper.clientHeight
                                : 0,
                            boxShadow: 0,
                            bgcolor: 'white.shade3',

                            borderWidth: '0px 1px 1px 0px',
                            borderStyle: 'solid',
                            borderColor: 'grey.shade2',
                            borderRadius: '0 0 8px 0'
                        },
                    }}
                >
                    <DropdownPaneLayout productName={isPaneHovered ? submittedHoveredProduct : hoveredProduct}
                                        popupStateMenu={popupStateMenu} popupStatePane={popupStatePane}/>
                </HoverPopover>
            </HoverMenu>
        </>
    );
}
