import React from 'react';

const About: React.FC = () => (
  <div style={{ padding: '2rem' }}>
    <h1>About</h1>
    <p>Author: Rusakovich Mikalai</p>
    <p>
      Курс:{' '}
      <a
        href="https://rs.school/react/"
        target="_blank"
        rel="noopener noreferrer"
      >
        RS School React
      </a>
    </p>
  </div>
);

export default About;
