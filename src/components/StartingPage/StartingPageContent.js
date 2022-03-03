import classes from './StartingPageContent.module.css';
import StartPageForm from './StartPageForm';

const StartingPageContent = (props) => {
  return (
    <section className={classes.profile}>
      <h1>Hello, Please choose between C, S, E and H</h1>
      <StartPageForm />
    </section>
  );
};

export default StartingPageContent;
