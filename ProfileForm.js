import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
// import{ useHistory} from 'react-router-dom';
 import AuthContext from "../../Store/AuthContext";
const ProfileForm = () => {
  const NewPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  // const history= useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const enternewpassword = NewPasswordInputRef.current.value;

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBioGGFEkjafDlfi3KO8DrKky9eXgcEH9A",{
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enternewpassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => {  

        // history.replace('/')

      });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={NewPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
