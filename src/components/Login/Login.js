import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from './Auth';
import './Login.css'

const Login = () => {
    const [returningUser, setReturningUser] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const auth = useAuth()

    const onSubmit = data => { 
        if(returningUser){
            if(data.email && data.password){
                auth.signIn(data.email, data.password);
            }
        }else{
            if(data.name && data.email && data.password && data.confirm_password){
                auth.signUp(data.email, data.confirm_password,data.name)
            }
        }
        console.log(returningUser)
     }

    return (
        <div className="sign-up">
            <div className="container">

                {returningUser ?
                    <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                        {
                            auth.user != null && <p className="text-danger">* {auth.user.error}</p>
                        }
                        <div className="form-group">
                            <input className="form-control" name="email" {...register("email", { required: true })} placeholder="Email" />
                            {errors.email && <span className="error">This email is required</span>}
                        </div>
                        <div className="form-group">
                            <input className="form-control" name="password" {...register("password", { required: true })} placeholder="Password" />
                            {errors.password && <span>This password is required</span>}
                        </div>
                        <div className="form-group">
                            <button className="form-control btn bg-danger text-light fw-bolder" type="submit">Sign In</button>
                        </div>
                        <div className="option text-center">
                            <label onClick={() => setReturningUser(false)}>Create a new account</label>
                        </div>
                    </form>

                    :

                    <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                        {
                            auth.user != null && <p className="text-danger">* {auth.user.error}</p>
                        }
                        <div className="form-group">
                            <input name="name" className="form-control" {...register("name", { required: true })} placeholder="Name" />
                            {errors.name && <span className="error">Name is required</span>}
                        </div>
                        <div className="form-group">
                            <input className="form-control" name="email" {...register("email", { required: true })} placeholder="Email" />
                            {errors.email && <span className="error">This email is required</span>}
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password" {...register("password", { required: true })} placeholder="Password" />
                            {errors.password && <span>This password is required</span>}
                        </div>
                        <div className="form-group">
                            <input type="password" name="confirm_password" className="form-control" {...register("confirm_password", { validate: (value) => value === watch('password') })} placeholder="Confirm_password" />
                            {errors.name && <span className="error">Name is required</span>}
                        </div>
                        <div className="form-group">
                            <button className="form-control btn bg-danger text-light fw-bolder" type="submit">Sign Up</button>
                        </div>
                        <div className="option text-center">
                            <label onClick={() => setReturningUser(true)}>Already have an account</label>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
};

export default Login;