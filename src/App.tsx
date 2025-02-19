
import Redirection from "./components/Redirection"
import Sidebar from "./components/Sidebar"

function App() {

  return (
    <>
	<div className="wrapper w-[100dvw] h-[100dvh] flex bg-red-600 overflow-x-hidden">
		{/* <Sidebar/> */}
		<div>
			<Sidebar/>
		</div>
		<Redirection />
	</div>
    </>
  )
}

export default App
