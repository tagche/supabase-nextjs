import { Auth } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../../../components/Account'

import { useContext } from 'react'
import { Divider } from '@mui/material'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button';
import { cartContext, loginContext } from '../../'
import LoginControl from "../module/loginControl"

import styles from '@/styles/cart.module.css'

export default function Cart(){
    const session = useSession()
    const supabase = useSupabaseClient()

    
    const {loginStatus, setLogin} = useContext(loginContext)
    const { cart, setCart } = useContext(cartContext)
    
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
                                <img src="https://unsplash.it/800/600/?random" alt="" width="100" />
                                <p>{e.ja}<br />{e.count}点</p>
                            </li>
                        )
                    }
                </ul>
                <Divider sx={{margin: '1em 0'}} />
                </>
            }
            {
                loginStatus
                ? cart.length > 0 ? <Button variant="contained">購入手続きへ進む</Button>: <><p>カートは空です</p></>
                : <><p>ログインしてください</p></>
            }

            {!session ? (
                <Auth supabaseClient={supabase} theme="dark" />
            ) : (
                <Account session={session} />
            )}
        </Paper>
         </>
    )
}