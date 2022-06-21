import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../components/Input";

describe("test the component Input", () => {
  let utils, onChange;
  beforeEach(() => {
    onChange = jest.fn();
    utils = render(
      <Input placeholder="placeholder text" onChange={onChange} />
    );
  });
  test("renders the input", () => {
    expect(utils.getByPlaceholderText("placeholder text")).toBeInTheDocument();
  });

  test("does not show the loading icon", async () => {
    expect(utils.queryByText("⏳️")).not.toBeInTheDocument();
  });

  test("show the loading icon", async () => {
    const utils = render(
      <Input placeholder="placeholder text" onChange={onChange} loading />
    );
    expect(utils.getByText("⏳️")).toBeInTheDocument();
  });

  test("onChange method works", async () => {
    const input = utils.getByPlaceholderText("placeholder text");
    fireEvent.change(input, { target: { value: "test text" } });
    expect(onChange).toHaveBeenCalled();
  });
});
