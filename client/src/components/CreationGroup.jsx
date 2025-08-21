import React, { useState } from "react";
import Markdown from "react-markdown";
import { ChevronDown, ChevronRight } from "lucide-react";

const prettyType = (t) =>
  t === "blog-title" ? "Blog Titles" :
  t === "article" ? "Articles" :
  t === "image" ? "Images" :
  t === "resume" ? "Resumes" : t;

const CreationGroup = ({ type, items }) => {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0); // shows one item at a time

  const active = items[activeIdx];

  return (
    <div className="group relative">
      {/* Group header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 bg-white border border-gray-200 rounded-xl flex items-center justify-between hover:shadow-lg transition"
      >
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-900">
            {prettyType(type)} <span className="text-gray-400">({items.length})</span>
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {type === "blog-title" && "Generated blog title suggestions"}
            {type === "article" && "Generated articles"}
            {type === "image" && "Generated images"}
            {type === "resume" && "Resume reviews"}
          </p>
        </div>
        {open ? <ChevronDown className="w-5 h-5 text-gray-600" /> : <ChevronRight className="w-5 h-5 text-gray-600" />}
      </button>

      {/* Group body */}
      {open && (
        <div className="mt-3 bg-white border border-gray-200 rounded-xl p-5">
          {/* Numbered selector */}
          {items.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={[
                    "h-8 w-8 rounded-full text-sm font-medium border transition",
                    i === activeIdx
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  ].join(" ")}
                  aria-label={`Show item ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          {/* Active item header */}
          <div className="border-b border-gray-100 pb-3 mb-4">
            <h4 className="text-sm font-semibold text-gray-900">
              {active?.prompt || active?.title || "Untitled"}
            </h4>
            {active?.createdAt && (
              <p className="text-xs text-gray-500 mt-1">
                {new Date(active.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Active item content */}
          {type === "image" ? (
            <div className="flex justify-center">
              <img
                src={active?.content}
                alt="Generated"
                className="max-w-full max-h-96 rounded-lg shadow object-contain"
              />
            </div>
          ) : (
            <Markdown
              components={{
                h1: ({children}) => <h1 className="text-base font-semibold text-gray-900 mb-1">{children}</h1>,
                h2: ({children}) => <h2 className="text-base font-semibold text-gray-900 mb-1">{children}</h2>,
                p:  ({children}) => <p className="text-sm text-gray-700 leading-relaxed mb-3">{children}</p>,
                li: ({children}) => (
                  <li className="text-sm text-gray-700 flex items-start">
                    <span className="text-gray-400 mr-2 mt-1">•</span>
                    <span>{children}</span>
                  </li>
                ),
                ul: ({children}) => <ul className="space-y-1 mb-3">{children}</ul>,
              }}
            >
              {active?.content || ""}
            </Markdown>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationGroup;
