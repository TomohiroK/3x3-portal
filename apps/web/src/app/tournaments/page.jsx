"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ArrowLeft, Calendar, MapPin, ChevronDown } from "lucide-react";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamSearchTerm, setTeamSearchTerm] = useState("");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const teamDropdownRef = useRef(null);

  useEffect(() => {
    fetchTournaments();
    fetchTeams();
  }, [searchTerm, selectedTeam]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        teamDropdownRef.current &&
        !teamDropdownRef.current.contains(event.target)
      ) {
        setIsTeamDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchTournaments = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedTeam) params.append("team_id", selectedTeam);

      const response = await fetch(`/api/tournaments?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch tournaments: ${response.status}`);
      }
      const data = await response.json();
      setTournaments(data.tournaments || []);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      setTournaments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      if (!response.ok) {
        throw new Error(`Failed to fetch teams: ${response.status}`);
      }
      const data = await response.json();
      setTeams(data.teams || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeams([]);
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(teamSearchTerm.toLowerCase()),
  );

  const selectedTeamName = selectedTeam
    ? teams.find((t) => t.id === parseInt(selectedTeam))?.name || ""
    : "";

  const handleTeamSelect = (teamId) => {
    setSelectedTeam(teamId);
    setTeamSearchTerm("");
    setIsTeamDropdownOpen(false);
  };

  const filteredTournaments = tournaments.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam =
      selectedTeam === "" || item.team_id === parseInt(selectedTeam);
    return matchesSearch && matchesTeam;
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center space-x-3">
              <img
                src="https://ucarecdn.com/e6a9d736-f0f2-4eac-b852-2cdd343d0c39/-/format/auto/"
                alt="Observer's Hub"
                className="h-14 w-auto object-contain transform hover:scale-105 transition-transform duration-200"
              />
            </a>
            <a
              href="/"
              className="flex items-center space-x-2 font-bold text-sm text-white/70 hover:text-white transition-colors duration-200 uppercase tracking-wider"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-6">
            <div className="font-black text-sm tracking-[0.3em] text-[#FF1B8D] uppercase">
              — Tournaments
            </div>
            <h1 className="font-black text-6xl sm:text-7xl lg:text-8xl text-white leading-tight">
              大会予定
            </h1>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-12 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                placeholder="Search tournaments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF1B8D] focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Team Filter - Searchable Dropdown */}
            <div className="sm:w-72 relative" ref={teamDropdownRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={selectedTeamName || "チームで絞り込み..."}
                  value={teamSearchTerm}
                  onChange={(e) => {
                    setTeamSearchTerm(e.target.value);
                    setIsTeamDropdownOpen(true);
                  }}
                  onFocus={() => setIsTeamDropdownOpen(true)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF1B8D] focus:border-transparent transition-all duration-200 pr-12"
                />
                <ChevronDown
                  size={20}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-transform duration-200 ${isTeamDropdownOpen ? "rotate-180" : ""}`}
                />
              </div>

              {/* Dropdown List */}
              {isTeamDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-[#2a2a2a] border border-white/10 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                  {/* All Teams Option */}
                  <button
                    onClick={() => handleTeamSelect("")}
                    className="w-full text-left px-6 py-3 font-bold text-white hover:bg-white/10 transition-colors duration-200 border-b border-white/5"
                  >
                    すべてのチーム
                  </button>

                  {/* Filtered Teams */}
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team) => (
                      <button
                        key={team.id}
                        onClick={() => handleTeamSelect(team.id.toString())}
                        className={`w-full text-left px-6 py-3 font-bold text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 ${
                          selectedTeam === team.id.toString()
                            ? "bg-[#FF1B8D]/20 text-[#FF1B8D]"
                            : ""
                        }`}
                      >
                        {team.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-white/40 font-bold text-sm">
                      チームが見つかりません
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tournaments List */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="font-bold text-white/60">Loading...</p>
            </div>
          ) : filteredTournaments.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-bold text-white/60">No tournaments found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTournaments.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#FF1B8D]/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF1B8D]/20"
                >
                  <div className="relative h-56 bg-black/30 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-black text-2xl text-white mb-4 leading-tight group-hover:text-[#FF1B8D] transition-colors duration-200">
                      {item.name}
                    </h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FF1B8D]/20 flex items-center justify-center flex-shrink-0">
                          <Calendar size={16} className="text-[#FF1B8D]" />
                        </div>
                        <span className="font-bold text-sm text-white/80">
                          {new Date(item.date).toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FF1B8D]/20 flex items-center justify-center flex-shrink-0">
                          <MapPin size={16} className="text-[#FF1B8D]" />
                        </div>
                        <span className="font-bold text-sm text-white/80">
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <p className="font-medium text-sm text-white/60 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
