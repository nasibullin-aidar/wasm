import React, { useState, useEffect } from 'react';
import './Card.sass'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'

function Card(props) {
  const { card } = props
  const [liked, setLiked] = useState(false)
  const [bascket, setBascket] = useState(false)

  // лайк, добавление с хранилище
  const likedHandler = () => {
    setLiked(!liked)
    if (!liked) {
      localStorage.setItem(card.id + "Понравился", card.name)
    } else { localStorage.removeItem(card.id + "Понравился") }
  }
  // рендеринг лайка
  useEffect(() => {
    if (localStorage.hasOwnProperty(card.id + "Добавлен в корзину")) {
      setBascket(!bascket)
    }
    if (localStorage.hasOwnProperty(card.id + "Понравился")) {
      setLiked(!liked)
    }
  }, [])

  // добавление в корзину (тогл иконки)
  const bascketHandler = () => {
    setBascket(!bascket)
    if (!bascket) {
      localStorage.setItem(card.id + "Добавлен в корзину", card.name)
    } else { localStorage.removeItem(card.id + "Добавлен в корзину") }
  }

  return (
    <div className="card">
      <div className="card__img">
        <img src={card.image.url} alt="" />
      </div>
      <p className="card__code">{card.code}</p>
      <h3 className="card__title">{card.name}</h3>
      <div className="card__bottom-row">
        <div className="card__block-price">
          {
            props.card.price.old_price == null ? null :
              <span className="card__price card__price--old">
                {Math.round(card.price.old_price)}&#8381;
              </span>
          }
          <span className="card__price card__price--current">
            {Math.round(card.price.current_price)}&#8381;
            </span>
        </div>
        <div className="card__block-selectors">
          {
            bascket ?
              <div onClick={bascketHandler}
                className="card__icons">
                <img src="images/basket-check.png" alt="корзина" />
              </div> :
              <div onClick={bascketHandler} className="card__icons">
                <img src="images/bascket.png" alt="чек" />
              </div>
          }
          {
            liked ?
              <div onClick={likedHandler} className="card__icons">
                <FcLike />
              </div>
              :
              <div onClick={likedHandler} className="card__icons">
                <FcLikePlaceholder />
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Card