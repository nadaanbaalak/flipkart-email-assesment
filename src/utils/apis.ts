const BASE_URL = "https://flipkart-email-mock.now.sh";

export const getEmailList = async () => {
  try {
    const response = (await fetch(`${BASE_URL}/`)).json();
    return response;
  } catch (err) {
    console.log(err);
    return {
      list: [],
      total: 0,
    };
  }
};

export const getEmailById = async (id: string) => {
  try {
    const response = (await fetch(`${BASE_URL}/?id=${id}`)).json();
    return response;
  } catch (err) {
    console.log(err);
  }
};
