export const isAuthenticated = (state) => {
  if (localStorage.getItem("jobSeekerLoginToken")) return true;
  return false;
};

export const isEmployeeAuthenticated = () => {
  if (localStorage.getItem("employeeLoginToken")) return true;
  return false;
};
