export const getImageDatabase = async () => {
    const token = localStorage.getItem('token')
    const formData = new FormData();
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/upload/`, {
        method: "GET",
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