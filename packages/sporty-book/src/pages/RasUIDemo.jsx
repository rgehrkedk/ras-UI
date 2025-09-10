/**
 * ras-UI Demo Page
 * Showcasing the new Card and Badge components from ras-UI design system
 * This demonstrates the migration approach: expanding ras-UI with sporty-book needs
 */

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@ras-ui/react";
import { Badge, BadgeUtils } from "@ras-ui/react";
import { Button } from "@ras-ui/react";

export default function RasUIDemo() {
  const facilities = [
    {
      id: 1,
      name: "Premium Tennis Court",
      description: "Professional clay court with stadium lighting",
      sports: ["tennis"],
      amenities: ["Indoor", "Air Conditioned", "Professional Equipment"],
      price: 45,
      status: "confirmed",
      membershipTier: "premium",
      discount: 20,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Multi-Sport Arena",
      description: "Versatile space for multiple sports activities",
      sports: ["basketball", "volleyball", "football"],
      amenities: ["Indoor", "Sound System", "Scoreboard"],
      price: 35,
      status: "pending",
      membershipTier: "pro",
      discount: null,
      rating: 4.6,
    },
    {
      id: 3,
      name: "Outdoor Football Field",
      description: "Full-size grass field with changing facilities",
      sports: ["football"],
      amenities: ["Outdoor", "Natural Grass", "Flood Lights"],
      price: 60,
      status: "cancelled",
      membershipTier: "basic",
      discount: 15,
      rating: 4.9,
    },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "var(--color-semantic-text-primary, #111827)",
          }}
        >
          ras-UI Design System Demo
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--color-semantic-text-secondary, #6b7280)",
          }}
        >
          Showcasing Card and Badge components with sporty-book real-world
          patterns
        </p>
      </div>

      {/* Brand Theme Switcher */}
      <div
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          background: "var(--color-semantic-surface-raised, #f9fafb)",
          borderRadius: "0.5rem",
          border: "1px solid var(--color-semantic-border-default, #e5e7eb)",
        }}
      >
        <h3
          style={{
            margin: "0 0 0.75rem 0",
            fontSize: "1.125rem",
            fontWeight: "600",
          }}
        >
          Brand Theme Switcher
        </h3>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Button
            variant="secondary"
            size="sm"
            onPress={() => {
              document.documentElement.setAttribute("data-brand", "default");
              document.documentElement.setAttribute("data-theme", "light");
            }}
          >
            Default Light
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onPress={() => {
              document.documentElement.setAttribute("data-brand", "vibrant");
              document.documentElement.setAttribute("data-theme", "light");
            }}
          >
            Vibrant Light
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onPress={() => {
              document.documentElement.setAttribute("data-brand", "corporate");
              document.documentElement.setAttribute("data-theme", "light");
            }}
          >
            Corporate Light
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onPress={() => {
              document.documentElement.setAttribute("data-brand", "default");
              document.documentElement.setAttribute("data-theme", "dark");
            }}
          >
            Default Dark
          </Button>
        </div>
      </div>

      {/* Facility Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {facilities.map((facility) => (
          <Card key={facility.id} elevation="medium" interactive>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <CardTitle size="lg">{facility.name}</CardTitle>
                <Badge variant="glass" size="sm">
                  ⭐ {facility.rating}
                </Badge>
              </div>
              <CardDescription>{facility.description}</CardDescription>
            </CardHeader>

            <CardContent>
              {/* Sports badges - using ras-UI sports variants */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                {facility.sports.map((sport) => (
                  <Badge
                    key={sport}
                    variant={BadgeUtils.getSportVariant(sport)}
                    size="sm"
                  >
                    {sport.charAt(0).toUpperCase() + sport.slice(1)}
                  </Badge>
                ))}
              </div>

              {/* Amenities badges */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.25rem",
                  marginBottom: "1rem",
                }}
              >
                {facility.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline" size="sm">
                    {amenity}
                  </Badge>
                ))}
              </div>

              {/* Status and membership */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Badge variant={BadgeUtils.getStatusVariant(facility.status)}>
                  {facility.status.charAt(0).toUpperCase() +
                    facility.status.slice(1)}
                </Badge>
                <Badge
                  variant={BadgeUtils.getMembershipVariant(
                    facility.membershipTier,
                  )}
                >
                  {facility.membershipTier.charAt(0).toUpperCase() +
                    facility.membershipTier.slice(1)}{" "}
                  Member
                </Badge>
              </div>

              {/* Pricing */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>
                  ${facility.price}/hour
                </div>
                {facility.discount && (
                  <Badge variant="premium" size="sm">
                    {facility.discount}% Off Today
                  </Badge>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button variant="primary" fullWidth startIcon={<span>🏃‍♂️</span>}>
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Component showcase sections */}
      <div style={{ marginTop: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          Badge Component Showcase
        </h2>

        {/* Status badges */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
            }}
          >
            Status Variants
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["confirmed", "pending", "cancelled", "active", "inactive"].map(
              (status) => (
                <Badge
                  key={status}
                  variant={BadgeUtils.getStatusVariant(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              ),
            )}
          </div>
        </div>

        {/* Sport badges */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
            }}
          >
            Sports Variants (Expanding ras-UI with Domain Knowledge)
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["tennis", "basketball", "football", "volleyball"].map((sport) => (
              <Badge key={sport} variant={BadgeUtils.getSportVariant(sport)}>
                {sport.charAt(0).toUpperCase() + sport.slice(1)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Special variants */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "0.5rem",
            }}
          >
            Special Variants
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Badge variant="premium">Save up to 30%</Badge>
            <Badge variant="glass">Glass Effect</Badge>
            <Badge
              variant="primary"
              removable
              onRemove={() => alert("Removed!")}
            >
              Removable
            </Badge>
            <Badge variant="secondary" interactive>
              Clickable
            </Badge>
          </div>
        </div>
      </div>

      {/* Card elevation showcase */}
      <div style={{ marginTop: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          Card Elevation System
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {["flat", "low", "medium", "high"].map((elevation) => (
            <Card key={elevation} elevation={elevation} padding="md">
              <CardContent>
                <h4
                  style={{
                    margin: "0 0 0.25rem 0",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Elevation: {elevation}
                </h4>
                <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.7 }}>
                  Systematic depth hierarchy
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Migration benefits */}
      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          background: "var(--color-semantic-surface-raised, #f9fafb)",
          borderRadius: "0.75rem",
          border: "1px solid var(--color-semantic-border-default, #e5e7eb)",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          ras-UI Design System Benefits
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          <div>
            <Badge
              variant="success"
              size="sm"
              style={{ marginBottom: "0.5rem" }}
            >
              Design Token Integration
            </Badge>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>
              Automatic brand/theme switching through CSS custom properties
            </p>
          </div>
          <div>
            <Badge variant="info" size="sm" style={{ marginBottom: "0.5rem" }}>
              React Aria Accessibility
            </Badge>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>
              Built-in keyboard navigation and screen reader support
            </p>
          </div>
          <div>
            <Badge
              variant="warning"
              size="sm"
              style={{ marginBottom: "0.5rem" }}
            >
              Zero Runtime CSS
            </Badge>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>
              vanilla-extract provides build-time CSS optimization
            </p>
          </div>
          <div>
            <Badge
              variant="primary"
              size="sm"
              style={{ marginBottom: "0.5rem" }}
            >
              Domain-Specific Variants
            </Badge>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>
              Sports badges and facility-specific patterns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
