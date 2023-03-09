import { useState, createContext, useEffect, Suspense } from 'react'
import { useRouter } from 'next/router'
import { getCategories } from '../getApi'

import HeadMeta from '../foundation/headMeta'
import Header from '../foundation/header'
import Footer from '../foundation/footer'

import ProductPanel from './panel'
import Cart from './cart'
import Nav from './nav'
import styles from '@/styles/Home.module.css'

export const loginContext = createContext<Boolean>(false)
export const cartContext = createContext([])


const ProductLayout = () => {
    const router = useRouter()
    const routeId = router.query.id
    
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const resProducts = await getCategories(routeId)
        setProducts(resProducts)
      }
      fetchData()
    }, [routeId])
  
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

