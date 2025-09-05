
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, Upload, MapPin, Clock, Star, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

// Import real entity SDKs

const STEPS = [
  { id: 1, title: "Plan Selection", description: "Confirm your chosen plan" },
  { id: 2, title: "Basic Info", description: "Club name and description" },
  { id: 3, title: "Location", description: "Address and contact details" },
  { id: 4, title: "Facilities", description: "Sports and amenities" },
  { id: 5, title: "Content", description: "Images and additional info" },
  { id: 6, title: "Payment", description: "Complete your subscription" }
];

const SPORTS_OPTIONS = ["tennis", "basketball", "football", "volleyball", "badminton", "squash", "table_tennis", "swimming", "gym", "yoga"];
const AMENITIES_OPTIONS = ["parking", "locker_rooms", "showers", "cafeteria", "pro_shop", "equipment_rental", "coaching", "wifi", "air_conditioning"];

export default function ClubOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [completing, setCompleting] = useState(false);
  const [completionResult, setCompletionResult] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: {
      address: "",
      latitude: "",
      longitude: ""
    },
    contact_phone: "",
    contact_email: "",
    homepage_url: "",
    social_media: {
      facebook: "",
      instagram: "",
      twitter: ""
    },
    sports: [],
    facilities: [],
    amenities: [],
    operating_hours: {
      weekday: "",
      weekend: "",
      notes: ""
    },
    image_url: "",
    other_info: ""
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    const billing = urlParams.get('billing');
    
    if (plan) setSelectedPlan(plan);
    if (billing) setBillingCycle(billing);
  }, []);

  const plans = {
    freemium: { name: "Freemium", monthlyPrice: 0, yearlyPrice: 0, color: "from-gray-500 to-gray-600" },
    pro: { name: "Pro", monthlyPrice: 49, yearlyPrice: 490, color: "from-teal-500 to-teal-600" },
    enterprise: { name: "Enterprise", monthlyPrice: 149, yearlyPrice: 1490, color: "from-purple-500 to-purple-600" }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedFormData = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const addFacility = () => {
    setFormData(prev => ({
      ...prev,
      facilities: [...prev.facilities, { name: "", sport: "", hourly_rate: 0, capacity: 2 }]
    }));
  };

  const updateFacility = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.map((facility, i) => 
        i === index ? { ...facility, [field]: value } : facility
      )
    }));
  };

  const removeFacility = (index) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index)
    }));
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      // Create the club first
      const clubData = {
        ...formData,
        rating: 4.5
      };
      
      console.log("Creating club with data:", clubData);
      const newClub = await SportClub.create(clubData);
      console.log("Created club successfully:", newClub);
      
      // Create subscription record
      const subscriptionData = {
        club_id: newClub.id,
        plan_type: selectedPlan || "freemium",
        billing_cycle: billingCycle,
        monthly_price: plans[selectedPlan || "freemium"].monthlyPrice,
        yearly_price: plans[selectedPlan || "freemium"].yearlyPrice,
        status: "active",
        start_date: format(new Date(), "yyyy-MM-dd"),
        next_billing_date: format(
          billingCycle === "monthly" 
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          "yyyy-MM-dd"
        ),
        features_included: selectedPlan === "freemium" 
          ? ["Basic club listing", "Up to 2 facilities"]
          : selectedPlan === "pro"
          ? ["Unlimited facilities", "Custom branding", "Advanced analytics"]
          : ["Multi-location", "API access", "Dedicated support"]
      };
      
      console.log("Creating subscription with data:", subscriptionData);
      const newSubscription = await ClubSubscription.create(subscriptionData);
      console.log("Created subscription successfully:", newSubscription);
      
      // Update current user to be admin of this club
      const updateData = {
        club_id: newClub.id,
        club_role: "admin"
      };
      
      console.log("Updating user with data:", updateData);
      await User.updateMyUserData(updateData);
      console.log("Updated user successfully");
      
      // Show success message
      setCompletionResult({
        club: newClub,
        subscription: newSubscription,
        success: true
      });
      
      // Redirect after showing success
      setTimeout(() => {
        window.location.href = createPageUrl("ClubDashboard");
      }, 3000);
      
    } catch (error) {
      console.error("Error completing setup:", error);
      setCompletionResult({
        error: error.message,
        success: false
      });
    } finally {
      setCompleting(false);
    }
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PlanSelectionStep plan={selectedPlan} plans={plans} billingCycle={billingCycle} />;
      case 2:
        return <BasicInfoStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <LocationStep formData={formData} updateFormData={updateFormData} updateNestedFormData={updateNestedFormData} />;
      case 4:
        return <FacilitiesStep 
          formData={formData} 
          updateFormData={updateFormData}
          addFacility={addFacility}
          updateFacility={updateFacility}
          removeFacility={removeFacility}
          updateNestedFormData={updateNestedFormData} 
        />;
      case 5:
        return <ContentStep formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <PaymentStep plan={selectedPlan} plans={plans} billingCycle={billingCycle} formData={formData} />;
      default:
        return null;
    }
  };

  // Show completion result
  if (completionResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <div className="max-w-2xl mx-auto px-6">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              {completionResult.success ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Welcome to SportBook! 🎉
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Your club has been successfully created and is now live on our platform.
                  </p>
                  
                  {/* Show created records */}
                  <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-slate-900 mb-3">Setup Summary:</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Club:</strong> {completionResult.club.name}</p>
                      <p><strong>Club ID:</strong> {completionResult.club.id}</p>
                      <p><strong>Subscription:</strong> {completionResult.subscription.plan_type} ({completionResult.subscription.billing_cycle})</p>
                      <p><strong>Status:</strong> {completionResult.subscription.status}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500">
                    Redirecting to your dashboard in a few seconds...
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="w-16 h-16 text-red-600 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Setup Failed</h2>
                  <p className="text-slate-600 mb-6">
                    {completionResult.error || "An unknown error occurred. Please try again."}
                  </p>
                  <Button onClick={() => setCompletionResult(null)}>
                    Try Again
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-6 w-full min-w-0">
        {/* Progress Bar */}
        <div className="mb-8 w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-slate-900">Club Onboarding</h1>
            <Badge variant="outline" className="text-slate-600 flex-shrink-0">
              Step {currentStep} of {STEPS.length}
            </Badge>
          </div>
          
          {/* Desktop Step Indicator */}
          <div className="hidden md:flex items-center gap-2 pb-2">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 flex-grow">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.id < currentStep ? 'bg-teal-600 text-white' :
                    step.id === currentStep ? 'bg-teal-100 text-teal-600 border-2 border-teal-600' :
                    'bg-slate-200 text-slate-500'
                  }`}>
                    {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 whitespace-nowrap">{step.title}</p>
                    <p className="text-sm text-slate-500 whitespace-nowrap">{step.description}</p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-0.5 flex-grow mx-2 ${step.id < currentStep ? 'bg-teal-600' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile Step Indicator */}
          <div className="block md:hidden space-y-2">
            <p className="text-sm font-medium text-slate-800 text-center">
                {STEPS[currentStep - 1].title}
            </p>
            <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                    className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                ></div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-0 shadow-xl min-h-96 w-full">
          {renderStepContent()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8 gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1 || completing}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          {currentStep < STEPS.length ? (
            <Button
              onClick={handleNext}
              disabled={completing}
              className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2 flex-shrink-0"
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              disabled={completing}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2 flex-shrink-0"
            >
              <span className="hidden sm:inline">{completing ? "Setting up..." : "Complete Setup"}</span>
              <Check className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Step Components
const PlanSelectionStep = ({ plan, plans, billingCycle }) => {
  const selectedPlan = plans[plan];
  
  return (
    <CardContent className="p-8">
      <CardTitle className="text-xl mb-6">Confirm Your Plan Selection</CardTitle>
      
      {selectedPlan ? (
        <div className="bg-slate-50 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${selectedPlan.color} rounded-xl flex items-center justify-center text-white`}>
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{selectedPlan.name} Plan</h3>
              <p className="text-slate-600">
                {billingCycle === "monthly" ? `$${selectedPlan.monthlyPrice}/month` : `$${selectedPlan.yearlyPrice}/year`}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to={createPageUrl("ClubPricing")}>
              <Button variant="outline">Change Plan</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-600 mb-4">No plan selected</p>
          <Link to={createPageUrl("ClubPricing")}>
            <Button className="bg-teal-600 hover:bg-teal-700">Choose a Plan</Button>
          </Link>
        </div>
      )}
    </CardContent>
  );
};

