import { adminSchema } from "@/components/form-validation /Validation";
import ToasterComponent from "@/components/toaster/Toaster";
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
import { AdminFormValues } from "@/types/validation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function EmployeeSignIn() {
  const navigate = useNavigate();

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const handleForm = handleSubmit((data: AdminFormValues) => {
    // Temp save user

    ToasterComponent({
      message: "Login Successfully !!",
      description: "Thanks for Authentication",
      firstLable: "Close",
    });
    navigate("/");
  });

  return (
    <>
      <div className="flex justify-center items-center h-[80vh]">
        <Tabs defaultValue="account" className="w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="px-[3rem] w-full">
            <Form {...form}>
              <form onSubmit={handleForm}>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bold">Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email"
                        className="border-none bg-inputBg text-inputTitle p-5 !text-inputText"
                        {...register("email")}
                      />
                      {errors.email && (
                        <span className="text-errorText font-bold text-sm">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 relative">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="password"
                          className="border-none bg-inputBg text-inputTitle p-5 !text-inputText"
                          {...register("password")}
                        />
                        {/* Eye icon */}
                        <button
                          type="button"
                          className="absolute inset-y-0 right-2 flex items-center text-inputText cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <span>👁️</span> : <span>🔒</span>}
                        </button>
                      </div>
                      {errors.password && (
                        <span className="text-errorText font-bold text-sm">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="mt-7 flex flex-col items-end">
                    <Button
                      type="submit"
                      className="cursor-pointer bg-Btn1 w-full"
                    >
                      Save changes
                    </Button>
                    <Button className="cursor-pointer bg-Btn2 w-full mt-4">
                      Sign With Google
                    </Button>
                    <div className="text-start mt-9 font-bold cursor-pointer">
                      <Link to={"/employee/sign-up"}>Sign-Up</Link>
                    </div>
                  </CardFooter>
                </Card>
              </form>
            </Form>
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
                    className="bg-inputBg text-inputTitle"
                    placeholder="password"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input
                    id="new"
                    type="password"
                    className="bg-inputBg"
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

export default EmployeeSignIn;
