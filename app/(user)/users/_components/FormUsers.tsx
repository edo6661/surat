"use client"
import { User } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { changeRole } from "@/actions/user"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
const formUserSchema = z.object({
  role: z.enum(["APPLICANT", "STAFF", "SUBDISTRICT"]),
})
const roles = ['APPLICANT', 'STAFF', 'SUBDISTRICT']

const FormUsers = ({
  role, id, username
}: User) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formUserSchema>>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      role
    },
  });

  function onSubmit(values: z.infer<typeof formUserSchema>) {
    startTransition(() => {
      changeRole(id, values.role)
        .then(() => {
          console.log("success");
          toast.success("Role Changed successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  max-w-xl mx-auto space-y-2 "
      >
        <p>{username}</p>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={role} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((data) => (
                    <SelectItem value={data} key={data}>
                      {data}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default FormUsers