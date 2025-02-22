import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from 'axios';
import { BACKEND_API } from "@/constants";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { useState } from "react";
import { AlertDestructive } from "./AlertDestructive";
import { useNavigate } from "react-router-dom";
import { generateRSAKeyPair } from "@/lib/utils";
import { storeEncryptedPrivateKey } from "@/lib/sessionStorageKeyManager";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional()
})

const Login: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    },
  })

	const [loginError, setLoginError] = useState(false);
	const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
			const payload = {
				email: values.email,
				password: values.password
			};

      const { publicKeyString, privateKeyString } = await generateRSAKeyPair();
      storeEncryptedPrivateKey(privateKeyString);
			const res = await axios.post(`${BACKEND_API}/auth/login`, payload);

      sessionStorage.setItem("token", res.data.token);
      console.log(res);
      const check = await axios.patch(`${BACKEND_API}/users/${res.data.user.id}`, {...res.data.user, key: publicKeyString}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      console.log(check);
      
			if (res.status === 201) {
				navigate('/upload');
			}
		} catch(error) {
			setLoginError(_p => true);
			console.log(error);
		}
  }

  return (
    <Card className="mx-auto max-w-md p-6 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

			{loginError && <AlertDestructive message="Invalid credentials"></AlertDestructive>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="!mt-0">Remember me</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        <a
          href="#"
          className="underline hover:text-primary"
        >
          Forgot your password?
        </a>
      </div>
    </Card>
  )
}

export default Login;