const BasicInfoStep = ({ formData, updateFormData }) => (
  <CardContent className="p-8">
    <CardTitle className="text-xl mb-6">Tell us about your club</CardTitle>
    
    <div className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-base font-medium">Club Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          placeholder="e.g., Elite Tennis Club"
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="description" className="text-base font-medium">Club Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          placeholder="Describe your club's atmosphere, history, and what makes it special..."
          className="mt-2 h-32"
        />
      </div>
    </div>
  </CardContent>
);

const LocationStep = ({ formData, updateFormData, updateNestedFormData }) => (
  <CardContent className="p-8">
    <CardTitle className="text-xl mb-6">Location & Contact Information</CardTitle>
    
    <div className="space-y-6">
      <div>
        <Label htmlFor="address" className="text-base font-medium">Club Address *</Label>
        <Input
          id="address"
          value={formData.location.address}
          onChange={(e) => updateNestedFormData("location", "address", e.target.value)}
          placeholder="123 Sport Street, City, State 12345"
          className="mt-2"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="text-base font-medium">Phone Number</Label>
          <Input
            id="phone"
            value={formData.contact_phone}
            onChange={(e) => updateFormData("contact_phone", e.target.value)}
            placeholder="(555) 123-4567"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.contact_email}
            onChange={(e) => updateFormData("contact_email", e.target.value)}
            placeholder="info@yourclub.com"
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="website" className="text-base font-medium">Website URL</Label>
        <Input
          id="website"
          value={formData.homepage_url}
          onChange={(e) => updateFormData("homepage_url", e.target.value)}
          placeholder="https://www.yourclub.com"
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Social Media (Optional)</Label>
        <div className="grid md:grid-cols-3 gap-4">
          <Input
            value={formData.social_media.facebook}
            onChange={(e) => updateNestedFormData("social_media", "facebook", e.target.value)}
            placeholder="Facebook URL"
          />
          <Input
            value={formData.social_media.instagram}
            onChange={(e) => updateNestedFormData("social_media", "instagram", e.target.value)}
            placeholder="Instagram URL"
          />
          <Input
            value={formData.social_media.twitter}
            onChange={(e) => updateNestedFormData("social_media", "twitter", e.target.value)}
            placeholder="Twitter URL"
          />
        </div>
      </div>
    </div>
  </CardContent>
);

