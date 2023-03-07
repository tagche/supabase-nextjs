import { Suspense } from 'react'
import { useSession } from '@supabase/auth-helpers-react'

import UserLogin from '@/components/Login'
import ProductLayout from '@/components/product/layout'

const Home = () => {
  const session = useSession()

  return (
    <div className="container" style={{ padding: '50px 50px' }}>
      {!session ? (
        <UserLogin />
      ) : (
        <Suspense fallback={<p>Loading...</p>}>
          <ProductLayout />
        </Suspense>
      )}
    </div>
  )
}

export default Home