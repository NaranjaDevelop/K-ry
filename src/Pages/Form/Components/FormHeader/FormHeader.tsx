import '../FormHeader/Header.css';
import logo from '../../../../assets/K-RY.png'
interface Props {

    goback: () => void;
    }

const Header = ({goback}: Props) => {

    
    return (
    <header>
        <div>

        <img className= "header" src={logo} alt="K-ry" onClick={goback} />
        </div>
    </header>
    );
};

export default Header;
