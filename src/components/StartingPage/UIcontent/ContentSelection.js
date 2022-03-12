import Modal from './Modal'
import classes from './ContentSelection.module.css';
import Select from 'react-select'






const ContentSelection = (props) => {
  
  
  const options = [
    { value: '1', label: 'TV Show' },
    { value: '2', label: 'Movie' },
    { value: '3', label: 'Any' },
  ];

 


  return (
    <Modal onClose={props.onClose}>      
      <div className={classes.action}>
        <h1><p>Please Select what kind of content : </p></h1>
        <p> (TV Show,Movie,Any)</p>
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

export default ContentSelection;