import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

import OTPdrower from "@/components/OTP/OTPdrover";
import { adminSchema } from "@/components/form-validation/Validation";
import ToasterComponent, {
  getErrorMessage,
} from "@/components/toaster/Toaster";
import { auth } from "@/firebase";
import {
  useAdminRegisterMutation,
  useGoogleSignInMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/api/admin-API/AdminAPI";
import { adminExist } from "@/redux/reducer/AdminReducer";
import { Admin } from "@/types/types";
import { AdminFormValues } from "@/types/validation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";

function SignUpAddmin() {
  const [showPassword, setShowPassword] = useState(false);

  const [adminRegister] = useAdminRegisterMutation();

  const [googleSignIn] = useGoogleSignInMutation();

  const [sendOTP] = useSendOTPMutation();

  const [verifyOTP] = useVerifyOTPMutation();

  const dispatch = useDispatch();

  const [OTPTrigger, setOTPTrigger] = useState(false);
  const [OTPSubmit, setOTPSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "other",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data: AdminFormValues) => {
    setLoading(true);
    const { name, email, password, gender } = data;

    if (OTPSubmit) {
      const res = await adminRegister({
        name: name!,
        email: email!,
        password: password!,
        gender: gender!,
        role: "admin",
      });

      setLoading(false);

      if ("data" in res && res.data) {
        ToasterComponent({
          message: "Admin Registered Successfully !!",
          description: "Thanks for Authentication",
          firstLabel: "Close",
        });
        navigate("/admin/sign-in");
      } else if ("error" in res) {
        const errorMessage = getErrorMessage(res.error);
        ToasterComponent({
          message: errorMessage,
          description: "Admin does not Registered",
          firstLabel: "Close",
        });
        setOTPTrigger(true);
      }
    } else {
      if (email) sendOTP({ email });
      ToasterComponent({
        message: "Fill OTP Here !!",
        description: "Thanks for Authentication",
        firstLabel: "Close",
      });
      setOTPTrigger(true);
    }
    setLoading(false);
  });

  const handleSignWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    const { displayName, email, photoURL, uid } = user;

    const adminData: Admin = {
      name: displayName || "Anonymous",
      email: email || "",
      password: "",
      profilePic: photoURL || "",
      gender: "other",
      _id: uid,
    };

    const res = await googleSignIn(adminData);

    if ("data" in res && res.data) {
      const { email, gender, name, profilePic, _id, role } = res.data;
      ToasterComponent({
        message: "Admin Login Successfully  !!",
        description: "Thank's for Login",
        firstLabel: "Close",
      });
      dispatch(adminExist({ email, gender, name, profilePic, _id, role }));
      navigate("/");
    } else if ("error" in res) {
      const errorMessage = getErrorMessage(res.error);
      ToasterComponent({
        message: "Admin Login Failed  !!",
        description: errorMessage,
        firstLabel: "Close",
      });
    }
    setLoading(false);
  };

  const handleOTPSubmit = async (verificationCode: string) => {
    const email = form.getValues("email");

    if (!email || !verificationCode) {
      ToasterComponent({
        message: "Email and OTP are required",
        description: "Please enter both fields",
        firstLabel: "Close",
      });
      setLoading(false);
      return;
    }

    const res = await verifyOTP({ email, verificationCode });

    if ("data" in res && res.data) {
      ToasterComponent({
        message: "OTP Verified Successfully",
        description: "You may proceed with registration",
        firstLabel: "Close",
      });
      setOTPSubmit(true);
    } else if ("error" in res) {
      const errorMessage = getErrorMessage(res.error);
      ToasterComponent({
        message: errorMessage,
        description: "Failed to verify OTP",
        firstLabel: "Close",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="space-y-2">
              <Label htmlFor="name ">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                className="border-none bg-inputBg font-semibold text-inputTitle p-5 !text-inputText"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-errorText font-bold text-sm">
                  {errors.name.message as string}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                className="border-none bg-inputBg font-semibold text-inputTitle p-5 !text-inputText"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-errorText font-bold text-sm">
                  {errors.email.message as string}
                </span>
              )}
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="border-none bg-inputBg font-semibold text-inputTitle p-5 pr-10 !text-inputText"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-inputText cursor-pointer hover:text-blue-500 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <span>👁️</span> : <span>🔒</span>}
                </button>
              </div>
              {errors.password && (
                <span className="text-errorText font-bold text-sm">
                  {errors.password.message as string}
                </span>
              )}
            </div>
          </CardContent>
          <div className="flex flex-col space-y-4 mt-1 items-center">
            <Label className="text-lg font-bold">Gender</Label>
            <div className="flex justify-around w-full items-center">
              <div className="flex items-center space-x-2">
                <input
                  id="male"
                  type="radio"
                  value="male"
                  className="h-5 w-5 border-gray-300 rounded-full"
                  {...register("gender")}
                />
                <label
                  htmlFor="male"
                  className="text-mainHeading font-medium cursor-pointer"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="female"
                  type="radio"
                  value="female"
                  className="h-5 w-5 border-gray-300 rounded-full"
                  {...register("gender")}
                />
                <label
                  htmlFor="female"
                  className="text-mainHeading font-medium cursor-pointer"
                >
                  Female
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="other"
                  type="radio"
                  value="other"
                  className="h-5 w-5 border-gray-300 rounded-full"
                  {...register("gender")}
                  defaultChecked
                />
                <label
                  htmlFor="other"
                  className="text-mainHeading font-medium cursor-pointer"
                >
                  Other
                </label>
              </div>
            </div>
            {errors.gender && (
              <span className="text-errorText font-bold text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>
          <CardFooter className="mt-7 flex flex-col items-end">
            <Button
              type="submit"
              className="cursor-pointer btn-orange w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
            {OTPTrigger && (
              <OTPdrower
                open={OTPTrigger}
                setOpen={setOTPTrigger}
                onOTPSubmit={handleOTPSubmit}
              />
            )}
            <Button
              className="cursor-pointer btn-gradient w-full mt-4"
              type="button"
              onClick={handleSignWithGoogle}
              disabled={loading}
            >
              <FcGoogle className="bg-white rounded-md" />
              {loading ? "Loading..." : "Sign With Google"}
            </Button>
            <div className="text-start text-xl mt-9 font-bold cursor-pointer">
              <Link to={"/admin/sign-in"}>Sign-In</Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </>
  );
}

export default SignUpAddmin;
