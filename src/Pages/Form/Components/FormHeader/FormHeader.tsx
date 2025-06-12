import '../FormHeader/Header.css';

interface Props {

    goback: () => void;
    }

const Header = ({goback}: Props) => {

    
    return (
    <header>
        <div>

        <img className= "header" src="" alt="K-ry" onClick={goback} />
        </div>
    </header>
    );
};

export default Header;
