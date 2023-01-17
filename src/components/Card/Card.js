import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import './Card.css';
const Card = ({ pokemon }) => {
    return (
        <div className="card">

            <div className='cardImg'>
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <h3 className='cardName'> {pokemon.name}</h3>
            <div className="carTypes">
                <div>タイプ</div>
                {pokemon.types.map((type, i) => {
                    return (
                        <div>
                            <span className='typeName'>{type.type.name}</span>
                        </div>
                    );
                })}
            </div>
            <div className="cardInfo">
                <div className="cardData">
                    <p className='title'>重さ：{pokemon.weight}</p>
                    <p className='title'>高さ：{pokemon.height}</p>
                    <p className='title'>アビリティ：{pokemon.abilities[0].ability.name} </p>
                </div>
            </div>
        </div>
    )
}

export default Card