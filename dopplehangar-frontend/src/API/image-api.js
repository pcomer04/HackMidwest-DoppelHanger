export const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/upload/`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}