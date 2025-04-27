import { useMemo } from "react";

const Launch = ({ planets, submitLaunch, isPendingLaunch }) => {
  const selectorBody = useMemo(() => {
    if (!planets || planets.length === 0) {
      return <option>No planets available</option>;
    }
    return planets?.map((planet) => (
      <option
        value={planet.keplerName}
        key={planet.keplerName}
        className="text-white"
      >
        {planet.keplerName}
      </option>
    ));
  }, [planets]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <article id="launch" className="p-6">
      <p className="mb-4 uppercase text-center font-bold text-lg text-cyan-300">
        Schedule a mission launch
      </p>
      <p className="mb-4 ">
        Get ready to explore some of the most promising worlds beyond our solar
        system!
      </p>
      <form
        onSubmit={submitLaunch}
        className="grid grid-cols-1 font-semibold md:grid-cols-2 border-t-[1px] py-4 border-cyan-300 gap-x-4 gap-y-2"
      >
        <label htmlFor="launch-day" className="">
          Launch Date
        </label>
        <input
          type="date"
          id="launch-day"
          name="launch-day"
          min={today}
          max="2040-12-31"
          defaultValue={today}
          className="p-2 rounded text-white bg-slate-800"
        />
        <label htmlFor="mission-name" className="">
          Mission Name
        </label>
        <input
          type="text"
          id="mission-name"
          name="mission-name"
          className="p-2 rounded text-white bg-slate-800"
        />
        <label htmlFor="rocket-name" className="">
          Rocket Type
        </label>
        <input
          type="text"
          id="rocket-name"
          name="rocket-name"
          defaultValue="Explorer IS1"
          className="p-2 rounded text-white bg-slate-800"
        />
        <label htmlFor="planets-selector" className="">
          Destination Exoplanet
        </label>
        <select
          id="planets-selector"
          name="planets-selector"
          className="p-2 rounded text-white bg-slate-800"
        >
          {selectorBody}
        </select>
        <div>
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={isPendingLaunch}
          >
            Launch Mission
          </button>
        </div>
        {isPendingLaunch && (
          <div className="mt-4 text-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-cyan-500"></div>
          </div>
        )}
      </form>
    </article>
  );
};

export default Launch;
