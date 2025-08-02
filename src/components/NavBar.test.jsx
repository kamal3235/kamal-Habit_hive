import React from "react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("renders all habit page links", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    // Check that each link exists in the DOM
    expect(screen.getByText("Dashboard")).not.toBeNull();
    expect(screen.getByText("Reading")).not.toBeNull();
    expect(screen.getByText("Physical")).not.toBeNull();
    expect(screen.getByText("Mental Health")).not.toBeNull();
  });

  it("links have correct hrefs", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    // Check href attributes directly
    expect(
      screen.getByText("Dashboard").closest("a").getAttribute("href"),
    ).toBe("/");
      expect(screen.getByText("Reading").closest("a").getAttribute("href")).toBe(
    "/reading",
  );
    expect(screen.getByText("Physical").closest("a").getAttribute("href")).toBe(
      "/physical",
    );
    expect(
      screen.getByText("Mental Health").closest("a").getAttribute("href"),
    ).toBe("/mental");
  });
});
