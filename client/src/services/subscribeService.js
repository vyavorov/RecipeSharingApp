const baseUrl = "http://localhost:3030/data/subscribers";

export const create = async (subscriberData) => {
  const allSubscribers = await fetch(baseUrl);
  const allSubscribersData = await allSubscribers.json();
  console.log(allSubscribersData);
  const isAlreadySubscribed = allSubscribersData.some(obj => obj.email === subscriberData.email);
  console.log(isAlreadySubscribed);

  if (isAlreadySubscribed) {
    throw new Error("Already subscribed");
  }
    
  const token = localStorage.getItem("accessToken");
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(subscriberData),
  });

  if (!response.ok) {
    throw new Error("Not logged in");
  }

  const result = await response.json();

  return result;
};
