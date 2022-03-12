import Section from './UI/Section';
import HistoryItem from './HistoryItem';
import classes from './History.module.css';

const History = (props) => {
  let historyList = <h2>No History found!</h2>;

  if (props.items.length > 0) {
    historyList = (
      <ul>
        {props.items.map((task) => (
          <HistoryItem key={task.id}>title : {task.title} ,
                   imdb_rating:{task.imdb_rating} ,
                   user Rank:{task.rankval}</HistoryItem>
        ))}
      </ul>
    );
  }

  let content = historyList;
  
  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default History;