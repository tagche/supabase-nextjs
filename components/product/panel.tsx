import { useState, useEffect, useContext } from 'react'
//import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { supabase } from '../dbConnect'
import { Database } from '../../utils/database.types'

import { cartContext } from './layout'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type Categories = Database['public']['Tables']['categories']['Row']
type Products = Database['public']['Tables']['products']['Row']

//商品毎の注文数をハンドリング
export function CountControl(e: Database){
    const { cart, setCart } = useContext(cartContext)
    
    const [ count, setCount ] = useState(0)
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

export function PanelParts(e: any){
    console.log("--------- ", e)
    return (
        <Grid item key={e.id} sm={12} md={6} lg={4} sx={{marginBottom: "2em"}}>
            <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
            <CardMedia
                component="img"
                sx={{ 16:9 }}
                image="https://unsplash.it/800/600/?random"
                alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" sx={{fontWeight: 'bold'}}>
                {e.ja}
                </Typography>
                <Typography>
                テキストテキストテキストテキストテキストテキストテキストテキストテキスト
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
    //const supabase = useSupabaseClient<Database>()
    //const supabase = createClient(supabaseUrl, supabaseKey)
    const [loading, setLoading] = useState(true)
    const [categorySlug, setCategorySlug] = useState<Categories['slug']>(null)
    const [categoryJa, setCategoryJa] = useState<Categories['ja']>(null)

    useEffect(() => {
        getCategories()
        getProducts()
    }, [])

    async function getCategories() {
        try {
            setLoading(true)
            
            let { data, error } = await supabase
                .from('categories')
                .select('*')
                console.log('categories: ' ,data)

            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setCategorySlug(data)
                setCategoryJa(data)
            }
        } catch (error) {
            console.log(('Error loading Category data...'))
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    async function getProducts() {
        try {
            setLoading(true)
            
            let { data, error } = await supabase
                .from('products')
                .select('*')
                console.log('products: ' ,data)

            if (error && status !== 406) {
                throw error
            }
            if (data) {
                // setCategorySlug(data.slug)
                // setCategoryJa(data)
            }
        } catch (error) {
            console.log(('Error loading products data!'))
            //console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    
    return (
        <>
       
        {/* <ul className={styles.productList}>
            {
                categoryName !== "all" &&
                    <Grid container spacing={4} key={categoryName}>
                        {categoryData.map((e) => (
                            <>
                            {e}
                            
                            <PanelParts {...e} />
                            </>
                        ))}
                    </Grid>
            }

            {
                categoryName == "all" &&
                    <>
                    {
                        Object.values(productTable).map((arr, i: number) => (
                            //console.log(arr[0])
                            <Grid container key={props.category + i} spacing={4}>
                                {categoryData.map((e) => (
                                    <PanelParts {...e} />
                                ))}
                            </Grid>
                        ))
                    }
                    </>
            }
        </ul> */}
        </>
    )
}
