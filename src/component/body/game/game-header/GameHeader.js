import React from 'react';
import { Link } from 'react-router-dom';
import Tab from '../../../utils/tab/Tab';
import Style from './GameHeader.module.scss';

const GameHeader = ({game}) => {

    const tabs = ["Chaînes Live", "Videos", "Clips"];

    return(
        <div className={`bg-light ${Style.gameHeaderContainer}`}>
            <div className="d-flex flex row">
                <Link className="pl-3"
                      to={{pathname: `/game/${ game.name }`}}>
                    <img className="pl-3" alt="game box art"  src={ game.box_art_url } />
                </Link>
                <div className={Style.gameInfos}>
                    <span>{game.name}</span>
                </div>
            </div>
            <div>
                <Tab tabs={tabs} name={game.name} baseUrl={"/game"}/>
            </div>
        </div>
    )
}

export default GameHeader;