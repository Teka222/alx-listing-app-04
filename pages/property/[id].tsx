import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  description: string;
  imageUrl: string;
  // Add other fields as needed from API
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<Property | null>(nu
