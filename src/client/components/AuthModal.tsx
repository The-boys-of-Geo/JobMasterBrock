import React, { useState } from 'react';


const AuthModal: React.FC = () => {
  const [loginPage, setLoginPage] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "usernameInput":
        setUsername(event.target.value);
        break;
      case "passwordInput":
        setPassword(event.target.value);
        break;
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch('api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('successfully signed in');
      } else {
        console.log('Failed to sign in');
      }
    } catch (error) {
      console.error('Error occurred while signing in:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('api/users/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password}),
        });
        
      if (response.ok) {
        console.log('SignedUp');
      } else {
        console.log('Failed to signup');
      }
    } catch (error) {
      console.error('Error occurred during signUp:', error);
    }
  };

  return (
    <div>
        {/* If user is not logged in, display login Modal */}
{loginPage === false && (
  <div className='Background'>
    <div className='AuthModal'>
        <div className='InnerAuthModal'>
            <form className='InnerAuthModal' onSubmit={
              (e) => {
                e.preventDefault();
                handleSignUp();
            }}>
                <input className="Input" type="text" name="usernameInput" value={username} onChange={handleInputChange} placeholder="Username" />
                <input className="Input" type="password" name="passwordInput" value={password} onChange={handleInputChange} placeholder="Password" />

                <button id='SignUpButton' type='submit'>Register</button>
                <button id='switchAuth' onClick={(e) => setLoginPage(true)}>Sign In</button>
            </form>
        </div>
    </div>
    </div>
)}
   {/* If user is logged in, display contents */}
{loginPage && (
    <div className='Background'>
      <div className='AuthModal'>
          <div className='InnerAuthModal'>
              <form className='InnerAuthModal' onSubmit={
              (e) => {
                e.preventDefault();
                handleSignIn();
            }}>
                <input className="Input" type="text" name="usernameInput" value={username}  onChange={handleInputChange} placeholder="Username" />
                <input className="Input" type="password" name="passwordInput" value={password} onChange={handleInputChange} placeholder="Password" />

                <button id='SignInButton' type='submit'>Sign In</button>
                <button id='switchAuth' onClick={(e) => setLoginPage(false)}>Register</button>
              </form>
          </div>
      </div>
      </div>
  )}
    </div> 
  );
};

export default AuthModal;