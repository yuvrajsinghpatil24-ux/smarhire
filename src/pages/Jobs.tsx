import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { jobs, companies, JOB_CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS, getCompanyById } from "@/data/jobs";
import { Briefcase, Search, MapPin, DollarSign, Clock, Building, Filter, X } from "lucide-react";

const Jobs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(job.category);
      const matchesType = !selectedType || job.type === selectedType;
      const matchesExperience = !selectedExperience || job.experience === selectedExperience;
      return matchesSearch && matchesCategory && matchesType && matchesExperience;
    });
  }, [searchQuery, selectedCategories, selectedType, selectedExperience]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedType("");
    setSelectedExperience("");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedType || selectedExperience;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            <span className="text-xl font-display font-700 text-gradient">SmartHire</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>Profile</Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-display font-800 text-foreground mb-3">
            Find Your Dream Job
          </h1>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Browse {jobs.length}+ opportunities from top companies worldwide
          </p>
          <div className="flex items-center max-w-xl mx-auto gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs, roles, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-card border border-border rounded-xl p-6 mb-8 card-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-600 text-foreground">Filters</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                  <X className="w-4 h-4" /> Clear all
                </Button>
              )}
            </div>

            {/* Categories */}
            <div className="mb-4">
              <p className="text-sm font-500 text-muted-foreground mb-2">Job Category</p>
              <div className="flex flex-wrap gap-2">
                {JOB_CATEGORIES.map((cat) => (
                  <Badge
                    key={cat}
                    variant={selectedCategories.includes(cat) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedCategories.includes(cat)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => toggleCategory(cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Type & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-500 text-muted-foreground mb-2">Job Type</p>
                <div className="flex flex-wrap gap-2">
                  {JOB_TYPES.map((type) => (
                    <Badge
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        selectedType === type
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => setSelectedType(selectedType === type ? "" : type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-500 text-muted-foreground mb-2">Experience Level</p>
                <div className="flex flex-wrap gap-2">
                  {EXPERIENCE_LEVELS.map((exp) => (
                    <Badge
                      key={exp}
                      variant={selectedExperience === exp ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        selectedExperience === exp
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => setSelectedExperience(selectedExperience === exp ? "" : exp)}
                    >
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-600 text-foreground">{filteredJobs.length}</span> jobs
          </p>
        </div>

        {/* Job cards */}
        <div className="grid gap-4">
          {filteredJobs.map((job, i) => {
            const company = getCompanyById(job.companyId);
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => navigate(`/company/${job.companyId}/job/${job.id}`)}
                className="bg-card border border-border rounded-xl p-5 cursor-pointer hover:card-shadow-hover hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-display font-700 text-lg shrink-0">
                    {company?.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-600 text-foreground group-hover:text-primary transition-colors text-lg">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-0.5">{company?.name}</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{company?.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.postedDate}</span>
                      <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" />{job.type}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="secondary" className="text-xs">{job.category}</Badge>
                      <Badge variant="outline" className="text-xs">{job.experience}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 hidden md:flex">
                    View Details
                  </Button>
                </div>
              </motion.div>
            );
          })}

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-display font-600 text-foreground mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
