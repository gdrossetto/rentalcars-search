import React from "react";
import { render, screen } from "@testing-library/react";
import SearchBox from "./SearchBox";

describe("SearchBox component", () => {
  const searchboxProps = {
    placeholder: "Pick-up Location",
    ariaLabel: "Pick-up Location",
  };

  const locations = [
    {
      country: "Brazil",
      lng: -49.0531,
      city: "Bauru",
      searchType: "L",
      alternative: ["BR,Bauru"],
      index: 1,
      bookingId: "airport-3111",
      placeType: "A",
      placeKey: "1471791",
      iata: "BAU",
      countryIso: "br",
      locationId: "3111",
      name: "Bauru Airport",
      ufi: 900041568,
      isPopular: false,
      region: "Sao Paulo State",
      lang: "en",
      lat: -22.3453,
    },
    {
      country: "Brazil",
      lng: -56.3,
      searchType: "G",
      alternative: ["BR"],
      index: 2,
      bookingId: "city-306409",
      placeType: "C",
      placeKey: "117648",
      countryIso: "br",
      locationId: "-1",
      name: "Baú",
      ufi: -628801,
      isPopular: false,
      region: "Mato Grosso",
      lang: "en",
      lat: -15.2333,
    },
  ];

  it("renders SearchBox correctly with placeholder and aria-label props", () => {
    render(
      <SearchBox
        placeholder={searchboxProps.placeholder}
        ariaLabel={searchboxProps.ariaLabel}
        value="Test"
      />
    );
    const searchBox = screen.getByTestId("searchbox");
    const searchBoxInput = screen.getByTestId("searchbox-input");
    expect(searchBox).toBeInTheDocument();
    expect(searchBoxInput).toHaveAttribute(
      "placeholder",
      searchboxProps.placeholder
    );
    expect(searchBoxInput).toHaveAttribute(
      "aria-label",
      searchboxProps.ariaLabel
    );
  });

  it("should render a list of results with the same length as the items array prop", () => {
    render(<SearchBox items={locations} value="Test" />);

    const resultList = screen.getByTestId("result-list");

    expect(resultList.childElementCount).toBe(locations.length);
  });

  it("should not render result-list if the locations array is empty", () => {
    render(<SearchBox items={[]} value="Test" />);

    const resultList = screen.queryByTestId("result-list");

    expect(resultList).not.toBeInTheDocument();
  });

  it("should render a list of results with the correct item name as defined in the items array, with shortcut if it's an airport", () => {
    render(<SearchBox items={locations} value="Test" />);

    const resultTitle = screen.getByTestId(`result-${1}-title`);

    expect(resultTitle.innerHTML).toEqual(
      `${locations[0].name} (${locations[0].iata})`
    );
  });

  it("should render a list of results with the correct item subtitle, with concat of city, region and country whenever each of them is available", () => {
    render(<SearchBox items={locations} value="Test" />);

    const resultSubTitle = screen.getByTestId(`result-${1}-subtitle`);

    expect(resultSubTitle.innerHTML).toEqual(
      `${locations[0].city}, ${locations[0].region}, ${locations[0].country}`
    );
  });

  it("should render the spinner if loading prop is true", () => {
    render(<SearchBox items={locations} loading={true} />);

    const spinner = screen.getByTestId(`spinner`);

    expect(spinner).toBeInTheDocument();
  });

  it("should not render the spinner if loading prop is true", () => {
    render(<SearchBox items={locations} loading={false} />);

    const spinner = screen.queryByTestId(`spinner`);

    expect(spinner).not.toBeInTheDocument();
  });

  it("should render a badge with the correct location type when type is defined", () => {
    render(<SearchBox items={locations} loading={true} value="Test" />);

    const resultBadge = screen.getByTestId(`result-${1}-badge`);

    expect(resultBadge).toBeInTheDocument();
    expect(resultBadge.innerHTML).toEqual(`Type ${locations[0].placeType}`);
  });

  it("should render result list when the search query has lenght >= 2 and locations has lenght > 0", () => {
    render(<SearchBox items={locations} value="Test" />);
    const resultList = screen.queryByTestId("result-list");

    expect(resultList).toBeInTheDocument();
  });

  it("should not render result list when the search query has lenght < 2", () => {
    render(<SearchBox items={locations} value="T" />);
    const resultList = screen.queryByTestId("result-list");

    expect(resultList).not.toBeInTheDocument();
  });
});
