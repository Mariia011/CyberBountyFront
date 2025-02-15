import { AppSidebar } from "./components/App-Sidebar"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import Rediraction from "./components/Rediraction"
function App() {

  return (
    <>
       <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
              <div className="content-center justify-center mx-auto">
                <Rediraction />
              </div>
      </SidebarProvider>     
    </>
  )
}

export default App
