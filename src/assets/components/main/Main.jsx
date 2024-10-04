import { useEffect, useState, useRef } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../../store/users/usersSlice';
import { Link } from 'react-router-dom'; 
import s from './Main.module.scss';
import photo from '../../images/foto.svg';
import menu from '../../images/dropdownMenu.svg';
import menuHover from '../../images/hoverMenu.svg'; 
import sfoto from '../../images/sery.svg'
const Main = () => {
  const { title, users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [openMenuId, setOpenMenuId] = useState(null); 
  const [hoveredMenuId, setHoveredMenuId] = useState(null); 
  const menuRefs = useRef({}); 
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [archivedUsers, setArchivedUsers] = useState([]); 
  const [hiddenUsers, setHiddenUsers] = useState([]); 
  const [openArchivedMenuId, setOpenArchivedMenuId] = useState(null); 

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers());
    } else {
      setLoadedUsers(users);
    }
  }, [dispatch, users]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && menuRefs.current[openMenuId] && !menuRefs.current[openMenuId].contains(event.target)) {
        setOpenMenuId(null);
      }
      if (openArchivedMenuId && menuRefs.current[openArchivedMenuId] && !menuRefs.current[openArchivedMenuId].contains(event.target)) {
        setOpenArchivedMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenuId, openArchivedMenuId]);

  const toggleMenu = (userId) => {
    setOpenMenuId((prevId) => (prevId === userId ? null : userId));
  };

  const toggleArchivedMenu = (userId) => {
    setOpenArchivedMenuId((prevId) => (prevId === userId ? null : userId));
  };

  const handleMouseEnter = (userId) => {
    setHoveredMenuId(userId); 
  };

  const handleMouseLeave = () => {
    setHoveredMenuId(null); 
  };

  const handleArchive = (userId) => {
    const userToArchive = loadedUsers.find(user => user.id === userId);
    if (userToArchive) {
      setArchivedUsers(prev => [...prev, userToArchive]);
      setLoadedUsers(prev => prev.filter(user => user.id !== userId));
      setOpenMenuId(null);
    }
  };

  const handleUnarchive = (userId) => {
    const userToUnarchive = archivedUsers.find(user => user.id === userId);
    if (userToUnarchive) {
      setLoadedUsers(prev => [...prev, userToUnarchive]);
      setArchivedUsers(prev => prev.filter(user => user.id !== userId));
      setOpenArchivedMenuId(null);
    }
  };

  const handleHide = (userId) => {
    const userToHide = loadedUsers.find(user => user.id === userId);
    if (userToHide) {
      setHiddenUsers(prev => [...prev, userToHide]); 
      setLoadedUsers(prev => prev.filter(user => user.id !== userId)); 
      setOpenMenuId(null);
    }
  };

  return (
    <>
    <div className="container">
      <h2 className={s.title}>{title}</h2> 
  
      <main className={s.main}>
        {loadedUsers && loadedUsers.length > 0 ? ( 
          loadedUsers.slice(0, 6).map((user) => ( 
            <div key={user.id} className={s.userCard}>
              <div className={s.card}> 
                <img src={photo} alt={user.username} />
                <div className={s.card__info}>
                  <h3 className={s.username}>{user.username}</h3>
                  <p className={s.company}>{user.company.name}</p>
                  <p className={s.city}>{user.address.city}</p>
                </div>
                <img 
                  src={hoveredMenuId === user.id ? menuHover : menu} 
                  alt="Menu" 
                  className={s.menu} 
                  onClick={() => toggleMenu(user.id)}
                  onMouseEnter={() => handleMouseEnter(user.id)} 
                  onMouseLeave={handleMouseLeave} 
                  ref={(el) => (menuRefs.current[user.id] = el)} 
                />
                {openMenuId === user.id && (
                  <ul className={s.dropdownMenu}>
                    <Link to={`/user/${user.id}`}><li>Pедактировать</li></Link>
                    <li onClick={() => handleArchive(user.id)}>Архивировать</li>
                    <li onClick={() => handleHide(user.id)}>Скрыть</li> 
                  </ul>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Загрузка...</p>
        )}
      </main>
      
      <h2 className={s.title}>Архив</h2>
      <footer className={s.footer}>
        {archivedUsers.length > 0 ? (
          archivedUsers.slice(0, 6).map((user) => ( 
            <div key={user.id} className={s.archivedUserCard}>
              <div className={s.card}> 
                <img src={sfoto} alt={user.username} />
                <div className={s.card__info}>
                  <h3 className={s.archive__username}>{user.username}</h3>
                  <p className={s.company}>{user.company.name}</p>
                  <p className={s.city}>{user.address.city}</p>
                </div>
                <img 
                  src={hoveredMenuId === user.id ? menuHover : menu} 
                  alt="Menu" 
                  className={s.menu} 
                  onClick={() => toggleArchivedMenu(user.id)}
                  onMouseEnter={() => handleMouseEnter(user.id)} 
                  onMouseLeave={handleMouseLeave} 
                  ref={(el) => (menuRefs.current[user.id] = el)} 
                />
                {openArchivedMenuId === user.id && (
                  <ul className={s.dropdownMenu}>
                    <li onClick={() => handleUnarchive(user.id)}>Разархивировать</li>
                  </ul>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Архив пуст</p>
        )}
      </footer>
    </div>
    </>
  );
};

export default Main; 
