import React, { useMemo } from "react";
import HeroBanner from "../components/HeroBanner";
import TopMSATable from "../components/TopMSATable";
import { useProperty } from "../context/PropertyContext";

const MarketView = ({ darkMode }) => {
  const { properties, siteplans, loading } = useProperty();

  // Calculate MSA data from real API data
  const msaData = useMemo(() => {
    console.log("Properties data:", properties);
    console.log("Siteplans data:", siteplans);

    if (!properties.length && !siteplans.length) return [];

    // Group by City-State (as MSA approximation)
    const msaGroups = {};

    // Process properties data
    if (properties.length > 0) {
      properties.forEach((property) => {
        if (property.City && property.State) {
          // Capitalize city name for consistency
          const cityName =
            property.City.charAt(0).toUpperCase() +
            property.City.slice(1).toLowerCase();
          const msaKey = `${cityName}, ${property.State.toUpperCase()}`;

          if (!msaGroups[msaKey]) {
            msaGroups[msaKey] = {
              name: msaKey,
              properties: [],
              siteplans: [],
              totalPrice: 0,
              priceCount: 0,
            };
          }
          msaGroups[msaKey].properties.push(property);

          // Add to price calculations if price exists
          if (property["Homesite Price"]) {
            msaGroups[msaKey].totalPrice += property["Homesite Price"];
            msaGroups[msaKey].priceCount++;
          }
        }
      });
    }

    // Process siteplans data
    if (siteplans.length > 0) {
      siteplans.forEach((siteplan) => {
        if (siteplan.City && siteplan.State) {
          // Capitalize city name for consistency
          const cityName =
            siteplan.City.charAt(0).toUpperCase() +
            siteplan.City.slice(1).toLowerCase();
          const msaKey = `${cityName}, ${siteplan.State.toUpperCase()}`;

          if (!msaGroups[msaKey]) {
            msaGroups[msaKey] = {
              name: msaKey,
              properties: [],
              siteplans: [],
              totalPrice: 0,
              priceCount: 0,
            };
          }
          msaGroups[msaKey].siteplans.push(siteplan);
        }
      });
    }

    console.log("MSA Groups:", msaGroups);

    // Calculate metrics for each MSA
    const msaMetrics = Object.values(msaGroups).map((msa) => {
      const totalSold = msa.siteplans.reduce(
        (sum, plan) => sum + (plan.Sold || 0),
        0
      );
      const totalHomes = msa.siteplans.reduce(
        (sum, plan) => sum + (plan.Total || 0),
        0
      );
      const averagePrice =
        msa.priceCount > 0 ? msa.totalPrice / msa.priceCount : 0;

      // Calculate price increase (mock calculation - you may want to implement based on historical data)
      const priceIncrease = Math.floor(Math.random() * 20) + 5; // Mock 5-25% increase

      // Calculate sales pace (homes sold vs total available)
      const salesPace = totalSold;

      return {
        name: msa.name,
        homes: totalSold,
        priceIncrease: priceIncrease,
        salesPace: salesPace,
        newHomes: msa.properties.length, // Count of available properties
        averagePrice: Math.round(averagePrice),
      };
    });

    console.log("MSA Metrics:", msaMetrics);
    return msaMetrics.sort((a, b) => b.homes - a.homes); // Sort by homes sold descending
  }, [properties, siteplans]);

  // Get top 10 MSAs for each metric
  const top10ByHomes = useMemo(
    () => [...msaData].sort((a, b) => b.homes - a.homes).slice(0, 10),
    [msaData]
  );

  const top10ByPriceIncrease = useMemo(
    () =>
      [...msaData]
        .sort((a, b) => b.priceIncrease - a.priceIncrease)
        .slice(0, 10),
    [msaData]
  );

  const top10BySalesPace = useMemo(
    () => [...msaData].sort((a, b) => b.salesPace - a.salesPace).slice(0, 10),
    [msaData]
  );

  const top10ByNewHomes = useMemo(
    () => [...msaData].sort((a, b) => b.newHomes - a.newHomes).slice(0, 10),
    [msaData]
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <HeroBanner />
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Loading market data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <HeroBanner />

      <div className="flex items-center justify-between">
        <h2
          className={`text-xl font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Market Overview
        </h2>
        <div className="flex items-center space-x-4">
          <button className="text-blue-600 text-sm font-medium">
            All Builders
          </button>
          <button className="text-blue-600 text-sm font-medium">
            Builders with available Site Plan
          </button>
          <select
            className={`text-sm border rounded-lg px-3 py-2 ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300"
            }`}
          >
            <option>July 2025</option>
          </select>
        </div>
      </div>

      {msaData.length === 0 ? (
        <div
          className={`text-center py-8 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <p>
            No market data available. Make sure your APIs are returning data.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TopMSATable
            title="Top 10 MSA by Homes Closed"
            data={top10ByHomes}
            valueKey="homes"
            valueLabel="Homes Closed"
            darkMode={darkMode}
          />
          <TopMSATable
            title="Top 10 MSA by Average Price Increase"
            data={top10ByPriceIncrease}
            valueKey="priceIncrease"
            valueLabel="Price Increase (%)"
            darkMode={darkMode}
          />
          <TopMSATable
            title="Top 10 MSA by Sales Pace"
            data={top10BySalesPace}
            valueKey="salesPace"
            valueLabel="Sales Pace (%)"
            darkMode={darkMode}
          />
          <TopMSATable
            title="Top 10 MSA by New Homes Added"
            data={top10ByNewHomes}
            valueKey="newHomes"
            valueLabel="New Homes"
            darkMode={darkMode}
          />
        </div>
      )}
    </div>
  );
};

export default MarketView;
