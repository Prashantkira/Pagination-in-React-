import React, { useEffect, useState } from "react";
import "./App.css";

export default function Pagination() {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [itemsPerPage] = useState(4); // Number of items to display per page
  const [loading, setLoading] = useState(false); // State to manage loading

  // Fetch data when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // Fetching data from API
  const getData = async () => {
    setLoading(true);
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

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Page navigation handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>Image Gallery with Pagination</h1>

      {/* Image Grid */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="image-grid">
          {currentItems.map((item, idx) => (
            <div className="image-container" key={idx}>
              <img
                src={item.download_url}
                alt={item.author}
                height={250}
                width={500}
                className="image"
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
