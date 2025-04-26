import { useMemo } from "react";

const History = (props) => {
  const tableBody = useMemo(() => {
    return props.launches
      ?.filter((launch) => !launch.upcoming)
      .map((launch) => (
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
  }, [props.launches]);

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
    </article>
  );
};

export default History;
