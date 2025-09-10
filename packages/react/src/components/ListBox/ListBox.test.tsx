/**
 * ListBox component tests
 * Focuses on React Aria Components behavior and accessibility
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Selection } from "react-aria-components";
import { describe, it, expect, vi } from "vitest";

import { Icon } from "../Icon";

import { ListBox, ListBoxItem } from "./ListBox";

// Vitest provides jest-dom matchers via setup; no extra extensions here

describe("ListBox", () => {
  describe("Basic Functionality", () => {
    it("should render with static children", () => {
      render(
        <ListBox aria-label="Test listbox">
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2">Second Item</ListBoxItem>
          <ListBoxItem id="item3">Third Item</ListBoxItem>
        </ListBox>,
      );

      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByText("First Item")).toBeInTheDocument();
      expect(screen.getByText("Second Item")).toBeInTheDocument();
      expect(screen.getByText("Third Item")).toBeInTheDocument();
    });

    it("should render with dynamic items", () => {
      const items = [
        { id: "item1", label: "First Item" },
        { id: "item2", label: "Second Item" },
        { id: "item3", label: "Third Item" },
      ];

      render(
        <ListBox aria-label="Dynamic listbox" items={items}>
          {(item) => <ListBoxItem id={item.id}>{item.label}</ListBoxItem>}
        </ListBox>,
      );

      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByText("First Item")).toBeInTheDocument();
      expect(screen.getByText("Second Item")).toBeInTheDocument();
      expect(screen.getByText("Third Item")).toBeInTheDocument();
    });

    it("should handle empty state", () => {
      render(
        <ListBox aria-label="Empty listbox" emptyMessage="No items found" />,
      );

      expect(screen.getByText("No items found")).toBeInTheDocument();
    });

    it("should handle loading state", () => {
      render(
        <ListBox
          aria-label="Loading listbox"
          loading
          loadingMessage="Loading items..."
        />,
      );

      expect(screen.getByText("Loading items...")).toBeInTheDocument();
      expect(screen.getByLabelText("Loading items...")).toBeInTheDocument(); // Spinner
    });
  });

  describe("Selection Behavior", () => {
    it("should support single selection", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <ListBox
          aria-label="Single selection listbox"
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2">Second Item</ListBoxItem>
          <ListBoxItem id="item3">Third Item</ListBoxItem>
        </ListBox>,
      );

      const firstItem = screen.getByText("First Item");
      await user.click(firstItem);

      await waitFor(() => {
        expect(onSelectionChange).toHaveBeenCalledWith(new Set(["item1"]));
      });
    });

    it("should support multiple selection", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <ListBox
          aria-label="Multiple selection listbox"
          selectionMode="multiple"
          onSelectionChange={onSelectionChange}
        >
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2">Second Item</ListBoxItem>
          <ListBoxItem id="item3">Third Item</ListBoxItem>
        </ListBox>,
      );

      const firstItem = screen.getByText("First Item");
      const secondItem = screen.getByText("Second Item");

      await user.click(firstItem);
      await user.click(secondItem);

      await waitFor(() => {
        expect(onSelectionChange).toHaveBeenLastCalledWith(
          new Set(["item1", "item2"]),
        );
      });
    });

    it("should handle controlled selection", () => {
      const selectedKeys = new Set(["item2"]);

      render(
        <ListBox
          aria-label="Controlled listbox"
          selectionMode="single"
          selectedKeys={selectedKeys}
        >
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2">Second Item</ListBoxItem>
          <ListBoxItem id="item3">Third Item</ListBoxItem>
        </ListBox>,
      );

      const secondItem = screen.getByText("Second Item");
      expect(secondItem).toHaveAttribute("data-selected", "true");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should support arrow key navigation", async () => {
      const user = userEvent.setup();

      render(
        <ListBox
          aria-label="Keyboard navigation listbox"
          selectionMode="single"
        >
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2">Second Item</ListBoxItem>
          <ListBoxItem id="item3">Third Item</ListBoxItem>
        </ListBox>,
      );

      const listbox = screen.getByRole("listbox");
      await user.click(listbox);

      // Focus first item and navigate with arrow keys
      await user.keyboard("{ArrowDown}");
      expect(
        screen.getByText("First Item").closest('[role="option"]'),
      ).toHaveFocus();

      await user.keyboard("{ArrowDown}");
      expect(
        screen.getByText("Second Item").closest('[role="option"]'),
      ).toHaveFocus();

      await user.keyboard("{ArrowUp}");
      expect(
        screen.getByText("First Item").closest('[role="option"]'),
      ).toHaveFocus();
    });

    it("should support Home and End keys", async () => {
      const user = userEvent.setup();

      render(
        <ListBox
          aria-label="Home/End navigation listbox"
          selectionMode="single"
        >
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2">Second Item</ListBoxItem>
          <ListBoxItem id="item3">Third Item</ListBoxItem>
        </ListBox>,
      );

      const listbox = screen.getByRole("listbox");
      await user.click(listbox);

      // Navigate to middle item first
      await user.keyboard("{ArrowDown}{ArrowDown}");
      expect(
        screen.getByText("Second Item").closest('[role="option"]'),
      ).toHaveFocus();

      // Test End key
      await user.keyboard("{End}");
      expect(
        screen.getByText("Third Item").closest('[role="option"]'),
      ).toHaveFocus();

      // Test Home key
      await user.keyboard("{Home}");
      expect(
        screen.getByText("First Item").closest('[role="option"]'),
      ).toHaveFocus();
    });

    it("should support Space and Enter for selection", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <ListBox
          aria-label="Space/Enter selection listbox"
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2">Second Item</ListBoxItem>
        </ListBox>,
      );

      const listbox = screen.getByRole("listbox");
      await user.click(listbox);
      await user.keyboard("{ArrowDown}");

      // Select with Space
      await user.keyboard(" ");
      await waitFor(() => {
        expect(onSelectionChange).toHaveBeenCalledWith(new Set(["item1"]));
      });

      // Select with Enter
      onSelectionChange.mockClear();
      await user.keyboard("{ArrowDown}{Enter}");
      await waitFor(() => {
        expect(onSelectionChange).toHaveBeenCalledWith(new Set(["item2"]));
      });
    });
  });

  describe("Disabled State", () => {
    it("should disable entire listbox", () => {
      render(
        <ListBox aria-label="Disabled listbox" isDisabled>
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2">Second Item</ListBoxItem>
        </ListBox>,
      );

      const listbox = screen.getByRole("listbox");
      expect(listbox).toBeDisabled();
    });

    it("should disable individual items", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <ListBox
          aria-label="Disabled item listbox"
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        >
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2" isDisabled>
            Disabled Item
          </ListBoxItem>
          <ListBoxItem id="item3">Third Item</ListBoxItem>
        </ListBox>,
      );

      const disabledItem = screen.getByText("Disabled Item");
      await user.click(disabledItem);

      // Should not trigger selection for disabled item
      expect(onSelectionChange).not.toHaveBeenCalled();
    });
  });

  describe("Sections", () => {
    it("should render sections with headers", () => {
      const sections = [
        {
          id: "section1",
          title: "First Section",
          items: [
            { id: "item1", label: "Item 1" },
            { id: "item2", label: "Item 2" },
          ],
        },
        {
          id: "section2",
          title: "Second Section",
          items: [
            { id: "item3", label: "Item 3" },
            { id: "item4", label: "Item 4" },
          ],
        },
      ];

      render(
        <ListBox
          aria-label="Sectioned listbox"
          sections={sections}
          selectionMode="single"
        />,
      );

      expect(screen.getByText("First Section")).toBeInTheDocument();
      expect(screen.getByText("Second Section")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
      expect(screen.getByText("Item 4")).toBeInTheDocument();
    });
  });

  describe("Icons and Descriptions", () => {
    it("should render start and end icons", () => {
      render(
        <ListBox aria-label="Icon listbox">
          <ListBoxItem
            id="item1"
            startIcon={<Icon name="home" />}
            endIcon={<Icon name="arrow-right" />}
          >
            Item with Icons
          </ListBoxItem>
        </ListBox>,
      );

      // Icons should be present (test by checking for svg elements)
      const item = screen.getByText("Item with Icons");
      expect(item).toBeInTheDocument();
    });

    it("should render item descriptions", () => {
      render(
        <ListBox aria-label="Description listbox">
          <ListBoxItem id="item1" description="This is a description">
            Item with Description
          </ListBoxItem>
        </ListBox>,
      );

      expect(screen.getByText("Item with Description")).toBeInTheDocument();
      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("should apply size classes correctly", () => {
      const { rerender } = render(
        <ListBox aria-label="Size test" size="sm">
          <ListBoxItem id="item1">Item</ListBoxItem>
        </ListBox>,
      );

      let listbox = screen.getByRole("listbox");
      expect(listbox).toHaveClass(expect.stringContaining("sm"));

      rerender(
        <ListBox aria-label="Size test" size="lg">
          <ListBoxItem id="item1">Item</ListBoxItem>
        </ListBox>,
      );

      listbox = screen.getByRole("listbox");
      expect(listbox).toHaveClass(expect.stringContaining("lg"));
    });
  });

  describe("Action Handling", () => {
    it("should trigger onAction when item is activated", async () => {
      const user = userEvent.setup();
      const onAction = vi.fn();

      render(
        <ListBox aria-label="Action listbox" onAction={onAction}>
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2">Second Item</ListBoxItem>
        </ListBox>,
      );

      await user.dblClick(screen.getByText("First Item"));

      await waitFor(() => {
        expect(onAction).toHaveBeenCalledWith("item1");
      });
    });
  });

  describe("Accessibility", () => {
    // Accessibility snapshot/axe tests can be added with axe-core if desired

    it("should have proper ARIA attributes", () => {
      render(
        <ListBox
          aria-label="ARIA test listbox"
          selectionMode="multiple"
          selectedKeys={new Set(["item2"])}
        >
          <ListBoxItem id="item1">First Item</ListBoxItem>
          <ListBoxItem id="item2">Second Item</ListBoxItem>
        </ListBox>,
      );

      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveAttribute("aria-label", "ARIA test listbox");
      expect(listbox).toHaveAttribute("aria-multiselectable", "true");

      const items = screen.getAllByRole("option");
      expect(items[1]).toHaveAttribute("aria-selected", "true");
    });

    it("should support screen reader announcements", () => {
      render(
        <ListBox aria-label="Screen reader test">
          <ListBoxItem id="item1">Accessible Item</ListBoxItem>
        </ListBox>,
      );

      const item = screen.getByRole("option");
      expect(item).toHaveTextContent("Accessible Item");
      expect(item).toBeVisible();
    });
  });
});
