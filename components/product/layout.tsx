import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, createContext } from 'react'

import HeadMeta from '../foundation/headMeta'
import Header from '../foundation/header'
import Footer from '../foundation/footer'

import ProductPanel from './panel'
import Cart from './cart'
import Nav from './nav'
import { categoryList } from '../../pages/api/connect'
import Typography from '@mui/material/Typography'

import styles from '@/styles/Home.module.css'

export const loginContext = createContext<Boolean>(false)
export const cartContext = createContext([""])


const ProductLayout = (props: string = "") => {
  const session = useSession()
  const supabase = useSupabaseClient()

  const [cart, setCart] = useState([])

  let categoryName = ""
  if(props.category){
    categoryList.map((e) => {
      e.child.map((el) => {
        if(el.id == props.category) categoryName = el.subCategoryJa
      })
    })
  }

  const categoryHeader = !props.category
    ? "すべての商品"
    : categoryName

  return (
    <cartContext.Provider value={{cart, setCart}}>
      <HeadMeta />
      <Header />
      <main className={styles.main}>
        <nav className={styles.nav}>
          <Nav />
        </nav>
        <div>
          <Typography gutterBottom variant="h4" component="h2">{categoryHeader}</Typography>
          <ProductPanel category={props.category} />
        </div>
        <div className={styles.cart}>
          <Cart />
        </div>
      </main>
      <Footer />
    </cartContext.Provider>
  )
}

export default ProductLayout