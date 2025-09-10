import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Plus, Trash2, Upload, Edit, LogIn } from "lucide-react"; // Added Edit and LogIn icons

const SPORTS_OPTIONS = [
  "tennis",
  "basketball",
  "football",
  "volleyball",
  "badminton",
  "squash",
  "table_tennis",
  "swimming",
  "gym",
  "yoga",
];
const AMENITIES_OPTIONS = [
  "parking",
  "locker_rooms",
  "showers",
  "cafeteria",
  "pro_shop",
  "equipment_rental",
  "coaching",
  "wifi",
  "air_conditioning",
];

export default function ClubContent() {
  const [club, setClub] = useState(null);
  const [user, setUser] = useState(null); // New state for user
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    loadClubData();
  }, []);

  const loadClubData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser); // Set user state

      if (!currentUser || !currentUser.club_id) {
        // Check if user exists AND has a club_id
        // If no user or no club_id, we stop here. The UI will then handle showing the login prompt or "club not found".
        return;
      }

      const clubs = await SportClub.list();
      const userClub = clubs.find((c) => c.id === currentUser.club_id);
      setClub(userClub);
      setFormData(userClub || {});
    } catch (error) {
      console.error("Error loading club:", error);
      setUser(null); // Explicitly set user to null on error, prompting login
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedFormData = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const addFacility = () => {
    setFormData((prev) => ({
      ...prev,
      facilities: [
        ...(prev.facilities || []),
        { name: "", sport: "", hourly_rate: 0, capacity: 2 },
      ],
    }));
  };

  const updateFacility = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      facilities: (prev.facilities || []).map((facility, i) =>
        i === index ? { ...facility, [field]: value } : facility,
      ),
    }));
  };

  const removeFacility = (index) => {
    setFormData((prev) => ({
      ...prev,
      facilities: (prev.facilities || []).filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await SportClub.update(club.id, formData);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error("Error saving club:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleLogin = async () => {
    try {
      await User.loginWithRedirect(window.location.href);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded mb-6" />
            <div className="h-64 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // New conditional rendering for unauthenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Edit className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Club Access Required
            </h2>
            <p className="text-slate-600 mb-6">
              Sign in with your club account to manage content.
            </p>
            <Button
              onClick={handleLogin}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Existing conditional rendering for authenticated but unlinked users
  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Club not found
          </h2>
          <p className="text-slate-600">
            You are logged in, but not associated with any club.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Club Content Management
            </h1>
            <p className="text-slate-600">
              Update your club information and facilities
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Status Messages */}
        {saveStatus === "success" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium">
              Changes saved successfully!
            </p>
          </div>
        )}

        {saveStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium">
              Failed to save changes. Please try again.
            </p>
          </div>
        )}

        <div className="space-y-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-base font-medium">
                  Club Name
                </Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    updateFormData("description", e.target.value)
                  }
                  className="mt-2 h-32"
                />
              </div>

              <div>
                <Label htmlFor="image_url" className="text-base font-medium">
                  Main Image URL
                </Label>
                <Input
                  id="image_url"
                  value={formData.image_url || ""}
                  onChange={(e) => updateFormData("image_url", e.target.value)}
                  placeholder="https://example.com/club-image.jpg"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-base font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.contact_phone || ""}
                    onChange={(e) =>
                      updateFormData("contact_phone", e.target.value)
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-base font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contact_email || ""}
                    onChange={(e) =>
                      updateFormData("contact_email", e.target.value)
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website" className="text-base font-medium">
                  Website URL
                </Label>
                <Input
                  id="website"
                  value={formData.homepage_url || ""}
                  onChange={(e) =>
                    updateFormData("homepage_url", e.target.value)
                  }
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Facilities Management */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Facilities & Courts</CardTitle>
                <Button onClick={addFacility} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Facility
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(formData.facilities || []).map((facility, index) => (
                  <Card key={index} className="p-4 bg-slate-50">
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <Input
                        placeholder="Facility name"
                        value={facility.name || ""}
                        onChange={(e) =>
                          updateFacility(index, "name", e.target.value)
                        }
                      />
                      <Select
                        value={facility.sport || ""}
                        onValueChange={(value) =>
                          updateFacility(index, "sport", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sport" />
                        </SelectTrigger>
                        <SelectContent>
                          {SPORTS_OPTIONS.map((sport) => (
                            <SelectItem key={sport} value={sport}>
                              {sport.charAt(0).toUpperCase() +
                                sport.slice(1).replace("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Rate/hour ($)"
                        value={facility.hourly_rate || ""}
                        onChange={(e) =>
                          updateFacility(
                            index,
                            "hourly_rate",
                            parseFloat(e.target.value),
                          )
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Max capacity"
                        value={facility.capacity || ""}
                        onChange={(e) =>
                          updateFacility(
                            index,
                            "capacity",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFacility(index)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </Card>
                ))}

                {(!formData.facilities || formData.facilities.length === 0) && (
                  <div className="text-center py-8 text-slate-500">
                    <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>
                      No facilities added yet. Click "Add Facility" to get
                      started.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sports & Amenities */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Sports & Amenities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">
                  Sports Offered
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SPORTS_OPTIONS.map((sport) => (
                    <div key={sport} className="flex items-center space-x-2">
                      <Checkbox
                        id={sport}
                        checked={(formData.sports || []).includes(sport)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("sports", [
                              ...(formData.sports || []),
                              sport,
                            ]);
                          } else {
                            updateFormData(
                              "sports",
                              (formData.sports || []).filter(
                                (s) => s !== sport,
                              ),
                            );
                          }
                        }}
                      />
                      <Label htmlFor={sport} className="capitalize">
                        {sport.replace("_", " ")}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">
                  Amenities
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AMENITIES_OPTIONS.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={(formData.amenities || []).includes(amenity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("amenities", [
                              ...(formData.amenities || []),
                              amenity,
                            ]);
                          } else {
                            updateFormData(
                              "amenities",
                              (formData.amenities || []).filter(
                                (a) => a !== amenity,
                              ),
                            );
                          }
                        }}
                      />
                      <Label htmlFor={amenity} className="capitalize">
                        {amenity.replace("_", " ")}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
