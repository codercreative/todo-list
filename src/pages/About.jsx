import AboutStyles from './About.module.css';

function About() {
  return (
    <main className={AboutStyles.main}>
      <h2>Welcome to My Todos! 🎉</h2>
      <div className={AboutStyles.contentWrapper}>
        <p>This app helps you keep track of everything you need to do.</p>
        <p>
          You can add hundreds of todos, include fun emojis, and mark them off
          as you complete them.
        </p>
        <p>
          Organize your list by sorting tasks in ascending or descending order,
          search through your todos quickly, and even manage multiple pages with
          ease.
        </p>
      </div>
    </main>
  );
}

export default About;
