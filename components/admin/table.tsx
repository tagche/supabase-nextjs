import { getAdminControlPanel, getCategorySlug, Products as ProductsTypes } from '../getApi'

import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'category', headerName: '親カテゴリ', width: 130 },
  { field: 'ja', headerName: '商品名', width: 130 },
  { field: 'price', headerName: '価格', type: 'number', width: 120 },
  { field: 'description', headerName: '商品説明', width: 400 },              
];

let rows: ProductsTypes = []

const fetchSlugData = new Promise((resolve, reject) => {
    const resSlug = getCategorySlug()
    resolve(resSlug)
})
const fetchProductsData = new Promise((resolve, reject) => {
    const resProducts = getAdminControlPanel()
    resolve(resProducts)
})

fetchSlugData
    .then((slugs) => {
        //テーブル一覧用データ
        //categoryがslugで返ってくるので、日本語に変換して格納
        fetchProductsData.then((prds) => {
            Object.values(prds).map((e) => {
                rows.push(
                    {
                        category: slugs[e.category],
                        id: e.id,
                        ja: e.ja,
                        description: e.description,
                        price: e.price,
                        updated_at: e.updated_at
                    }
                )
            })
        })
    }
)



export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </div>
  );
}