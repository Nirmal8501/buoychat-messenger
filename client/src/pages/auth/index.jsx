import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BackgroundImg from "../../assets/backk.png";
import Background2 from "../../assets/back.png";
import { toast } from "sonner";
import { apiClient } from "../../lib/api-client";
import { SIGNUP_ROUTE } from "@/utils/constants";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required..");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required..");
      return false;
    }
    if (password !== confirmPassword) {
      toast.message("Passwords do not match..");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {};

  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE, { email, password });
      console.log(response);
    }
  };

  return (
    <div
      className="h-[100vh] w-[100vw] flex items-center justify-center"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid ">
        <div className="flex flex-col gap-10 items-center justify-center ">
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold ">Welcome</h1>
              <img src={Victory} alt="Peace Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the Details to Login/SignUp
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full ">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:text-black w-full rounded-none border-b-2 data-[state=active]:border-b-purple-500  "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:text-black rounded-none border-b-2 w-full data-[state=active]:border-b-purple-500 "
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-5 ">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 "
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 "
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <Button
                  className="rounded-full p-6"
                  onClick={handleLogin}
                  style={{ width: "10vw" }}
                >
                  Login
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 "
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6 "
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <Button
                  className="rounded-full p-6"
                  onClick={handleSignup}
                  style={{ width: "10vw" }}
                >
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
