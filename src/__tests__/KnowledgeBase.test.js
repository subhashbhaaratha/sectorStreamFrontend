import { render, screen, fireEvent } from "@testing-library/react";
import KnowledgeBase from "../components/KnowledgeBase";
import React from "react";
import "@testing-library/jest-dom";
describe("KnowledgeBase Component", () => {
  test("renders KnowledgeBase component with case studies", () => {
    render(<KnowledgeBase />);

    // Check if the main title is rendered
    expect(screen.getByText(/Knowledge Base/i)).toBeInTheDocument();

    // Check if the case study titles are rendered
    expect(
      screen.getByText(/Cloud & Colocation Data Center Development/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Smart City\/Townships/i)).toBeInTheDocument();
    expect(screen.getByText(/Data Analytics/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Digital Strategy & Vision Development/i)
    ).toBeInTheDocument();

    // Check if the "Learn More" buttons are rendered
    const buttons = screen.getAllByRole("button", { name: /Learn More/i });
    expect(buttons).toHaveLength(4); // There are 4 case studies
  });

  test("displays case study descriptions correctly", () => {
    render(<KnowledgeBase />);

    // Check if the descriptions for each case study are rendered correctly
    expect(
      screen.getByText(
        /A reputed and established Telecom Services & Systems Integrator with global presence/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /A large Real Estate developer of India with major focus on IT Parks, Commercial real estate & ResidentialData Security/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /A mid-east country envisions a Data Enabled Smart Nation/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /A Saudi Arabian Financial company with focus on Real Estate Lending/i
      )
    ).toBeInTheDocument();
  });

  test("renders card titles correctly", () => {
    render(<KnowledgeBase />);

    // Check if each case study title is rendered correctly
    const titles = [
      "Cloud & Colocation Data Center Development",
      "Smart City/Townships",
      "Data Analytics",
      "Digital Strategy & Vision Development",
    ];

    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
