import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  CreditCard,
  Users,
  Shield,
  Crown,
  Star,
  Zap,
  Plus,
  LogIn,
} from "lucide-react"; // Added LogIn
import { format, parseISO } from "date-fns";

export default function ClubSettings() {
  const [user, setUser] = useState(null);
  const [club, setClub] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [clubStaff, setClubStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("subscription");

  useEffect(() => {
    loadSettingsData();
  }, []);

  const loadSettingsData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      if (!currentUser.club_id) {
        // If user has no club_id, we stop loading club-specific data, but the user object is set.
        return;
      }

      const clubs = await SportClub.list();
      const userClub = clubs.find((c) => c.id === currentUser.club_id);
      setClub(userClub);

      const subscriptions = await ClubSubscription.filter({
        club_id: currentUser.club_id,
      });
      setSubscription(subscriptions[0]);

      const allUsers = await User.list();
      const staff = allUsers.filter((u) => u.club_id === currentUser.club_id);
      setClubStaff(staff);
    } catch (error) {
      console.error("Error loading settings:", error);
      // If there's an error (e.g., not authenticated), clear the user state
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await User.update(userId, { club_role: newRole });
      loadSettingsData();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleLogin = async () => {
    try {
      // Assuming User.loginWithRedirect handles the redirection to the auth provider
      // and then back to the current page after successful login.
      await User.loginWithRedirect(window.location.href);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const getPlanIcon = (planType) => {
    switch (planType) {
      case "freemium":
        return <Zap className="w-5 h-5" />;
      case "pro":
        return <Star className="w-5 h-5" />;
      case "enterprise":
        return <Crown className="w-5 h-5" />;
      default:
        return <Settings className="w-5 h-5" />;
    }
  };

  const getPlanColor = (planType) => {
    switch (planType) {
      case "freemium":
        return "from-gray-500 to-gray-600";
      case "pro":
        return "from-teal-500 to-teal-600";
      case "enterprise":
        return "from-purple-500 to-purple-600";
      default:
        return "from-slate-500 to-slate-600";
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

  // New check for unauthenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Settings className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Club Access Required
            </h2>
            <p className="text-slate-600 mb-6">
              Sign in with your club account to access settings.
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

  // Existing check for users without a club associated
  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Club not found
          </h2>
          <p className="text-slate-600">
            You are not associated with any club.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Club Settings
          </h1>
          <p className="text-slate-600">
            Manage subscription and team for {club.name}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab("subscription")}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === "subscription"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Subscription
            </button>
            {user.club_role === "admin" && (
              <button
                onClick={() => setActiveTab("team")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "team"
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Team Management
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "subscription" && (
          <div className="space-y-8">
            {/* Current Plan */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Current Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                {subscription ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${getPlanColor(subscription.plan_type)} rounded-xl flex items-center justify-center text-white`}
                      >
                        {getPlanIcon(subscription.plan_type)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 capitalize">
                          {subscription.plan_type} Plan
                        </h3>
                        <p className="text-slate-600">
                          $
                          {subscription.billing_cycle === "monthly"
                            ? subscription.monthly_price
                            : subscription.yearly_price}
                          /
                          {subscription.billing_cycle === "monthly"
                            ? "month"
                            : "year"}
                        </p>
                      </div>
                      <Badge
                        className={
                          subscription.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {subscription.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Start Date</p>
                        <p className="font-semibold text-slate-900">
                          {format(
                            parseISO(subscription.start_date),
                            "MMM d, yyyy",
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">Next Billing</p>
                        <p className="font-semibold text-slate-900">
                          {format(
                            parseISO(subscription.next_billing_date),
                            "MMM d, yyyy",
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Update Payment Method
                      </Button>
                      <Button variant="outline">Change Plan</Button>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      No active subscription
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Subscribe to a plan to unlock premium features.
                    </p>
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      Choose a Plan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "team" && user.club_role === "admin" && (
          <div className="space-y-8">
            {/* Team Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Team Management</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Staff
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {clubStaff.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      No team members
                    </h3>
                    <p className="text-slate-600">
                      Invite staff members to help manage your club.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {clubStaff.map((staff) => (
                      <div key={staff.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {staff.full_name?.charAt(0).toUpperCase() ||
                                staff.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900">
                                {staff.full_name || staff.email}
                              </h4>
                              <p className="text-sm text-slate-600">
                                {staff.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <Badge
                              className={
                                staff.club_role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              <Shield className="w-3 h-3 mr-1" />
                              {staff.club_role || "coach"}
                            </Badge>

                            {staff.id !== user.id && (
                              <Select
                                value={staff.club_role || "coach"}
                                onValueChange={(value) =>
                                  updateUserRole(staff.id, value)
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="coach">Coach</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
