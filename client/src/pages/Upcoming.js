import { useMemo } from "react";
import { MdDeleteOutline } from "react-icons/md";

const Upcoming = ({ launches, abortLaunch }) => {
  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => launch.upcoming)
      .map((launch) => {
        return (
          <tr key={String(launch.flightNumber)}>
            <td className="px-4 py-2 text-red-500">
              <div>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => abortLaunch(launch.flightNumber)}
                >
                  <span className="text-red-500 hover:text-red-600">
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
        );
      });
  }, [launches, abortLaunch]);

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
    </article>
  );
};

export default Upcoming;
