
import Logopic from '../assets/LogoWeb.png'
import pic from '../assets/img1.png'

function Footer(){
    return(
        <div>
            <section class="contact">
                
                <form>
                    <h2>Contact Us</h2>
                    <input type="text" placeholder="Enter your name" required/>
                    <input type="email" placeholder="your@email.com" required/>
                    <input placeholder="Enter your message..." />
                    <button type="submit">Send</button>
                    
                </form>
                <img src={pic}/>
            </section>

  
            <footer class="footer">
                <img src={Logopic} alt="Gold Gym Logo"/>
                <p>&copy; 2024 Gold Gym. All rights reserved.</p>
            </footer>
        </div>
    );
}
    
export default Footer