import { AppSidebar } from "./AppSidebar"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"


function Sidebar() {
  return (
	<SidebarProvider className="position-absolute overflow-hidden">
		<AppSidebar />
		<SidebarTrigger />
	</SidebarProvider>
  )
}

export default Sidebar
