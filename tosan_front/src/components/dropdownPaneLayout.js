import React, {useMemo, useRef} from 'react';
import {Box, Grid, Link, Stack, Typography} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useSelector} from "react-redux";
import _ from "lodash";
import {getProductUrl} from "../utils";

const Subname1Component = (props) => {
    const {subname1, items, productName, popupStatePane, popupStateMenu} = props
    const fullNames = useMemo(() => {
        return _.keys(items)
    }, [items.length]);

    return (
        <Stack direction={'column'}>
            {
                fullNames.length === 1
                    ?
                    <Link underline={'none'} href={getProductUrl(productName, subname1, fullNames[0])}
                    onClick={()=>{
                        popupStatePane.close()
                        popupStateMenu.close()
                    }}>
                        <Typography variant={'regularS'} color={'grey.shade4'}>
                            {fullNames[0]}
                        </Typography>
                    </Link>
                    // fullNames[0]
                    :
                    <Typography variant={'regularS'} color={'grey.shade4'} sx={{
                        cursor: 'default',
                    }}>
                        {subname1}
                    </Typography>
            }
            {
                fullNames.length > 1 &&
                fullNames.map((fullName) => (
                    <Link key={fullName} href={getProductUrl(productName, subname1, fullName)} underline={'none'} sx={{
                        marginTop: 2,
                    }} onClick={()=>{
                        popupStatePane.close()
                        popupStateMenu.close()
                    }}>
                        <Typography variant={'regularS'} color={'grey.shade3'} sx={{
                            marginTop: 2,
                        }}>
                            {fullName}
                        </Typography>
                    </Link>
                ))
            }
        </Stack>
    )
}

function DropdownPaneLayout(props) {
    const {productName, popupStatePane, popupStateMenu} = props
    const allProducts = useSelector(store => store.app ? store.app['all_products'] : [])
    let grouped = _.chain(allProducts)
        .groupBy((product) => product['main_name'])
        .get(productName)
        .groupBy((product) => product['sub_name1'])
        .mapValues((value) => _.groupBy(value, (product) => product['full_name']))
        .value()
    const boxRef = useRef(null)
    return (
        <Box sx={{
            width: '500px',
            height: '100%',
        }} ref={boxRef}>
            <Stack sx={{
                marginLeft: 3,
                height: '100%',
            }}>
                <Stack direction={'row'} alignItems={'center'} sx={{
                    flexBasis: (theme) => theme.spacing(7),
                    flexShrink: 0,
                }}>
                    <Typography variant={'regularS'} sx={{
                        marginRight: 1.5,
                        color: 'rgba(0, 0, 0, 0.7)',
                        cursor: 'default',
                    }}>
                        {'قیمت انواع '}
                        {productName}
                    </Typography>
                    {/*<Divider flexItem={true} variant={'inset'} orientation={'horizontal'}/>*/}
                    <ArrowBackIosNewIcon sx={{
                        color: 'grey.shade2',
                        fontSize: '12px',
                    }}/>
                </Stack>
                <Grid container direction={'column'} rowSpacing={4} columnSpacing={2} sx={{
                    marginTop: -1, // default is -4 since rowSpacing is 4, to compensate for first item padding.
                    columnGap: 4,
                    // flexGrow: 0,
                    // flexShrink: 1,
                    // flexBasis: '100%',
                    // minWidth: 0,
                    minHeight: 0,
                    // overflow: 'hidden',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    marginBottom: 1,
                    // height: boxRef.current
                    //     ? (theme)=>(parseInt(boxRef.current.clientHeight) - parseInt(_.trimEnd(theme.spacing(7), 'px')))
                    //     : '100%',
                }}>
                    {
                        _.map(grouped, (items, subname1) => {
                            return (
                                <Grid item sx={{}} key={subname1}>
                                    <Subname1Component subname1={subname1} items={items} productName={productName}
                                                       popupStatePane={popupStatePane} popupStateMenu={popupStateMenu}/>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Stack>
        </Box>
    );
}

export default DropdownPaneLayout;