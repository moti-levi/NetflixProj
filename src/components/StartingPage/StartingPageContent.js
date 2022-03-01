import classes from './StartingPageContent.module.css';
import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Store/auth-context';
import Select from 'react-select'

const StartingPageContent = (props) => {


  const selectedChoice = useRef();
  const authCtx = useContext(AuthContext);
  const history=useHistory();

  const options = [
    { value: 'C', label: 'C' },
    { value: 'S', label: 'S' },
    { value: 'E', label: 'E' },
    { value: 'H', label: 'H' }
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    // const enteredNewPassword = newPasswordInputRef.current.value;

    // // add validation

    // fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBQtGN3OfIfxM5KViWN-wt04X0x04EM2jY', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     idToken: authCtx.token,
    //     password: enteredNewPassword,
    //     returnSecureToken: false
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => {
    //   // assumption: Always succeeds!
    //   history.replace('/');
    // });
  };


  return (
    <section className={classes.profile}>
    <h1>Hello, Please choose between C, S, E and H </h1>
    <Select options={options} className={classes.profile}/>
    <div className={classes.action}>
        <button>Select</button>
      </div>
  </section>
  );
};

export default StartingPageContent;
