import React from 'react';

import ContactForm from './ContactForm';

import styles from '../../../styles/footer.module.scss';

function FooterLeft(){
    return(
        <div className={styles.footer__left}>
            <ContactForm/>
        </div>
    )
}

function FooterRight(){
    return(
        <div className={styles.footer__right}>
            <h2>Michihiro Goto</h2>
            <h5>Master of Science in Mechanical Engineering</h5>
            <h4>Junior Frontend Developer</h4>
            <h4>msg systems AG</h4>
            <h4>email: michihirogoto@yahoo.com</h4>
            <div className={styles.footer__right__iconContainer}>
                <a
                    href="https://github.com/gtoootg0131/Portfolio-Toppage2"
                >
                    <i  className="header-logo fab fa-github"/>
                </a>
                <a
                    href="https://www.instagram.com/gt.europa/"
                >
                    <i  className="header-logo fab fa-instagram"/>
                </a>
                <a
                    href="https://www.linkedin.com/in/%E5%80%AB%E5%AE%8F-%E5%BE%8C%E8%97%A4-37b905218/"
                >
                    <i className="header-logo fab fa-linkedin"></i>
                </a>
            </div>
        </div>
    )
}

function Footer(){
    return (
          <div className={styles.footer}>
            <FooterLeft/>
            <FooterRight/>
          </div>
    );
}

export default Footer;
