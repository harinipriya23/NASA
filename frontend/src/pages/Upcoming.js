import { useMemo, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const Upcoming = ({ launches, abortLaunch }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first item on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Memoized table body with pagination logic
  const tableBody = useMemo(() => {
    const filteredLaunches =
      launches?.filter((launch) => launch.upcoming) || [];
    const launchesToDisplay = filteredLaunches.slice(startIndex, endIndex);

    if (launchesToDisplay.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center py-4 text-yellow-300">
            No upcoming launches.
          </td>
        </tr>
      );
    }

    return launchesToDisplay.map((launch) => (
      <tr key={String(launch.flightNumber)}>
        <td className="px-4 py-2">
          <div>
            <button onClick={() => abortLaunch(launch.flightNumber)}>
              <span>
                <MdDeleteOutline size={25} />
              </span>
            </button>
          </div>
        </td>
        <td className="px-4 py-2">{launch.flightNumber}</td>
        <td className="px-4 py-2">
          {new Date(launch.launchDate).toDateString()}
        </td>
        <td className="px-4 py-2">{launch.mission}</td>
        <td className="px-4 py-2">{launch.rocket}</td>
        <td className="px-4 py-2">{launch.target}</td>
      </tr>
    ));
  }, [launches, abortLaunch, currentPage]);

  // Calculate total number of pages
  const totalPages = Math.ceil(
    (launches?.filter((launch) => launch.upcoming).length || 0) / itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Hide pagination if no upcoming launches
  if (launches?.filter((launch) => launch.upcoming).length === 0) {
    return (
      <article id="upcoming" className="p-6 text-white">
        <p className="mb-4 uppercase text-lg font-bold text-cyan-300">
          Upcoming missions
        </p>
        <p className="mb-4 flex text-yellow-300">
          Warning! Clicking on the{" "}
          <span>
            <MdDeleteOutline size={25} />
          </span>{" "}
          aborts the mission.
        </p>
        <table className="min-w-full table-auto text-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">No.</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Mission</th>
              <th className="px-4 py-2 text-left">Rocket</th>
              <th className="px-4 py-2 text-left">Target</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="text-center py-4 text-yellow-300">
                No upcoming launches.
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    );
  }

  return (
    <article id="upcoming" className="p-6 text-white">
      <p className="mb-4 uppercase text-lg font-bold text-cyan-300">
        Upcoming missions
      </p>
      <p className="mb-4 flex text-yellow-300">
        Warning! Clicking on the{" "}
        <span>
          <MdDeleteOutline size={25} />
        </span>{" "}
        aborts the mission.
      </p>
      <table className="min-w-full table-auto text-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Action</th>
            <th className="px-4 py-2 text-left">No.</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Mission</th>
            <th className="px-4 py-2 text-left">Rocket</th>
            <th className="px-4 py-2 text-left">Target</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>

      {/* Pagination Controls */}
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

export default Upcoming;
