import React from 'react';
import './HomePage.css';
import { Link, useNavigate } from 'react-router-dom'
import GetUserRole from '../../components/GetUserRole.js';
import logo from '../../Images/agriconnectlogo.png';
import logo2 from '../../Images/Circular Logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faContactBook, faMailBulk } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const navigate = useNavigate()

  var userRole = GetUserRole(localStorage.getItem('token'))

  const linkStyle = { textDecoration: "none", color: "#333", }
  return (
    <div className="homepage">
      <header className="home-header">
        <nav className="navbar">
          {/* <div className="logo"> */}
            <img src={logo} alt="Logo" />
          {/* </div> */}
          {userRole == "admin" ? 
            <ul className="nav-links">
              <Link to={`/`} style={linkStyle}><li>Home</li></Link>
              <Link to={`/admin/products`} style={linkStyle}><li>Products</li></Link>
              <Link to={`/admin/orders`} style={linkStyle}><li>Manage Orders</li></Link>
              <Link to={`/admin/reports`} style={linkStyle}><li>Sales Reports</li></Link>
              <Link to={`/admin/users`} style={linkStyle}><li>Manage Users</li></Link>
              <Link to={`/admin/account`} style={linkStyle}><li>Account</li></Link>
            </ul> :
            <ul className="nav-links">
              <Link to={`/`} style={linkStyle}><li>Home</li></Link>
              <Link to={`/shop`} style={linkStyle}><li>Shop</li></Link>
              <Link to={`/shop/cart`} style={linkStyle}><li>Cart</li></Link>
              <Link to={`/shop/orders`} style={linkStyle}><li>Orders</li></Link>
              <Link to={`/account`} style={linkStyle}><li>Account</li></Link>
            </ul>
          }
        </nav>
      </header>

      <section id="hero" className="hero">
        <div className="hero-content">
          <img className='circle-logo' src={logo2} />
          <h1>Welcome to Agri-Connect</h1>
          <p>Seeding the Future with Technological Agriculture</p>
        </div>
      </section>

      <section id="news" className="news">
        <h2>Top Agricultural Developments</h2>
        <div className="news-grid">
          <a href="https://uplb.edu.ph/college/college-of-agriculture-and-food-science/" className="news-card" target="_blank" rel="noopener noreferrer">
            <div className="news-details">
              <img src="https://biotech.uplb.edu.ph/wp-content/uploads/2024/02/CASL-ISO-2024-2048x1365.jpg" alt="Article 1" className="news-image" />
              <div>
                <h3 className="news-title">UPLB-BIOTECH biofertilizers and technologies to boost urban agriculture in Cabuyao City</h3>
                <p className="news-description">Cabuyao farmers will soon be able to use cost-effective and environment-friendly biofertilizers of the National Institute of Molecular Biology and Biotechnology (BIOTECH) on their various crops. This was provided for in one of six partnership agreements that UPLB-BIOTECH and local executives of Cabuyao signed on March 17 to strengthen agricultural biotechnology RDE through sustainable agriculture and environmental protection.
                </p>
              </div>
            </div>
          </a>

          <a href="https://uplb.edu.ph/college/college-of-agriculture-and-food-science/" className="news-card" target="_blank" rel="noopener noreferrer">
            <div className="news-details">
              <img src="https://biotech.uplb.edu.ph/wp-content/uploads/2023/10/BAFP-Calauan-Laguna-Grp-Photo-1.jpg" alt="Article 2" className="news-image" />
              <div>
                <h3 className="news-title">New BIOTECH facility to boost academe-industry partnership</h3>
                <p className="news-description">Thus, said Dr. Marilyn Brown, director of the National Institute of Molecular Biology and Biotechnology (BIOTECH), as she opened its week-long 40th anniversary celebration on Nov. 18. Dr. Brown talked about the accomplishments of BIOTECH in the past four decades, citing its 47 products and technologies, 17 patents, 15 pending patents, 18 approved invention disclosures, 16 trademarks, 13 trademark applications, more than 200 international and national awards, and numerous publications. </p>
              </div>
            </div>
          </a>

          <a href="https://uplb.edu.ph/college/college-of-agriculture-and-food-science/" className="news-card" target="_blank" rel="noopener noreferrer">
            <div className="news-details">
              <img src="https://biotech.uplb.edu.ph/wp-content/uploads/2023/11/UPLB-BIOTECH-biofertilizers-make-trees-thrive-in-mined-out-areas-in-Surigao.jpg" alt="Article 3" className="news-image" />
              <div>
                <h3 className="news-title">UPLB BIOTECH researcher is first Filipino Young Asian Biotechnologist Awardee</h3>
                <p className="news-description">Dr. Rodney H. Perez of the National Institute of Molecular Biology and Biotechnology (BIOTECH) has been named recipient of the Young Asian Biotechnologist Prize (2021) by the Society for Biotechnology, Japan (SBJ). He is the first-ever Filipino to receive the award. SBJ has recognized Dr. Perez for exemplary research in the fields of food microbiology, microbial technology, and biotechnology. He has been studying and researching microorganisms and bacteriocins for 10 years now. </p>
              </div>
            </div>
          </a>

        </div>
      </section>

      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service">
            <div className="service-details">
              <h3 className="service-title">E-commerce Website</h3>
              <p className="service-description"> Welcome to our online marketplace, where the bounties of the earth meet the convenience of the digital age! Step into a world where the soil's richness, the sun's warmth, and the dedication of local farmers converge to bring you the freshest, most wholesome agricultural products right to your doorstep. In a world increasingly dominated by mass production and industrial agriculture, we stand as a beacon of authenticity and sustainability. We prioritize the connections between consumers and the farmers who grow their food, fostering a sense of community and trust that is often lost in the hustle and bustle of modern life. As you navigate through our virtual aisles, you'll find a cornucopia of agricultural delights, each one a testament to the dedication and expertise of the farmers who produce it. From crisp, organic vegetables bursting with flavor to succulent fruits ripened to perfection under the sun, every item in our catalog tells a story of hard work, integrity, and respect for the land. </p>
            </div>
            <img src="https://www.agriculture.com/thmb/4Jnrz_wSBKiHWNACCFLvYTSDrCg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/IMG_9819-2-2000-7135e00311464ff79b546ab1e1174b27.jpg" alt="E-commerce Website" className="service-image" />
          </div>

          <div className="service">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Woman_at_work%2C_Gujarat.jpg" alt="Support to Local Farmers" className="service-image-left" />
            <div className="service-details">
              <h3 className="service-title">Support to Local Farmers</h3>
              <p className="service-description">We believe in transparency and accountability every step of the way, from the farm to your table. That's why we work closely with local farmers who share our values, ensuring that each item is grown and harvested with the utmost care and attention to detail.When you shop with us, you're not just purchasing groceries – you're investing in a better future for our planet and the generations to come. By supporting local farmers and sustainable agricultural practices, you're helping to preserve the environment, promote biodiversity, and build resilient communities that can withstand the challenges of an uncertain world. So whether you're a seasoned chef looking for the freshest ingredients to elevate your culinary creations, a health-conscious consumer seeking wholesome alternatives to mass-produced fare, or simply someone who appreciates the simple joys of a ripe, juicy tomato straight from the vine, we invite you to explore our virtual marketplace and discover the unparalleled richness of locally sourced, sustainably grown agricultural products. Welcome to a world where every purchase is a vote for a brighter, greener future – welcome to our online community of farmers, food lovers, and advocates for a more sustainable world.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div id="icons">
          <FontAwesomeIcon icon={faContactBook} />
          <FontAwesomeIcon icon={faMailBulk} />
          <FontAwesomeIcon icon={faCoffee} />
        </div>
      </footer>



    </div>
  );
};

export default HomePage;
