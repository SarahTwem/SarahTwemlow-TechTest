export function checkValidResponse(response) {
  expect(response.status).to.equal(200, "Check status");
  const propertiesToCheck = ["count", "name", "age"];
  for (const property of propertiesToCheck) {
    expect(response.body.hasOwnProperty(property)).to.equal(
      true,
      `Check response contains ${property}`
    );
  }
}
