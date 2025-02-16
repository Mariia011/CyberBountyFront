import { AppSidebar } from "./components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import Rediraction from "./components/Redirection"

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
