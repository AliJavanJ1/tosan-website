import React, {useEffect, useMemo, useState} from 'react';
import {Button, Paper, Stack, Tab, Tabs, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import _ from "lodash"
import TableContext from "@mui/material/Table/TableContext";

const SalesPerson = (props) => {

    return (
        <Stack>
            <Stack direction={'row'}>
                <Stack>
                    <Typography>
                        hiiii
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

const SalesPeople = () => {
    const people = useSelector(store => store.app ? store.app.employees : [])
    const categories = useMemo(() => {
        // console.log('categ ' + people.length)
        return _.chain(people).flatMap('fields_name').uniq().value()
    }, [people.length])
    const grouped = useMemo(() => {
        // console.log('grouped '+categories.length)
        return _.chain(categories)
            .keyBy()
            .mapValues((value, key) => _.filter(people, person => person.fields_name.includes(key)))
            .value()
    }, [categories.length])
    const [selectedCategory, setSelectedCategory] = useState(null)
    useEffect(() => {
        if (categories.length !== 0)
            setSelectedCategory(categories[0])
    }, [categories])

    // const onCategoryClick = (category) => {
    //     setSelectedCategory(category)
    // }
    const onTabChange = (event, newValue) => {
        setSelectedCategory(newValue)
    }
    return (
        <Box sx={{
            margin: 18,
        }}>
            <Paper sx={{
                boxShadow: '1px 3px 12px rgba(56, 56, 56, 0.2)',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <Stack alignItems={'center'}>
                    <Stack alignItems={'center'} justifyContent={'center'} sx={{
                        height: (theme) => theme.spacing(7),
                        bgcolor: 'primary.shade4',
                        alignSelf: 'stretch'
                    }}>
                        <Typography variant={'bold'} sx={{
                            color: 'secondary.shade3'
                        }}>
                            ارتباط با کارشناسان فروش
                        </Typography>
                    </Stack>
                    {/*<Stack direction={'row'} spacing={8} sx={{*/}
                    {/*    alignItems: 'center',*/}
                    {/*    justifyContent: 'center',*/}
                    {/*    paddingY: 4,*/}
                    {/*}}>*/}
                    {/*    {*/}
                    {/*        _.chain(grouped).keys().map(category => {*/}
                    {/*            return (*/}
                    {/*                <Button variant={'text'} key={category} onClick={()=>onCategoryClick(category)}>*/}
                    {/*                    <Typography variant={'demiBoldX'} sx={{*/}
                    {/*                        color: selectedCategory === category ? 'primary.shade4' : 'primary.shade3',*/}
                    {/*                        fontFamily: selectedCategory === category ? 'IRANSansXBold' : 'IRANSansXDemiBold',*/}
                    {/*                    }}>*/}
                    {/*                        {category}*/}
                    {/*                    </Typography>*/}
                    {/*                </Button>*/}
                    {/*            )*/}
                    {/*        }).value()*/}
                    {/*    }*/}
                    {/*</Stack>*/}
                    {
                        selectedCategory &&
                        <Tabs value={selectedCategory} onChange={onTabChange} sx={{
                            marginY: 4,
                            '& 	.MuiTabs-indicator':{
                                bgcolor: 'secondary.shade3',
                                // width: '90px !important',
                            }
                        }}>
                            {
                                _.map(categories, (category) => {
                                    return (
                                        <Tab label={category} value={category} key={category} sx={{
                                            width: (theme)=>theme.spacing(19),
                                            color: 'primary.shade3',
                                            typography: selectedCategory === category ? 'boldS' : 'demiBoldX',
                                            '& .Mui-selected':{
                                                color: 'primary.shade4',
                                                fontSize: '40px',
                                            }
                                        }}/>
                                    )
                                })
                            }
                        </Tabs>
                    }
                </Stack>
            </Paper>
        </Box>
    );
};

export default SalesPeople;