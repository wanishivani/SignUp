import { useState, useRef,useContext } from "react";
// import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";
import AuthContext from "../../Store/AuthContext";
const AuthForm = () => {
  // const history =useHistory()
  const [isLogin, setIsLogin] = useState(true);
  const emailInputref = useRef();
  const passwordInputref = useRef();
const authCtx=useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const EnterdEmail = emailInputref.current.value;
    const Enterdpassword = passwordInputref.current.value;
    setLoading(true);
    let url;
   if (isLogin) {
      url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBioGGFEkjafDlfi3KO8DrKky9eXgcEH9A'
    } else {
      url ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBioGGFEkjafDlfi3KO8DrKky9eXgcEH9A"
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: EnterdEmail,
        password: Enterdpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
        setLoading(false);
    
        if (res.Ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Authcation Failed!!";
            // if(data && data.error&& data.error.msg){
            //errorMsg=data.error.ms//
            // } 
            // alert(errorMsg)
            throw new Error(errorMsg);
          });
        };

      }).then((data) => {
        authCtx.login(data.idToken);
     }).catch((err) => {
       alert(err.message);
      });
};
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputref}
          />
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {!isLoading && (
            <button type="button" onClick={submitHandler}>
              Signup
            </button>
          )}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
