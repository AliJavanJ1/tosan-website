import React, {useEffect, useMemo, useRef} from 'react';
import {Box, IconButton, Stack, SvgIcon} from "@mui/material";
import PriceTableGrid from "./PriceTableGrid";
import Typography from "@mui/material/Typography";
import PrintIcon from '@mui/icons-material/Print';
import {ReactComponent as excelIcon} from '../../assets/icons/excel.svg';
import {useProductFromURL} from "../../utils";
import {useSelector} from "react-redux";
import TimeAgo from "react-timeago";
import _ from "lodash"
import persianStrings from 'react-timeago/lib/language-strings/fa'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const PriceTable = ({raw_data, scroll = false, title}) => {
    const formatter = useMemo(()=>{
        return buildFormatter(persianStrings)
    }, [])
    const tableName = title
    // console.log('pricetable rawdata', raw_data)
    const mostRecentUpdate = useMemo(() => {
        if(raw_data.length) {
            return Date.parse(_.maxBy(raw_data, item => Date.parse(item.date_price_modified)).date_price_modified)
        }else{
            return null
        }
    }, [raw_data, raw_data.length]);
    const gridRef = useRef()

    const onExcelClick = () => {
        gridRef.current.csv(tableName)
    }
    const onPrintClick = () => {
        gridRef.current.print(tableName)
    }

    return (
        <Stack>
            <Stack sx={{
                height: '99px',
                bgcolor: '#002149',
                borderRadius: '4px 4px 0px 0px',
            }}>
                <Typography variant={'demiBold'} sx={{
                    color: 'white.shade3',
                    fontSize: '22px',
                    marginLeft: '40px',
                    marginTop: '19px',
                }}>
                    {tableName}
                </Typography>
                <Stack direction={'row'} sx={{
                    height: '27px',
                    bgcolor: 'secondary.shade3',
                    boxShadow: '1px 3px 12px rgba(56, 56, 56, 0.2)',
                    marginTop: 2,
                    position: 'relative',
                }}>
                    <Typography variant={'regularX'} sx={{
                        fontSize: '14px',
                        marginLeft: '40px',
                        color: 'grey.shade4',
                    }}>
                        {'آخرین به‌روزرسانی: '}
                        {
                            raw_data.length > 0 &&
                            <TimeAgo date={mostRecentUpdate} formatter={formatter}/>
                        }
                    </Typography>
                    <Box sx={{
                        bgcolor: 'white.shade3',
                        borderRadius: '4px',
                        boxShadow: '1px 3px 12px rgba(56, 56, 56, 0.2)',
                        position: 'absolute',
                        width: '36px',
                        height: '36px',
                        right: '76px',
                        top: '-4.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <IconButton onClick={onPrintClick}>
                            <PrintIcon sx={{
                                color: 'grey.shade4',
                                fontSize: '28px',
                            }}/>
                        </IconButton>
                    </Box>
                    <Box sx={{
                        bgcolor: 'white.shade3',
                        borderRadius: '4px',
                        boxShadow: '1px 3px 12px rgba(56, 56, 56, 0.2)',
                        position: 'absolute',
                        width: '36px',
                        height: '36px',
                        right: '27px',
                        top: '-4.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <IconButton onClick={onExcelClick}>
                            <SvgIcon component={excelIcon} inheritViewBox/>
                        </IconButton>
                    </Box>
                </Stack>
            </Stack>
            <PriceTableGrid ref={gridRef} raw_data={raw_data} scroll={scroll}/>
        </Stack>
    );
};

export default PriceTable;
