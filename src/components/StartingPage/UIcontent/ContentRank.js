import Modal from './Modal'
import classes from './ContentRank.module.css';
import Select from 'react-select'






const ContentSRanking = (props) => {
  
  
  const options = [
    { value: '1', label: ' 1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: ' 4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: ' 7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ];

 


  return (
    <Modal onClose={props.onClose}>      
      <div className={classes.action}>
        <h1><p>Please rank the content : </p></h1>        
        <Select
          // styles={customStyles}
          options={options}
          // ref={userSelectionRef}                    
          onChange={event => props.onSubmitOptionHandler(event)}
        />
        </div>
        <div className={classes.actions}>
          <button  className={classes.button} onClick={props.onSubmitOptionHandler}> Select</button>                  
        </div>
      
    </Modal>
  );
};

export default ContentSRanking;