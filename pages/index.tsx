import { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "@/components/property/PropertyCard"; // Make sure this component exists

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties"); // Replace with your actual API endpoint
        setProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
