import { useState, useEffect, useContext } from 'react'
import { Database } from '../../utils/database.types'
//import { getCategories } from '../getApi'

import { cartContext } from '../../pages/_app'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styles from '@/styles/Home.module.css'
import { getImagePath } from '../module/functions'

//商品毎の注文数をハンドリング
export function CountControl(e: Database){
    const { cart, setCart } = useContext(cartContext)
    
    const [ count, setCount ] = useState<number>(0)
    const [ disable1, setDisable1 ] = useState(false)
    const [ disable2, setDisable2 ] = useState(true)

    const handleCount = (flag: boolean) => {
        const id = e.id
        if(flag && count < 3){
            // 商品数増加時の処理
            let addFlag = false

            //カート内に対象商品があれば個数を変更
            Object.values(cart).forEach((e: any, i: number) => {
                if(e.id != id) return false
                cart[i].count = count + 1
                addFlag = true
                setCart([...cart]) //cartを再代入してカート内容を再レンダリング
            })
            
            //カート内に対象商品がない場合は追加
            if(!addFlag){
                setCart([...cart, {
                    id: id,
                    ja: e.ja,
                    price: e.price,
                    image: getImagePath(e.image),
                    count: count + 1
                }])
            }
            setCount(count + 1)
        }
        else if(!flag && count > 0){
            // 商品数減少時の処理
            if(count == 1){
                //商品をカートから削除
                Object.values(cart).forEach((e: any, i: number) => {
                    if(e.id != id) return false
                    cart.splice(i, 1)
                    setCart([...cart]) //cartを再代入してカート内容を再レンダリング
                })
            }else{
                //商品の個数を変更
                Object.values(cart).forEach((e: any, i: number) => {
                    if(e.id != id) return false
                    cart[i].count = count - 1
                    setCart([...cart]) //cartを再代入してカート内容を再レンダリング
                })
            }
            setCount(count - 1)
        }
    }
    const handleDisable = (flag: boolean) => {
        if(flag){
            if(count == 2) setDisable1(true)
            if(count == 1) setDisable2(false)
        }else{
            if(count == 3) setDisable1(false)
            if(count == 1) setDisable2(true)
        }
    }

    return (
        <div>
            <Button variant="contained" key={e.id + "1"} disabled={disable1}
                onClick={() => {
                    handleCount(true)
                    handleDisable(true)
                }}>+</Button>
            {count}
            <Button variant="contained" key={e.id} disabled={disable2} onClick={() => {
                handleCount(false)
                handleDisable(false)
            }}>-</Button>
        </div>
    )
}

export function PanelParts(product: any){
    const e = product
    const [imgPath, setImgPath] = useState("")

    useEffect(() => {
        const imgPath = getImagePath(e.image)
        setImgPath(imgPath)
    }, [])
    return (
            <Grid item key={e.id} sm={12} md={6} lg={4} sx={{marginBottom: "2em"}}>
                <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <CardMedia
                    component="img"
                    sx={{ 16:9 }}
                    image={imgPath}
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2" sx={{fontWeight: 'bold'}}>
                    {e.ja}
                    </Typography>
                    <Typography>
                    {e.description}
                    </Typography>
                    <Typography sx={{pt: '.5em', fontSize: '1em'}}>
                        {e.price} 円
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        pb: "1em"
                    }}>
                    <CountControl {...e} />
                </CardActions>
                </Card>
            </Grid>
    )
}

//商品一覧をレンダリング
export default function ProductPanel(props: any){
    const products = props.products
    
    return (
        <div className={styles.productList}>
            {
            Object.values(products).map((category) => (
                <section key={category.slug} className={styles.productListSec}>
                    <Typography sx={{margin:"0 0 1em"}} variant="h4" component="h2">{category.ja}</Typography>
                    <Grid container spacing={2}>
                        {
                        Object.values(category.products).map((product) => (
                            <PanelParts {...product} key={product.id} />
                        ))
                        }
                    </Grid>
                </section>
            ))
            }
        </div>
    )
}
