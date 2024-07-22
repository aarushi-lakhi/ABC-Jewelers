import React from 'react';
import './About.css';

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

      <section className="about-content">
        <div className="about-text">
          <h2>OUR PROJECTS</h2>
          <p>
            ABC Jewelers has sponsored 4 cataract surgeries at the Aravind Eye Hospital in India in 2019. Aravind is a non-profit eye clinic that provides large volume, high quality, and affordable care. Dr. Venkataswamy founded a tiny clinic in 1976 that is now the largest provider of eye care in the world. At Aravind, patients choose whether to pay or not. Millions are treated for free, yet the organization remains self-reliant. This is made possible via donations received from across the world.
          </p>
          <button onClick={() => window.open('https://aravind.org', '_blank')}>Explore Aravind</button>

          <p>
            ABC Jewelers sponsored 25 ophthalmologic surgeries at the Sankara Nethralaya Houston branch in 2020, 5 ophthalmologic surgeries in 2021, 10 ophthalmologic surgeries in 2022, and 10 ophthalmologic surgeries in 2023. Sankara Nethralaya is a non-profit eye clinic that provides comprehensive free eye care. The Ophthalmic Trust was established in June 1988 in Rockville, Maryland, USA, and has been providing free eye surgeries since then. Sankara Nethralaya treats and provides for many who have lost their eyesight and cannot afford the necessary surgery to treat it. As a whole, the Ophthalmic Trust does close to 200 surgeries a day which is possible via the donations received across the world.
          </p>
          <button onClick={() => window.open('https://sankaranethralayausa.org', '_blank')}>Explore Sankara Nethralaya</button>

          <p>
            ABC Jewelers' Kits for Kids project in 2021 donated jewelry-making kits for young children and adolescents with cancer and blood disorder in the Texas Children's Hospital. This was done through the Periwinkle Arts in Medicine Program which encourages the development of coping skills in children and adolescents. This program increases the availability of artistic therapies in healthcare settings and relieves stress in children who are undergoing chemotherapy treatments or blood transfusions.
          </p>
          <button onClick={() => window.open('https://periwinklefoundation.org', '_blank')}>Explore Periwinkle Arts in Medicine Program</button>

          <p>
            ABC Jewelers donated 2 oxygen concentrators to SEWA International's Help India Defeat COVID-19 campaign in 2021 which raised funds for buying supplies such as oxygen concentrators and ventilators for hospitals across India. SEWA's campaign helped millions in India during their acute oxygen shortage and reduced hospitalization significantly.
          </p>
          <button onClick={() => window.open('https://sewausa.org', '_blank')}>Explore SEWA's campaign</button>

          <p>
            ABC Jewelers donated $500 to Texas 4000 for Cancer Research in 2022. Texas 4000 is an organization committed to cultivating student leaders and engaging communities in the fight against cancer. They select students for an 18-month program encouraging students to raise $4,500 as well as ride 4,500 miles to Alaska and volunteer 50+ hours. Texas 4000 envisions a world where all students can become leaders in creating a cancer-free future.
          </p>
          <button onClick={() => window.open('https://texas4000.org', '_blank')}>Explore Texas 4000</button>
        </div>
      </section>
    </main>
  );
};

export default About;
