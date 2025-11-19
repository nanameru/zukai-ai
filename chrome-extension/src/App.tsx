import { useState, useEffect } from 'react'
import './App.css'

interface SVGSuggestion {
  id: string
  svg: string
  title: string
}

function App() {
  const [selectedText, setSelectedText] = useState<string>('')
  const [suggestions, setSuggestions] = useState<SVGSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSvgId, setSelectedSvgId] = useState<string | null>(null)
  const [customColor, setCustomColor] = useState('#667eea')

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: { type: string; text: string }) => {
      if (message.type === 'TEXT_SELECTED') {
        setSelectedText(message.text)
        fetchSuggestions(message.text)
      }
    })
  }, [])

  const fetchSuggestions = async (text: string) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/api/generate-svg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions')
      }

      const data = await response.json()
      setSuggestions(data.suggestions || [])
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
      setSuggestions([
        {
          id: '1',
          svg: '<svg width="200" height="100"><rect width="200" height="100" fill="#4F46E5"/><text x="100" y="50" text-anchor="middle" fill="white" font-size="16">Error loading</text></svg>',
          title: 'Error'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const applyColorToSvg = (svgString: string, color: string) => {
    // Simple color replacement - replace common fill colors
    return svgString
      .replace(/fill="[^"]*"/g, `fill="${color}"`)
      .replace(/stroke="[^"]*"/g, `stroke="${color}"`)
  }

  const copyToClipboard = async (svg: string) => {
    try {
      await navigator.clipboard.writeText(svg)
      alert('SVG copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="side-panel">
      <div className="header">
        <h1>✨ Zukai AI</h1>
        <p className="subtitle">AI-powered visual diagrams</p>
      </div>

      {selectedText ? (
        <div className="content">
          <div className="selected-text">
            <h3>Selected Text</h3>
            <p>{selectedText}</p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Generating suggestions...</p>
            </div>
          ) : (
            <div className="suggestions">
              <h3>AI Suggestions</h3>
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="suggestion-card">
                  <div className="suggestion-header">
                    <span className="suggestion-title">{suggestion.title}</span>
                  </div>
                  <div
                    className="svg-preview"
                    dangerouslySetInnerHTML={{
                      __html: selectedSvgId === suggestion.id
                        ? applyColorToSvg(suggestion.svg, customColor)
                        : suggestion.svg
                    }}
                  />

                  {selectedSvgId === suggestion.id && (
                    <div className="customization">
                      <label>
                        Color:
                        <input
                          type="color"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                        />
                      </label>
                    </div>
                  )}

                  <div className="button-group">
                    <button
                      className="customize-btn"
                      onClick={() => setSelectedSvgId(
                        selectedSvgId === suggestion.id ? null : suggestion.id
                      )}
                    >
                      {selectedSvgId === suggestion.id ? 'Hide Options' : 'Customize'}
                    </button>
                    <button
                      className="insert-btn"
                      onClick={() => copyToClipboard(
                        selectedSvgId === suggestion.id
                          ? applyColorToSvg(suggestion.svg, customColor)
                          : suggestion.svg
                      )}
                    >
                      Copy SVG
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <p>📝 Select text on any webpage to generate visual diagrams</p>
        </div>
      )}
    </div>
  )
}

export default App
