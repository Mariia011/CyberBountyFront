import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Interface } from "readline";

export default function SidebarSearch() {

	interface IUser {
		email: string,
		username: string,
		password: string,
		key: string
	}

	const	[search, setSearch] = useState<string>("");
	const [user, setUser] = useState<IUser | null>(null);

	const handleClick = () => {
		console.log(search);
		// axios.get("url", body);
	}
  return (
	<div className="bg-slate-400 justify-start w-full h-full">
		<div className="w-full h-12 align-center justify-center mt-8">
			<div className="flex justify-center items-center space-x-2 w-full h-12  flex">
				<Input className="w-[40rem]" type="text" placeholder="Search..."
					 value={search}
				  onChange={(e:  React.ChangeEvent<HTMLInputElement >) => setSearch(e.currentTarget.value)}/>
      			<Button onClick={handleClick}>Search</Button>
			</div>
		</div>
		<div className="flex ps-24 pe-24 h-[50dvh] justify-center content-center mt-10">
			{
				(user ?
				<>
					<div className="flex flex-col">
						<span><b>Username:</b> {user?.username}</span>
						<span><b>Email:</b> {user?.email}</span>
						<span><b>Key:</b> {user?.key}</span>
					</div>
				</>: <h1><b>No user searched</b></h1>
				)
				// (true ?
				// 	<>
				// 		<div className="flex flex-col">
				// 			<span><b>Username:</b> {user?.username || 'Serob'}</span>
				// 			<span><b>Email:</b> {user?.email || "qwerty123"}</span>
				// 			<span><b>Key:</b> {user?.key || "keyser"}</span>
				// 		</div>
				// 	</>: <h1><b>No user searched</b></h1>
				// 	)
			}
		</div>
	</div>
  );
}
