"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { toast } from "sonner"
import { useLazyGetUsersQuery } from "@/redux/services/get-user-details.api-slice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  code: z.string({ message: "kindly Input student code" }),
})

const Home = () => {
  const [verifyStudent, { isLoading, data, isSuccess }] = useLazyGetUsersQuery()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  })

  function onSubmit({ email, code }: z.infer<typeof FormSchema>) {
    verifyStudent({
      email: email,
      code: code,
    })
    toast.success("Successful", {
      description: "Student details should display below",
    })
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="h-full w-full max-w-[500px] flex flex-col items-center justify-center gap-y-10 p-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-slate-50 w-2/3 space-y-6 p-5 rounded-sm">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* code */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student access code</FormLabel>
                  <FormControl>
                    <Input placeholder="code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">{isLoading ? "Checking details..." : "Check details"}</Button>
          </form>
        </Form>

        {/* Result */}
        {isSuccess ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Student details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-3">
              <p>Name: {data?.data?.name ?? "N/A"}</p>
              <p>Email: {data?.data?.email ?? "N/A"}</p>
            </CardContent>
          </Card>
        ) : null}

      </div>
    </div>
  )
}


export default Home