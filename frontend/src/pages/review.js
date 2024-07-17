import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Review = ({ tourId, name }) => {
    const params=useParams()
  const [newReview, setNewReview] = useState({ review: '', rating: 5 });
  const [isFormVisible, setIsFormVisible] = useState(true); // Show the form by default

  async function submitReview(event) {
    event.preventDefault();
    // console.log("t",tourId)
   const res= await fetch(`https://bootcamp-wine.vercel.app/api/v1/reviews/${params.tourId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({review:newReview.rating,rating:newReview.review}),
    });
    const result=await res.json()
    console.log(result,"re")
    setNewReview({ review: '', rating: 5 });
    // Optionally hide the form after submission
    setIsFormVisible(false);
  }

  return (
    <div className="p-5">
      <h3 className="font-bold mb-2">Create a Review for {params.name}</h3>
      {1 ? (
        <form onSubmit={submitReview}>
          <textarea
            placeholder="Your review"
            value={newReview.review}
            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
            required
            className="block w-full p-2 mb-2 border rounded"
          ></textarea>
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            required
            className="block w-full p-2 mb-2 border rounded"
          >
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
          <button type="submit" className="bg-green-400 rounded-lg border-2 border-solid text-white p-2">
            Submit Review
          </button>
        </form>
      ) : (
        <p>Review submitted successfully!</p>
      )}
    </div>
  );
};

export default Review;
