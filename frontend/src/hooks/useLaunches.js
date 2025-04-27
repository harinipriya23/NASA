import { useCallback, useEffect, useState } from "react";
import { httpGetLaunches, httpAddNewLaunch, httpAbortLaunch } from "./requests";

function useLaunches() {
  const [launches, saveLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches();
    saveLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(
    async (e) => {
      e.preventDefault();
      setPendingLaunch(true);
      const data = new FormData(e.target);
      const launchDate = new Date(data.get("launch-day"));
      const mission = data.get("mission-name");
      const rocket = data.get("rocket-name");
      const target = data.get("planets-selector");
      const response = await httpAddNewLaunch({
        launchDate,
        mission,
        rocket,
        target,
      });

      const success = response.success;
      if (success === true) {
        console.log("Launch submitted successfully");
        getLaunches();
        setTimeout(() => {
          setPendingLaunch(false);
        }, 800);
      } else {
        console.error("Failed to submit launch", response);
        setPendingLaunch(false);
      }
    },
    [getLaunches]
  );

  const abortLaunch = useCallback(
    async (id) => {
      const response = await httpAbortLaunch(id);
      const success = response.ok;
      if (success) {
        getLaunches();
      } else {
        console.error("Failed to abort launch");
      }
    },
    [getLaunches]
  );

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;
