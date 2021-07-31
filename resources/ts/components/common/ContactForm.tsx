import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

import styles from '../../../styles/contactForm.module.scss';

function ContactForm() {
  const [state, handleSubmit] = useForm("xbjqkbdn");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
      <form 
        onSubmit={handleSubmit}
        className={styles.contactForm}>
        <h1>
          Contact form
        </h1>
        <br/>
        <label htmlFor="email">
          Email Address
        </label>
        
        <input
          id="email"
          type="email" 
          name="email"
        />
        <label htmlFor="message">
          message
        </label>
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
          
            <textarea
              id="message"
              name="message"
            />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
        />
        <div className={styles.contactForm__buttonContainer}>
          <button type="submit" className="btn btn-primary" disabled={state.submitting}>
            Submit
          </button>
        </div>
    </form>
    
  );
}

export default ContactForm;
