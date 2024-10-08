export const imageUpload = async (image) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/upload/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`, // Include the access token
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}