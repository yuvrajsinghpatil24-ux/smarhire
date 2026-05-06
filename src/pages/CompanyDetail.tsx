import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getCompanyById, getJobById } from "@/data/jobs";
import {
  Briefcase, MapPin, Users, Globe, Calendar, CheckCircle2,
  Upload, FileText, ArrowLeft, Building, DollarSign, Clock,
} from "lucide-react";
import { toast } from "sonner";

const CompanyDetail = () => {
  const { companyId, jobId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [applied, setApplied] = useState(false);

  const company = getCompanyById(companyId || "");
  const job = jobId ? getJobById(jobId) : null;

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-display font-600 text-foreground mb-2">Company not found</h2>
          <Button onClick={() => navigate("/jobs")}>Back to Jobs</Button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be under 5MB");
        return;
      }
      setResumeFile(file);
      toast.success(`Resume "${file.name}" uploaded successfully`);
    }
  };

  const handleApply = () => {
    if (!resumeFile) {
      toast.error("Please upload your resume first");
      return;
    }
    setApplied(true);
    toast.success("Application submitted! The company will contact you via your registered email or phone.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            <span className="text-xl font-display font-700 text-gradient">SmartHire</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/jobs")} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Company header */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6 card-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-display font-800 text-2xl shrink-0">
                {company.logo}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-display font-700 text-foreground">{company.name}</h1>
                <p className="text-muted-foreground mt-1">{company.about}</p>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{company.location}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{company.size} employees</span>
                  <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />{company.website}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Founded {company.founded}</span>
                  <span className="flex items-center gap-1.5"><Building className="w-4 h-4" />{company.industry}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6 card-shadow">
            <h2 className="text-lg font-display font-600 text-foreground mb-3">Benefits & Perks</h2>
            <div className="flex flex-wrap gap-2">
              {company.benefits.map((b) => (
                <Badge key={b} variant="secondary" className="gap-1.5 py-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-smarthire-success" />
                  {b}
                </Badge>
              ))}
            </div>
          </div>

          {/* Selected Job Details */}
          {job && (
            <div className="bg-card border border-border rounded-xl p-6 mb-6 card-shadow">
              <h2 className="text-xl font-display font-700 text-foreground mb-1">{job.title}</h2>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{job.salary}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.type}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{job.experience}</span>
              </div>
              <p className="text-muted-foreground mb-6">{job.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-display font-600 text-foreground mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display font-600 text-foreground mb-3">Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Resume Upload & Apply */}
          <div className="bg-card border border-border rounded-xl p-6 card-shadow">
            <h2 className="text-lg font-display font-600 text-foreground mb-4">
              {applied ? "Application Submitted!" : "Apply for this Position"}
            </h2>

            {applied ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <CheckCircle2 className="w-16 h-16 text-smarthire-success mx-auto mb-4" />
                <h3 className="text-xl font-display font-600 text-foreground mb-2">
                  You've successfully applied!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {company.name} will review your resume and contact you via your registered
                  email, Microsoft account, or phone number. Good luck!
                </p>
                <Button className="mt-6" onClick={() => navigate("/jobs")}>
                  Browse More Jobs
                </Button>
              </motion.div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your resume so {company.name}'s recruiters and interviewers can review your profile.
                  They will contact you via your registered contact details (email, Microsoft, or phone).
                </p>

                {/* File upload area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-all"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {resumeFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="text-left">
                        <p className="font-500 text-foreground">{resumeFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(resumeFile.size / 1024).toFixed(1)} KB — Click to change
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="font-500 text-foreground mb-1">Upload your resume</p>
                      <p className="text-sm text-muted-foreground">PDF, DOC, DOCX — Max 5MB</p>
                    </>
                  )}
                </div>

                <Button
                  className="w-full h-12 text-base font-600 mt-6"
                  onClick={handleApply}
                  disabled={!resumeFile}
                >
                  Submit Application
                </Button>
              </>
            )}
          </div>

          {/* Other positions at this company */}
          {company.openPositions.length > 1 && (
            <div className="mt-6">
              <h2 className="text-lg font-display font-600 text-foreground mb-4">
                Other Positions at {company.name}
              </h2>
              <div className="grid gap-3">
                {company.openPositions
                  .filter((p) => p.id !== jobId)
                  .map((pos) => (
                    <div
                      key={pos.id}
                      onClick={() => navigate(`/company/${companyId}/job/${pos.id}`)}
                      className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-primary/30 transition-all"
                    >
                      <h3 className="font-500 text-foreground">{pos.title}</h3>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">{pos.category}</Badge>
                        <Badge variant="outline" className="text-xs">{pos.type}</Badge>
                        <span className="text-xs text-muted-foreground">{pos.salary}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyDetail;
