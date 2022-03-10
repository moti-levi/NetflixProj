import classes from './HistoryItem.module.css';

const HistoryItem = (props) => {
  return <li className={classes.task}>{props.children}</li>
};

export default HistoryItem;