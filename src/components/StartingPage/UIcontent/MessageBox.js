import Modal from './Modal'
import classes from './MessageBox.module.css';

const MsgBox = (props) => {  
  return (
    <Modal onClose={props.onClose}>      
      <div className={classes.action}>
        <h1><p>{props.alertMessage}</p></h1>                
        </div>
        <div className={classes.actions}>
          {!props.isYesNoMsgBox &&<button  className={classes.button} onClick={props.onClose}> Close</button>}
          {props.isYesNoMsgBox && <button  className={classes.buttonYN} onClick={props.close}> Yes</button>}              
          {props.isYesNoMsgBox && <button  className={classes.buttonYN} onClick={props.onClick}> No</button>}              
        </div>      
    </Modal>
  );
};

export default MsgBox;