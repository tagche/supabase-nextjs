import { useRouter } from 'next/router'
import Home from '..'

export default function CategorySelect(){
    const router = useRouter()
    if(!router.isReady) return false
    const routeId = router.query.id

    return(
      <>
        <Home category={routeId}/>
      </>
    )
}

