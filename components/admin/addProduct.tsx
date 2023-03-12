import { Alert, AlertColor, Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { addProductApi } from "../getApi"
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import { ChangeEvent, FormEvent, useState } from "react"


export default function AddProduct(slugs: {}) {

    
    const [ selectCategory, setSelectCategory ] = useState("")
    const [ message, setMessage ] = useState("")
    const [ messageMode, setMessageMode ] = useState<AlertColor>()
    
    const handleChange = ((e: any) => {
        setSelectCategory(e.target.value)
    })

    //送信時の入力内容チェック
    const handleSubmit = ((e: any) => {
        e.preventDefault()
        console.log(e);

        setMessage("")
        setMessageMode(undefined)

        const setData = {
            category: selectCategory,
            ja      : e.target.ja.value,
            price   : e.target.price.value,
            description: e.target.description.value
        }
        
        //空の入力値があればエラー
        const result = Object.entries(setData).filter((e) => e[1] == '')
        if(result.length > 0){
            //setErrResult(result)
            setMessageMode("error")
            setMessage("項目をすべて入力してください。")
        }else{
            const resultAPI = addProductApi(setData)
            resultAPI.then((msg) => {
                if(msg) setMessage(msg), setMessageMode("error")
                else setMessage("登録しました"), setMessageMode("success"), window.location.reload()
            })
        }
    })

    return (
        <>
        <Typography variant="h6" component="h4" sx={{ mb: '1em' }}>商品を追加</Typography>
        <Paper sx={{
            bgcolor: 'background.paper',
            border: '1px solid #eee',
            }}>
        {
            message !== "" &&
            <Alert severity={messageMode}>
                <p>{message}</p>
            </Alert>
        }
        <Box
            component="form"
            sx={{
                '& > :not(sx)': { m: 1 },
                p: 1
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
            >
        <TextField
            id="category"
            select
            label="親カテゴリ"
            value={selectCategory}
            name={selectCategory}
            onChange={handleChange}
            sx={{ width: 150 }}
            size="small"
            >
            { Object.entries(slugs).map((option) => (
                <MenuItem key={option[0]} value={option[0]}>{option[1]}</MenuItem>
            )) }
            </TextField>
            <TextField defaultValue="" id="ja" label="商品名" variant="outlined" sx={{ width: 150 }} size="small" />
            <TextField defaultValue="" id="price" label="価格" variant="outlined" sx={{ width: 100 }} size="small"
                 inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
             />
            <TextField
                defaultValue=""
                id="description"
                label="商品説明"
                multiline
                maxRows={4}
                sx={{ width: 500 }}
                size="small" 
                />
            <LoadingButton type="submit" size="small" variant="outlined"
                endIcon={<SendIcon />}
            >追加</LoadingButton>
        </Box>
        </Paper>
        </>
    )
}
