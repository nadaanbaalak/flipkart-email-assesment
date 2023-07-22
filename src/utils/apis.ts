const BASE_URL = "https://flipkart-email-mock.now.sh";

export const getEmailList = async () => {
  const response = (await fetch(`${BASE_URL}/`)).json();
  return response;
};

export const getEmailById = async (id: string) => {
  const response = (await fetch(`${BASE_URL}/?id=${id}`)).json();
  return response;
};
