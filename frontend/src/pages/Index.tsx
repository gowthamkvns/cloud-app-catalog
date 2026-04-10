import { useEffect, useState } from "react";

const Index = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    // This fetches data from your JAVA BACKEND
    fetch("https://cloud-app-backend-rkh4.onrender.com/api/applications")
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch((err) => console.error("Could not fetch apps:", err));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Cloud Application Catalog</h1>
      
      {apps.length === 0 ? (
        <p className="text-gray-500 italic">No applications found in Supabase. Use the PowerShell command to add one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {apps.map((app: any) => (
            <div key={app.id} className="p-4 bg-white rounded-lg shadow border border-blue-100">
              <h2 className="text-xl font-semibold text-blue-700">{app.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{app.description}</p>
              <span className="inline-block mt-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                {app.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;