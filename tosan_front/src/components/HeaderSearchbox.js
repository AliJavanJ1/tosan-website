import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    Backdrop,
    Grid,
    InputBase,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Popover,
    Popper,
    Stack,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {bindFocus, bindPopover, bindPopper, usePopupState} from "material-ui-popup-state/hooks";
import {useSelector} from "react-redux";
import Fuse from 'fuse.js'
import _ from "lodash"
import {getProductUrl} from "../utils";
import {animated, useSpring} from "@react-spring/web";
import {height} from "@mui/system";


const HeaderSearchbox = () => {
    const transitionDuration = 100
    // const all_products = useSelector(store => store.app ? store.app.all_products : [])
    const all_products = useSelector(store => store.app && store.app.all_products)
    const [searchString, setSearchString] = useState('')
    const [containerElm, setContainerElm] = useState()
    const [popInputElm, setPopInputElm] = useState()
    const [searchResults, setSearchResults] = useState([])
    const [transitionState, setTransitionState] = useState(0);
    const searchObjs = useMemo(() => {
        if (all_products && all_products.length) {
            return _.map(all_products, product => {
                let searchStr = product.full_name + ' ' + product.sub_name1 + ' ' + product.main_name
                searchStr = searchStr.replaceAll(' ', '')
                return {
                    searchStr,
                    product: product,
                }
            })
        } else {
            return []
        }
    }, [all_products]);
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'searchPopover',
    })
    const onSearchChange = (e) => {
        setSearchString(e.target.value)
    }
    const openPopover = () => {
        setTransitionState(1)
        popupState.setOpen(true)
        setTimeout(() => {
            setTransitionState(0)
        }, transitionDuration)
    }
    const onHeaderInputClick = (e) => {
        if (searchString !== '') {
            openPopover()
        }
    }
    const onPopoverClose = () => {
        setTransitionState(-1)
        setTimeout(() => {
            popupState.setOpen(false)
            setTransitionState(0)
        }, transitionDuration)
    }
    useEffect(() => { //init anchor
        if (popupState && containerElm) {
            popupState.setAnchorEl(containerElm)
        }
    }, [popupState, containerElm])
    useEffect(() => { // open search on search change
        if (searchString && !popupState.isOpen) {
            openPopover()
        }
    }, [searchString])
    useEffect(() => { //set focus to pop input on set and defocus header input on unset
        if (popInputElm) {
            popInputElm.focus()
        } else {
            document.activeElement.blur()
        }
    }, [popInputElm])
    // useEffect(()=>{ //search
    //     if(searchObjs.length){
    //         if(searchString === ''){
    //             setSearchResults([])
    //         }else{
    //             let results = fuzzysort.go(searchString, searchObjs, {
    //                 key: 'searchStr',
    //                 limit: 6,
    //             })
    //             console.log(results)
    //         }
    //     }
    // }, [searchString, searchObjs.length])
    const fuse = useMemo(() => {
        if (searchObjs.length) {
            return new Fuse(searchObjs, {
                includeScore: true,
                keys: ['searchStr'],
            })
        } else {
            return null
        }
    }, [searchObjs.length])
    useEffect(() => { //search
        if (fuse) {
            if (searchString === '') {
                setSearchResults([])
            } else {
                let results = fuse.search(searchString.replaceAll(' ', ''))
                setSearchResults(results)
            }
        }
    }, [searchString, fuse])

    const searchBoxAnim = useSpring({
        from: {
            boxShadow: `inset 2px 4px 15px rgba(56, 56, 56, 0.15)`,
            backgroundColor: '#f2f2f2',
            width: '328px',

        },
        to: {
            boxShadow: 'inset 0px 0px 0px rgba(56, 56, 56, 0.15)',
            backgroundColor: '#ffffff',
            width: '556px',
        },
        config: {
            duration: transitionDuration,
        },
        reset: true,
    })
    const searchBoxAnimStation = useSpring({
        from: {
            boxShadow: 'inset 0px 0px 0px rgba(56, 56, 56, 0.15)',
            backgroundColor: '#ffffff',
            width: '556px',
        },
        config: {
            duration: transitionDuration,
        },
    })
    const searchBoxAnimRev = useSpring({
        to: {
            boxShadow: `inset 2px 4px 15px rgba(56, 56, 56, 0.15)`,
            backgroundColor: '#f2f2f2',
            width: '328px',
        },
        from: {
            boxShadow: 'inset 0px 0px 0px rgba(56, 56, 56, 0.15)',
            backgroundColor: '#ffffff',
            width: '556px',
        },
        config: {
            duration: transitionDuration,
        },
        reset: true,
    })
    const backdropAnim = useSpring({
        from: {
            backgroundColor: 'transparent',
        },
        to: {
            backgroundColor: 'black',
        },
        config: {
            duration: transitionDuration,
        },
        reset: true,
    })
    const backdropAnimStation = useSpring({
        from: {
            backgroundColor: 'black',
        },
        config: {
            duration: transitionDuration,
        },
    })
    const backdropAnimRev = useSpring({
        to: {
            backgroundColor: 'transparent',
        },
        from: {
            backgroundColor: 'black',
        },
        config: {
            duration: transitionDuration,
        },
        reset: true,
    })
    const AnimatedBox = animated(Box)
    const AnimatedBackdrop = animated(Backdrop)

    return (
        <Grid container item xs={'auto'} ref={elm => setContainerElm(elm)}>
            <Grid item>
                <Box sx={{
                    boxShadow: `inset 2px 4px 15px rgba(56, 56, 56, 0.15)`,
                    borderRadius: `25px`,
                    bgcolor: 'white.shade1',
                    height: (theme) => theme.spacing(6),
                    width: (theme) => theme.spacing(41),
                    display: `flex`,
                }}>
                    <IconButton type="submit" sx={{
                        bgcolor: 'grey.shade1',
                        height: (theme) => theme.spacing(6),
                        width: (theme) => theme.spacing(6),
                        color: 'primary.shade1',
                    }}>
                        <SearchIcon fontSize={'large'}/>
                    </IconButton>
                    <InputBase
                        onClick={onHeaderInputClick}
                        onChange={onSearchChange}
                        sx={{
                            height: (theme) => theme.spacing(6),
                            marginLeft: 2,
                            flexGrow: 1,
                            marginRight: `1em`
                        }}
                        placeholder="جستجو"
                        value={searchString}
                    />
                </Box>
            </Grid>
            <Popover
                {...bindPopover(popupState)}
                sx={{
                    '& .MuiPopover-paper': {
                        bgcolor: 'transparent',
                    }
                }}
                elevation={0}
                transitionDuration={0}
                componentsProps={{
                    'backdrop': {
                        style: (() => {
                            if (transitionState === 1) {
                                return backdropAnim
                            } else if (transitionState === -1) {
                                console.log('rev')
                                return backdropAnimRev
                            } else {
                                return backdropAnimStation
                            }
                        })(),
                        sx: {
                            // bgcolor: 'black',
                            opacity: '.3 !important',
                        }
                    }
                }}
                components={{
                    'Backdrop': AnimatedBackdrop,
                }}
                onClose={onPopoverClose}
            >
                <Stack sx={{
                    rowGap: '5px',
                    alignItems: 'center',
                }}>
                    <Grid item>
                        <AnimatedBox style={
                            (() => {
                                if (transitionState === 1) {
                                    return searchBoxAnim
                                } else if (transitionState === -1) {
                                    return searchBoxAnimRev
                                } else {
                                    return searchBoxAnimStation
                                }
                            })()
                        } sx={{
                            borderRadius: `25px`,
                            // bgcolor: 'white.shade3',
                            height: '48px',
                            // width: '556px',
                            display: `flex`,
                            alignItems: 'center',
                        }}>
                            <IconButton type="submit" sx={{
                                height: (theme) => theme.spacing(6),
                                width: (theme) => theme.spacing(6),
                                color: 'primary.shade1',
                            }}>
                                <SearchIcon fontSize={'large'}/>
                            </IconButton>
                            <InputBase
                                onChange={onSearchChange}
                                sx={{
                                    height: (theme) => theme.spacing(6),
                                    marginLeft: 2,
                                    flexGrow: 1,
                                    marginRight: `1em`
                                }}
                                value={searchString}
                                inputRef={input => setPopInputElm(input)}
                            />
                        </AnimatedBox>
                    </Grid>
                    {
                        searchResults.length > 0 &&
                        <List sx={{
                            bgcolor: 'white.shade3',
                            width: '542px',
                            borderRadius: '8px',
                            transition: 'height 1s'
                        }}>
                            {
                                _.map(searchResults, (result, idx) => {
                                    const {main_name, sub_name1, full_name} = result.item.product
                                    return (
                                        <ListItemButton key={idx} href={getProductUrl(main_name, sub_name1, full_name)}>
                                            <ListItemText primary={full_name}
                                                          secondary={main_name + ' > ' + sub_name1}/>
                                        </ListItemButton>
                                    )
                                })
                            }
                        </List>
                    }
                </Stack>
            </Popover>
        </Grid>
    );
};

export default HeaderSearchbox;
