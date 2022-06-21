import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputOptions from "../components/InputOptions";

const options = [
  {
    id: 1,
    name: "option 1",
  },
  {
    id: 2,
    name: "option 2",
  },
];

describe("test the component InputOptions", () => {
  let utils, onSelectOption;
  beforeEach(() => {
    onSelectOption = jest.fn();
    utils = render(
      <InputOptions
        options={options}
        placeholder="placeholder text"
        onSelectOption={onSelectOption}
      />
    );
  });
  test("renders the input", () => {
    expect(utils.getByPlaceholderText("placeholder text")).toBeInTheDocument();
  });

  test("does not show the options", async () => {
    const input = utils.getByPlaceholderText("placeholder text");
    const optionElement = utils.queryByText(options[0].name);
    expect(optionElement).not.toBeInTheDocument();
  });

  test("show the options when is focused", async () => {
    const input = utils.getByPlaceholderText("placeholder text");
    fireEvent.focus(input);
    const optionElement = utils.queryByText(options[0].name);
    expect(optionElement).toBeInTheDocument();
  });

  test("hidde the options when is blured", async () => {
    const input = utils.getByPlaceholderText("placeholder text");
    fireEvent.focus(input);
    await fireEvent.blur(input);
    await waitFor(
      () => {
        const optionElement = utils.queryByText(options[0].name);
        expect(optionElement).not.toBeInTheDocument();
      },
      { timeout: 1100 }
    );
  });

  test("execute callback when clicking in a option", async () => {
    const wrapper = utils.getByClass;
    const input = utils.getByPlaceholderText("placeholder text");
    fireEvent.focus(input);
    const optionElement = utils.queryByText(options[0].name);
    fireEvent.click(optionElement);
    expect(onSelectOption).toBeCalled();
  });
});
