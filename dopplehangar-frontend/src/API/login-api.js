export const login = async (username, password) => {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json()
    return data;
  };