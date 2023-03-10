import { Auth } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../Account'

import { useState, useEffect, useContext } from 'react'
import { Divider } from '@mui/material'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button';
import { cartContext } from '../../pages/_app'
import { getImagePath } from '../module/functions'
import styles from '@/styles/cart.module.css'

export default function Cart(){
    const session = useSession()
    const supabase = useSupabaseClient()
    
    const { cart, setCart } = useContext(cartContext)
    const [ imagePath, setImagePath ] = useState("")
    
    return (
        <>
        <Paper elevation={1} sx={{padding: '1em'}}>
            {
                cart.length > 0 &&
                <>
                <ul>
                    {
                        Object.values(cart).map(e => 
                            <li key={e.id} className={styles.side}>
                                <img src={e.image} alt="" width="100" />
                                <p>{e.ja}<br />{e.count}点</p>
                            </li>
                        )
                    }
                </ul>
                <Divider sx={{margin: '1em 0'}} />
                </>
            }
            {
                session
                ? cart.length > 0 ? <Button variant="contained">購入手続きへ（仮）</Button>: <><p>カートは空です</p></>
                : <><p>ログインしてください</p></>
            }

            {!session ? (
                //ログイン前
                <Auth supabaseClient={supabase} theme="dark" />
            ) : (
                // ログイン後
                <Account session={session} />
            )}
        </Paper>
         </>
    )
}