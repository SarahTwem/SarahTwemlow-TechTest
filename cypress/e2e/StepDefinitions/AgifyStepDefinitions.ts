/// <reference types="cypress" />

import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { checkValidResponse } from "../helpers/agifyHelper";

let response;
let requestName;

Given("I have a URL {string}", (URL) => {
  Cypress.env("URL", URL);
});

When(
  "I call the URL with parameter {string} equals {string}",
  (parameter: string, name: string) => {
    requestName = name;
    let requestData = {
      method: "GET",
      url: Cypress.env("URL"),
      qs: { [parameter]: name },
      failOnStatusCode: false,
    };
    response = cy.request(requestData);
  }
);

Then("an age is returned: {int}", (age) => {
  response.then((response) => {
    checkValidResponse(response);
    expect(typeof response.body.age).to.equal(
      "number",
      "Check age is a number"
    );
    expect(response.body.age).to.equal(age, "Check age is expected value");
  });
});

Then("no age is returned", () => {
  response.then((response) => {
    checkValidResponse(response);
    expect(response.body.count).to.equal(0, "Check count is 0");
    expect(response.body.name).to.equal(
      requestName,
      "Check name is expected value"
    );
    expect(response.body.age).to.equal(null, "Check age is null");
  });
});

Then(
  "the count and name fields are populated: {int}, {string}",
  (count, name) => {
    response.then((response) => {
      expect(response.body.count).to.equal(
        count,
        "Check count is expected value"
      );
      expect(response.body.name).to.equal(name, "Check name is expected value");
    });
  }
);

Then("an error is returned", () => {
  response.then((response) => {
    expect(response.status).to.equal(422, "Check status");
    expect(response.body.error).to.equal("Missing 'name' parameter");
  });
});
