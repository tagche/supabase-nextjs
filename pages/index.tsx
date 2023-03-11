
import { Button, Link } from '@mui/material'

const Home = () => {

  return (
    <div className='container'>
    <Button><Link href="products/">商品ページへ</Link></Button><br />
    <Button><Link href="admin/">商品管理画面へ</Link></Button>
    </div>
  )
}

export default Home