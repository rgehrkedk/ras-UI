import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ClubPricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = {
    freemium: {
      name: "Freemium",
      icon: <Zap className="w-6 h-6" />,
      tagline: "Perfect for getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      color: "from-gray-500 to-gray-600",
      features: [
        "Basic club listing",
        "Up to 2 facilities",
        "Community support",
        "Basic analytics",
        "Mobile responsive page"
      ],
      limitations: [
        "Limited customization",
        "SportBook branding",
        "Basic support only"
      ]
    },
    pro: {
      name: "Pro",
      icon: <Star className="w-6 h-6" />,
      tagline: "Most popular choice",
      monthlyPrice: 49,
      yearlyPrice: 490,
      color: "from-teal-500 to-teal-600",
      popular: true,
      features: [
        "Everything in Freemium",
        "Unlimited facilities",
        "Custom branding",
        "Advanced booking system",
        "Detailed analytics",
        "Priority support",
        "Social media integration",
        "Photo gallery",
        "Customer reviews"
      ]
    },
    enterprise: {
      name: "Enterprise",
      icon: <Crown className="w-6 h-6" />,
      tagline: "For large organizations",
      monthlyPrice: 149,
      yearlyPrice: 1490,
      color: "from-purple-500 to-purple-600",
      features: [
        "Everything in Pro",
        "Multi-location management",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "White-label solution",
        "Advanced reporting",
        "24/7 phone support",
        "Custom development"
      ]
    }
  };

  const getPrice = (plan) => {
    if (plan.name === "Freemium") return "Free";
    const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    const period = billingCycle === "monthly" ? "/month" : "/year";
    return `$${price}${period}`;
  };

  const getSavings = (plan) => {
    if (billingCycle === "yearly" && plan.monthlyPrice > 0) {
      const yearlyTotal = plan.monthlyPrice * 12;
      const savings = yearlyTotal - plan.yearlyPrice;
      return Math.round((savings / yearlyTotal) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Join SportBook Today
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Grow your sport club with our comprehensive booking platform. 
            Choose the perfect plan for your business needs.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex items-center">
              <Button
                variant={billingCycle === "monthly" ? "default" : "ghost"}
                onClick={() => setBillingCycle("monthly")}
                className={billingCycle === "monthly" ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === "yearly" ? "default" : "ghost"}
                onClick={() => setBillingCycle("yearly")}
                className={billingCycle === "yearly" ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                Yearly
                <Badge className="ml-2 bg-orange-100 text-orange-800">Save up to 17%</Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {Object.entries(plans).map(([key, plan]) => (
            <Card key={key} className={`relative border-0 shadow-xl ${plan.popular ? 'ring-2 ring-teal-500 transform scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl mx-auto mb-4 flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                <p className="text-slate-600">{plan.tagline}</p>
                
                <div className="mt-6">
                  <div className="text-4xl font-bold text-slate-900">
                    {getPrice(plan)}
                  </div>
                  {getSavings(plan) > 0 && (
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      Save {getSavings(plan)}%
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations && (
                  <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-700 mb-2">Limitations:</p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index}>• {limitation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link to={createPageUrl(`ClubOnboarding?plan=${key}&billing=${billingCycle}`)}>
                  <Button 
                    className={`w-full py-3 font-semibold ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700' 
                        : plan.name === 'Enterprise'
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
                    }`}
                  >
                    {plan.name === "Freemium" ? "Get Started Free" : `Start ${plan.name} Plan`}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Can I upgrade my plan later?</h3>
              <p className="text-slate-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Is there a setup fee?</h3>
              <p className="text-slate-600">No setup fees. We help you get started for free with our onboarding process.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-slate-600">We accept all major credit cards and bank transfers for enterprise plans.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-slate-600">Yes, cancel anytime. No long-term contracts or cancellation fees.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}