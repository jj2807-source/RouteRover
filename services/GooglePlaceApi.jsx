export const GetPhotoRef = async (placeName) => {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
  );
  const result = await resp.json();
  const photoRef = result?.results?.[0]?.photos?.[0]?.photo_reference;
  return photoRef || null;
};
