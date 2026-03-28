export const redirectByRole = (navigate) => {

  const session = localStorage.getItem("userSession");

  if (!session) {
    navigate("/login");
    return;
  }

  const { role } = JSON.parse(session);

  if (role === "ADMIN") {
    navigate("/admin/dashboard");
  }
  else if (role === "DOCTOR") {
    navigate("/doctor/dashboard");
  }
  else {
    navigate("/dashboard"); // normal user
  }
};