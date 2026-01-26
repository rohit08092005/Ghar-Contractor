"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ConstructionCostEstimator() {
  const [plotSize, setPlotSize] = useState("");
  const [floors, setFloors] = useState("1");
  const [type, setType] = useState("standard");
  const [estimate, setEstimate] = useState(null);

  const calculateEstimate = () => {
    const size = Number(plotSize);
    if (!size) return;

    let rate = 2000;

    if (type === "basic") rate = 1350;
    if (type === "premium") rate = 3100;

    const total = size * Number(floors) * rate;

    setEstimate(`₹${total.toLocaleString()} (Approx)`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Construction Cost Estimator 🧮
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Get an instant rough estimate for your construction project.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Enter Details 📋
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Plot Size */}
              <div>
                <label className="text-sm text-gray-600">Plot Size (sq ft)</label>
                <input
                  type="number"
                  placeholder="1000"
                  value={plotSize}
                  onChange={(e) => setPlotSize(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>

              {/* Floors */}
              <div>
                <label className="text-sm text-gray-600">
                  Number of Floors
                </label>
                <Select value={floors} onValueChange={setFloors}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select floors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Floor</SelectItem>
                    <SelectItem value="2">2 Floors</SelectItem>
                    <SelectItem value="3">3 Floors</SelectItem>
                    <SelectItem value="4">4 Floors</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Construction Type */}
              <div>
                <label className="text-sm text-gray-600">
                  Construction Type
                </label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">
                      Basic (₹1,200–₹1,500 / sq ft)
                    </SelectItem>
                    <SelectItem value="standard">
                      Standard (₹1,800–₹2,200 / sq ft)
                    </SelectItem>
                    <SelectItem value="premium">
                      Premium (₹2,800–₹3,500 / sq ft)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Button */}
              <Button
                size="lg"
                onClick={calculateEstimate}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                Calculate Estimate
              </Button>
            </CardContent>
          </Card>

          {/* Result Card */}
          <Card className="flex items-center justify-center hover:shadow-lg transition-shadow">
            <CardContent className="text-center py-20">
              {estimate ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Your Estimate ✅
                  </h3>
                  <p className="text-4xl font-bold text-orange-600 mt-4">
                    {estimate}
                  </p>
                  <p className="text-sm text-gray-600 mt-3">
                    This is a rough estimate. Final cost may vary.
                  </p>
                </>
              ) : (
                <p className="text-gray-600">
                  Enter your details and click calculate to see estimate.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
