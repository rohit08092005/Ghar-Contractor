"use client";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ================= MAIN ================= */}
      <main className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Heading */}
          <h2 className="text-4xl font-bold text-gray-900 text-center">
            Submit a Service Request
          </h2>

          <p className="text-base text-gray-600 text-center mt-3 mb-12">
            Tell us about your project and our team will get back to you within 24 hours.
          </p>

          {/* Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-xl bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-8">

              <h3 className="text-2xl font-bold text-gray-900">
                Service Request Form
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                Fill in your details and we'll get back to you within 24 hours
              </p>

              <form className="space-y-6">

                {/* Name + Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Full Name *</label>
                    <input
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Phone Number *</label>
                    <input
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                {/* Area + Work Type */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Area / Location *</label>
                    <input
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                      placeholder="Enter your area"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Type of Work *</label>
                    <select
                      defaultValue=""
                      className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                    >
                      <option value="" disabled>Select work type</option>
                      <option>Repair</option>
                      <option>Renovation</option>
                      <option>New Construction</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-600">
                    Description (Optional)
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-600 outline-none"
                    placeholder="Tell us more about your requirements..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md"
                >
                  📋 Submit Request
                </button>

              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}