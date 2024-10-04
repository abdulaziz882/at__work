import s from './Navbar.module.scss';
import logo from '../../images/logo.png';
import serdce from '../../images/Favorite.svg';
import vector from '../../images/Vector.png';
import photo from '../../images/foto.svg'
const Navbar = () => {
  return (
    <>
<header className={s.header}>
    <div className="container">

        <div className={s.navbar}>
      <div className={s.logotip}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={s.navbar__right}>
        <div className={s.navbar__right_icons}>
        <img src={serdce} alt="Favorite" />
        <img src={vector} alt="Favorite" />
        </div>
        <div className={s.aboutme}>
            <img src={photo} alt="" />
            <h3 className={s.name}>ivan123</h3>
        </div>

      </div>
    </div>

    </div>
</header>
    </>
  );
};

export default Navbar;
