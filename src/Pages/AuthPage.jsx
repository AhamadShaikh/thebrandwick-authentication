import React from 'react'
import { Box, Text, Input, Button, useToast } from "@chakra-ui/react"
import { useState } from 'react'

const signupInitialState = {
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
}

const loginInitialState = {
    email: '',
    password: '',
}


const AuthPage = () => {
    const [flag, setFlag] = useState(false)
    const toast = useToast()

    const [signupData, setSignupData] = useState(signupInitialState)

    const [loginData, setLoginData] = useState(loginInitialState)

    const handleFlag = () => {
        if (flag === true) {
            setFlag(false)
        } else {
            setFlag(true)
        }
    }

    const handleSignup = (e) => {
        const { name, value, type } = e.target
        setSignupData((prev) => ({ ...prev, [name]: type === "number" ? +value : value }))
    }

    const handleLogin = (e) => {
        const { name, value } = e.target
        setLoginData((prev) => ({ ...prev, [name]: value }))
    }

    const handleLogout = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
    
            if (!token) {
                alert("User is not logged in.");
                return;
            }
    
            const response = await fetch('https://thebrandwick-auth-api.onrender.com/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
            });
    
            if (response.ok) {
                alert("User Logout Successfully");
                localStorage.setItem("token", JSON.stringify(""))
            } else {
                console.error("Logout failed. Status:", response.status);
                alert("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred during logout. Please try again.");
        }
    };
    

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (signupData.email === "" || signupData.password === "" || signupData.username === "") {
            return alert("Fill the user details.")
        }

        try {
            const response = await fetch('https://thebrandwick-auth-api.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });


            if (response.ok) {
                alert("User Registered Successfully")
                setSignupData({
                    name: '',
                    username: '',
                    phone: '',
                    email: '',
                    password: '',
                })
            } else {
                alert('User Already Registered');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        if (loginData.email === "" || loginData.password === "") {
            return alert("Fill the credentials first.")
        }

        try {
            const response = await fetch('https://thebrandwick-auth-api.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            let data = await response.json()
            if (data.token) {
                localStorage.setItem("token", JSON.stringify(data.token))
                alert("User Logged In Successfully")
                setLoginData(loginInitialState)
            } else {
                alert('Wrong Credentials');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <Box>
            {
                flag ? <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={'5%'}>
                    <Box display={'flex'} justifyContent={'center'} width={'70%'} h={'500px'} border={'1px solid black'} boxShadow={'lg'} borderRadius={'20px'}>
                        <Box width={'50%'} display={'flex'} alignItems={'center'} justifyContent={'center'} h={'100%'}>
                            <form onSubmit={handleLoginSubmit}>
                                <Box>
                                    <Text>Email</Text>
                                    <Input type='text' name='email' value={loginData?.email} onChange={handleLogin} borderRadius={'5px'} p={'10px'} width={'200px'} />
                                </Box>
                                <Box>
                                    <Text>password</Text>
                                    <Input type='text' name='password' value={loginData?.password} onChange={handleLogin} borderRadius={'5px'} p={'10px'} width={'200px'} />
                                </Box>
                                <Box>
                                    <Input type='submit' value={'Sign In'} backgroundColor="teal" color={'white'} size="md" p={'10px 30px'} borderRadius={'20px'} m={'20px'} _hover={{
                                        backgroundColor: '#024D55',
                                        cursor: 'pointer'
                                    }} />
                                </Box>
                            </form>
                        </Box>
                        <Box width={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'} backgroundColor={'orange'} borderRadius={'0px 20px 20px 0px'} >
                            <Box display={'flex'} flexDirection={'column'}>
                                <Text as={'b'} fontSize={'40px'} mb={'50px'}>Sign In</Text>
                                <Text border={'1px solid black'} borderRadius={'10px'} width={'200px'} padding={'5px'} as={'b'}>Go Back</Text>
                                <Text>If you don't have an account?</Text>
                                <Button backgroundColor="teal" color={'white'} size="md" p={'10px 30px'} borderRadius={'20px'} onClick={handleFlag} _hover={{
                                    backgroundColor: '#024D55',
                                    cursor: 'pointer'
                                }}>
                                    Sign Up
                                </Button>
                                <Button backgroundColor="teal" color={'white'} size="md" p={'10px 30px'} borderRadius={'20px'} onClick={handleLogout} mt={'10px'} _hover={{
                                    backgroundColor: '#024D55',
                                    cursor: 'pointer'
                                }}>
                                    Log out
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box> : <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={'2%'}>
                    <Box display={'flex'} justifyContent={'center'} width={'70%'} h={'550px'} border={'1px solid black'} borderRadius={'20px'}>
                        <Box width={'50%'} borderRadius={'20px 0px 0px 20px'} display={'flex'} justifyContent={'center'} alignItems={'center'} backgroundColor={'orange'} >
                            <Box display={'flex'} flexDirection={'column'}>
                                <Text as={'b'} fontSize={'40px'} mb={'50px'}>Sign Up</Text>
                                <Text border={'1px solid black'} borderRadius={'10px'} width={'200px'} padding={'5px'} as={'b'}>Welcome Back</Text>
                                <Text>If you already have an account?</Text>
                                <Button backgroundColor="teal" color={'white'} size="md" p={'10px 30px'} borderRadius={'20px'} onClick={handleFlag} _hover={{
                                    backgroundColor: '#024D55',
                                    cursor: 'pointer'
                                }}>
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                        <Box width={'50%'}>
                            <form onSubmit={handleSignupSubmit}>
                                <Box>
                                    <Text>Name</Text>
                                    <Input type='text' name='name' value={signupData?.name} onChange={handleSignup} borderRadius={'5px'} p={'10px'} width={'40%'} />
                                </Box>
                                <Box>
                                    <Text>Username</Text>
                                    <Input type='text' name='username' value={signupData?.username} onChange={handleSignup} borderRadius={'5px'} p={'10px'} width={'40%'} />
                                </Box>
                                <Box>
                                    <Text>Phone Number</Text>
                                    <Input type='number' name='phone' value={signupData?.phone_number} onChange={handleSignup} borderRadius={'5px'} p={'10px'} width={'40%'} />
                                </Box>
                                <Box>
                                    <Text>Email</Text>
                                    <Input type='text' name='email' value={signupData?.email} onChange={handleSignup} borderRadius={'5px'} p={'10px'} width={'40%'} />
                                </Box>
                                <Box>
                                    <Text>password</Text>
                                    <Input type='text' name='password' value={signupData?.password} onChange={handleSignup} borderRadius={'5px'} p={'10px'} width={'40%'} />
                                </Box>
                                <Box>
                                    <Input type='submit' value={'Sign Up'} backgroundColor="teal" color={'white'} size="md" p={'10px 30px'} borderRadius={'20px'} m={'20px'} _hover={{
                                        backgroundColor: '#024D55',
                                        cursor: 'pointer'
                                    }} />
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Box >
            }
        </Box >

    )
}

export default AuthPage