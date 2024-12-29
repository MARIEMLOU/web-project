import Logopic from '../assets/LogoWeb.png'


function Header(){
    return(

        <header className="header">
            <div className="logo">
                <img src={Logopic} alt="Gold Gym Logo" />
                <h1>GOLD'S GYM</h1>
            </div>
        </header>

    );

}

export default Header