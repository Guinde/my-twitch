import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/*********** Store ***********/
import { VideosListSelector, videosIsLoadingSelector, VideosPageSelector } from '../../../../store/selectors';
import { fetchGameVideos, setVideosPage } from '../../../../store/actions';

/*********** Components ***********/
import VideoElement from '../../../utils/video-element/VideoElement';
import Filters from '../../../utils/filters/Filters';
import Pagination from '../../../utils/pagination/Pagination'
import Loading from '../../../utils/loading/Loading';
import NoResult from '../../../utils/no-result/NoResult';

import Style from './GameVideos.module.scss';

const GameVideos = ({
    fetchGameVideos, 
    gameId, 
    data, 
    isLoading, 
    setVideosPage, 
    pageCount}) => {

    const filters = ['period', 'sort', 'type', 'first'];

    useEffect(() => {
        fetchGameVideos(gameId).then(
            setVideosPage(1)
        )
    }, [fetchGameVideos, setVideosPage, gameId])

    const handlePagination = (query) => {
        fetchGameVideos(gameId, query, data.filter).then(
            setVideosPage(query.setPage)
        )
    }

    const submit = (newFilters) => {
        fetchGameVideos(gameId, null, {...newFilters}).then(
            setVideosPage(1)
        )
    }

    return(
        <>
            { isLoading || data === null || data === undefined || data.videos === undefined ? (
                <Loading />
            ) : (
                <>
                    <Filters filters={ filters } 
                             dataFilters={ data.filter }
                             setNewFilters={ submit }/>
                    <>
                        { data.videos.length < 1 ? (
                            <NoResult />
                        ) : (
                            <div className={Style.gameVideosList}>
                                <div className="d-flex flex-row flex-wrap justify-content-center">
                                    { data.videos.map((video, i) => (
                                        <VideoElement key={i} video={ video } />
                                    ))}
                                </div>
                                <Pagination onChangePage={ handlePagination }
                                            page={ data.page }
                                            length={ data.videos.length }
                                            pageCount={ pageCount }
                                            totalItem={data.filter.first}/>
                            </div>
                        )}            
                    </>
                </>
            )}
        </>
    )
}

export default connect(state => ({
    data: VideosListSelector(state),
    isLoading: videosIsLoadingSelector(state),
    pageCount: VideosPageSelector(state)
  }), {
    fetchGameVideos,
    setVideosPage
  })(GameVideos)
