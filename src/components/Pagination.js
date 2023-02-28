import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Assets/Styles/pagination.css";

const Pagination = ({pages,setEachPage}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  useEffect(()=>{
    setEachPage(currentPage)
  },[currentPage,setEachPage])

  return (
  <div className="container">
      <div className="row g-0 align-items-center pb-4">
        <div className="col-sm-12">
            <div className="ulContainer">
                <ul className="pagination mb-sm-0">

                    <li className={`${currentPage === 1 ? "page-item disabled" : "page-item"}`}>
                        <Link onClick={()=>setCurrentPage((prev)=>prev === 1 ? prev : prev - 1)}
                            to={""} className="page-link" aria-label="Previous"> <span aria-hidden="true">&laquo;</span></Link>
                    </li>
                    
                    {
                        numOfPages.map((page,index)=>{
                            return(
                                <li onClick={()=>setCurrentPage(page)}
                                    key={index} className={`${currentPage === page ? "page-item active" : "page-item"}`} ><Link to={""} className="page-link">{page}</Link></li>
                            )   
                        })
                    }
                    
                    <li className={`${currentPage === numOfPages.length ? "page-item disabled" : "page-item"}`}>
                        <Link onClick={()=>setCurrentPage((next)=>next === numOfPages.length ? next : next + 1)}
                            to={""} className="page-link" aria-label="Next"><span aria-hidden="true">&raquo;</span></Link>
                    </li>

                </ul>
            </div>
        </div>
    </div>
  </div>
 
  );
};

export default Pagination;
