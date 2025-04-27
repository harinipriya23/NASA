import { useMemo, useState } from "react";

const History = (props) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first item on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Memoized table body with pagination logic
  const tableBody = useMemo(() => {
    const filteredLaunches =
      props.launches?.filter((launch) => !launch.upcoming) || [];
    const launchesToDisplay = filteredLaunches.slice(startIndex, endIndex);

    return launchesToDisplay.map((launch) => (
      <tr
        key={String(launch.flightNumber)}
        className="border-t border-gray-700 text-sm h-14 text-white"
      >
        <td className="text-center">
          <span style={{ color: launch.success ? "greenyellow" : "red" }}>
            {launch.success ? "✓" : "✗"}
          </span>
        </td>
        <td className="text-center">{launch.flightNumber}</td>
        <td className="text-center">
          {new Date(launch.launchDate).toDateString()}
        </td>
        <td className="text-center">{launch.mission}</td>
        <td className="text-center">{launch.rocket}</td>
        <td className="text-center">{launch.customers?.join(", ")}</td>
      </tr>
    ));
  }, [props.launches, currentPage]);

  // Calculate total number of pages
  const totalPages = Math.ceil(
    (props.launches?.filter((launch) => !launch.upcoming).length || 0) /
      itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <article id="history" className="text-white p-4">
      <p className="mb-4 uppercase text-lg font-bold text-cyan-300">
        History of mission launches
      </p>
      <div className="overflow-x-auto">
        <table className="w-full rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white text-sm uppercase">
            <tr>
              <th className="w-8 py-2"></th>
              <th className="w-12 py-2">No.</th>
              <th className="w-36 py-2">Date</th>
              <th className="py-2">Mission</th>
              <th className="w-28 py-2">Rocket</th>
              <th className="py-2">Customers</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-l-md"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-800 text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-r-md"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </article>
  );
};

export default History;
