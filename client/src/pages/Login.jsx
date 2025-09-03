//8uq19UUgyakhXmQR

import { AppWindowIcon, CodeIcon } from "lucide-react"
import { useState } from "react";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi";

const Login = () => {

    const [signupInput, setSignupInput] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    });

    const [registerUser, { data: registerData, error: registerError, isLoading: registerLoading, isSuccess: registerSuccess }] = useRegisterUserMutation();
    const [loginUser, { data: loginData, error: loginError, isLoading: loginLoading, isSuccess: loginSuccess }] = useLoginUserMutation();

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === 'signup') {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    }

    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        await action(inputData);

    }

    return (
        <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Name</Label>
                                <Input type='text' name='name' value={signupInput.name} onChange={(e) => changeInputHandler(e, 'signup')} placeholder="Eg. Rohan" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-email">Email</Label>
                                <Input type='email' name='email' value={signupInput.email} onChange={(e) => changeInputHandler(e, 'signup')} placeholder="Eg. rohan@gmail.com" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-password">Password</Label>
                                <Input type='password' name='password' value={signupInput.password} onChange={(e) => changeInputHandler(e, 'signup')} placeholder="Eg. 123" required />
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button disabled={registerLoading} onClick={() => handleRegistration("signup")}>
                                {
                                    registerLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...
                                        </>
                                    ) : "Signup"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your password here. After signup, you'll be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-email">Email</Label>
                                <Input type='email' name='email' value={loginInput.email} onChange={(e) => changeInputHandler(e, 'login')} placeholder="Eg. rohan@gmail.com" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-password">Password</Label>
                                <Input type='password' name='password' value={loginInput.password} onChange={(e) => changeInputHandler(e, 'login')} placeholder="Eg. 123" required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginLoading} onClick={() => handleRegistration("login")}>
                                {
                                    loginLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...
                                        </>
                                    ) : "Login"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login
