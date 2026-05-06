import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Mail, Phone, Chrome, Building2 } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [authMethod, setAuthMethod] = useState<"email" | "phone" | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSocialLogin = (provider: string) => {
    // Mock social login
    console.log(`Logging in with ${provider}`);
    navigate("/profile");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full border-2 border-primary-foreground" />
          <div className="absolute bottom-32 right-16 w-64 h-64 rounded-full border-2 border-primary-foreground" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full border-2 border-primary-foreground" />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Briefcase className="w-12 h-12 text-primary-foreground" />
            <h1 className="text-5xl font-display font-800 text-primary-foreground tracking-tight">SmartHire</h1>
          </div>
          <p className="text-xl text-primary-foreground/80 max-w-md leading-relaxed">
            Your gateway to career opportunities. Connect with top companies and find your dream job.
          </p>
        </div>
      </div>

      {/* Right auth panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Briefcase className="w-8 h-8 text-primary" />
            <span className="text-3xl font-display font-800 text-gradient">SmartHire</span>
          </div>

          <h2 className="text-2xl font-display font-700 text-foreground mb-2">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {mode === "login" ? "Sign in to access your dashboard" : "Get started with SmartHire today"}
          </p>

          {/* Social login buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full h-12 text-base gap-3 border-border hover:bg-secondary"
              onClick={() => handleSocialLogin("google")}
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 text-base gap-3 border-border hover:bg-secondary"
              onClick={() => handleSocialLogin("microsoft")}
            >
              <Building2 className="w-5 h-5" />
              Continue with Microsoft
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Auth method tabs */}
          {!authMethod && (
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 gap-2 border-border hover:bg-secondary"
                onClick={() => setAuthMethod("email")}
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
              <Button
                variant="outline"
                className="h-12 gap-2 border-border hover:bg-secondary"
                onClick={() => setAuthMethod("phone")}
              >
                <Phone className="w-4 h-4" />
                Phone OTP
              </Button>
            </div>
          )}

          {/* Email form */}
          {authMethod === "email" && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleEmailSubmit}
              className="space-y-4"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
              <Input
                type="password"
                placeholder="Enter your password"
                className="h-12"
                required
              />
              <Button type="submit" className="w-full h-12 text-base font-600">
                {mode === "login" ? "Sign In" : "Create Account"}
              </Button>
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={() => { setAuthMethod(null); setOtpSent(false); }}
              >
                ← Back to options
              </button>
            </motion.form>
          )}

          {/* Phone OTP form */}
          {authMethod === "phone" && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handlePhoneSubmit}
              className="space-y-4"
            >
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12"
                required
              />
              {otpSent && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="h-12"
                    maxLength={6}
                    required
                  />
                  <p className="text-sm text-smarthire-success mt-1">OTP sent to {phone}</p>
                </motion.div>
              )}
              <Button type="submit" className="w-full h-12 text-base font-600">
                {otpSent ? "Verify OTP" : "Send OTP"}
              </Button>
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={() => { setAuthMethod(null); setOtpSent(false); }}
              >
                ← Back to options
              </button>
            </motion.form>
          )}

          {/* Toggle login/signup */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-primary font-600 hover:underline"
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
