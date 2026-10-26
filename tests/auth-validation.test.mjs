import test from "node:test";
import assert from "node:assert/strict";
import { validateAuth } from "../src/lib/auth-validation.ts";
import { validateOnboarding } from "../src/lib/onboarding-validation.ts";
import {
  industries,
  teamSizes,
  businessGoals,
  moduleInterests,
} from "../src/demo/onboarding.ts";
const valid = {
  name: "Sample Person",
  email: "sample@example.com",
  password: "DemoPassword12",
  confirmPassword: "DemoPassword12",
  acknowledged: true,
  remember: false,
};
test("signup rejects missing details, weak passwords, mismatches and missing acknowledgement", () => {
  const errors = validateAuth("signup", {
    ...valid,
    name: " ",
    email: "invalid",
    password: "weak",
    confirmPassword: "different",
    acknowledged: false,
  });
  assert.deepEqual(
    Object.keys(errors).sort(),
    ["name", "email", "password", "confirmPassword", "acknowledged"].sort(),
  );
  assert.deepEqual(validateAuth("signup", valid), {});
});
test("signup rejects individually missing password requirements", () => {
  for (const password of [
    "shortA1",
    "alllowercase123",
    "ALLUPPERCASE123",
    "WithoutNumbers",
  ])
    assert.ok(
      validateAuth("signup", { ...valid, password, confirmPassword: password })
        .password,
    );
});
test("login accepts existing password formats and only checks input format, not authentication", () => {
  assert.deepEqual(validateAuth("login", { ...valid, password: "legacy" }), {});
  assert.ok(validateAuth("login", { ...valid, password: "" }).password);
});
test("reset only validates email and bounds long name/email inputs", () => {
  assert.deepEqual(
    validateAuth("forgot-password", {
      ...valid,
      password: "",
      email: "  sample@example.com  ",
    }),
    {},
  );
  assert.ok(validateAuth("forgot-password", { ...valid, email: "bad@" }).email);
  assert.ok(validateAuth("signup", { ...valid, name: "a".repeat(81) }).name);
  assert.ok(
    validateAuth("login", { ...valid, email: "a".repeat(250) + "@example.com" })
      .email,
  );
});
const options = {
  industries,
  teamSizes,
  goals: businessGoals,
  modules: moduleInterests,
};
const draft = {
  workspaceName: "Sample Studio",
  industry: "Agency",
  otherIndustry: "",
  teamSize: "Just me",
  goals: [businessGoals[0]],
  modules: [],
};
test("wizard validates each required step and supports skipping optional module interests", () => {
  assert.ok(
    validateOnboarding(1, { ...draft, workspaceName: " " }, options)
      .workspaceName,
  );
  assert.ok(
    validateOnboarding(2, { ...draft, industry: "unknown" }, options).industry,
  );
  assert.ok(
    validateOnboarding(3, { ...draft, teamSize: "" }, options).teamSize,
  );
  assert.ok(validateOnboarding(4, { ...draft, goals: [] }, options).goals);
  assert.deepEqual(validateOnboarding(5, draft, options), {});
  assert.deepEqual(validateOnboarding(6, draft, options), {});
});
test("review rejects invalid or stale selections and overlong optional text", () => {
  const errors = validateOnboarding(
    6,
    {
      ...draft,
      workspaceName: "x",
      industry: "?",
      teamSize: "?",
      goals: ["?"],
      modules: ["?"],
      otherIndustry: "x".repeat(101),
    },
    options,
  );
  assert.equal(Object.keys(errors).length, 6);
  assert.deepEqual(
    validateOnboarding(
      6,
      {
        ...draft,
        industry: "Other",
        otherIndustry: "Sample industry",
        modules: ["AI Workspace", "Documents"],
      },
      options,
    ),
    {},
  );
});
