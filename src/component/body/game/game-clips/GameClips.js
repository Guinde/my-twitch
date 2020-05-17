import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/*********** Store ***********/
import { fetchGameClips, setClipsPage } from '../../../../store/actions';
import { clipsIsLoadingSelector, clipsListSelector, clipsPageSelector } from '../../../../store/selectors';

/*********** Components ***********/
import ClipElement from '../../../utils/clip-element/ClipElement';
import Filters from '../../../utils/filters/Filters';
import Loading from '../../../utils/loading/Loading';
import Pagination from '../../../utils/pagination/Pagination';

import Style from './GameClips.module.scss';

const GameClips = ({fetchGameClips, setClipsPage, gameId, isLoading, data, gameName, pageCount}) => {

    const filters = ['first'];

    useEffect(() => {
        fetchGameClips(gameId).then(
            setClipsPage(1)
        );
    }, [fetchGameClips,setClipsPage, gameId])

    const handlePagination = (query) => {
        fetchGameClips(gameId, query, data.filter).then(
            setClipsPage(query.setPage)
        )
    }

    const submit = (newFilters) => {
        fetchGameClips(gameId, null, newFilters)
    }

    return(
        <>
            { isLoading || data === undefined || data === null || data.clips === undefined  ? (
                <Loading />
            ) : (
                <div className={Style.gameClipsList}>
                    < Filters filters={ filters } 
                              dataFilters={ data.filter }
                              setNewFilters={ submit }/>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                        { data.clips.map((clip, index) => (
                            <ClipElement 
                                key={ index }
                                clip={ clip }
                                name={gameName}
                                baseUrl={"/game"}/>
                        ))}
                    </div>
                <Pagination onChangePage={ handlePagination }
                            page={ data.page }
                            length={ data.clips.length }
                            pageCount={ pageCount }
                            totalItem={data.filter.first}/>
                </div>
            )}
        </>
    )
}

export default connect(state => ({
    data: clipsListSelector(state),
    isLoading: clipsIsLoadingSelector(state),
    pageCount: clipsPageSelector(state)
  }), {
    fetchGameClips,
    setClipsPage
  })(GameClips)