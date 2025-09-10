/**
 * RadioGroup component tests
 */

import { describe, it, expect, vi } from "vitest";

import { render, screen, createUser } from "../../test/test-utils";

import { RadioGroup, RadioOption } from "./RadioGroup";

describe("RadioGroup", () => {
  it("renders with default props", () => {
    render(
      <RadioGroup aria-label="Size options">
        <RadioOption value="sm">Small</RadioOption>
        <RadioOption value="md">Medium</RadioOption>
        <RadioOption value="lg">Large</RadioOption>
      </RadioGroup>,
    );

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toBeInTheDocument();

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    expect(screen.getByText("Small")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Large")).toBeInTheDocument();
  });

  it("renders with accessible name", () => {
    render(
      <RadioGroup aria-label="Choose size">
        <RadioOption value="sm">Small</RadioOption>
        <RadioOption value="md">Medium</RadioOption>
      </RadioGroup>,
    );

    const radioGroup = screen.getByRole("radiogroup", { name: "Choose size" });
    expect(radioGroup).toBeInTheDocument();
  });

  it("renders different sizes", () => {
    const { rerender } = render(
      <RadioGroup aria-label="Small size" size="sm">
        <RadioOption value="option1">Option 1</RadioOption>
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();

    rerender(
      <RadioGroup aria-label="Medium size" size="md">
        <RadioOption value="option1">Option 1</RadioOption>
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();

    rerender(
      <RadioGroup aria-label="Large size" size="lg">
        <RadioOption value="option1">Option 1</RadioOption>
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("renders different orientations", () => {
    const { rerender } = render(
      <RadioGroup aria-label="Vertical" orientation="vertical">
        <RadioOption value="option1">Option 1</RadioOption>
        <RadioOption value="option2">Option 2</RadioOption>
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();

    rerender(
      <RadioGroup aria-label="Horizontal" orientation="horizontal">
        <RadioOption value="option1">Option 1</RadioOption>
        <RadioOption value="option2">Option 2</RadioOption>
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("handles selection changes", async () => {
    const user = createUser();
    const handleChange = vi.fn();

    render(
      <RadioGroup aria-label="Select option" onChange={handleChange}>
        <RadioOption value="option1">Option 1</RadioOption>
        <RadioOption value="option2">Option 2</RadioOption>
        <RadioOption value="option3">Option 3</RadioOption>
      </RadioGroup>,
    );

    const option2 = screen.getByRole("radio", { name: "Option 2" });
    await user.click(option2);

    expect(handleChange).toHaveBeenCalledWith("option2");
    expect(option2).toBeChecked();
  });

  it("supports controlled state", async () => {
    const user = createUser();
    const handleChange = vi.fn();

    const { rerender } = render(
      <RadioGroup
        aria-label="Controlled"
        value="option1"
        onChange={handleChange}
      >
        <RadioOption value="option1">Option 1</RadioOption>
        <RadioOption value="option2">Option 2</RadioOption>
      </RadioGroup>,
    );

    const option1 = screen.getByRole("radio", { name: "Option 1" });
    const option2 = screen.getByRole("radio", { name: "Option 2" });

    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();

    await user.click(option2);
    expect(handleChange).toHaveBeenCalledWith("option2");

    // Simulate parent component updating the value
    rerender(
      <RadioGroup
        aria-label="Controlled"
        value="option2"
        onChange={handleChange}
      >
        <RadioOption value="option1">Option 1</RadioOption>
        <RadioOption value="option2">Option 2</RadioOption>
      </RadioGroup>,
    );

    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });

  it("supports default selection", () => {
    render(
      <RadioGroup aria-label="Default selection" defaultValue="option2">
        <RadioOption value="option1">Option 1</RadioOption>
        <RadioOption value="option2">Option 2</RadioOption>
        <RadioOption value="option3">Option 3</RadioOption>
      </RadioGroup>,
    );

    const option2 = screen.getByRole("radio", { name: "Option 2" });
    expect(option2).toBeChecked();
  });

  it("handles disabled state", async () => {
    const user = createUser();
    const handleChange = vi.fn();

    render(
      <RadioGroup
        aria-label="Disabled group"
        isDisabled
        onChange={handleChange}
      >
        <RadioOption value="option1">Option 1</RadioOption>
        <RadioOption value="option2">Option 2</RadioOption>
      </RadioGroup>,
    );

    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });

    await user.click(radios[0]);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("supports required validation", () => {
    render(
      <RadioGroup aria-label="Required selection" isRequired>
        <RadioOption value="option1">Option 1</RadioOption>
        <RadioOption value="option2">Option 2</RadioOption>
      </RadioGroup>,
    );

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toBeRequired();
  });

  it("supports invalid state", () => {
    render(
      <RadioGroup aria-label="Invalid selection" isInvalid>
        <RadioOption value="option1">Option 1</RadioOption>
        <RadioOption value="option2">Option 2</RadioOption>
      </RadioGroup>,
    );

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toBeInvalid();
  });

  it("applies custom className", () => {
    render(
      <RadioGroup className="custom-class" aria-label="Custom">
        <RadioOption value="option1">Option 1</RadioOption>
      </RadioGroup>,
    );

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <RadioGroup ref={ref} aria-label="With ref">
        <RadioOption value="option1">Option 1</RadioOption>
      </RadioGroup>,
    );

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  describe("Keyboard Navigation", () => {
    it("handles arrow key navigation", async () => {
      const user = createUser();

      render(
        <RadioGroup aria-label="Arrow navigation">
          <RadioOption value="option1">Option 1</RadioOption>
          <RadioOption value="option2">Option 2</RadioOption>
          <RadioOption value="option3">Option 3</RadioOption>
        </RadioGroup>,
      );

      const option1 = screen.getByRole("radio", { name: "Option 1" });
      const option2 = screen.getByRole("radio", { name: "Option 2" });
      const option3 = screen.getByRole("radio", { name: "Option 3" });

      // Tab to focus the first radio
      await user.tab();
      expect(option1).toHaveFocus();

      // Arrow down to next option
      await user.keyboard("{ArrowDown}");
      expect(option2).toHaveFocus();
      expect(option2).toBeChecked();

      // Arrow down to next option
      await user.keyboard("{ArrowDown}");
      expect(option3).toHaveFocus();
      expect(option3).toBeChecked();

      // Arrow down should wrap to first option
      await user.keyboard("{ArrowDown}");
      expect(option1).toHaveFocus();
      expect(option1).toBeChecked();
    });

    it("handles arrow up navigation", async () => {
      const user = createUser();

      render(
        <RadioGroup aria-label="Arrow up navigation">
          <RadioOption value="option1">Option 1</RadioOption>
          <RadioOption value="option2">Option 2</RadioOption>
          <RadioOption value="option3">Option 3</RadioOption>
        </RadioGroup>,
      );

      const option1 = screen.getByRole("radio", { name: "Option 1" });
      const option3 = screen.getByRole("radio", { name: "Option 3" });

      // Tab to focus and arrow up should wrap to last option
      await user.tab();
      await user.keyboard("{ArrowUp}");
      expect(option3).toHaveFocus();
      expect(option3).toBeChecked();
    });

    it("handles horizontal arrow navigation", async () => {
      const user = createUser();

      render(
        <RadioGroup aria-label="Horizontal navigation" orientation="horizontal">
          <RadioOption value="option1">Option 1</RadioOption>
          <RadioOption value="option2">Option 2</RadioOption>
        </RadioGroup>,
      );

      const option1 = screen.getByRole("radio", { name: "Option 1" });
      const option2 = screen.getByRole("radio", { name: "Option 2" });

      await user.tab();
      expect(option1).toHaveFocus();

      // Right arrow should move to next option
      await user.keyboard("{ArrowRight}");
      expect(option2).toHaveFocus();
      expect(option2).toBeChecked();

      // Left arrow should move back
      await user.keyboard("{ArrowLeft}");
      expect(option1).toHaveFocus();
      expect(option1).toBeChecked();
    });
  });

  describe("RadioOption", () => {
    it("renders without children", () => {
      render(
        <RadioGroup aria-label="No children test">
          <RadioOption value="option1" aria-label="Option without label" />
        </RadioGroup>,
      );

      const radio = screen.getByRole("radio", { name: "Option without label" });
      expect(radio).toBeInTheDocument();
    });

    it("renders different sizes for individual options", () => {
      render(
        <RadioGroup aria-label="Mixed sizes">
          <RadioOption value="sm" size="sm">
            Small
          </RadioOption>
          <RadioOption value="md" size="md">
            Medium
          </RadioOption>
          <RadioOption value="lg" size="lg">
            Large
          </RadioOption>
        </RadioGroup>,
      );

      expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("shows selection indicator when selected", () => {
      render(
        <RadioGroup aria-label="Selection indicator" defaultValue="option1">
          <RadioOption value="option1">Selected</RadioOption>
          <RadioOption value="option2">Unselected</RadioOption>
        </RadioGroup>,
      );

      const selectedRadio = screen.getByRole("radio", { name: "Selected" });
      const unselectedRadio = screen.getByRole("radio", { name: "Unselected" });

      // Check that selected radio has the visual indicator
      const selectedSvg = selectedRadio.querySelector("svg circle");
      expect(selectedSvg).toHaveStyle({ opacity: "1" });

      // Check that unselected radio doesn't have the visual indicator
      const unselectedSvg = unselectedRadio.querySelector("svg circle");
      expect(unselectedSvg).toHaveStyle({ opacity: "0" });
    });

    it("forwards ref correctly for RadioOption", () => {
      const ref = vi.fn();

      render(
        <RadioGroup aria-label="Ref test">
          <RadioOption ref={ref} value="option1">
            With ref
          </RadioOption>
        </RadioGroup>,
      );

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLLabelElement));
    });

    it("can be individually disabled", async () => {
      const user = createUser();
      const handleChange = vi.fn();

      render(
        <RadioGroup aria-label="Individual disable" onChange={handleChange}>
          <RadioOption value="enabled">Enabled</RadioOption>
          <RadioOption value="disabled" isDisabled>
            Disabled
          </RadioOption>
        </RadioGroup>,
      );

      const enabledRadio = screen.getByRole("radio", { name: "Enabled" });
      const disabledRadio = screen.getByRole("radio", { name: "Disabled" });

      expect(enabledRadio).not.toBeDisabled();
      expect(disabledRadio).toBeDisabled();

      await user.click(disabledRadio);
      expect(handleChange).not.toHaveBeenCalled();

      await user.click(enabledRadio);
      expect(handleChange).toHaveBeenCalledWith("enabled");
    });
  });

  describe("Accessibility", () => {
    it("sets accessible name via aria-label", () => {
      render(
        <RadioGroup aria-label="Accessible group">
          <RadioOption value="option1">Option 1</RadioOption>
        </RadioGroup>,
      );

      const radioGroup = screen.getByRole("radiogroup");
      expect(radioGroup).toHaveAccessibleName("Accessible group");
    });

    it("works with aria-label when no visible label", () => {
      render(
        <RadioGroup aria-label="Hidden label group">
          <RadioOption value="option1">Option 1</RadioOption>
        </RadioGroup>,
      );

      const radioGroup = screen.getByRole("radiogroup", {
        name: "Hidden label group",
      });
      expect(radioGroup).toBeInTheDocument();
    });

    it("supports aria-describedby for help text", () => {
      render(
        <>
          <div id="help-text">Choose your preferred option</div>
          <RadioGroup aria-label="With help" aria-describedby="help-text">
            <RadioOption value="option1">Option 1</RadioOption>
          </RadioGroup>
        </>,
      );

      const radioGroup = screen.getByRole("radiogroup");
      expect(radioGroup).toHaveAttribute("aria-describedby", "help-text");
    });

    it("maintains proper focus management", async () => {
      const user = createUser();

      render(
        <RadioGroup aria-label="Focus management">
          <RadioOption value="option1">Option 1</RadioOption>
          <RadioOption value="option2">Option 2</RadioOption>
        </RadioGroup>,
      );

      // Only the selected/first radio should be tabbable
      await user.tab();
      const option1 = screen.getByRole("radio", { name: "Option 1" });
      expect(option1).toHaveFocus();

      // Tab should move out of the radio group
      await user.tab();
      expect(option1).not.toHaveFocus();
    });

    it("includes SVG icons with aria-hidden", () => {
      render(
        <RadioGroup aria-label="SVG test">
          <RadioOption value="option1">Option 1</RadioOption>
        </RadioGroup>,
      );

      const svg = screen.getByRole("radio").querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Form Integration", () => {
    it("works with form elements", () => {
      render(
        <form>
          <RadioGroup aria-label="Form integration" name="size">
            <RadioOption value="sm">Small</RadioOption>
            <RadioOption value="md">Medium</RadioOption>
          </RadioGroup>
        </form>,
      );

      const radioGroup = screen.getByRole("radiogroup");
      expect(radioGroup).toHaveAttribute("name", "size");
    });

    it("supports form validation states", () => {
      render(
        <RadioGroup
          aria-label="Form validation"
          isRequired
          isInvalid
          name="validation-test"
        >
          <RadioOption value="valid">Valid option</RadioOption>
        </RadioGroup>,
      );

      const radioGroup = screen.getByRole("radiogroup");
      expect(radioGroup).toBeRequired();
      expect(radioGroup).toBeInvalid();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty radio group gracefully", () => {
      render(<RadioGroup aria-label="Empty group" />);

      const radioGroup = screen.getByRole("radiogroup");
      expect(radioGroup).toBeInTheDocument();
    });

    it("handles single radio option", async () => {
      const user = createUser();
      const handleChange = vi.fn();

      render(
        <RadioGroup aria-label="Single option" onChange={handleChange}>
          <RadioOption value="only">Only option</RadioOption>
        </RadioGroup>,
      );

      const radio = screen.getByRole("radio");
      await user.click(radio);

      expect(handleChange).toHaveBeenCalledWith("only");
      expect(radio).toBeChecked();
    });
  });
});
