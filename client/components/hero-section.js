import React, { useEffect, useState } from "react";
import styles from "../styles/landing-page/landing-page.module.scss";
import secondStyles from "../styles/home/home.module.scss";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [transitionState, setTransitionState] = useState('enter-active');

  const words = ["Moments", "Exposure", "Popularity"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionState('exit');
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setTransitionState('enter');
        setTimeout(() => {
          setTransitionState('enter-active');
        }, 50); // Delay to trigger the enter-active class
      }, 500); // Duration should match CSS transition duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={secondStyles.heroSection}>
      <img
        src="/HeroBackground.png"
        alt="Desktop Image"
        className={secondStyles.heroBackground}
      />
      <div className={secondStyles.heroContent}>
        Your Chance to{" "}
        <div className={secondStyles.achieveTextContainer}>
          <div className={secondStyles.achieveText}>Achieve</div>
          <div className={secondStyles.wordCarousel}>
            {words.map((word, index) => (
              <span
                key={word}
                className={`${secondStyles.highlightWord} ${
                  index === wordIndex ? secondStyles[transitionState] : ''
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
        <p className={secondStyles.description}>
					<FormattedMessage id="hero_1" />
          {/* Găsește talentul perfect pentru tine! Echipa noastră te */}
          <span className={secondStyles.subDescription}>
            {" "}
						<FormattedMessage id="hero_2" />
            {/* ajută să iti descoperi cele mai bune capabilități și să le pui în
            valoare. */}
          </span>
        </p>
        <div className={styles.button_container}>
          <Link className={styles.button} href="/register">
            <FormattedMessage id="apply_now" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
