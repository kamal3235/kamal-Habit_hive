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

    // These should match the names in habitPages
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Coding")).toBeInTheDocument();
    expect(screen.getByText("Physical")).toBeInTheDocument();
    expect(screen.getByText("Mental Health")).toBeInTheDocument();
  });

  it("links have correct hrefs", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    expect(screen.getByText("Dashboard").closest("a")).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("Coding").closest("a")).toHaveAttribute(
      "href",
      "/coding",
    );
    expect(screen.getByText("Physical").closest("a")).toHaveAttribute(
      "href",
      "/physical",
    );
    expect(screen.getByText("Mental Health").closest("a")).toHaveAttribute(
      "href",
      "/mental",
    );
  });
});
