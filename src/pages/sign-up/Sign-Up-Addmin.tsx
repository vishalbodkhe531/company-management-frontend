import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import ToasterComponent from "@/components/toaster/Toaster";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type UserFormValues = z.infer<typeof userSchema>;

function SignUpAddmin() {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data: UserFormValues) => {
    console.log("Sign Up data : ", data);

    ToasterComponent({
      message: "Admin Login successfully !!",
      description: "Thanks for Authentication",
      firstLable: "Close",
    });

    navigate("/sign-in-admin");
  });
  return (
    <>
      <div className="flex justify-center items-center h-[80%]">
        <Tabs defaultValue="account" className="w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="px-[3rem] w-full">
            <Card>
              <CardHeader>
                <CardTitle className="font-bold">Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={onSubmit}>
                  <CardContent className="space-y-1">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="name"
                        className="border-none bg-inputBg text-inputTitle p-5 !text-inputText"
                        {...register("name")}
                      />
                      {errors.name && (
                        <span className="text-red-500 font-bold text-sm">
                          {errors.name.message as string}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">email</Label>
                      <Input
                        id="email"
                        placeholder="email"
                        className="border-none bg-inputBg text-inputTitle p-5 !text-inputText"
                        {...register("email")}
                      />
                      {errors.email && (
                        <span className="text-red-500 font-bold text-sm">
                          {errors.email.message as string}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 ">
                      <Label htmlFor="password">password</Label>
                      <Input
                        id="password"
                        placeholder="password"
                        className="border-none bg-inputBg text-inputTitle p-5 !text-inputText"
                        {...register("password")}
                      />
                      {errors.password && (
                        <span className="text-red-500 font-bold text-sm">
                          {errors.password.message as string}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className=" mt-7 flex flex-col items-end">
                    <Button
                      type="submit"
                      className="cursor-pointer bg-btnBackground w-full"
                    >
                      Save changes
                    </Button>
                    <Button className="cursor-pointer bg-blue-500 w-full mt-4">
                      Sign With Google
                    </Button>
                    <div className="text-start mt-9 font-bold cursor-pointer">
                      <Link to={"/sign-in-admin"}>Sign-In</Link>
                    </div>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="px-[3rem]">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input
                    id="current"
                    type="password"
                    className=" bg-inputBg text-inputTitle"
                    placeholder="password"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input
                    id="new"
                    type="password"
                    className=" bg-inputBg"
                    placeholder="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default SignUpAddmin;