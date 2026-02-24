"use client";

import { useState, useEffect } from "react";
import { Search, ArrowLeft, MapPin } from "lucide-react";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, [searchTerm]);

  const fetchTeams = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);

      const response = await fetch(`/api/teams?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch teams: ${response.status}`);
      }
      const data = await response.json();
      setTeams(data.teams || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
            <div className="font-black text-sm tracking-[0.3em] text-[#00E676] uppercase">
              — Teams
            </div>
            <h1 className="font-black text-6xl sm:text-7xl lg:text-8xl text-white leading-tight">
              チーム一覧
            </h1>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="pb-12 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00E676] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </section>

      {/* Teams List */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="font-bold text-white/60">Loading...</p>
            </div>
          ) : filteredTeams.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-bold text-white/60">No teams found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTeams.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#00E676]/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00E676]/20"
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
                    <h3 className="font-black text-2xl text-white mb-4 leading-tight group-hover:text-[#00E676] transition-colors duration-200">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-[#00E676]/20 flex items-center justify-center flex-shrink-0">
                        <MapPin size={16} className="text-[#00E676]" />
                      </div>
                      <span className="font-bold text-sm text-white/80">
                        {item.location}
                      </span>
                    </div>

                    {/* SNS Accounts */}
                    <div className="space-y-2">
                      {item.x_account && (
                        <a
                          href={`https://x.com/${item.x_account.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group/link"
                        >
                          <svg
                            className="w-5 h-5 text-white/60 group-hover/link:text-white transition-colors"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          <span className="font-bold text-sm text-white/60 group-hover/link:text-white transition-colors">
                            {item.x_account}
                          </span>
                        </a>
                      )}
                      {item.instagram_account && (
                        <a
                          href={`https://instagram.com/${item.instagram_account.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group/link"
                        >
                          <svg
                            className="w-5 h-5 text-white/60 group-hover/link:text-white transition-colors"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          <span className="font-bold text-sm text-white/60 group-hover/link:text-white transition-colors">
                            {item.instagram_account}
                          </span>
                        </a>
                      )}
                      {item.tiktok_account && (
                        <a
                          href={`https://tiktok.com/@${item.tiktok_account.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group/link"
                        >
                          <svg
                            className="w-5 h-5 text-white/60 group-hover/link:text-white transition-colors"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                          </svg>
                          <span className="font-bold text-sm text-white/60 group-hover/link:text-white transition-colors">
                            {item.tiktok_account}
                          </span>
                        </a>
                      )}
                      {!item.x_account &&
                        !item.instagram_account &&
                        !item.tiktok_account && (
                          <p className="font-medium text-sm text-white/40 px-4 py-2">
                            SNSアカウント未登録
                          </p>
                        )}
                    </div>
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
