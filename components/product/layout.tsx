import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, createContext, useEffect, Suspense } from 'react'
import { getCategories, getProducts } from '../getApi'

import HeadMeta from '../foundation/headMeta'
import Header from '../foundation/header'
import Footer from '../foundation/footer'

import ProductPanel from './panel'
import Cart from './cart'
import Nav from './nav'
import { categoryList } from '../../pages/api/connect'
import Typography from '@mui/material/Typography'

import styles from '@/styles/Home.module.css'
import React from 'react'

export const loginContext = createContext<Boolean>(false)
export const cartContext = createContext([""])

const ProductLayout = () => {
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const resProducts = await getCategories()
        setProducts(resProducts)
      }
      fetchData().then((e) => console.log(e))
    }, [])
  
  return (
    <cartContext.Provider value={{cart, setCart}}>
      <HeadMeta />
      <Header />
      <main className={styles.main}>
        <nav className={styles.nav}>
          <Nav />
        </nav>
        <div>
          <Suspense fallback={<p>Loading...</p>}>
            <ProductPanel products={products} />
          </Suspense>
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

