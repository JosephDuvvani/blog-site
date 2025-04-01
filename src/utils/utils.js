const fetchComments = async (accessJwt, url) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessJwt}`,
    },
  };

  const data = await (await fetch(url, options)).json();

  return data;
};

const fetchToken = async (refreshJwt, url) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshJwt,
    }),
  };

  const data = await (await fetch(url, options)).json();

  return data;
};

export { fetchComments, fetchToken };
