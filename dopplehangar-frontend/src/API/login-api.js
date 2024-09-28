export const login = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    return response.json();
  };