import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import AppleSignin from "react-apple-signin-auth";
// import Facebook from "./Facebook";

const AuthForm = () => {
  //   const history = useHistory();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [loginData, setLoginData] = useState(
  //   localStorage.getItem("loginData")
  //     ? JSON.parse(localStorage.getItem("loginData"))
  //     : null
  // );

  const switchAuthModelHandler = () => {
    setIsLogin((prevState) => !prevState);
    console.log(isLogin);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBacgHzskI4p7dbJl0qEqS5Ebs62TnGnPs";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBacgHzskI4p7dbJl0qEqS5Ebs62TnGnPs";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          //...
          return res.json();
        } else {
          return res.json().then((data) => {
            //show an error modal
            console.log(data);
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(data.error);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        authCtx.login(data.idToken);
        // history.replace("/");
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const handleFailure = (result) => {
    console.log(result);
    if (result.error === "popup_closed_by_user") {
      authCtx.login(result.error);
    }
  };

  // const handleLogin = async (googleData) => {
  //   const res = await fetch("/api/google-login", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       token: googleData.tokenId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await res.json();
  //   setLoginData(data);
  //   localStorage.setItem("loginData", JSON.stringify(data));
  // };
  const handleLogin = (googleData) => {
    console.log(googleData);
    authCtx.login(googleData.accessToken);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("loginData");
  //   setLoginData(null);
  // };

  const componentClicked = () => {
    console.log("clicked");
  };
  const responseFacebook = (response) => {
    console.log(response);
    authCtx.login(response.accessToken);
  };
  // const responseGoogle = response => {
  //   console.log(response);
  // };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control} id="email">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions} id="">
          {!isLoading && (
            <button id="btn1">{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            id="btn2"
            onClick={switchAuthModelHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
        <div className={classes.or}>Or</div>
        <hr />
        <div className={classes.social}>
          {/* {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="LogIn with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
          )} */}
          <GoogleLogin
            clientId="25320623642-rb429h00kcgqlir9rk4pi1sv5tp4ocro.apps.googleusercontent.com"
            buttonText="LogIn with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
            className="log"
          ></GoogleLogin>
          <br />
          <FacebookLogin
            appId="1238901713537016"
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            // icon="fa-facebook"
          />
          <br />
          <AppleSignin
            authOptions={{
              clientId: "com.example.web",
              scope: "email name",
              redirectURI: "https://example.com",
              state: "",
              nonce: "nonce",
              usePopup: true,
            }}
            uiType="dark"
            // className="apple-auth-btn"
          />
          {/* <Facebook /> */}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
