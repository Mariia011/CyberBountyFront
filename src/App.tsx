import { AppSidebar } from "./components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import Redirection from "./components/Redirection"
import { SessionProvider } from "./hooks/use-key"
function App() {

  return (
    <>
      <SessionProvider>
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
                <div className="content-center justify-center mx-auto">
                  <Redirection />
                </div>
        </SidebarProvider>
      </SessionProvider>
    </>
  )
}

export default App
