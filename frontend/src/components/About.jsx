import React from 'react';
import './About.css'; // Add this import for custom styles

const About = () => {
  return (
    <main className="container">
      <section className="about-hero">
        <img src="https://via.placeholder.com/1200x400" alt="About Us Banner"/>
        <div className="about-hero-text">
          <h1>About ABC Jewelers</h1>
        </div>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>OUR MISSION</h2>
          <p>
            ABC Jewelers was founded in 2018 by Aarushi Lakhi to raise funds by selling handmade jewelry to provide for low-income patients in need of medical care, offer post-treatment support for their medical treatment, and fund medical research.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>OUR STORY</h2>
          <h3> ABC's Journey Begins</h3>
          <p>
            In 2018 Aarushi toured a non-profit eye clinic that conducts eye camps and free eye surgeries for people in need. She was surprised to learn that 36 million people are blind all over the world and 217 million people have moderate or severe vision impairment. Millions of under-served across the world are unable to get access to vision care due to a lack of funds. Aarushi decided to blend her passion for technology and making jewelry to build a platform to sell jewelry and raise money to fund some of these vision services.
          </p>
          <h3> ABC's Journey Continues</h3>
          <p>
            After realizing how her platform could positively impact many peoples' lives, Aarushi expanded ABC's outreach to help pediatric centers and young children undergoing medical treatments. During the COVID-19 crisis, ABC was also able to broaden its help by procuring oxygen concentrations for medical facilities. Additionally, after many of Aarushi's family and friends were diagnosed with cancer in 2022, ABC extended its reach to help with cancer research. ABC Jewelers hopes to continue leaving a positive footprint through its humble endeavors.
          </p>
          {/* <h2>Why Choose Us?</h2>
          <ul>
            <li>Exceptional Quality</li>
            <li>Handcrafted Designs</li>
            <li>Personalized Service</li>
          </ul> */}
        </div>
        <div className="about-image">
            <img src="https://via.placeholder.com/700x600" alt="Jewelry Showcase" />
        </div>
      </section>
    </main>
  );
};

export default About;
