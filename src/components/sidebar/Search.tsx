import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { BACKEND_API } from "@/constants";
import { TokenContext } from "@/hooks/use-token";

export default function SidebarSearch() {
  interface IUser {
    email: string;
    username: string;
    password: string;
    key: string;
  }

  const [user, setUser] = useState<IUser | null>(null);
  const [email, setEmail] = useState<string>("");
  const [token, _] = useContext(TokenContext);

  const handleClick = async () => {
    // Example API call:
    console.log(token);
    const response = await axios.get(`${BACKEND_API}/users/?email=${email}`, {
      headers: {
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      responseType: 'json'
    });
    setUser(response.data);
  };

  return (
    <div className="p-4 space-y-8">
      {/* Search Input */}
      <div className="flex items-center space-x-2">
        <Input
          className="w-full"
          type="text"
          placeholder="Search..."
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
        />
        <Button className="bg-gray-500 text-white hover:bg-gray-600" onClick={handleClick}>Search</Button>
      </div>

      {/* Display User Info */}
      <div>
        {user ? (
          <Card>
            <CardHeader>
              <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Key:</strong> {user.key}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No User Searched</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please enter an email and click Search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
