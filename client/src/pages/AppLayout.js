import { Route, Routes } from "react-router-dom";

import usePlanets from "../hooks/usePlanets";
import useLaunches from "../hooks/useLaunches";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Launch from "./Launch";
import History from "./History";
import Upcoming from "./Upcoming";

const AppLayout = () => {
  const { launches, isPendingLaunch, submitLaunch, abortLaunch } =
    useLaunches();

  const planets = usePlanets();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-1 py-5 px-5 sm:px-10">
        <div className="flex justify-center transition-opacity duration-500 ease-in-out">
          <div className="p-2 rounded-md border w-full md:w-4/5 lg:w-3/4 xl:w-1/2 border-gray-700 shadow-md bg-gray-900">
            <Routes>
              <Route
                path="/"
                element={
                  <Launch
                    planets={planets}
                    submitLaunch={submitLaunch}
                    isPendingLaunch={isPendingLaunch}
                  />
                }
              />
              <Route
                path="/upcoming"
                element={
                  <Upcoming launches={launches} abortLaunch={abortLaunch} />
                }
              />
              <Route
                path="/history"
                element={<History launches={launches} />}
              />
            </Routes>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AppLayout;
