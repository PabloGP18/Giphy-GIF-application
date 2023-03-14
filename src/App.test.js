import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

// this is when its synchronous, but now we are rendering the homepage only when needed (lazy load). So whe need to change the test
// test("renders without crashing", () => {
//   render(<App />);
//   const title = screen.getByText(/Last Search/i);
//   expect(title).toBeInTheDocument();
// });

test("renders without crashing", async () => {
  render(<App />);
  const title = await screen.findByText(/Last Search/i);
  expect(title).toBeInTheDocument();
});

// test("search form could be used", async () => {
//   render(<App />);
//   const input = await screen.findByRole("textbox");
//   const button = await screen.findByRole("button");

//   fireEvent.change(input, { target: { value: "Matrix" } });
//   fireEvent.click(button);

//   const title = await screen.findByText("Matrix");
//   expect(title).toBeVisible();
// });
