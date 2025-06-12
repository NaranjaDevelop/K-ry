import '../FormHeader/Header.css';
import Logo from '../../../../assets/K-RY.png';
interface Props {

    goback: () => void;
    }

const Header = ({goback}: Props) => {

    
    return (
    <header>
        <div>

        <img src={Logo} alt="K-RY Logo" className="h-10 w-auto" onClick={goback} />
        </div>
    </header>
    );
};

export default Header;
