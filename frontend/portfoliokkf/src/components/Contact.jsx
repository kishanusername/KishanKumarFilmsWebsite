import "./Contact.css";

function Contact() {
    return (
        <section className="contact" id="contact">
            <h2>Contacts</h2>
            <p className="contact-intro">Have a story worth remembering? Let&apos;s create it with intent.</p>
            
          
            <a href="mailto:kishanusername670@gmail.com"
            className= "contact-btn"><span>Email</span> kishanusername670@gmail.com
        
            
            </a>
<a href="tel:+919102077670"
            className= "contact-btn"><span>Call</span> +91 9102077670
            </a>

            <a href="https://www.instagram.com/kishankumar_1.24/"
            className= "contact-btn"><span>Social</span> Instagram
        
            
            </a>
            
<a   href="https://maps.google.com/?q=Delhi,India"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn"><span>Based in</span> Delhi, India
            </a>


        </section>
    );
}
export default Contact;
