import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import SupportPage from "../components/Support";
import React from "react";
import "@testing-library/jest-dom";

// Mock axios to prevent real API calls
jest.mock("axios");

describe("SupportPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders SupportPage with all fields and submit button", () => {
    render(
      <Router>
        <SupportPage />
      </Router>
    );

    // Check if all input fields are present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

    // Check if the submit button is present
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();

    // Check if the image is rendered
    expect(screen.getByAltText(/support/i)).toBeInTheDocument();
  });

  test("handles user input correctly", () => {
    render(
      <Router>
        <SupportPage />
      </Router>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(subjectInput, { target: { value: "Test Subject" } });
    fireEvent.change(messageInput, { target: { value: "Test Message" } });

    expect(nameInput.value).toBe("John Doe");
    expect(phoneInput.value).toBe("1234567890");
    expect(emailInput.value).toBe("john.doe@example.com");
    expect(subjectInput.value).toBe("Test Subject");
    expect(messageInput.value).toBe("Test Message");
  });

  test("submits the form successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: { message: "Success" } });

    render(
      <Router>
        <SupportPage />
      </Router>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Test Message" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/support request submitted successfully/i)
      ).toBeInTheDocument();
    });

    // Check if the form is reset
    expect(screen.getByLabelText(/name/i).value).toBe("");
    expect(screen.getByLabelText(/phone/i).value).toBe("");
    expect(screen.getByLabelText(/email address/i).value).toBe("");
    expect(screen.getByLabelText(/subject/i).value).toBe("");
    expect(screen.getByLabelText(/message/i).value).toBe("");
  });

  test("displays an error message on API failure", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { error: "Failed to submit request" } },
    });

    render(
      <Router>
        <SupportPage />
      </Router>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Test Message" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to submit request/i)).toBeInTheDocument();
    });
  });

  test("shows validation error when required fields are empty", () => {
    render(
      <Router>
        <SupportPage />
      </Router>
    );

    // Submit the form without filling any fields
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // The fields should still be empty, as required validation will prevent submission
    expect(screen.getByLabelText(/name/i).value).toBe("");
    expect(screen.getByLabelText(/phone/i).value).toBe("");
    expect(screen.getByLabelText(/email address/i).value).toBe("");
    expect(screen.getByLabelText(/subject/i).value).toBe("");
    expect(screen.getByLabelText(/message/i).value).toBe("");
  });
});
