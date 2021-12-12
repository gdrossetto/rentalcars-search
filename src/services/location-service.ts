import axios from "axios";

export const getLocations = (rows: number, search: string) => {
  const response = axios.get(
    `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${rows}&solrTerm=${search}`
  );

  return response;
};
