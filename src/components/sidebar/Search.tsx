import React, { useState } from "react";
import axios from "axios";
// Import shadcn/ui components (adjust paths as needed)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BACKEND_API } from "@/constants";

interface User {
  username: string;
  email: string;
}

const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("username"); // either 'username' or 'email'
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);

    setSearchType(searchTerm.includes("@") ? "email" : "username");

    try {
      // Adjust the URL as per your API design
      console.log(searchType, searchTerm);
      const response = await axios.get<User[]>(`${BACKEND_API}/users/?${searchType}=${searchTerm}`);
      // const response = await axios.get<User[]>(`http://localhost:1488/users/?username=asdf`);
      console.log("response.data:", response.data);
      setUsers(response.data);
    } catch (err: any) {
      setError("Error searching users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Search Registered Users</h2>
      <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {users.length > 0 ? (
        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={Date.now()} className="p-4">
              <CardHeader>
                <h3 className="text-lg font-semibold">{user.username}</h3>
              </CardHeader>
              <CardContent>
                <p>{user.email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        !loading && <p>No users found.</p>
      )}
    </div>
  );
};

export default UserSearch;
