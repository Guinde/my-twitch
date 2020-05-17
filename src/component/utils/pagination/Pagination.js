import React from "react";
import Style from "./Pagination.module.scss";

const Pagination = ({onChangePage, page, length, pageCount, totalItem = 20}) => {

    const handleChangePage = (e, query) => {
        if((query === "after" && length < totalItem) || (query === "before" && pageCount === 1))
            e.stopPropagation();
        else {
            let newPage = query === "after" ? pageCount + 1 : pageCount - 1
            const queryParam = {
                query,               
                pagination: page,
                setPage: newPage
        }
        onChangePage(queryParam);
        return;
        }
    }

    return(
        <div className={Style.paginationContainer}>
            <span className={`${Style.tab}  ${pageCount === 1 ? Style.hasNoPage : Style.hasOtherPage}`} onClick={(e) => handleChangePage(e, "before")}> Precedent </span>
            <span className={Style.tab}> { pageCount } </span>
            <span className={`${Style.tab}  ${length < totalItem ? Style.hasNoPage : Style.hasOtherPage}`} onClick={(e) => handleChangePage(e, "after")}> Suivant </span>
        </div>
    )
}

export default Pagination;