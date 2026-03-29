import { useState, useEffect } from 'react'
import { Mail, Briefcase, ChevronDown } from 'lucide-react'

const EMPLOYERS = [
  {
    id: 'dansk',
    name: 'Dansk Misbrugsbehandling',
    category: 'Priority 1: Clinics',
    pitch: "With a growing expat community facing high-stress corporate environments, I offer ready-made, English-language out-patient recovery and relapse prevention programs that instantly expand your demographic reach.",
    email: 'info@danskmisbrugsbehandling.dk' // placeholder for testing
  },
  {
    id: 'anker',
    name: 'Anker Huis Rehab',
    category: 'Priority 1: Clinics',
    pitch: "I blend evidence-based psychotherapy with hands-on Sober Coaching. I can manage high-profile clients who require discreet, flexible, intense 1:1 support in English.",
    email: 'recruitment@ankerhuis.com'
  },
  {
    id: 'narconon',
    name: 'Narconon Europe',
    category: 'Priority 1: Clinics',
    pitch: "My background as an international Psychotherapist gives me the cultural competence to handle an incredibly diverse patient intake. I bring deep crisis-intervention experience across multiple languages.",
    email: 'hr@narcononeurope.dk'
  },
  {
    id: 'littlewhite',
    name: 'The Little White House',
    category: 'Priority 2: Practices',
    pitch: "I want to bring my specialized 'Expat Addiction and Recovery Sub-clinic' to your practice, handling the complex dual-diagnosis clients you might currently be referring out.",
    email: 'contact@thelittlewhitehouse.dk'
  },
  {
    id: 'egolab',
    name: 'EGOLAB / Therapist.dk',
    category: 'Priority 2: Practices',
    pitch: "I am an EU-trained Psychotherapist fully prepared to absorb the overflow of international clients seeking help with coping mechanisms, digital addiction, and cultural adjustment.",
    email: 'hello@therapist.dk'
  },
  {
    id: 'psychgroup',
    name: 'The Psychology Group Denmark',
    category: 'Priority 2: Practices',
    pitch: "As a *Psykoterapeut*, I complement your *Psykologer* by taking on intensive coaching and relapse-prevention, offering the high-touch interventions that expats demand.",
    email: 'jobs@psychologygroup.dk'
  },
  {
    id: 'io',
    name: 'IO Interactive',
    category: 'Bonus: Gaming',
    pitch: "I offer confidential 'Mental Wellness & High-Performance Coaching' for senior devs to mitigate crunch-induced substance use, without traditional clinical stigma.",
    email: 'careers@ioi.dk'
  },
  {
    id: 'sybo',
    name: 'SYBO',
    category: 'Bonus: Gaming',
    pitch: "Workshop Pitch: 'Thriving in Hyper-Growth: Preventing Burnout and Managing Dopamine in the Tech Sector.'",
    email: 'jobs@sybogames.com'
  },
  {
    id: 'unity',
    name: 'Unity Technologies',
    category: 'Bonus: Gaming',
    pitch: "I provide culturally fluent mental health consulting directly to your massive pool of international engineering talent.",
    email: 'hello@unity.com'
  }
]

const STATUS_OPTIONS = [
  'To Apply',
  'Drafting',
  'Applied / CV Sent',
  'Interviewing',
  'Offer / Accepted',
  'Pass'
]

const statusColors = {
  'To Apply': '#e2e8f0',
  'Drafting': '#fef08a',
  'Applied / CV Sent': '#bfdbfe',
  'Interviewing': '#fbcfe8',
  'Offer / Accepted': '#bbf7d0',
  'Pass': '#fecaca'
}

export default function Tracker() {
  const [statuses, setStatuses] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem('sorin_tracker')
    if (saved) {
      setStatuses(JSON.parse(saved))
    } else {
      const initial = {}
      EMPLOYERS.forEach(e => initial[e.id] = 'To Apply')
      setStatuses(initial)
    }
  }, [])

  const updateStatus = (id, newStatus) => {
    const next = { ...statuses, [id]: newStatus }
    setStatuses(next)
    localStorage.setItem('sorin_tracker', JSON.stringify(next))
  }

  const generateMailto = (employer) => {
    const subject = encodeURIComponent(`Application: English-speaking Psychotherapist / Addiction Specialist`)
    
    const body = `Dear Hiring Manager at ${employer.name},

My name is Sorin, and I am an experienced EU-trained Psychotherapist specializing in Addiction and Recovery within the expat community.

${employer.pitch}

I have attached my CV to this email and would love the opportunity to discuss how my specialization can bring immediate value to your clients.

Best regards,
Sorin`
    return `mailto:${employer.email}?subject=${subject}&body=${encodeURIComponent(body)}`
  }

  return (
    <div>
      <header className="mb-8">
        <h1>Application Tracker</h1>
        <p className="page-description">Generate tailored emails and track where your CV is in the pipeline.</p>
      </header>

      <div className="grid">
        {EMPLOYERS.map(employer => (
          <div key={employer.id} className="card glass">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-primary">
              {employer.category}
            </div>
            <h3 className="text-xl font-semibold mb-3">{employer.name}</h3>
            
            <div className="mb-4">
              <label className="text-sm text-gray-500 mb-1 block">Status:</label>
              <select 
                value={statuses[employer.id] || 'To Apply'}
                onChange={(e) => updateStatus(employer.id, e.target.value)}
                className="w-full p-2 rounded border cursor-pointer outline-none"
                style={{ backgroundColor: statusColors[statuses[employer.id] || 'To Apply'] }}
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 p-3 rounded text-sm mb-4 border border-blue-100">
              <strong className="block text-blue-800 mb-1 pointer-events-none">Pitch Angle:</strong>
              <p className="text-gray-700 italic">"{employer.pitch}"</p>
            </div>

            <a 
              href={generateMailto(employer)}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
              onClick={() => {
                if(statuses[employer.id] === 'To Apply') updateStatus(employer.id, 'Drafting')
              }}
            >
              <Mail size={16} /> Draft Application
            </a>
          </div>
        ))}
      </div>
      
      <style>{`
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-8 { margin-bottom: 2rem; }
        .w-full { width: 100%; }
        .p-2 { padding: 0.5rem; }
        .p-3 { padding: 0.75rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .rounded { border-radius: 0.375rem; }
        .border { border: 1px solid var(--border); }
        .text-xs { font-size: 0.75rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xl { font-size: 1.25rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .uppercase { text-transform: uppercase; }
        .tracking-wider { letter-spacing: 0.05em; }
        .text-primary { color: var(--primary); }
        .text-gray-500 { color: #6b7280; }
        .text-gray-700 { color: #374151; }
        .bg-blue-50 { background-color: #eff6ff; }
        .border-blue-100 { border-color: #dbeafe; }
        .text-blue-800 { color: #1e40af; }
        .italic { font-style: italic; }
        .pointer-events-none { pointer-events: none; }
        .block { display: block; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .gap-2 { gap: 0.5rem; }
        .bg-blue-600 { background-color: #2563eb; }
        .text-white { color: #ffffff; }
        .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
        .transition { transition: all 0.2s; }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .card {
          padding: 1.5rem;
          border-radius: 1rem;
        }
      `}</style>
    </div>
  )
}
