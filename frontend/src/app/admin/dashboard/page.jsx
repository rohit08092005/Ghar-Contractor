"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  // ✅ Status options (only New, Contacted, Completed)
  const statusOptions = [
    "New",
    "Contacted",
    "Completed",
  ];

  const filterButtons = [
    "All",
    "New",
    "Contacted",
    "Completed"
  ];

  // ---------------- Filter Requests ----------------
  const filteredRequests = statusFilter === "All" 
    ? requests 
    : requests.filter(r => r.status === statusFilter);

  // ---------------- Calculate Stats ----------------
  const stats = {
    new: requests.filter(r => r.status === "New").length,
    contacted: requests.filter(r => r.status === "Contacted").length,
    completed: requests.filter(r => r.status === "Completed").length,
    all: requests.length
  };

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
      case "New":
        return "bg-yellow-100 text-yellow-700";
      case "Contacted":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ---------------- Recent Activity (last 5 requests) ----------------
  const recentActivity = [...requests]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Dashboard Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Overview Stats */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard title="All Requests" value={stats.all} />
            <StatCard title="New Requests" value={stats.new} />
            <StatCard title="Contacted" value={stats.contacted} />
            <StatCard title="Completed" value={stats.completed} />
          </div>
        </div>

        {/* Service Requests Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            📋 Service Requests
          </h2>

          {/* Filters */}
          <div className="flex gap-3 mb-6 flex-wrap">
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
                {status} ({status === "All" ? stats.all : requests.filter(r => r.status === status).length})
              </Button>
            ))}
          </div>

          {/* Table */}
          {loading ? (
            <p className="text-gray-600">Loading requests...</p>
          ) : filteredRequests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">No service requests found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                      Service Type
                    </th>
                    <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                      Client Name
                    </th>
                    <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-gray-600 font-semibold">
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
                              onClick={() => updateStatus(r.id, status)}
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

        {/* Recent Activity */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-gray-600">No recent activity yet.</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {activity.client_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.service_type} - {activity.message.substring(0, 50)}...
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        activity.status
                      )}`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <p className="text-sm text-gray-600 mb-2">{title}</p>
        <p className="text-3xl font-bold text-orange-600">{value}</p>
      </CardContent>
    </Card>
  );
}