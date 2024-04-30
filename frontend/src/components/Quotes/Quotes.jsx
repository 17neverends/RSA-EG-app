import React from 'react';
import PropTypes from 'prop-types';
import styles from './Quotes.module.css';

export const Quotes = ({ quotes }) => {
  return (
    <div className={styles.sentencesDiv}>
      {quotes.map((quote, index) => (
        <p className={styles.theory} key={index}>{quote}</p>
      ))}
    </div>
  );
};

Quotes.propTypes = {
  quotes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
