
import { Alert, AlertTitle, Button, Link, Typography } from '@mui/material'

const Home = () => {

  return (
    <div className='info'>
      <Alert severity="info" className='info-board'>
  <AlertTitle variant='subtitle1'>About this Page</AlertTitle>
  <Typography variant='body2' className='info-board__intro'>このページは<strong>React / TypeScript / Next.js</strong> で構築したWeb
  アプリの試作ページです。</Typography>
  <Typography variant='body2'>開発現場で採用頻度の高い技術を盛り込むことに重点を置いています。<br />
  そのため、SPAの取り入れやDB連携スキルを表現するために Supabase（BaaS）を採用し、API連携や非同期処理などを意識したページを作成しました。</Typography>
  <Typography variant='caption'>※アニメーション（GSAP）やWebGL、PHP、WordPress、HTML/CSSなどのスキルは別途職務経歴書をご覧ください。</Typography>

<div className="info-function">
  <Typography variant='body2'>盛り込んだ機能は主に下記になります。</Typography>
  <ul>
<li>SPA</li>
<li>ユーザー登録（Supabase テンプレートを利用）</li>
<li>ログイン機能</li>
<li>カート機能（選択した商品をカートに保持）</li>
<li>商品管理機能（商品の追加・削除）</li>
  </ul>
  </div>

  <div className="info-skillset">
  <Typography variant='body2'>使用技術</Typography>
  <ul>
    <li>ライブラリ・フレームワーク：React、TypeScript、MUI</li>
    <li>サーバーサイド：Next.js</li>
    <li>データベース：Supabase（BaaS / RDB）</li>
    <li>インフラ：Docker</li>
  </ul>
  <div className="info-github">
  <Typography variant='body2'>GitHub</Typography>
  <p><Link href="https://github.com/tagche/supabase-nextjs" rel="noreferrer" target="_blank">https://github.com/tagche/supabase-nextjs</Link></p>
  </div>
  </div>
  </Alert>
  <div className="btn-container">
    <Link href="products/"><Button variant='contained'>商品ページを見る</Button></Link>
    <Link href="admin/"><Button variant='contained'>商品管理画面を見る</Button></Link>
  </div>
    </div>
  )
}

export default Home