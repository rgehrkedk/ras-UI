import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";

export default function ResetUser() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleReset = async () => {
    setLoading(true);
    setMessage(null);
    try {
      // Set club_id and club_role to null to reset the user's state
      await User.updateMyUserData({ club_id: null, club_role: null });
      
      setMessage({ type: 'success', text: 'Your account has been reset! Reloading...' });

      // Reload the page to apply the changes
      setTimeout(() => {
        window.location.href = createPageUrl("Home");
      }, 2000);

    } catch (error) {
      console.error("Failed to reset user:", error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <Card className="max-w-md w-full border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Account Recovery</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-slate-600 mb-6">
            If your account is stuck in an invalid state (e.g., associated with a deleted club), this tool will reset you to a regular customer.
          </p>
          
          <Button 
            onClick={handleReset} 
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {loading ? "Resetting..." : "Reset My Account"}
          </Button>

          {message && (
            <div className={`mt-4 flex items-center justify-center gap-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{message.text}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}