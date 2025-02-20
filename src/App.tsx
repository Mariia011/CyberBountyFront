import { AppSidebar } from "./components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import Redirection from "./components/Redirection"
import { DecryptInfoProvider } from "./hooks/decrypt-info"
function App() {

  return (
    <>
       <SidebarProvider>
          <DecryptInfoProvider>
            <AppSidebar />
            <SidebarTrigger />
                <div className="content-center justify-center mx-auto">
                  <Redirection />
                </div>
          </DecryptInfoProvider>
      </SidebarProvider>
    </>
  )
}

export default App
