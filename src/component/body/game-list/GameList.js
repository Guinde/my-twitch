import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/*********** Store ***********/
import { fetchTopGames, setGamesPage } from '../../../store/actions';
import { topGamesSelector, gamesIsLoadingSelector, topGamesPageSelector } from '../../../store/selectors';

/*********** Components ***********/
import GameElement from '../../utils/game-element/GameElement';
import Filters from '../../utils/filters/Filters';
import Loading from '../../utils/loading/Loading';
import Pagination from '../../utils/pagination/Pagination';

import Style from './GameList.module.scss';

const GameList = ({fetchTopGames, setGamesPage,  data, isLoading, pageCount}) => {

    const filters = ['first'];

    useEffect(() => {
        fetchTopGames().then(
            setGamesPage(1)
        );
    }, [fetchTopGames, setGamesPage])

    const handlePagination = (query) => {
        fetchTopGames(query, data.filter).then(
            setGamesPage(query.setPage)
        )
    }

    const submit = (newFilters) => {
        fetchTopGames(null, newFilters);
    }

    return(
        <>
            { isLoading || data == null || data.games === undefined ? (
                <Loading />
            ) : (
                <div className={Style.gameList}>
                    <h2>Jeux les plus populaires</h2>
                    < Filters filters={ filters } 
                              dataFilters={ data.filter }
                              setNewFilters={ submit }/>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                        { data.games.map((game, index) => (
                            <GameElement 
                                key={ index }
                                game={ game }/>
                        ))}
                    </div>
                    <Pagination onChangePage={ handlePagination }
                                page={ data.page }
                                length={ data.games.length }
                                pageCount={ pageCount }
                                totalItem={data.filter.first}/>
                </div>
            )}
        </>
    )
}

export default connect(state => ({
    data: topGamesSelector(state),
    isLoading: gamesIsLoadingSelector(state),
    pageCount: topGamesPageSelector(state)
  }), {
    fetchTopGames,
    setGamesPage
  })(GameList)