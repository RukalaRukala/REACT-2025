import styles from './About.module.scss';

const About = () => (
  <div className={styles.about}>
    <h1 className={styles.about__title}>About</h1>
    <p className={styles.about__author}>Author: Rusakovich Mikalai</p>
    <p>
      Course:{' '}
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.about__link}
      >
        RS School React
      </a>
    </p>
  </div>
);

export default About;
