import { useState, useContext } from 'react'
import { userList } from '@/pages/api/users'
import { loginContext } from '../../index'
import { TextField, Button, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginControl(){
    const {loginStatus, setLogin} = useContext(loginContext)
    
    const [userEmail, setUserEmail] = useState("example@gmail.com")
    const [userPassword, setUserPassword] = useState("1234")

    const [errStatus, setErrStatus] = useState(false)
    const errMessage = "ログインエラーです"
    
    const handleError = (e: React.SyntheticEvent) => {
        if(!loginStatus) setErrStatus(true)
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        userList.map((e) => {
            if(e.email == userEmail) setLogin(true)
        })
        handleError(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value)
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(e.target.value)
    }

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }


    return(
        <>
        {
            !loginStatus  
            ? <form action="" onSubmit={handleSubmit}>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue={userEmail}
                    onChange={handleChange}
                    sx={{margin: '1em 0'}}
                    />
                <FormControl sx={{ mb: '1em' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        defaultValue={userPassword}
                        onChange={handleChangePassword}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                    </FormControl>
                <br />
                <Button type="submit" variant="outlined">Login</Button>
                <br />
                { errStatus && 
                    <Typography sx={{color: 'red'}}>{errMessage}</Typography>
                }
            </form>
            : <p></p>
        }
        
        </>
    )
}