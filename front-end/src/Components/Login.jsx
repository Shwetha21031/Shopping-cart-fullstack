import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setUserDetails} from '../Redux/loginSlice'
import axios from 'axios'

function Login() {
    const users = useSelector(state=>state.login.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [tempuname ,setTempuname] = useState('')
    const [temppwd ,setTempPwd] = useState('')

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                const user = res.data;
                const userss = user.map((u) => ({
                    'username': u.name,
                    'password': u.email
                }));
                        console.log(userss);
                   dispatch(setUserDetails(userss));
            })
            console.log(users); 
    }, []);

    

    const handleLogin = () => {
      
        let userExists = users.some((user)=>(user.username === tempuname) && (user.password === temppwd)
        )
        console.log(tempuname,temppwd,'temp user')
        console.log(userExists,'userExists')
        if(userExists){
            console.log('h');
            toast.success('Logged in successfully',{
                    position: 'top-right',
                    autoClose: 500
                   })
                   navigate('/homePage')
        }else{
            toast.error('incorrect credentials',{
                        position: 'top-right',
                        autoClose: 500
                    })
        }
        
    }

     

      const handleRegister = () => {
        navigate('/Register')
      }
    
  return (
    <div className='login-main'>
    <div className='Login-container'>
        <input type='text' placeholder='username' onChange={e=>setTempuname(e.target.value)}/>
<br></br>
        <input type='text' placeholder='password' onChange={e=>setTempPwd(e.target.value)}/>
<br></br>
        <button onClick={handleLogin}>Login</button>
      
        <br></br>
        <button onClick={handleRegister}>Register </button>
    </div>
    </div>
  )
}

export default Login




  