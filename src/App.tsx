import { Breadcrumbs, Container } from "@freee_jp/vibes";

function App() {
	return (
		<>
			<Container>
				<Breadcrumbs
					links={[
						{ title: "取引", url: "/hub_pages/deals" },
						{ title: "自動で経理", url: "/wallet_txns/stream" },
					]}
				/>
			</Container>
		</>
	);
}

export default App;
