"use client"

import { Button } from "@/components/ui/button"
import {
     Card,
     CardContent,
     CardDescription,
     CardFooter,
     CardHeader,
     CardTitle,
} from "@/components/ui/card"

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

import { registerAction } from "@/actions/auth.action"
import ImageUploader from "@/components/imageUploader/ImageUploader"
import { useImageUpload } from "@/hooks/useImageUpload"
import Link from "next/link"

const formSchema = z.object({
     name: z.string().min(2, "Minimum length is 2"),
     password: z.string().min(6, "Minimum length is 6"),
     email: z.string().email("Invalid email"),
})

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
     const { setAuthData } = useAuth()
     const router = useRouter()
     const searchParams = useSearchParams()
     const redirectUrl = searchParams.get("redirect") || "/"
     const registerImages = useImageUpload({ max: 1 })

     const form = useForm({
          defaultValues: {
               name: "",
               email: "",
               password: "",
          },
          validators: {
               onSubmit: formSchema,
          },
          onSubmit: async ({ value }) => {
               const toastId = toast.loading("Registering...")

               try {
                    const payload = {
                         ...value,
                         image: registerImages.images[0]?.img,
                    }

                    const result = await registerAction(payload)

                    if (!result.ok) {
                         toast.error(result.message || "Invalid credentials", {
                              id: toastId,
                         })
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
          <div className="flex flex-col  gap-6 max-w-5xl mx-auto" {...props}>
               <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-4 md:grid-cols-2 ">

                         {/* LEFT FORM */}
                         <form
                              className="p-6 md:p-8"
                              id="register-form"
                              onSubmit={(e) => {
                                   e.preventDefault()
                                   form.handleSubmit()
                              }}
                         >
                              <FieldGroup>

                                   {/* HEADER */}
                                   <div className="flex flex-col items-center gap-2 text-center mb-4">
                                        <h1 className="text-2xl font-bold">Create Account</h1>
                                        <p className="text-muted-foreground">
                                             Enter your details to register
                                        </p>
                                   </div>

                                   {/* NAME */}
                                   <form.Field
                                        name="name"
                                        children={(field) => {
                                             const isInvalid =
                                                  field.state.meta.isTouched &&
                                                  !field.state.meta.isValid

                                             return (
                                                  <Field data-invalid={isInvalid}>
                                                       <FieldLabel>Name</FieldLabel>
                                                       <Input
                                                            type="text"
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

                                   {/* EMAIL */}
                                   <form.Field
                                        name="email"
                                        children={(field) => {
                                             const isInvalid =
                                                  field.state.meta.isTouched &&
                                                  !field.state.meta.isValid

                                             return (
                                                  <Field data-invalid={isInvalid}>
                                                       <FieldLabel>Email</FieldLabel>
                                                       <Input
                                                            type="email"
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
                                                       <FieldLabel>Password</FieldLabel>
                                                       <Input
                                                            type="password"
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

                                   {/* IMAGE UPLOADER */}
                                   <ImageUploader
                                        label="Profile Image"
                                        images={registerImages.images}
                                        onUpload={registerImages.upload}
                                        onDelete={registerImages.remove}
                                        multiple={false}
                                   />

                                   {/* BUTTON + LINK */}
                                   <div className="flex flex-col gap-5 pt-2">
                                        <Button
                                             variant={"violet"}
                                             form="register-form"
                                             type="submit"
                                             className="w-full"
                                        >
                                             Register
                                        </Button>

                                        <p className="text-sm text-center text-muted-foreground">
                                             Already have an account?{" "}
                                             <Link
                                                  href="/login"
                                                  className="text-primary hover:underline"
                                             >
                                                  Login here
                                             </Link>
                                        </p>
                                   </div>
                              </FieldGroup>
                         </form>

                         {/* RIGHT SIDE */}
                         <div className="relative hidden bg-muted md:block">
                              <img
                                   src="/gradient.jpg"
                                   alt="Register"
                                   className="absolute inset-0 h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                              />

                              <div className="relative z-10 p-6 md:p-8 lg:p-12 text-white flex flex-col justify-end h-full gap-3">
                                   <h2 className="text-3xl font-bold">
                                        Join Planora Today!
                                   </h2>
                                   <p className="text-sm opacity-90">
                                        Discover unforgettable events, connect with people, and create lasting memories.
                                   </p>
                              </div>
                         </div>

                    </CardContent>
               </Card>
          </div>
     )
}