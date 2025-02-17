import { AppSidebar } from "./components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import Redirection from "./components/Redirection"
import { useState } from "react";
import React from "react";

export const Context = React.createContext();

function App() {

	const [token, setToken] = useState("");

  return (
    <Context.Provider value={[token, setToken]}>
				<SidebarProvider>
						<AppSidebar />
						<SidebarTrigger />
								<div className="content-center justify-center mx-auto">
									<Redirection />
								</div>
				</SidebarProvider>
    </Context.Provider>
  )
}

export default App
