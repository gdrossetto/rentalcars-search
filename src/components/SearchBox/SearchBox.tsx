import React, { useEffect, useRef, useState } from "react";
import { LocationResult } from "../../interfaces/location";
import "./SearchBox.styles.scss";

type Props = {
  value?: string;
  onChange?: any;
  items?: Array<LocationResult>;
  placeholder?: string;
  ariaLabel?: string;
  loading?: boolean;
};

const SearchBox: React.FC<Props> = ({
  placeholder = "",
  ariaLabel = "",
  value = "",
  onChange,
  items = [],
  loading = false,
}) => {
  const [focused, setFocused] = useState(true);

  const searchBoxRef = useRef(null);

  const CarIcon = (
    <svg
      className="searchbox-icon"
      viewBox="0 0 24 24"
      role="presentation"
      aria-hidden="true"
    >
      <path d="M21.684 9.443l-1.7-3.79c-.42-1.128-1.542-1.905-2.794-1.903H6.809a2.999 2.999 0 0 0-2.811 1.947L2.316 9.443a.75.75 0 1 0 1.368.614l1.7-3.79c.238-.63.798-1.018 1.424-1.017h10.383a1.5 1.5 0 0 1 1.407.973l1.718 3.834a.75.75 0 1 0 1.368-.614zM.75 16.468V18a2.25 2.25 0 0 0 4.5 0v-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 1-1.5 0v-1.532a.75.75 0 0 0-1.5 0zm21 0V18a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 0-1.5 0V18a2.25 2.25 0 0 0 4.5 0v-1.532a.75.75 0 0 0-1.5 0zM19.875 13.5a.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5zm.375-.375a.375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 0 1.5 0zm-.375-.375c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5zm-.375.375c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0zM4.125 12C3.504 12 3 12.504 3 13.125a.75.75 0 0 0 1.5 0 .375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5zm1.125 1.125c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0zM4.125 14.25c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5zM3 13.125c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0zM2.75 10.5h18.5c.69 0 1.25.56 1.25 1.25v3.75a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25v-3.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 11.75v3.75c0 .966.784 1.75 1.75 1.75h20.5A1.75 1.75 0 0 0 24 15.5v-3.75A2.75 2.75 0 0 0 21.25 9H2.75z"></path>
    </svg>
  );

  const formatLocationSubtitle = (location: LocationResult) => {
    const city = location.city ? location.city + ", " : "";
    const region = location.region ? location.region + ", " : "";
    const country = location.country ? location.country : "";

    return city + region + country;
  };

  const toggleFocused = (event: any) => {
    if (event.target !== searchBoxRef.current) {
      setFocused(false);
    } else {
      setFocused(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", toggleFocused, true);
    return () => {
      document.removeEventListener("click", toggleFocused, true);
    };
  }, []);

  return (
    <div className="searchbox" data-testid="searchbox" role="search">
      {CarIcon}
      <input
        data-testid="searchbox-input"
        type="text"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={searchBoxRef}
      />

      {loading ? (
        <div className="searchbox-spinner" data-testid="spinner"></div>
      ) : null}

      {items?.length > 0 && value?.length > 1 && focused ? (
        <ul className="searchbox-results" data-testid="result-list">
          {items?.map((item) => {
            return (
              <li key={item.index}>
                <div className="searchbox-option" role="button">
                  {item.placeType ? (
                    <div
                      className="searchbox-option-badge"
                      data-testid={`result-${item.index}-badge`}
                    >
                      Type {item.placeType}
                    </div>
                  ) : null}
                  <div>
                    <p
                      className="searchbox-option-title"
                      data-testid={`result-${item.index}-title`}
                    >
                      {item.name} {item.iata ? `(${item.iata})` : ""}
                    </p>
                    <small
                      className="searchbox-option-subtitle"
                      data-testid={`result-${item.index}-subtitle`}
                    >
                      {formatLocationSubtitle(item)}
                    </small>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
export default SearchBox;
