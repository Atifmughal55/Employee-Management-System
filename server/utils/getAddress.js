// utils/geocode.js
import axios from "axios";

export const getAddress = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse`,
      {
        params: {
          lat,
          lon: lng,
          format: "json",
        },
        headers: {
          "User-Agent": "EMS/1.0", // Required by Nominatim usage policy
        },
      }
    );

    return response.data.display_name; // full human-readable address
  } catch (err) {
    console.error("Reverse geocoding failed:", err.message);
    return null;
  }
};
