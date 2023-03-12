import { useState, useContext, useEffect, Suspense } from 'react'
import { useRouter } from 'next/router'
import { getCategories } from '../getApi'

import HeadMeta from '../foundation/headMeta'
import Header from '../foundation/header'
import Footer from '../foundation/footer'

import ProductPanel from './panel'
import Cart from './cart'
import Nav from './nav'
import styles from '@/styles/Home.module.css'

const ProductLayout = () => {
    const [products, setProducts] = useState([])
    
    const router = useRouter()    
    const routeId = router.query.id
    
    useEffect(() => {
      const fetchData = async () => {
        const resProducts = routeId ? await getCategories(routeId): await getCategories()
        setProducts(resProducts)
      }
      fetchData()
    }, [routeId])
  
  return (
    <>
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
    </>
  )

}

export default ProductLayout

