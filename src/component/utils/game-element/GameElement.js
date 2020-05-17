import React from 'react';
import { Link } from 'react-router-dom';
import Style from './GameElement.module.scss';

const GameElement = ({game}) => {

    return(
        <div className={`card card-container bg-light mr-3 mb-3 ${Style.card}`}>
            <Link to={{pathname: `/game/${ game.name }`}}>
                <img alt="game box art"  src={ game.box_art_url } />
            </Link>
            <div className="card-body">
                <Link className={Style.link}
                      to={{pathname: `/game/${ game.name }`}}>
                    <p className={`card-text ${Style.gameName}`}>{ game.name }</p>
                </Link>
            </div>
        </div>
    )
}

export default GameElement;