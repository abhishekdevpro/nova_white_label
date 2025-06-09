import { FaGlobe, FaLinkedin, FaTwitter, FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa"



const SocialSection = ({ companyData }) => {
  const socialLinks = [
    { key: "website_link", icon: FaGlobe, label: "Website" },
    { key: "linkedin_link", icon: FaLinkedin, label: "LinkedIn" },
    { key: "twitter_link", icon: FaTwitter, label: "Twitter" },
    { key: "facebook_link", icon: FaFacebook, label: "Facebook" },
    { key: "youtube_link", icon: FaYoutube, label: "YouTube" },
    { key: "instagram_link", icon: FaInstagram, label: "Instagram" },
  ]

  return (
    <section className="social-section">
      <div className="social-container">
        <h2 className="social-title">Connect With Us</h2>
        <p className="social-subtitle">
          Follow us on social media to stay updated with our latest news and opportunities
        </p>
        <div className="social-links">
          {socialLinks.map(
            ({ key, icon: Icon, label }) =>
              companyData?.[key] && (
                <a key={key} href={companyData[key]} target="_blank" rel="noopener noreferrer" className="social-link">
                  <Icon className="social-icon" />
                  <span className="social-label">{label}</span>
                </a>
              ),
          )}
        </div>
      </div>
    </section>
  )
}

export default SocialSection
