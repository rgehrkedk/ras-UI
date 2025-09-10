/**
 * Tabs component tests
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";

import { render, screen, createUser } from "../../test/test-utils";

import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

// Helper component for testing
const TestTabs = (props: Partial<React.ComponentProps<typeof Tabs>>) => {
  const {
    orientation = "horizontal",
    size = "md",
    keyboardActivation = "automatic",
    defaultSelectedKey = "first",
    ...restProps
  } = props;

  return (
    <Tabs
      orientation={orientation}
      size={size}
      keyboardActivation={keyboardActivation}
      defaultSelectedKey={defaultSelectedKey}
      {...restProps}
    >
      <TabList aria-label="Test tabs">
        <Tab id="first">First Tab</Tab>
        <Tab id="second">Second Tab</Tab>
        <Tab id="third">Third Tab</Tab>
        <Tab id="disabled" isDisabled>
          Disabled Tab
        </Tab>
      </TabList>
      <TabPanel id="first">First panel content</TabPanel>
      <TabPanel id="second">Second panel content</TabPanel>
      <TabPanel id="third">Third panel content</TabPanel>
      <TabPanel id="disabled">Disabled panel content</TabPanel>
    </Tabs>
  );
};

describe("Tabs", () => {
  it("renders with default props", () => {
    render(<TestTabs />);

    // Check tab list is present
    expect(screen.getByRole("tablist")).toBeInTheDocument();

    // Check all tabs are rendered
    expect(screen.getByRole("tab", { name: "First Tab" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Second Tab" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Third Tab" })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Disabled Tab" }),
    ).toBeInTheDocument();

    // Check first tab is selected by default
    expect(screen.getByRole("tab", { name: "First Tab" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Second Tab" })).toHaveAttribute(
      "aria-selected",
      "false",
    );

    // Check first panel is visible
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    expect(screen.getByText("First panel content")).toBeInTheDocument();
  });

  it("switches tabs when clicked", async () => {
    const user = createUser();
    render(<TestTabs />);

    // Initially first tab is selected
    expect(screen.getByRole("tab", { name: "First Tab" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("First panel content")).toBeInTheDocument();

    // Click second tab
    await user.click(screen.getByRole("tab", { name: "Second Tab" }));

    // Second tab should now be selected
    expect(screen.getByRole("tab", { name: "Second Tab" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "First Tab" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByText("Second panel content")).toBeInTheDocument();
  });

  it("handles disabled tabs correctly", async () => {
    const user = createUser();
    render(<TestTabs />);

    const disabledTab = screen.getByRole("tab", { name: "Disabled Tab" });
    expect(disabledTab).toHaveAttribute("aria-disabled", "true");

    // Try to click disabled tab - should not change selection
    await user.click(disabledTab);

    // First tab should still be selected
    expect(screen.getByRole("tab", { name: "First Tab" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("First panel content")).toBeInTheDocument();
  });

  it("supports keyboard navigation with automatic activation", async () => {
    const user = createUser();
    render(<TestTabs keyboardActivation="automatic" />);

    const firstTab = screen.getByRole("tab", { name: "First Tab" });
    const secondTab = screen.getByRole("tab", { name: "Second Tab" });

    // Focus first tab
    firstTab.focus();
    expect(firstTab).toHaveFocus();
    expect(firstTab).toHaveAttribute("aria-selected", "true");

    // Press right arrow - should move to second tab and select it automatically
    await user.keyboard("{ArrowRight}");
    expect(secondTab).toHaveFocus();
    expect(secondTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Second panel content")).toBeInTheDocument();
  });

  it("supports keyboard navigation with manual activation", async () => {
    const user = createUser();
    render(<TestTabs keyboardActivation="manual" />);

    const firstTab = screen.getByRole("tab", { name: "First Tab" });
    const secondTab = screen.getByRole("tab", { name: "Second Tab" });

    // Focus first tab
    firstTab.focus();
    expect(firstTab).toHaveFocus();
    expect(firstTab).toHaveAttribute("aria-selected", "true");

    // Press right arrow - should move focus but not select
    await user.keyboard("{ArrowRight}");
    expect(secondTab).toHaveFocus();
    expect(firstTab).toHaveAttribute("aria-selected", "true"); // Still selected
    expect(screen.getByText("First panel content")).toBeInTheDocument();

    // Press Enter or Space to activate
    await user.keyboard("{Enter}");
    expect(secondTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Second panel content")).toBeInTheDocument();
  });

  it("supports Home and End keys for navigation", async () => {
    const user = createUser();
    render(<TestTabs />);

    const firstTab = screen.getByRole("tab", { name: "First Tab" });
    const thirdTab = screen.getByRole("tab", { name: "Third Tab" });

    // Focus first tab
    firstTab.focus();

    // Press End key - should go to last enabled tab
    await user.keyboard("{End}");
    expect(thirdTab).toHaveFocus();
    expect(thirdTab).toHaveAttribute("aria-selected", "true");

    // Press Home key - should go to first tab
    await user.keyboard("{Home}");
    expect(firstTab).toHaveFocus();
    expect(firstTab).toHaveAttribute("aria-selected", "true");
  });

  it("skips disabled tabs during keyboard navigation", async () => {
    const user = createUser();
    render(
      <Tabs defaultSelectedKey="second">
        <TabList aria-label="Test tabs with disabled">
          <Tab id="first">First</Tab>
          <Tab id="second">Second</Tab>
          <Tab id="disabled" isDisabled>
            Disabled
          </Tab>
          <Tab id="third">Third</Tab>
        </TabList>
        <TabPanel id="first">First content</TabPanel>
        <TabPanel id="second">Second content</TabPanel>
        <TabPanel id="disabled">Disabled content</TabPanel>
        <TabPanel id="third">Third content</TabPanel>
      </Tabs>,
    );

    const secondTab = screen.getByRole("tab", { name: "Second" });
    const thirdTab = screen.getByRole("tab", { name: "Third" });

    // Focus second tab
    secondTab.focus();

    // Press right arrow - should skip disabled tab and go to third
    await user.keyboard("{ArrowRight}");
    expect(thirdTab).toHaveFocus();
    expect(thirdTab).toHaveAttribute("aria-selected", "true");
  });

  it("renders different orientations correctly", () => {
    const { rerender } = render(<TestTabs orientation="horizontal" />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();

    rerender(<TestTabs orientation="vertical" />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders different sizes correctly", () => {
    const { rerender } = render(<TestTabs size="sm" />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();

    rerender(<TestTabs size="md" />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();

    rerender(<TestTabs size="lg" />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("supports controlled state", async () => {
    const user = createUser();
    let selectedKey = "first";
    const onSelectionChange = vi.fn((key) => {
      selectedKey = key;
    });

    const { rerender } = render(
      <Tabs selectedKey={selectedKey} onSelectionChange={onSelectionChange}>
        <TabList aria-label="Controlled tabs">
          <Tab id="first">First</Tab>
          <Tab id="second">Second</Tab>
        </TabList>
        <TabPanel id="first">First content</TabPanel>
        <TabPanel id="second">Second content</TabPanel>
      </Tabs>,
    );

    expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    // Click second tab
    await user.click(screen.getByRole("tab", { name: "Second" }));
    expect(onSelectionChange).toHaveBeenCalledWith("second");

    // Rerender with new selectedKey to simulate controlled update
    selectedKey = "second";
    rerender(
      <Tabs selectedKey={selectedKey} onSelectionChange={onSelectionChange}>
        <TabList aria-label="Controlled tabs">
          <Tab id="first">First</Tab>
          <Tab id="second">Second</Tab>
        </TabList>
        <TabPanel id="first">First content</TabPanel>
        <TabPanel id="second">Second content</TabPanel>
      </Tabs>,
    );

    expect(screen.getByRole("tab", { name: "Second" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("handles shouldForceMount prop correctly", () => {
    render(
      <Tabs defaultSelectedKey="first">
        <TabList aria-label="Force mount test">
          <Tab id="first">First</Tab>
          <Tab id="second">Second</Tab>
        </TabList>
        <TabPanel id="first">First content</TabPanel>
        <TabPanel id="second" shouldForceMount>
          Second content (always mounted)
        </TabPanel>
      </Tabs>,
    );

    // Both panels should be in DOM due to shouldForceMount on second
    expect(screen.getByText("First content")).toBeInTheDocument();
    expect(
      screen.getByText("Second content (always mounted)"),
    ).toBeInTheDocument();
  });

  it("provides accessibility warnings for missing aria-label", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <Tabs>
        {/* @ts-expect-error - intentionally omitting aria-label for test */}
        <TabList>
          <Tab id="first">First</Tab>
        </TabList>
        <TabPanel id="first">First content</TabPanel>
      </Tabs>,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "TabList: aria-label prop is required for accessibility. Provide a descriptive label for the tab list.",
    );

    consoleSpy.mockRestore();
  });

  it("forwards refs correctly", () => {
    const tabsRef = vi.fn();
    const tabListRef = vi.fn();
    const tabRef = vi.fn();
    const tabPanelRef = vi.fn();

    render(
      <Tabs ref={tabsRef}>
        <TabList aria-label="Ref test" ref={tabListRef}>
          <Tab id="first" ref={tabRef}>
            First
          </Tab>
        </TabList>
        <TabPanel id="first" ref={tabPanelRef}>
          First content
        </TabPanel>
      </Tabs>,
    );

    expect(tabsRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    expect(tabListRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    expect(tabRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    expect(tabPanelRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
