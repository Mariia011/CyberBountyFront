import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios, { AxiosError } from 'axios';
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
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertDestructive } from "./AlertDestructive";

const formSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  key: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

const Register: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
			key: ""
    },
  })

	const navigate = useNavigate();
	const [registerError, setRegisterError] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const payload = {
				username: values.username,
				email: values.email,
				password:values.password,
				key: values.key
			};

			const res = await axios.post(`${BACKEND_API}/auth/register`, payload);

			if (res.status === 201) {
				navigate('/login');
			}
		} catch (err) {
			if (err instanceof AxiosError && err.status === 400) {
				console.log('User already exists');
				setRegisterError(true);
			}
			console.log({ values, err });
		}
  }

  return (
    <Card className="mx-auto max-w-md p-6 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>

			{registerError && <AlertDestructive message="You are already registered. Please log in"></AlertDestructive>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john_doe123"
                      {...field}
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

				<FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ssh 4567897654-AFHGVSJFB"
                      {...field}
											autoComplete="public key"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a
          href="#"
          className="underline hover:text-primary"
        >
          Sign in
        </a>
      </div>
    </Card>
  )
}

export default Register;
