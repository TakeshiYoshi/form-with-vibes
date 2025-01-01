import { Breadcrumbs } from '@freee_jp/vibes'

function App() {
  return (
    <>
      <div className="app">
        <Breadcrumbs
          links={[
            { title: '取引', url: '/hub_pages/deals' },
            { title: '自動で経理', url: '/wallet_txns/stream' },
          ]}
        />
      </div>
    </>
  )
}

export default App
