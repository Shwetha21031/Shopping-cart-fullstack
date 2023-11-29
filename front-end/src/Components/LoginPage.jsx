import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function LoginPage() {


    const navigate = useNavigate()
    const [uname , setUname] = useState('')
    const [pwd,setPwd] = useState('')
    const [isreset,setisreset] = useState(false)
    const [newPwd, setNewPwd] = useState('')

    const userName = useSelector(state=>state.login.userName)
    const passWord = useSelector(state=>state.login.password)

    const [passwordd,setpassword] = useState(passWord)
    const handleLogin = () => {
        if(uname === userName && (pwd===passwordd)){
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

    const handleNewPasswordChange = (newPassword) => {
        const validPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword);
        if (validPwd) {
          toast.success('Password reset successful.',{
            position: 'top-right',
            autoClose: 1000
        });
          setpassword(newPassword)
          setisreset(!isreset)
        } else {
          toast.error(`Password must contain at least 8 characters, 
          one letter, 
          one digit, 
          and one special character (@$!%*?&).`);
          setNewPwd('')
        }   
      };


    
  return (
    <div className='login-main'>
    {!isreset && <div className='Login-container'>
        <input type='text' placeholder='username' onChange={(e)=>setUname(e.target.value)}/>
<br></br>
        <input type='text' placeholder='password' onChange={(e)=>setPwd(e.target.value)}/>
<br></br>
        <button onClick={handleLogin}>Login</button>
        <br></br>
        <button onClick={()=>setisreset(!isreset)}>Reset Password</button>
        <br></br>
    </div>}
    {isreset && (
                <div className='new-pwd'>
                  
                  <input type="text" value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)} placeholder='enter new password'/>
                  <button onClick={() => handleNewPasswordChange(newPwd)}>Confirm Reset</button>
                  <button onClick={()=>setisreset(!isreset)}>Back to login</button>
                </div>
              )}
    </div>
  )
}

export default LoginPage




  