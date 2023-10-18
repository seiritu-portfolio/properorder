const generateBody = (request) => {
  const body = new FormData();

  const requests = Object.keys(request);
  requests.forEach((r) => {
    if (request[r] != null && typeof request[r] === "object") {
      Object.keys(request[r]).forEach((ra) =>
        body.append(`${r}[${ra}]`, request[r][ra])
      );
    } else if (Array.isArray(request[r])) {
      request[r].forEach((ra) => body.append(`${r}[]`, ra));
    } else if (typeof request[r] === "boolean") {
      body.append(r, request[r] ? "1" : "0");
    } else {
      if (request[r] != null) {
        body.append(r, request[r]);
      }
    }
  });

  return body;
};

export default { generateBody };
