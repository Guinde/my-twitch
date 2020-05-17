import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/*********** Store ***********/
import { streamsListSelector, streamsIsLoadingSelector, streamsPageSelector } from '../../../../store/selectors';
import { fetchStreamGame, setStreamsPage } from '../../../../store/actions';

/*********** Components ***********/
import Filters from '../../../utils/filters/Filters';
import StreamElement from '../../../utils/stream-element/StreamElement';
import Loading from '../../../utils/loading/Loading';
import Pagination from '../../../utils/pagination/Pagination';

import Style from './GameStreams.module.scss';

const GameStreams = ({fetchStreamGame, setStreamsPage, gameId, data, isLoading, pageCount}) => {

    const filters = ['first'];

    useEffect(() => {
        fetchStreamGame(gameId).then(
            setStreamsPage(1)
        );
    }, [fetchStreamGame, setStreamsPage, gameId])

    const handlePagination = (query) => {
        fetchStreamGame(gameId, query, data.filter).then(
            setStreamsPage(query.setPage)
        )
    }

    const submit = (newFilters) => {
        fetchStreamGame(gameId, null, newFilters)
    }

    return(
        <>
            { isLoading || data === null || data === undefined || data.streams === undefined ? (
                <Loading />
            ) : (
                <div className={Style.gameStreamsList}>
                    < Filters filters={ filters } 
                              dataFilters={ data.filter }
                              setNewFilters={ submit }/>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                        { data.streams.map((stream, index) => (
                            <StreamElement 
                                key={ index }
                                stream={ stream }/>
                        ))}
                    </div>
                    <Pagination onChangePage={ handlePagination }
                                page={ data.page }
                                length={ data.streams.length }
                                pageCount={ pageCount }
                                totalItem={data.filter.first}/>
                </div>
            )}
        </>
    )
}

export default connect(state => ({
    data: streamsListSelector(state),
    isLoading: streamsIsLoadingSelector(state),
    pageCount: streamsPageSelector(state)
  }), {
    fetchStreamGame,
    setStreamsPage
  })(GameStreams)
