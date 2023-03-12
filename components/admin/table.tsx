import { deleteProductApi, getAdminControlPanel, getCategorySlug, Products as ProductsTypes, slugsType } from '../getApi'

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Paper, Typography } from '@mui/material'
import AddProduct from './addProduct'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const fetchSlugData = async() =>{
    const resSlug = await getCategorySlug()
    return resSlug
}

const fetchProductsData = async() =>{
    const resProducts = await getAdminControlPanel()
    return resProducts
}

export function ProductTable() {
    const [isOpen, setOpenDialog] = useState(false)
    const [targetId, setTargetId] = useState(-1)
    const [targetName, setTargetName] = useState("")
    const [rows, setRows] = useState([])
    const [slugs, setSlugs] = useState({})

    React.useEffect(() => {
        fetchSlugData().then((e) => setSlugs(e))

        fetchProductsData()
        .then((e: any) => {
            Object.values(e).map((el, i) => {
                e[i].category = slugs[el.category]
            })
            return e
        }).then((e) => {
            setRows(e)
        })
    }, [])
    

    const handleClose = () => {
        setOpenDialog(false)
    }

    const handleDelete = ((e: any) => {
        const parent = e.target.closest('[data-id]')
        const id = parent.getAttribute('data-id')
        const name = parent.querySelector('[data-field=ja]').children[0].getAttribute('title')
        //console.log(id, name)
        setTargetId(id)
        setTargetName(name)
        setOpenDialog(true)
    })

    const doDelete = (() => {
        setOpenDialog(false)
        const resultDelete = deleteProductApi(targetId)
        resultDelete.then((e) => {
            if(!e) alert("削除しました。")
            window.location.reload()
        })
    })
    
    const columns: GridColDef[] = [
        { field: 'delete', headerName: '削除', width: 100 , 
            renderCell:(params) => <Button variant='outlined' onClick={handleDelete}>削除</Button>
        },
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'category', headerName: '親カテゴリ', width: 130 },
        { field: 'ja', headerName: '商品名', width: 130 },
        { field: 'price', headerName: '価格', type: 'number', width: 120 },
        { field: 'description', headerName: '商品説明', width: 400 },              
    ]

    return (
        <>
        <Dialog
            open={isOpen}
            onClose={handleClose}
            //aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <strong>{targetName}</strong> を削除しますか？
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={doDelete}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
            </DialogActions>
        </Dialog>

        <Typography variant="h6" component="h4" sx={{ mb: '1em' }}>商品一覧</Typography>
        <Paper sx={{ bgcolor: 'background.paper' }}>
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            //pageSize={5}
            //rowsPerPageOptions={[5]}
            checkboxSelection={false}
        />
        </div>
        </Paper>
        <br />
        <AddProduct {...slugs} />
        </>
    )

}

export default ProductTable