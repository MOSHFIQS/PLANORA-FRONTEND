
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

     const { setAuthData } = useAuth();
     const router = useRouter()
     const searchParams = useSearchParams();
     const redirectUrl = searchParams.get("redirect") || "/";
     const registerImages = useImageUpload({ max: 1 });

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
                    // console.log(result.data);

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
                         );
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
          <Card {...props} className="max-w-4xl mx-auto">

               <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                         Enter your information below to login
                    </CardDescription>
               </CardHeader>

               <CardContent>

                    <form
                         id="register-form"
                         onSubmit={(e) => {
                              e.preventDefault()
                              form.handleSubmit()
                         }}
                    >

                         <FieldGroup>

                              <form.Field
                                   name="name"
                                   children={(field) => {

                                        const isInvalid =
                                             field.state.meta.isTouched && !field.state.meta.isValid

                                        return (
                                             <Field data-invalid={isInvalid}>

                                                  <FieldLabel htmlFor={field.name}>
                                                       Name
                                                  </FieldLabel>

                                                  <Input
                                                       type="text"
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
                              <form.Field
                                   name="email"
                                   children={(field) => {

                                        const isInvalid =
                                             field.state.meta.isTouched && !field.state.meta.isValid

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
                                                  />

                                                  {isInvalid && (
                                                       <FieldError errors={field.state.meta.errors} />
                                                  )}

                                             </Field>
                                        )
                                   }}
                              />

                              <form.Field
                                   name="password"
                                   children={(field) => {

                                        const isInvalid =
                                             field.state.meta.isTouched && !field.state.meta.isValid

                                        return (
                                             <Field data-invalid={isInvalid}>

                                                  <FieldLabel htmlFor={field.name}>
                                                       Password
                                                  </FieldLabel>

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

                              <ImageUploader
                                   label="Event Images"
                                   images={registerImages.images}
                                   onUpload={registerImages.upload}
                                   onDelete={registerImages.remove}
                                   multiple={false}
                              />

                         </FieldGroup>

                    </form>

               </CardContent>

               <CardFooter className="flex flex-col gap-5 justify-end">

                    <Button form="register-form" type="submit" className="w-full">
                         Register
                    </Button>
                    <h1>Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login here</Link></h1>

               </CardFooter>

          </Card>
     )
}