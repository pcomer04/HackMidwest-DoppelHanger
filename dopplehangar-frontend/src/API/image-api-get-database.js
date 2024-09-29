export const getImageDatabase = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/upload/`, {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error("Network response was not ok");
  }

  const data = await response.json();

  // Assuming the data is an array and we want the first image object
  const image = data.at(0); // Get the first item if data is an array

  // Return the uploaded image and returned images in an object
  return {
      uploaded_image: image.uploaded_image,
      returned_1: image.returned_1,
      returned_2: image.returned_2,
      returned_3: image.returned_3,
  };
};
