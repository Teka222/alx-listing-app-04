import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  propertyId: number | string;
}

const ReviewSection = ({ propertyId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return;

      try {
        const response = await axios.get(
          `/api/properties/${propertyId}/reviews`
        ); // Replace with your actual API endpoint
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className="mt-6 space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border p-4 rounded-md shadow-sm">
          <p className="font-semibold">{review.name}</p>
          <p className="text-yellow-500">Rating: {review.rating}/5</p>
          <p className="mt-1">{review.comment}</p>
          <p className="text-gray-400 text-sm">{review.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
