import { useContext, useState, Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Store/auth-context';
import classes from './StartPageForm.module.css';
import Select from 'react-select'
import ContentSelection from './UIcontent/ContentSelection'
import MsgBox from './UIcontent/MessageBox'
import Spinner from './UIcontent/spinner';
import axios from 'axios';
import History from '../History/History'
import ContentSRanking from './UIcontent/ContentRank';
const StartPageForm = () => {


  const [iscontentShow, setContentIsShow] = useState(false);
  const [iscallingToApi, setiscallingToApi] = useState(false);
  const [contentType, setContentType] = useState('');
  const [rankVal, setRankVal] = useState('');
  const [isMsgBoxShow, setMessageBoxState] = useState(false);
  const [isRankShow, setRankShow] = useState(false);
  const [istimerBoxShow, settimerBoxShow] = useState(false);
  const [MsgBoxAlertText, SetMsgBoxAlertText] = useState('');
  const [isMsgShow, setMessageShowState] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [contentDataHistory, setContentDataHistory] = useState([]);
  const [userSelectionIndex, setuserSelectionIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const options = [
    { value: 'C', label: 'C - for Content' },
    { value: 'S', label: 'S - for Switch User' },
    { value: 'H', label: 'H - for History' },
    { value: 'E', label: 'E - for Log Out' }
  ];


  function reset() {
    SetMsgBoxAlertText("Still Watch at " + contentData.title);
    setSeconds(0);
    settimerBoxShow(true);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      if (seconds === 3) {
        setIsActive(false);
      }
    } else if (!isActive && seconds === 3) {
      clearInterval(interval);
      reset();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);



  const selectOption = async (event) => {
    // alert(event.value);
    setuserSelectionIndex(event.value);
    if (event.value === "C") {
      setContentIsShow(true);
      setContentDataHistory([]);
    }
    else if (event.value === "H") {
      setiscallingToApi(true)
      // alert(authCtx.userId);
      let url = 'https://reactdb-f0ba3-default-rtdb.firebaseio.com/userContent.json?orderBy="userid"&equalTo="' + authCtx.userId + '"';

      axios.get(url).then(res => {
        console.log(res.data)
        let response = JSON.parse(res.request.response);
        const loadedHistory = [];
        for (var k in response) {
          loadedHistory.push({ id: response[k].id, title: response[k].title, imdb_rating: response[k].imdb_rating });
        }
        console.log(loadedHistory);
        setContentDataHistory(loadedHistory);
      }).catch
        (error => console.error(`Error : ${error}`));
      setiscallingToApi(false)
    }
    else if (event.value === "E") {
      history.replace('/auth');
      authCtx.logout();
    }
    else if (event.value === "S") {
      history.replace('/auth');
    }
  }



  const hideContectSelectHandler = () => {
    setContentIsShow(false);
  };

  const closeMessageBox = () => {
    console.log('closeMessageBox');
    setMessageBoxState(false);
  };

  const ContinueTimerMessageBox = () => {
    console.log('ContinueTimerMessageBox');
    setIsActive(true);
    settimerBoxShow(false);
  };

  const closeTimerMessageBox = () => {
    console.log('closeMessageBox');
    setIsActive(false);
    settimerBoxShow(false);
    setRankShow(true);
  };

  const closeRanking = () => {
    console.log('closeRanking');
    setRankShow(false);
  };

  const getContectSelectContentKind = (event) => {
    console.log(event.value)
    setContentIsShow(false);
    setContentType(event.value)
  }

  const getContectRanking = (event) => {
    console.log(event.value)
    setRankShow(false);
    setRankVal(event.value)
    updateAPI();

  }
  async function updateAPI() {
    const note = 
      {
         rankVal
      };
    const response = await axios.put('https://reactdb-f0ba3-default-rtdb.firebaseio.com/userContent/' + authCtx.userid +'/name/0', note)
    console.log(response)
    console.log(response.data)
  }

  





  async function submitHandler(event) {
    event.preventDefault();

    setiscallingToApi(true);

    console.log(userSelectionIndex);

    if (!contentType) {
      SetMsgBoxAlertText("Please Select Content Type");
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
        setIsActive(true);
      });
  };

  async function addContentToUser(content) {
    let userid = authCtx.userId;
    const userContent = { ...content, userid };
    // console.log('userContent= ' + userContent);
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
            onChange={event => selectOption(event)}
          />
        </div>
        <div className={classes.action}>
          <button>Submit Selection</button>
        </div>
        {iscontentShow && <ContentSelection onClose={hideContectSelectHandler} onSubmitOptionHandler={getContectSelectContentKind} />}
        {isMsgBoxShow && <MsgBox alertMessage={MsgBoxAlertText} onClose={closeMessageBox} isYesNoMsgBox={false} />}
        {isRankShow && <ContentSRanking onClose={closeRanking} onSubmitOptionHandler={getContectRanking} />}
        {istimerBoxShow && <MsgBox alertMessage={MsgBoxAlertText} onClose={closeTimerMessageBox} isYesNoMsgBox={true} onClick={closeTimerMessageBox} close={ContinueTimerMessageBox} />}
        {isMsgShow && <h1>You Are Now watching :  {contentData.title}  </h1>}
        {iscallingToApi && <Spinner />}
        {contentDataHistory.length > 0 && <History items={contentDataHistory} />}
      </form>

    </Fragment>
  );
}

export default StartPageForm;
