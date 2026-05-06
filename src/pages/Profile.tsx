import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Linkedin, User, GraduationCap, Calendar } from "lucide-react";

const qualifications = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD / Doctorate",
  "Professional Certification",
];

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    qualification: "",
    experience: "",
    skills: "",
    linkedinUrl: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/jobs");
  };

  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/in/", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-primary" />
          <span className="text-xl font-display font-700 text-gradient">SmartHire</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-600">✓</div>
              <span className="text-sm font-500 text-muted-foreground">Account</span>
            </div>
            <div className="flex-1 h-px bg-primary" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-600">2</div>
              <span className="text-sm font-600 text-foreground">Profile</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground text-sm font-600">3</div>
              <span className="text-sm font-500 text-muted-foreground">Jobs</span>
            </div>
          </div>

          <h1 className="text-3xl font-display font-700 text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground mb-8">Help us match you with the best opportunities</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-500 text-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" /> First Name
                </label>
                <Input
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-500 text-foreground mb-2 block">Last Name</label>
                <Input
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="h-11"
                  required
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="text-sm font-500 text-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" /> Age
              </label>
              <Input
                type="number"
                placeholder="25"
                min="16"
                max="100"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                className="h-11"
                required
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="text-sm font-500 text-foreground mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-muted-foreground" /> Highest Qualification
              </label>
              <Select onValueChange={(v) => handleChange("qualification", v)} required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  {qualifications.map((q) => (
                    <SelectItem key={q} value={q}>{q}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-500 text-foreground mb-2 block">Years of Experience</label>
              <Input
                type="number"
                placeholder="3"
                min="0"
                max="50"
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                className="h-11"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="text-sm font-500 text-foreground mb-2 block">Key Skills</label>
              <Input
                placeholder="React, Python, SQL, Machine Learning..."
                value={formData.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
                className="h-11"
              />
            </div>

            {/* LinkedIn */}
            <div className="bg-secondary/50 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <span className="font-500 text-foreground">Connect LinkedIn</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleLinkedIn}
                  className="gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect
                </Button>
              </div>
              <Input
                placeholder="https://linkedin.com/in/your-profile"
                value={formData.linkedinUrl}
                onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                className="h-11"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-600">
              Continue to Job Preferences →
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
