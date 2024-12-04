import httpMethods from "./index";

const EventsApi = {

  getSavedActivitiesForItinerary: async (itinerary_id) => {
    const token = localStorage?.getItem("token");
    if (token) {
      try {
        const res = await httpMethods.get(
          `/api/planner/user/itinerary/activity/list/${itinerary_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        return res;
      } catch (error) {
        return error;
      }
    }
  },

  getCalendarActivities: async (itinerary_id) => {
    const token = localStorage?.getItem("token");
    if (token) {
      try {
        const res = await httpMethods.get(
          `/api/chatgpt/v2/user/itinerary/${itinerary_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        return res;
      } catch (error) {
        return error;
      }
    }
  },

  assignActivityByDragging: async (assignActivityInfo) => {
    const token = localStorage?.getItem("token");

    if (token) {
      try {
        const res = await httpMethods.post(
          "/api/planner/user/itinerary/activity/dragdrop",
          assignActivityInfo,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return res;
      } catch (error) {
        return error;
      }
    }
  },

  deleteExistingActivity: async (existingActivityInfo) => {
    const token = localStorage?.getItem("token");
    const { itinerary_id, activity_id } = existingActivityInfo;

    if (token) {
      try {
        const res = await httpMethods.delete(
          `/api/planner/user/itinerary/activity/${itinerary_id}/${activity_id}/1`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return res;
      } catch (error) {
        return error;
      }
    }
  },

  deleteSavedActivity: async (savedActivityInfo) => {
    const token = localStorage?.getItem("token");
    const { itinerary_id, activity_id } = savedActivityInfo;

    if (token) {
      try {
        const res = await httpMethods.delete(
          `/api/planner/user/itinerary/activity/${itinerary_id}/${activity_id}/0`,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return res;
      } catch (error) {
        return error;
      }
    }
  },

  //  URL:  https://halaltravel.ai/ht/api/planner/user/itinerary/activity/{itinerary_id}/{activity_id}/1

  AddActivityToItineraryTemporarilyExisting: async (saveActivityInfo) => {
    const token = localStorage?.getItem("token");

    if (token) {
      try {
        const res = await httpMethods.post(
          "/api/planner/user/itinerary/activity/saveTemp",
          saveActivityInfo,
          {
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json",
          }
        );
        return res;
      } catch (error) {
        return error;
      }
    }
  },

  addActivityToItinerary: async (addActivityInfo) => {
    const token = localStorage?.getItem("token");
    if (token) {
      try {
        const res = await httpMethods.post(
          "api/planner/user/itinerary/activity/add",
          addActivityInfo,
          {
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json",
          }
        );
        return res;
      } catch (error) {
        return error;
      }
    }
  },

  editActivityForItinerary: async (editActivityRequest) => {
    const token = localStorage?.getItem("token");
    if (token) {
      try {
        const res = await httpMethods.put(
          "api/planner/user/itinerary/activity/edit",
          editActivityRequest,
          {
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json",
          }
        );
        return res;
      } catch (error) {
        return error;
      }
    }
  },


  getAllRestaurantsForLocation : async (location)=> {
    const token = localStorage?.getItem("token");
    if (token) {
      try {
        const res = await httpMethods.get(
          `api/restaurant/search?query=${location}&rankby=POPULARITY&language=en&halal=false&radius=3000`,
          {
            headers: { Authorization: `Bearer ${token}` },
           // "Content-Type": "application/json",
          }
        );
        return res;
      } catch (error) {
        return error;
      }
    }
  },


  extendDaysForItinerary: async (itineraryRequest) => {
    console.log(itineraryRequest);
    const token = localStorage?.getItem("token");
    if (token) {
      try {
        const res = await httpMethods.put(
          "api/chatgpt/user/itinerary/extend",
          itineraryRequest,
          {
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json",
          }
        );
        return res;
      } catch (error) {
        return error;
      }
    }
  },

};

export default EventsApi;
