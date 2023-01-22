import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <span className='headerContent' onClick={() => window.scroll(0,0)} > 
                <h3 className='headerTitle'> Plant App </h3>
            </span>
        </div>)
};

export default Header;