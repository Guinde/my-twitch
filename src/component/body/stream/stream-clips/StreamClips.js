import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

/*********** Store ***********/
import { fetchUserClips, setClipsPage } from '../../../../store/actions';
import { clipsListSelector, clipsIsLoadingSelector, clipsPageSelector} from '../../../../store/selectors';

/*********** Components ***********/
import Filters from '../../../utils/filters/Filters';
import ClipElement from '../../../utils/clip-element/ClipElement';
import Loading from '../../../utils/loading/Loading';
import Pagination from '../../../utils/pagination/Pagination';

import Style from './StreamClips.module.scss';

const StreamClips = ({fetchUserClips, setClipsPage, data, isLoading, pageCount}) => {

    const {login} = useParams();

    const filters = ['first'];
    
    useEffect(() => {
        fetchUserClips(login).then(
            setClipsPage(1)
        );
    }, [fetchUserClips, setClipsPage, login]);

    const handlePagination = (query) => {
        fetchUserClips(login, query, data.filter).then(
            setClipsPage(query.setPage)
        )
    }

    const submit = (newFilters) => {
        fetchUserClips(login, null, newFilters)
    }
    
    return(
        <>
            { isLoading || data == null || data.user === undefined ? (
                <Loading />
            ) : (
                <div className={Style.clipsList}>
                    <h3 className="pl-2 mb-5"> Les Clips { data.clips.length } de { data.user.name } </h3>
                    < Filters filters={ filters } 
                              dataFilters={ data.filter }
                              setNewFilters={ submit }/>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                        { data.clips.map((clip, i) => (
                            <ClipElement key={i} clip={ clip } name={ login } baseUrl={"/stream"}/>
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
    fetchUserClips,
    setClipsPage
})(StreamClips)