const FacilitiesStep = ({ formData, updateFormData, addFacility, updateFacility, removeFacility, updateNestedFormData }) => (
  <CardContent className="p-8">
    <CardTitle className="text-xl mb-6">Sports & Facilities</CardTitle>
    
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-3 block">Sports Offered *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SPORTS_OPTIONS.map(sport => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={sport}
                checked={formData.sports.includes(sport)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData("sports", [...formData.sports, sport]);
                  } else {
                    updateFormData("sports", formData.sports.filter(s => s !== sport));
                  }
                }}
              />
              <Label htmlFor={sport} className="capitalize">
                {sport.replace('_', ' ')}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <Label className="text-base font-medium">Facilities & Courts</Label>
          <Button onClick={addFacility} variant="outline" size="sm">
            Add Facility
          </Button>
        </div>
        
        <div className="space-y-4">
          {formData.facilities.map((facility, index) => (
            <Card key={index} className="p-4">
              <div className="grid md:grid-cols-4 gap-4">
                <Input
                  placeholder="Facility name"
                  value={facility.name}
                  onChange={(e) => updateFacility(index, "name", e.target.value)}
                />
                <Select value={facility.sport} onValueChange={(value) => updateFacility(index, "sport", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sport" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPORTS_OPTIONS.map(sport => (
                      <SelectItem key={sport} value={sport}>
                        {sport.charAt(0).toUpperCase() + sport.slice(1).replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Rate/hour"
                  value={facility.hourly_rate}
                  onChange={(e) => updateFacility(index, "hourly_rate", parseFloat(e.target.value))}
                />
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Capacity"
                    value={facility.capacity}
                    onChange={(e) => updateFacility(index, "capacity", parseInt(e.target.value))}
                  />
                  <Button variant="outline" size="sm" onClick={() => removeFacility(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Amenities</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {AMENITIES_OPTIONS.map(amenity => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={formData.amenities.includes(amenity)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData("amenities", [...formData.amenities, amenity]);
                  } else {
                    updateFormData("amenities", formData.amenities.filter(a => a !== amenity));
                  }
                }}
              />
              <Label htmlFor={amenity} className="capitalize">
                {amenity.replace('_', ' ')}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Operating Hours</Label>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weekday_hours">Weekday Hours</Label>
            <Input
              id="weekday_hours"
              value={formData.operating_hours.weekday}
              onChange={(e) => updateNestedFormData("operating_hours", "weekday", e.target.value)}
              placeholder="e.g., 08:00 - 22:00"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="weekend_hours">Weekend Hours</Label>
            <Input
              id="weekend_hours"
              value={formData.operating_hours.weekend}
              onChange={(e) => updateNestedFormData("operating_hours", "weekend", e.target.value)}
              placeholder="e.g., 09:00 - 20:00"
              className="mt-1"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="hours_notes">Special Notes</Label>
          <Input
            id="hours_notes"
            value={formData.operating_hours.notes}
            onChange={(e) => updateNestedFormData("operating_hours", "notes", e.target.value)}
            placeholder="Holiday hours, seasonal changes, etc."
            className="mt-1"
          />
        </div>
      </div>
    </div>
  </CardContent>
);

const ContentStep = ({ formData, updateFormData }) => (
  <CardContent className="p-8">
    <CardTitle className="text-xl mb-6">Images & Additional Content</CardTitle>
    
    <div className="space-y-6">
      <div>
        <Label htmlFor="image_url" className="text-base font-medium">Main Club Image URL</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => updateFormData("image_url", e.target.value)}
          placeholder="https://example.com/club-image.jpg"
          className="mt-2"
        />
        <p className="text-sm text-slate-500 mt-1">
          You can upload images through the file upload feature or use URLs from photo hosting services.
        </p>
      </div>

      <div>
        <Label htmlFor="other_info" className="text-base font-medium">Additional Information</Label>
        <Textarea
          id="other_info"
          value={formData.other_info}
          onChange={(e) => updateFormData("other_info", e.target.value)}
          placeholder="Add any other information about your club using Markdown formatting..."
          className="mt-2 h-40"
        />
        <p className="text-sm text-slate-500 mt-1">
          You can use Markdown formatting for rich content (headers, lists, links, etc.)
        </p>
      </div>
    </div>
  </CardContent>
);

const PaymentStep = ({ plan, plans, billingCycle, formData }) => {
  const selectedPlan = plans[plan || "freemium"]; // Default to freemium if no plan selected (for display)
  const price = billingCycle === "monthly" ? selectedPlan?.monthlyPrice : selectedPlan?.yearlyPrice;
  
  return (
    <CardContent className="p-8">
      <CardTitle className="text-xl mb-6">Complete Your Subscription</CardTitle>
      
      <div className="space-y-6">
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Plan:</span>
              <span className="font-semibold">{selectedPlan?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Billing:</span>
              <span className="capitalize">{billingCycle}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2 border-t">
              <span>Total:</span>
              <span>${price || 0}{billingCycle === "monthly" ? "/month" : "/year"}</span>
            </div>
          </div>
        </div>

        {price > 0 ? (
          <div className="space-y-4">
            <Label className="text-base font-medium">Payment Information</Label>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Demo Mode:</strong> This is a demonstration. In a real application, 
                this would integrate with payment processors like Stripe or PayPal.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Card Number" disabled />
              <Input placeholder="MM/YY" disabled />
              <Input placeholder="Cardholder Name" disabled />
              <Input placeholder="CVC" disabled />
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              <strong>Great choice!</strong> Your Freemium plan is completely free. 
              Click "Complete Setup" to finish creating your club profile.
            </p>
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-slate-500">
            By completing this setup, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </CardContent>
  );
};
