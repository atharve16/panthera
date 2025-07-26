// context/PropertyContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [siteplans, setSiteplans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const BASE_URL = "http://localhost:8080/api";

  const fetchProperties = async (currentPage) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/properties?page=${currentPage}&limit=${pageSize}`
      );
      const { properties, totalPages } = res.data;

      setProperties(properties || []);
      setTotalPages(totalPages || 1);
    } catch (err) {
      console.error("Error fetching paginated properties:", err);
      setProperties([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteplans = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/siteplans`);
      setSiteplans(res.data || []);
    } catch (err) {
      console.error("Error fetching siteplans:", err);
      setSiteplans([]);
    }
  };

  useEffect(() => {
    fetchProperties(page);
  }, [page]);

  useEffect(() => {
    fetchSiteplans();
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        siteplans,
        loading,
        page,
        setPage,
        totalPages,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => useContext(PropertyContext);
