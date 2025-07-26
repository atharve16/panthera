import React, { useMemo } from "react";
import HeroBanner from "../components/HeroBanner";
import StatsCard from "../components/StatsCard";
import { MoreHorizontal } from "lucide-react";
import { useProperty } from "../context/PropertyContext";
import MapView from "../components/map";

const AcquisitionView = ({ darkMode }) => {
  const { properties, siteplans, loading, page, setPage, totalPages } =
    useProperty();

  // Calculate stats from actual data
  const stats = useMemo(() => {
    if (!properties.length) {
      return {
        totalInventory: 0,
        avgPricePerSqFt: 0,
        totalHomesSold: 0,
        salesPace: 0,
        priceIncrease: 0,
        soldInventory: 0,
      };
    }

    // Total inventory from properties
    const totalInventory = properties.length;

    // Calculate average price per sq ft
    const validPricePerSqFt = properties
      .filter((p) => p["Homesite Price"] && p["Homesite Sq"]?.Ft?.[""])
      .map((p) => p["Homesite Price"] / p["Homesite Sq"].Ft[""]);

    const avgPricePerSqFt =
      validPricePerSqFt.length > 0
        ? Math.round(
            validPricePerSqFt.reduce((sum, val) => sum + val, 0) /
              validPricePerSqFt.length
          )
        : 0;

    // Calculate sold inventory and total homes sold from siteplans
    const soldInventory = siteplans.reduce(
      (sum, site) => sum + (site.Sold || 0),
      0
    );
    const totalHomesSold = soldInventory; // This is the actual sold count

    // Calculate sales pace (sold vs total available)
    const totalAvailable = siteplans.reduce(
      (sum, site) => sum + (site.Total || 0),
      0
    );
    const salesPace =
      totalAvailable > 0
        ? Math.round((soldInventory / totalAvailable) * 100)
        : 0;

    // Price increase calculation would need historical data - placeholder for now
    const priceIncrease = 0;

    return {
      totalInventory,
      avgPricePerSqFt,
      totalHomesSold,
      salesPace,
      priceIncrease,
      soldInventory,
    };
  }, [properties, siteplans]);

  // Get unique cities, states, builders for filters
  const filterData = useMemo(() => {
    const cities = [...new Set(properties.map((p) => p.City).filter(Boolean))];
    const states = [...new Set(properties.map((p) => p.State).filter(Boolean))];
    const builders = [...new Set(properties.map((p) => p.MPC).filter(Boolean))];
    const zipcodes = [
      ...new Set(properties.map((p) => p.Zipcode).filter(Boolean)),
    ];

    return { cities, states, builders, zipcodes };
  }, [properties]);

  return (
    <div className="space-y-8">
      <HeroBanner />

      <div className="flex items-center justify-between">
        <h2
          className={`text-xl font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Acquisition Analytics
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
            <option>Jan 2025</option>
          </select>
        </div>
      </div>

      {/* Stats Cards and Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          <StatsCard
            title="Total Inventory"
            value={stats.totalInventory.toLocaleString()}
            darkMode={darkMode}
          />
          <StatsCard
            title="Sold Inventory"
            value={stats.soldInventory.toLocaleString()}
            darkMode={darkMode}
          />
          <StatsCard
            title="Average Price Per Sq Ft"
            value={
              stats.avgPricePerSqFt > 0 ? `$${stats.avgPricePerSqFt}` : "N/A"
            }
            darkMode={darkMode}
          />
          <StatsCard
            title="Total No. of Homes Sold"
            value={stats.totalHomesSold.toLocaleString()}
            darkMode={darkMode}
          />
          <StatsCard
            title="Sales Pace"
            value={`${stats.salesPace}%`}
            trend={stats.salesPace > 50 ? "+Good performance" : "Below average"}
            trendColor={
              stats.salesPace > 50 ? "text-green-500" : "text-red-500"
            }
            darkMode={darkMode}
          />
          <StatsCard
            title="Price Increase"
            value="N/A"
            subtitle="Historical data needed"
            trend="Requires time-series data"
            trendColor="text-gray-500"
            darkMode={darkMode}
          />
        </div>
        <div
          className={`p-6 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-sm`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Geographic Distribution
          </h3>
          <div
            className={`h-80 ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            } rounded-lg flex items-center justify-center`}
          >
            <MapView properties={properties} />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div
        className={`p-6 rounded-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-sm`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Property Filters
          </h3>
          <select
            className={`text-sm border rounded-lg px-3 py-2 ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300"
            }`}
          >
            <option>Jan 2025</option>
          </select>
        </div>

        {/* Filter Headers */}
        <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500 pb-2 border-b border-gray-200 mb-4">
          <span>Zipcodes ({filterData.zipcodes.length})</span>
          <span>States ({filterData.states.length})</span>
          <span>Cities ({filterData.cities.length})</span>
          <span>Builders ({filterData.builders.length})</span>
          <span>Available Lots</span>
        </div>

        {/* Filter Options - showing actual data */}
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-4 text-sm">
            <div className="space-y-1">
              {filterData.zipcodes.slice(0, 3).map((zip, index) => (
                <span
                  key={index}
                  className="block text-blue-600 font-medium cursor-pointer hover:underline"
                >
                  {zip}
                </span>
              ))}
              {filterData.zipcodes.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{filterData.zipcodes.length - 3} more
                </span>
              )}
            </div>
            <div className="space-y-1">
              {filterData.states.slice(0, 3).map((state, index) => (
                <span
                  key={index}
                  className="block text-blue-600 font-medium cursor-pointer hover:underline"
                >
                  {state}
                </span>
              ))}
              {filterData.states.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{filterData.states.length - 3} more
                </span>
              )}
            </div>
            <div className="space-y-1">
              {filterData.cities.slice(0, 3).map((city, index) => (
                <span
                  key={index}
                  className="block text-blue-600 font-medium cursor-pointer hover:underline"
                >
                  {city}
                </span>
              ))}
              {filterData.cities.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{filterData.cities.length - 3} more
                </span>
              )}
            </div>
            <div className="space-y-1">
              {filterData.builders.slice(0, 3).map((builder, index) => (
                <span
                  key={index}
                  className="block text-blue-600 font-medium cursor-pointer hover:underline"
                >
                  {builder}
                </span>
              ))}
              {filterData.builders.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{filterData.builders.length - 3} more
                </span>
              )}
            </div>
            <div>
              <span className="text-gray-700 dark:text-gray-300">
                {stats.totalInventory} lots
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Table */}
      <div
        className={`p-6 rounded-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-sm`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Property Details
          </h3>
          <MoreHorizontal
            className={`w-5 h-5 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p
              className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Loading properties...
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`border-b ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <th
                      className={`text-left py-3 px-4 font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Builder (MPC)
                    </th>
                    <th
                      className={`text-left py-3 px-4 font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Homesite Price
                    </th>
                    <th
                      className={`text-left py-3 px-4 font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Community
                    </th>
                    <th
                      className={`text-left py-3 px-4 font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Location
                    </th>
                    <th
                      className={`text-left py-3 px-4 font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Sq Ft
                    </th>
                    <th
                      className={`text-left py-3 px-4 font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Price / Sq Ft
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <td
                        className={`py-3 px-4 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {property.MPC || "N/A"}
                      </td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          darkMode ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        {property["Homesite Price"]
                          ? `$${property["Homesite Price"].toLocaleString()}`
                          : "N/A"}
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {property.Community || "N/A"}
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {property.City && property.State
                          ? `${property.City}, ${property.State} ${
                              property.Zipcode || ""
                            }`
                          : "N/A"}
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {property["Homesite Sq"]?.Ft?.[""]
                          ? `${property["Homesite Sq"].Ft[
                              ""
                            ].toLocaleString()} sq ft`
                          : "N/A"}
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {property["Homesite Price"] &&
                        property["Homesite Sq"]?.Ft?.[""]
                          ? `$${Math.round(
                              property["Homesite Price"] /
                                property["Homesite Sq"].Ft[""]
                            )}`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={`px-3 py-1 rounded border text-sm font-medium ${
                    page === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  } ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 border-gray-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  Previous
                </button>

                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={i}
                      onClick={() => setPage(pageNum)}
                      className={`px-3 py-1 rounded border text-sm font-medium ${
                        page === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : darkMode
                          ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && (
                  <>
                    <span className="px-2 py-1 text-gray-500">...</span>
                    <button
                      onClick={() => setPage(totalPages)}
                      className={`px-3 py-1 rounded border text-sm font-medium ${
                        page === totalPages
                          ? "bg-blue-600 text-white border-blue-600"
                          : darkMode
                          ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className={`px-3 py-1 rounded border text-sm font-medium ${
                    page === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  } ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 border-gray-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AcquisitionView;
