
import Redirection from "./components/Redirection"
import { SessionProvider } from "./hooks/use-key"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"
import { SidebarTrigger } from "./components/ui/sidebar"
import { TokenProvider } from "./hooks/use-token"

function App() {

  return (
    <>
      <SessionProvider>
        <TokenProvider>
          <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger />
                  <div className="content-center justify-center mx-auto">
                    <Redirection />
                  </div>
          </SidebarProvider>
        </TokenProvider>  
      </SessionProvider>
    </>
  )
}

export default App
