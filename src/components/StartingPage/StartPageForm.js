import { useRef, useContext,useState, Fragment,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Store/auth-context';
import classes from './StartPageForm.module.css';
import Select from 'react-select'
import ContentSelection from './UIcontent/ContentSelection'
import MsgBox from './UIcontent/MessageBox'
import Spinner from './UIcontent/spinner';

const StartPageForm = () => {

  
  const [iscontentShow, setContentIsShow] = useState(false);
  const [iscallingToApi, setiscallingToApi] = useState(false);
  const [contentType,setContentType] = useState('');
  const [isMsgBoxShow,setMessageBoxState] = useState('');
  const [isMsgShow,setMessageShowState] = useState(false);
  const [contentData,setContentData]=useState([]);
  const [userSelectionIndex,setuserSelectionIndex]=useState(0);
  const authCtx = useContext(AuthContext);
  const history = useHistory();  
  
  const options = [
    { value: 'C', label: 'Content' },
    { value: 'S', label: 'Switch User' },
    { value: 'H', label: 'History' },
    { value: 'E', label: 'Log Out' }
  ];

  const selectOption=(event)=>{
    setuserSelectionIndex(event.value);    
    if (event.value === "C") {
      setContentIsShow(true); 
    }       
  }

  const hideContectSelectHandler = () => {
    setContentIsShow(false);
  };

  const closeMessageBox = () => {
    setMessageShowState(false);
  };

  
  const getContectSelectCOntentKind = (event)=>{
    console.log(event.value)
    setContentIsShow(false); 
    setContentType(event.value)     
  }

  async function submitHandler  (event)  {
    event.preventDefault();

    setiscallingToApi(true);

    console.log( userSelectionIndex);
    
    if(!contentType)
    {        
        setMessageBoxState(true)
    }
    setiscallingToApi(true);
    fetch(authCtx.backappUrl, {
      method: 'Get',      
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => 
      response.json())
    .then(data => {
      addContentToUser(data)
      console.log(data);
      setContentData(data)
      setiscallingToApi(false);
      setMessageShowState(true);
    });
  };

  async function addContentToUser(content) { 
    let userid=authCtx.userId;    
    const userContent={...content,userid};
    console.log('userContent= ' + userContent);
    const response = await fetch('https://reactdb-f0ba3-default-rtdb.firebaseio.com/userContent.json', {
      method: 'POST',
      body: JSON.stringify(userContent),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }


  return (
    <Fragment>
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>       
        <Select          
          options={options}                            
          onChange={event => selectOption( event)}
        />
      </div>
      <div className={classes.action}>
        <button>Submit Selection</button>
      </div>  
      {iscontentShow && <ContentSelection onClose={hideContectSelectHandler} onSubmitOptionHandler={getContectSelectCOntentKind}/>}
      {isMsgBoxShow && <MsgBox alertMessage='Please select content type' onClose={closeMessageBox}/> }
      {isMsgShow && <h1>You Are Now watching :  {contentData.title}  </h1> }
      {iscallingToApi && <Spinner/>}
    </form>
    
    </Fragment>
  );
}

export default StartPageForm;
