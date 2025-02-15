import { AppSidebar } from "./components/App-Sidebar"
import TableDemo from "./components/Table-Demo"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"

function App() {

  return (
    <>
       <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
              <div className="content-center justify-center mx-auto border-none">
                <TableDemo></TableDemo>
              </div>
      </SidebarProvider>     
    </>
  )
}

export default App
