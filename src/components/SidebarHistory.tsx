import { ScrollArea } from "@/components/ui/scroll-area"

const SidebarHistory = () => {
    return (
        <div>

            <p className='font-black'><b></b>History</p>

            <ScrollArea className= "h-[500px] w-[850px] rounded-md border p-4 space-y-2" >
            <table className="history-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Details</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><div className="m-1 p-2">1</div></td>
                    <td><div className="m-1 p-2">John Doe</div></td>
                    <td><div className="m-1 p-2">Login</div></td>
                    <td><div className="m-1 p-2">Successful login</div></td>
                    <td>2025-02-16 10:30 AM</td>
                </tr>
                <tr>
                    <td><div className="m-1 p-2">2</div></td>
                    <td><div className="m-1 p-2">Jane Smith</div></td>
                    <td><div className="m-1 p-2">Lesson Completed</div></td>
                    <td><div className="m-1 p-2">Phishing Awareness Module</div></td>
                    <td><div className="m-1 p-2">2025-02-16 11:00 AM</div></td>
                </tr>

            </tbody>
                </table>
            </ScrollArea>
        </div>
    )
}

export default SidebarHistory

