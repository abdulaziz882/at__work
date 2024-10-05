import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getUser, updateUser } from "../../../store/users/usersSlice";
import s from './User.module.scss';
import back from '../../images/arrow-left.svg';
import foto from '../../images/fotob.svg';
import { useNavigate } from 'react-router-dom';
import correct from '../../images/icon.svg';
import krestik from '../../images/Union.svg';

const User = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    city: '',
    phone: '',
    companyName: ''
  });

 
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      if (!user || user.id !== parseInt(id)) {
        dispatch(getUser(id)); 
      } else {
        setFormData({
          name: user.name || '',
          username: user.username || '',
          email: user.email || '',
          city: user.address?.city || '',
          phone: user.phone || '',
          companyName: user.company?.name || ''
        });
      }
    }
  }, [dispatch, id, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user, 
      ...formData, 
      address: {
        ...user.address, 
        city: formData.city 
      },
      company: {
        ...user.company,
        name: formData.companyName 
      }
    };

    dispatch(updateUser(updatedUser));

    setModalVisible(true);
    

    setTimeout(() => {
      setModalVisible(false);
    }, 4000);
  };


  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div className="container">
      <button className={s.back} onClick={() => navigate(-1)}>
        <img src={back} alt="Назад" />
        <p className={s.back__title}>Назад</p>
      </button>
      {user ? (
        <div className={s.user}>
          <div className={s.user__card}>
            <div className={s.user__card_left}>
              <img src={foto} alt="Фото" />
              <p className={s.user__card_lbottom}>Данные пользователя</p>
              <p className={s.user__card_lbottom}>Рабочее пространство</p>
              <p className={s.user__card_lbottom}>Приватность</p>
              <p className={s.user__card_lbottom}>Безопасность</p>
            </div>
            <div className={s.user__card_right}>
              <h2 className={s.user__card_title}> Данные пользователя </h2>
              <div className={s.user__card_rbottom}>
                <div className={s.user__card_info}> Имя
                  <input 
                    className={s.info__input} 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={s.user__card_info}> Никнейм
                  <input 
                    className={s.info__input} 
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className={s.user__card_info}> Почта
                  <input 
                    className={s.info__input} 
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={s.user__card_info}> Город
                  <input 
                    className={s.info__input} 
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className={s.user__card_info}> Телефон
                  <input 
                    className={s.info__input} 
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={s.user__card_info}> Название компании
                  <input 
                    className={s.info__input} 
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={s.user__card_btn} onClick={handleSave}>
                сохранить
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}


      {modalVisible && (
        <div className={s.modal}>
          <div className={s.modal__content}> 
            <img className={s.modal__img} src={krestik} alt="" onClick={handleModalClose} />
            <img className={s.correct__img} src={correct} alt="" />
            <p className={s.correct__title}>Данные успешно сохранены!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
