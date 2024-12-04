import React, { useState } from 'react';
import SingleRestaurant from './SingleRestaurant';
import RestaurantDetailView from './RestaurantDetailView';
import axios from 'axios';

const RestaurantList = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRestaurantClick = async (restaurantId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://halaltravel.ai/ht/api/restaurant/details?id=${restaurantId}&halal=false`);
      setSelectedRestaurant(response.data);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDetailView = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div>
      {/* Restaurant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <SingleRestaurant
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => handleRestaurantClick(restaurant.id)}
          />
        ))}
      </div>

      {/* Modal for Detailed View */}
      {selectedRestaurant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white max-w-4xl w-full max-h-full overflow-auto rounded-lg p-4">
            <RestaurantDetailView
              restaurant={selectedRestaurant}
              onClose={handleCloseDetailView}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
