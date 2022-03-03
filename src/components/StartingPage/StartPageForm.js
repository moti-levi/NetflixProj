import { useRef, useContext,useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Store/auth-context';
import classes from './StartPageForm.module.css';
import Select from 'react-select'
import ContentSelection from './UIcontent/ContentSelection'


const StartPageForm = () => {

  // const [isSelectOpt, setIsLogin] = useState(false);
  const [iscontentShow, setcontentIsShow] = useState(false);
  const userSelectionRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();


  const options = [
    { value: 'C', label: 'Content' },
    { value: 'S', label: 'Switch User' },
    { value: 'H', label: 'History' },
    { value: 'E', label: 'Log Out' }
  ];

  const selectOption=(event)=>{

    console.log(event.value)
    if (event.value === "C") {
      setcontentIsShow(true); 
    }       
  }

  const hideComtectSelectHandler = () => {
    setcontentIsShow(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userSelection = userSelectionRef.current.value;

    // add validation

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
    <Fragment>
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>       
        <Select
          // styles={customStyles}
          options={options}
          ref={userSelectionRef}                    
          onChange={event => selectOption( event)}
        />
      </div>
      <div className={classes.action}>
        <button>Submit Selection</button>
      </div>  
      {iscontentShow && <ContentSelection onClose={hideComtectSelectHandler}/>}
    </form>
    
    </Fragment>
  );
}

export default StartPageForm;
