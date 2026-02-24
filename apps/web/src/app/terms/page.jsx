"use client";

import { ArrowLeft, ExternalLink, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function TermsPage() {
  const [links, setLinks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch("/api/reference-links");
      if (!response.ok) {
        throw new Error("Failed to fetch links");
      }
      const data = await response.json();
      setLinks(data.links || []);
    } catch (err) {
      console.error(err);
      setError("リンクの取得に失敗しました");
    }
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!newLink.title || !newLink.url) return;

    setLoading(true);
    try {
      const response = await fetch("/api/reference-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLink),
      });

      if (!response.ok) {
        throw new Error("Failed to add link");
      }

      await fetchLinks();
      setNewLink({ title: "", url: "", description: "" });
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
      setError("リンクの追加に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (id) => {
    if (!confirm("このリンクを削除しますか？")) return;

    try {
      const response = await fetch(`/api/reference-links?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete link");
      }

      await fetchLinks();
    } catch (err) {
      console.error(err);
      setError("リンクの削除に失敗しました");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF] to-[#0099FF] rounded-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
                <span className="font-black text-white text-2xl">3x3</span>
              </div>
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
            <div className="font-black text-sm tracking-[0.3em] text-[#9D4EDD] uppercase">
              — Terms of Service
            </div>
            <h1 className="font-black text-6xl sm:text-7xl lg:text-8xl text-white leading-tight">
              利用規約
            </h1>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12 lg:p-16">
            <div className="space-y-10">
              <div>
                <h2 className="font-black text-3xl text-white mb-6">
                  第1条（適用）
                </h2>
                <p className="text-white/70 leading-relaxed text-lg">
                  本規約は、本サービスの提供条件及び本サービスの利用に関する当社と登録ユーザーとの間の権利義務関係を定めることを目的とし、登録ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。
                </p>
              </div>

              <div>
                <h2 className="font-black text-3xl text-white mb-6">
                  第2条（定義）
                </h2>
                <p className="text-white/70 leading-relaxed text-lg mb-6">
                  本規約において使用する以下の用語は、各々以下に定める意味を有するものとします。
                </p>
                <ul className="space-y-4 text-white/70 text-lg">
                  <li className="flex items-start space-x-3">
                    <span className="text-[#9D4EDD] font-black flex-shrink-0">
                      •
                    </span>
                    <span>
                      「サービス利用契約」とは、本規約を契約条件として当社と登録ユーザーとの間で締結される、本サービスの利用契約を意味します。
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#9D4EDD] font-black flex-shrink-0">
                      •
                    </span>
                    <span>
                      「知的財産権」とは、著作権、特許権、実用新案権、意匠権、商標権その他の知的財産権（それらの権利を取得し、またはそれらの権利につき登録等を出願する権利を含みます。）を意味します。
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#9D4EDD] font-black flex-shrink-0">
                      •
                    </span>
                    <span>
                      「投稿データ」とは、登録ユーザーが本サービスを利用して投稿その他送信するコンテンツ（文章、画像、動画その他のデータを含みますがこれらに限りません。）を意味します。
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-black text-3xl text-white mb-6">
                  第3条（登録）
                </h2>
                <p className="text-white/70 leading-relaxed text-lg mb-6">
                  本サービスの利用を希望する者（以下「登録希望者」といいます。）は、本規約を遵守することに同意し、かつ当社の定める一定の情報（以下「登録事項」といいます。）を当社の定める方法で当社に提供することにより、当社に対し、本サービスの利用の登録を申請することができます。
                </p>
                <p className="text-white/70 leading-relaxed text-lg">
                  当社は、当社の基準に従って、登録申請を承諾するか否かを判断し、当社が登録を承諾する場合にはその旨を登録希望者に通知します。登録希望者の登録ユーザーとしての登録は、当社が本項の通知を行ったことをもって完了したものとします。
                </p>
              </div>

              <div>
                <h2 className="font-black text-3xl text-white mb-6">
                  第4条（禁止事項）
                </h2>
                <p className="text-white/70 leading-relaxed text-lg mb-6">
                  登録ユーザーは、本サービスの利用にあたり、以下の各号のいずれかに該当する行為または該当すると当社が判断する行為をしてはなりません。
                </p>
                <ul className="space-y-4 text-white/70 text-lg">
                  <li className="flex items-start space-x-3">
                    <span className="text-[#9D4EDD] font-black flex-shrink-0">
                      •
                    </span>
                    <span>法令に違反する行為または犯罪行為に関連する行為</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#9D4EDD] font-black flex-shrink-0">
                      •
                    </span>
                    <span>
                      当社、本サービスの他の利用者またはその他の第三者に対する詐欺または脅迫行為
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#9D4EDD] font-black flex-shrink-0">
                      •
                    </span>
                    <span>公序良俗に反する行為</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#9D4EDD] font-black flex-shrink-0">
                      •
                    </span>
                    <span>
                      当社、本サービスの他の利用者またはその他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利または利益を侵害する行為
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#9D4EDD] font-black flex-shrink-0">
                      •
                    </span>
                    <span>
                      本サービスを通じ、以下に該当し、または該当すると当社が判断する情報を当社または本サービスの他の利用者に送信すること
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-black text-3xl text-white mb-6">
                  第5条（免責事項）
                </h2>
                <p className="text-white/70 leading-relaxed text-lg">
                  当社は、本サービスに関して登録ユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当社と登録ユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
                </p>
              </div>

              <div>
                <h2 className="font-black text-3xl text-white mb-6">
                  第6条（準拠法及び管轄裁判所）
                </h2>
                <p className="text-white/70 leading-relaxed text-lg mb-6">
                  本規約の準拠法は日本法とします。
                </p>
                <p className="text-white/70 leading-relaxed text-lg">
                  本規約に起因し、または関連する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                </p>
              </div>

              <div className="pt-10 border-t border-white/10">
                <p className="text-sm text-white/40 font-bold tracking-wider">
                  最終更新日：2026年2月23日
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Links Section */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-black text-3xl text-white">参照先サイト</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#9D4EDD] hover:bg-[#8B3FCC] text-white font-bold rounded-lg transition-colors duration-200"
            >
              <Plus size={20} />
              <span>追加</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {showAddForm && (
            <form
              onSubmit={handleAddLink}
              className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl space-y-4"
            >
              <div>
                <label className="block text-sm font-bold text-white/70 mb-2">
                  タイトル *
                </label>
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) =>
                    setNewLink({ ...newLink, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#9D4EDD]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white/70 mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#9D4EDD]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white/70 mb-2">
                  説明（任意）
                </label>
                <textarea
                  value={newLink.description}
                  onChange={(e) =>
                    setNewLink({ ...newLink, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#9D4EDD]"
                  rows="3"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#9D4EDD] hover:bg-[#8B3FCC] text-white font-bold rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? "追加中..." : "追加"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewLink({ title: "", url: "", description: "" });
                  }}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors duration-200"
                >
                  キャンセル
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {links.length === 0 ? (
              <p className="text-white/40 text-center py-8">
                参照先サイトがまだ登録されていません
              </p>
            ) : (
              links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-start justify-between p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 group"
                    >
                      <h3 className="font-bold text-lg text-white group-hover:text-[#9D4EDD] transition-colors duration-200">
                        {link.title}
                      </h3>
                      <ExternalLink
                        size={16}
                        className="text-white/40 group-hover:text-[#9D4EDD]"
                      />
                    </a>
                    {link.description && (
                      <p className="mt-2 text-white/60 text-sm">
                        {link.description}
                      </p>
                    )}
                    <p className="mt-2 text-white/40 text-xs break-all">
                      {link.url}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="ml-4 p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
