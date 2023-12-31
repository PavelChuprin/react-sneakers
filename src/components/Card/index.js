import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import styles from "./Card.module.css";

const Card = ({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading,
}) => {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={185}
          viewBox="0 0 150 185"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="110" />
          <rect x="0" y="120" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="140" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="165" rx="5" ry="5" width="80" height="25" />
          <rect x="118" y="153" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={isFavorite ? "/img/like.svg" : "/img/dislike.svg"}
                alt={isFavorite ? "like" : "dislike"}
              />
            </div>
          )}
          <img width={133} height={112} src={imageUrl} alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className="cu-p"
                src={isItemAdded(id) ? "/img/checked.svg" : "/img/plus.svg"}
                alt={isItemAdded(id) ? "checked" : "plus"}
                onClick={onClickPlus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
