import React, { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox/SearchBox";
import "./App.scss";
import { getLocations } from "./services/location-service";
import { LocationResult } from "./interfaces/location";

const App = () => {
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocationsList = () => {
    setLoading(true);
    getLocations(6, search)
      .then((response) => {
        setLocations(response.data?.results?.docs);
      })
      .catch((error: ErrorEvent) => {
        throw Error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (search.length > 1) {
      const timer = setTimeout(() => {
        getLocationsList();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setLocations([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="search-container">
      <h3>Let’s find your ideal car</h3>
      <SearchBox
        placeholder={"Pick-up Location"}
        ariaLabel={"Pick-up Location"}
        items={locations}
        value={search}
        onChange={setSearch}
        loading={loading}
      />
    </div>
  );
};
export default App;
