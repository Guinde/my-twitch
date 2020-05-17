import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/*********** Store ***********/
import { fetchTopStreams, setStreamsPage  } from '../../../store/actions';
import { streamsListSelector, streamsIsLoadingSelector, streamsPageSelector } from '../../../store/selectors';

/*********** Components ***********/
import StreamElement from '../../utils/stream-element/StreamElement';
import Filters from '../../utils/filters/Filters';
import Loading from '../../utils/loading/Loading';
import Pagination from '../../utils/pagination/Pagination';

import Style from './StreamsList.module.scss';

const StreamsList = ({fetchTopStreams, setStreamsPage, data, isLoading, pageCount}) => {

  const filters = ['first'];

  useEffect(() => {
    fetchTopStreams().then(
      setStreamsPage(1)
    );
  }, [fetchTopStreams, setStreamsPage])

  const handlePagination = (query) => {
    fetchTopStreams(query, data.filter).then(
      setStreamsPage(query.setPage)
    )
}

  const submit = (newFilters) => {
    fetchTopStreams(null, newFilters);
}

  return(
    <>
      { isLoading || data == null || data.streams === undefined || data.filter === undefined ? (
        <Loading />
      ) : (
        <div className={Style.streamList}>
          <h2 className="gameTitle text-center">Top Streams</h2>
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
                      totalItem={data.filter.first - 1}/>
        </div>
      )}
    </>
  );
}

export default connect(state => ({
  data: streamsListSelector(state),
  isLoading: streamsIsLoadingSelector(state),
  pageCount: streamsPageSelector(state)
}), {
  fetchTopStreams,
  setStreamsPage 
})(StreamsList)