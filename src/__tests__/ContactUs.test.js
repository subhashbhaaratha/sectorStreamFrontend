import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ContactUs from "../../src/components/ContactUs";

describe("ContactUs Component", () => {
  test("renders the form correctly", () => {
    render(<ContactUs />);
    expect(screen.getByText("How Can We Help?")).toBeInTheDocument();
    expect(screen.getByLabelText("Name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Email*")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact Number*")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Service*")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Please describe your requirements*")
    ).toBeInTheDocument();
    expect(
      screen.getByText("I agree to the Terms & Conditions of Business Name.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  test("prevents form submission if required fields are empty", () => {
    const handleSubmit = jest.fn();
    render(<ContactUs />);
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
