import React, { useState, useEffect } from 'react';
import Logo from '../../../images/spacescout_noback.png'
import anime from 'animejs/lib/anime.es.js';
import axios from 'axios';
import './AdminLogin.css';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [googleauth, setGoogleauth] = useState('');
    const [successLogin, setSuccessLogin] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        let currentAnimation = null;
        let nameInput = document.querySelector('#name');
        let passwordInput = document.querySelector('#password');
        let submitButton = document.querySelector('#submit');

        const startAnimation = (targets, dashoffset, dasharray) => {
            if (currentAnimation) currentAnimation.pause();
            currentAnimation = anime({
                targets: targets,
                strokeDashoffset: {
                    value: dashoffset,
                    duration: 700,
                    easing: 'easeOutQuart',
                },
                strokeDasharray: {
                    value: dasharray,
                    duration: 700,
                    easing: 'easeOutQuart',
                },
            });
        };

        nameInput.addEventListener('focus', () => {
            startAnimation('path', 0, '240 1386');
        });


        passwordInput.addEventListener('focus', () => {
            startAnimation('path', -336, '240 1386');
        });

        submitButton.addEventListener('focus', () => {
            startAnimation('path', -730, '530 1386');
        });

        if (successLogin) {
            nameInput.focus();
        }

        return () => {

            nameInput.removeEventListener('focus', startAnimation);

            passwordInput.removeEventListener('focus', startAnimation);
            submitButton.removeEventListener('focus', startAnimation);

        };

    }, [successLogin]);



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('/admin/login', {
                username,
                password,
            });
                setPassword('');
                setSuccessLogin(true);
            
        } catch (error) {
                 if(error.response && error.response.status === 401){

                toast.error('Please enter the correct data!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }  else {
                toast.error("Error, try again!");
            }
        }
    };
    
    const handleAuthSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/admin/login/check2FA', {
                params: {
                    code: googleauth,
                    username: username
                },
            });
            if (response.status === 200) {

                window.location.pathname = response.data.location;
            }

        } catch (error) {
            toast.error("Please enter valid code!");
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        const toggleButton = document.getElementById('toggleButton');
        if(showPassword){
         toggleButton.classList.toggle('active');
        }
        else
        {
            toggleButton.classList.remove('active');
        }
        
    };

    const getBackToLogin = () => {
        setGoogleauth('')
        setSuccessLogin(false)
    }

    return (
        <>
            <div className='loginBody'>
                {successLogin ? (
                    <div className="main">
                        <div className="page">
                            <div className="containers">
                            <div className="left">
                                    <img src={Logo} className="logo" alt="Logo" />
                                    {/* <div className="login">Prijava</div> */}
                                    <div className="eula">
                                    Welcome to SpaceScout! Find your dream property with us today!
                                    </div>
                                </div>

                                <div className="right">
                                    <svg viewBox="0 0 320 300">
                                        <defs>
                                            <linearGradient
                                                id="linearGradient"
                                                x1="13"
                                                y1="193.49992"
                                                x2="307"
                                                y2="193.49992"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop style={{ stopColor: '#ff00ff' }} offset="0" id="stop876" />
                                                <stop style={{ stopColor: '#ff0000' }} offset="1" id="stop878" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
                                        />
                                    </svg>
                                    <form onSubmit={handleAuthSubmit}>
                                        <div className="form">
                                            <label htmlFor="name">2FA code</label>
                                            <input
                                                type="number"
                                                name="username"
                                                id="name"
                                                className='googleauth'
                                                required
                                                value={googleauth}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value.length <= 6) {
                                                        setGoogleauth(value);
                                                    }
                                                }}
                                            />
                                            <div className='hidepass'>
                                                <label htmlFor="password">Password</label>
                                                <div className="password-container">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        id="password"
                                                    />
                                                    <button type="button" onClick={togglePasswordVisibility}></button>
                                                </div></div>
                                            <input type="submit" id="submit" value="Confirm code" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='getBack'>
                            <button className='getBackBtn' onClick={getBackToLogin}>Back to login</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="main">
                        <div className="page">
                            <div className="containers">
                                <div className="left">
                                    <img src={Logo} className="logo" alt="Logo" />
                                    {/* <div className="login">Prijava</div> */}
                                    <div className="eula">
                                    Welcome to SpaceScout! Find your dream property with us today!
                                    </div>
                                </div>

                                <div className="right">
                                    <svg viewBox="0 0 320 300">
                                        <defs>
                                            <linearGradient
                                                id="linearGradient"
                                                x1="13"
                                                y1="193.49992"
                                                x2="307"
                                                y2="193.49992"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop style={{ stopColor: '#ff00ff' }} offset="0" id="stop876" />
                                                <stop style={{ stopColor: '#ff0000' }} offset="1" id="stop878" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
                                        />
                                    </svg>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form">
                                            <label htmlFor="name">Username</label>
                                            <input
                                                type="username"
                                                name="username"
                                                id="name"
                                                required
                                                value={username}
                                                onInvalid={(e) => e.target.setCustomValidity('Unesite korisnicko ime')}
                                                onInput={(e) => e.target.setCustomValidity('')}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                            <label htmlFor="password">Password</label>
                                            <div className="password-container">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    id="password"
                                                    required
                                                    value={password}
                                                    onInvalid={(e) => e.target.setCustomValidity('Unesite lozinku')}
                                                    onInput={(e) => e.target.setCustomValidity('')}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <button type="button" onClick={togglePasswordVisibility} id="toggleButton"></button>
                                            </div>
                                            <input type="submit" id="submit" value="Log in" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )};

            </div>
        </>
    );
};

export default AdminLogin;
