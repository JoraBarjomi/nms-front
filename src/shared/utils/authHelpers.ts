export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payLoadBase64 = token.split(".")[1];
    const decodedJson = atob(payLoadBase64);
    const parsed = JSON.parse(decodedJson);
    return {
      id: parsed.user_id,
      username: parsed.username,
      sessionStart: new Date(parsed.iat * 1000).toLocaleDateString(),
      sessionEnd: new Date(parsed.exp * 1000).toLocaleDateString(),
    };
  } catch (err) {
    console.log("Failed to parse data from token", err);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getInitials = (name: string) =>
  name ? name.charAt(0).toUpperCase() : "U";
