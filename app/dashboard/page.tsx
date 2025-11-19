"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function DashboardPage() {
    const diagrams = useQuery(api.diagrams.getUserDiagrams);

    if (!diagrams) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your diagrams...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Diagrams</h1>
                    <p className="mt-2 text-gray-600">
                        View and manage all your AI-generated diagrams
                    </p>
                </div>

                {diagrams.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No diagrams yet
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Use the Chrome extension to create your first diagram
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {diagrams.map((diagram) => (
                            <div
                                key={diagram._id}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                            >
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {diagram.title || "Untitled"}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(diagram.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div
                                    className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-center min-h-[200px]"
                                    dangerouslySetInnerHTML={{ __html: diagram.content }}
                                />

                                <div className="text-sm text-gray-600 mb-4">
                                    <p className="line-clamp-2">{diagram.originalText}</p>
                                </div>

                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(diagram.content);
                                        alert("SVG copied to clipboard!");
                                    }}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Copy SVG
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
