export const formatPhone = (phone?: string) => {
  if (!phone) {
    return null;
  }
  return (
    "+36 " +
    phone.substr(0, 2) +
    " " +
    phone.substr(2, 3) +
    " " +
    phone.substr(5, 4)
  );
};
