import React, {useState} from 'react';
import {IconButton, InputBase, Stack} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {setQuickFilterInput} from "../../redux/filterSlice";
import {useDispatch} from "react-redux";

const PriceTableQuickFilter = () => {
    const [inputString, setInputString] = useState('');
    const [timerId, setTimerId] = useState(null);
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInputString(e.target.value)
        clearTimeout(timerId)
        let id = setTimeout(()=>{
            dispatch(setQuickFilterInput(e.target.value))
        }, 300)
        setTimerId(id)
    }
    const onClearInput = () => {
        setInputString('')
        clearTimeout(timerId)
        let id = setTimeout(()=>{
            dispatch(setQuickFilterInput(''))
        }, 300)
        setTimerId(id)
    }
    return (
        <Stack direction={'row'} sx={{
            height: '40px',
            border: '1px solid #C4C4C4',
            borderRadius: '4px',
            alignItems: 'center',
        }}>
            <SearchIcon sx={{
                fontSize: '30px',
                marginLeft: '16px',
                marginRight: '10px',
                color: 'grey.shade4'
            }}/>
            <InputBase
                placeholder="جستجو"
                sx={{
                    '& .MuiInputBase-input::placeholder':{
                        typography: 'regularX',
                        color: 'grey.shade4',
                        opacity: 1,
                    }
                }}
                onChange={handleChange}
                value={inputString}
            />
            {
                inputString &&
                <IconButton onClick={onClearInput}>
                    <ClearIcon sx={{
                        fontSize: '16px'
                    }}/>
                </IconButton>
            }
        </Stack>
    );
};

export default PriceTableQuickFilter;
