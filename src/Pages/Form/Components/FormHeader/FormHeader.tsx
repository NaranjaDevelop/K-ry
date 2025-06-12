import '../FormHeader/Header.css';
import Logo from '../../../../assets/K-RY.png';
interface Props {

    goback: () => void;
    }

const Header = ({goback}: Props) => {

    
    return (
    <header>
        <div>

        <img className= "header" src={Logo} alt="K-ry" onClick={goback} />
        </div>
    </header>
    );
};

export default Header;
