import React from 'react'
import Card from './Card'
import './CardList.sass'

function CardList(props) {
  const cardsArr = [...props.cards]
  return (
    <div className="card-list">
      {
        cardsArr.map(card => {
          return <Card key={card.id} card={card} />
        })
      }
    </div>
  )
}

export default CardList
