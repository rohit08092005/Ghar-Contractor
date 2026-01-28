"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Mock data to simulate Supabase records
const MOCK_DATA = [
  {
    id: 1,
    service_type: "New Construction",
    client_name: "Rajesh Kumar",
    message: "Need 2BHK house construction on 1200 sq ft plot",
    status: "Ongoing",
    created_at: "2024-01-20T10:30:00"
  },
  {
    id: 2,
    service_type: "Renovation",
    client_name: "Priya Sharma",
    message: "Kitchen and bathroom renovation required",
    status: "New",
    created_at: "2024-01-21T14:20:00"
  },
  {
    id: 3,
    service_type: "Repair",
    client_name: "Amit Patel",
    message: "Roof leakage repair needed urgently",
    status: "Contacted",
    created_at: "2024-01-22T09:15:00"
  },
  {
    id: 4,
    service_type: "New Construction",
    client_name: "Sunita Desai",
    message: "Want to build 3BHK duplex house",
    status: "Completed",
    created_at: "2024-01-18T11:45:00"
  },
  {
    id: 5,
    service_type: "Renovation",
    client_name: "Vikram Singh",
    message: "Complete house interior renovation",
    status: "Cancelled",
    created_at: "2024-01-19T16:00:00"
  },
  {
    id: 6,
    service_type: "Repair",
    client_name: "Meera Joshi",
    message: "Wall cracks and painting work",
    status: "Ongoing",
    created_at: "2024-01-23T08:30:00"
  },
  {
    id: 7,
    service_type: "New Construction",
    client_name: "Arjun Reddy",
    message: "Commercial building construction - 5000 sq ft",
    status: "New",
    created_at: "2024-01-24T13:20:00"
  },
  {
    id: 8,
    service_type: "Renovation",
    client_name: "Kavita Mehta",
    message: "Balcony extension and flooring work",
    status: "Contacted",
    created_at: "2024-01-25T10:00:00"
  }
];

export default function ServiceDashboard() {
  const [requests, setRequests] = useState(MOCK_DATA);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  // ✅ ALL statuses (must match Supabase exactly)
  const statusOptions = [
    "New",
    "Ongoing",
    "Contacted",
    "Completed",
    "Cancelled",
  ];

  const filterButtons = [
    "New",
    "Ongoing",
    "Contacted",
    "Completed",
    "All"
  ];

  // ---------------- Filter Requests ----------------
  const filteredRequests = statusFilter === "All" 
    ? requests 
    : requests.filter(r => r.status === statusFilter);

  // ---------------- Update Status ----------------
  const updateStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: newStatus } : r
      )
    );
  };

  // ---------------- Status Colors ----------------
  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-orange-100 text-orange-700";
      case "New":
        return "bg-yellow-100 text-yellow-700";
      case "Contacted":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          📋 Service Requests
        </h1>

        {/* Filters */}
        <div className="flex gap-3 mb-6 mt-6 flex-wrap">
          {filterButtons.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              className={
                statusFilter === status
                  ? "bg-orange-600 hover:bg-orange-700 text-white"
                  : "border-orange-600 text-orange-600 hover:bg-orange-50"
              }
              onClick={() => setStatusFilter(status)}
            >
              {status} ({status === "All" ? requests.length : requests.filter(r => r.status === status).length})
            </Button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-gray-600">Loading requests...</p>
        ) : filteredRequests.length === 0 ? (
          <p className="text-gray-600">No service requests found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-600">
                    Service Type
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600">
                    Client Name
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {r.service_type}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {r.client_name}
                    </td>
                    <td className="px-6 py-4 text-gray-700 max-w-xs break-words">
                      {r.message || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 flex-wrap">
                        {statusOptions.map((status) => (
                          <button
                            key={status}
                            onClick={() =>
                              updateStatus(r.id, status)
                            }
                            className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                              r.status === status
                                ? getStatusColor(status)
                                : "bg-gray-100 text-gray-400 hover:text-gray-700"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}