import { useState } from 'react';
import Img from '../assets/images/pik1.png';
import Img2 from '../assets/images/pik2.png'
import { data } from 'autoprefixer';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../ReduxStore/Authentication';
import { useNavigate } from 'react-router-dom';
function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[isChecked,setIsChecked]=useState(false);
    const [isLogin,setIsLogin]=useState(false);
    const logInURL="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnCRZfZTUHUPdYrWGjYPV7PSstRIKboSM"
    const signUpURL="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAnCRZfZTUHUPdYrWGjYPV7PSstRIKboSM"
    function switchToLogIn(){
        setIsLogin(true);
    }
    function switchToSignUp(){
        setIsLogin(false);
    }
    async function sendToFirebase(data){
        const URL= isLogin ?logInURL:signUpURL;
        const response= await axios.post(URL,data);
        console.log(response.data);
        const newEmail=response.data.email.replace(/[@.]/g, "");
        if(isChecked){
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('email',newEmail)
        }
        dispatch(authActions.changeEmailValue(newEmail));
        dispatch(authActions.changeTokenValue(response.data.idToken))
        navigate('/')
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        const data={
            email:email,
            password:password,
        }
        sendToFirebase(data);
    }
    return(
        <div className="flex w-full h-[100vh] p-10 bg-[#F9F1E7]">
            <div className='relative w-[50%] h-full rounded-2xl overflow-hidden'>
                {isLogin ? <img className=' w-full h-full ' src={Img} alt="" />:<img className=' w-full h-full ' src={Img2} alt="" />}
                <div className='absolute left-0 bottom-0 z-50  p-10   text-white text-5xl font-bold'>
                    <div className=''>Lorem ipsum is easy</div>
                    <div className='font-medium mt-4 text-2xl'>Lorem ipsum is easy</div>
                </div>
            </div>
            <div  className='w-[50%] flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center w-[60%]'>
                    <h1 className='text-md font-bold text-[#B88E2F]'>Welcome to Furniro</h1>
                    <p className='mt-8 text-[#B88E2F] font-light'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className='mt-8 bg-[#B88E2F] bg-opacity-[0.5] p-2 rounded-3xl flex justify-center '>
                        <button className={`w-full text-white rounded-2xl px-8 py-1 font-bold ${isLogin ? "bg-[#B88E2F]":""}`} onClick={switchToLogIn}>LogIn</button>
                        <button className={`w-full text-white rounded-2xl px-8 py-1 font-bold ${!isLogin ? "bg-[#B88E2F]":""}`} onClick={switchToSignUp}>Register</button>
                    </div>
                    
                    <form onSubmit={handleSubmit}  className="flex flex-col gap-3 w-full ">
                        <label className='mt-4 text-[#B88E2F] font-bold' htmlFor="email">Email</label>
                        <input className="text-md px-8 py-3 rounded-3xl " id="email" name="email" type="email" placeholder="Enter your Email Address"/>
                        <label className='mt-4 text-[#B88E2F] font-bold' htmlFor="password">Password</label>
                        <input className="text-md px-8 py-3 rounded-3xl" id="password" name="password" type="password" placeholder="Enter your Password"/>
                        <div className="flex justify-between items-center">
                        <div className='flex items-center'>
                        <input  type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} name="remember"/>
                        <p className="ml-2 text-sm text-[#B88E2F]">Remember Me</p>
                        </div>
                        <a className="text-sm text-[#B88E2F] font-bold">Forgot Password?</a>
                    </div>
                    <div className='flex justify-end'>
                    <button type="submit" className="mt-8 py-2 rounded-2xl bg-[#B88E2F] w-[50%] text-white font-bold text-l">{isLogin ? "Log In":"Register"}</button>
                    </div>
                </form>
                </div>
            </div>

            </div>

        
    )
}

export default Login;