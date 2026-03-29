"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/AuthProvider"
import { logInAction } from "@/actions/auth.action"
import Link from "next/link"

const formSchema = z.object({
  password: z.string().min(6, "Minimum length is 6"),
  email: z.string().email("Invalid email"),
})

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { setAuthData } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/"

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...")

      try {
        const result = await logInAction(value)

        if (!result.ok) {
          toast.error(result.message || "Invalid credentials", { id: toastId })
          return { form: "Invalid email or password" }
        }

        if (result.ok) {
          setAuthData(
            result.data.user,
            result.data.accessToken,
            result.data.refreshToken,
            result.data.token
          )
        }

        toast.success(result.message, { id: toastId })
        router.push(redirectUrl)
      } catch (err) {
        console.error(err)
        toast.error("Something went wrong", { id: toastId })
      }
    },
  })

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full" {...props}>
      <Card className="overflow-hidden p-4">
        <CardContent className="grid p-0 md:grid-cols-2">

          {/* LEFT FORM SIDE */}
          <form
            className="p-6 md:p-8"
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>

              {/* HEADER */}
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">
                  Login to your account
                </p>
              </div>

              {/* EMAIL */}
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email
                      </FieldLabel>

                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        placeholder="m@example.com"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              {/* PASSWORD */}
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center">
                        <FieldLabel htmlFor={field.name}>
                          Password
                        </FieldLabel>

                      </div>

                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              {/* BUTTON */}
              <Field>
                <Button type="submit" variant={"violet"} className="w-full">
                  Login
                </Button>
              </Field>

              {/* FOOTER LINK */}
              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href={`/register?redirect=${encodeURIComponent(
                    redirectUrl
                  )}`}
                  className="underline hover:text-primary"
                >
                  Sign up
                </Link>
              </div>
            </FieldGroup>
          </form>

          {/* RIGHT IMAGE SIDE */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="/gradient.jpg"
              alt="Login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-lg"
            />

            <div className="relative z-10 p-6 md:p-8 lg:p-12 text-white flex flex-col gap-4 h-full justify-end">
              <h2 className="text-3xl font-bold">
                Join Planora Today!
              </h2>
              <p className="text-xs">
                Discover unforgettable events, connect with like-minded people, and create lasting memories. Your next adventure awaits!
              </p>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}