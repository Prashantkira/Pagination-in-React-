import React, { useEffect, useState } from "react";
import "./App.css";

export default function Apps() {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [currentPage, setCurrentPage] = useState(1); //Current active page
  const [itemsPerPage] = useState(4); //Number of items to display per page

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //Get only the items for the current page
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  //Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle click event for next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle click event for previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Handle click event for specific page number
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    getData(); //call getData when the component mounts
  }, []);

  const [loading, setLoading] = useState(false); // State to manage loading

  const getData = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const res = await fetch("https://picsum.photos/v2/list"); // Example API
      const response = await res.json();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <>
      {/* <button onClick={getData}>Get Data</button>
      {loading ? (
        <p>Loading......</p>
      ) : (
        <div className="container">
          {data.map((item, idx) => (
            <div className="image-container" key={idx}>
              <img src={item.download_url} height={250} width={500} alt="" />
            </div>
          ))}
        </div>
      )} */}

      <div>
        <ul>
          {loading ? (
            <p>Loading......</p>
          ) : (
            <div className="container">
              {currentItems.map((item, idx) => (
                <div className="image-container" key={idx}>
                  <img
                    src={item.download_url}
                    height={250}
                    width={500}
                    alt=""
                  />
                </div>
              ))}
            </div>
          )}
        </ul>

        {/* Pagination Controls */}
        <div className="pagination">
          {/* Pagination Page Button */}
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>

          {/* Page Number */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          {/* Next page Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
