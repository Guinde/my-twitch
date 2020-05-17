import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

/*********** Store ***********/
import { 
    fetchUserVideos, 
    setVideosPage } from '../../../../store/actions';
import { 
    VideosListSelector, 
    videosIsLoadingSelector, 
    VideosPageSelector } from '../../../../store/selectors';

/*********** Components ***********/
import VideoElement from '../../../utils/video-element/VideoElement';
import Filters from '../../../utils/filters/Filters';
import Loading from '../../../utils/loading/Loading';
import Pagination from '../../../utils/pagination/Pagination';

import Style from './StreamVideos.module.scss';

const StreamVideos = ({
    fetchUserVideos, 
    setVideosPage, 
    data, 
    isLoading,
    pageCount}) => {

    const {login} = useParams();

    const filters = ['period', 'sort', 'type', 'first'];

    useEffect(() => {
        fetchUserVideos(login).then(
            setVideosPage(1)
        );
    }, [fetchUserVideos, 
        setVideosPage,
        login]);

    const handlePagination = (query) => {
        fetchUserVideos(login, query, data.filter).then(
            setVideosPage(query.setPage)
        )
    }

    const submit = (newFilters) => {
        fetchUserVideos(login, null, {...newFilters}).then(
            setVideosPage(1)
        )
    }
     
    return(
        <>
            { isLoading || 
              data === null || 
              data === undefined || 
              data.videos === undefined ||
              data.user === undefined ? (
                <Loading />
            ) : (
                <div className={Style.videosList}>
                    <h3 className="pl-2 mb-3"> Les Videos { data.videos.length } de { data.user.name } </h3>
                    <Filters filters={ filters } 
                             dataFilters={ data.filter }
                             setNewFilters={ submit }/>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                        { data.videos.map((video, i) => (
                            <VideoElement key={i} video={ video } />
                        ))}
                    </div>
                    <Pagination onChangePage={ handlePagination }
                                page={ data.page }
                                length={ data.videos.length }
                                pageCount={ pageCount }
                                totalItem={data.filter.first} />
                </div>
            )}
        </>
    )
}

export default connect(state => ({
    data: VideosListSelector(state),
    isLoading: videosIsLoadingSelector(state),
    pageCount: VideosPageSelector(state)
}), {
    fetchUserVideos,
    setVideosPage
})(StreamVideos)