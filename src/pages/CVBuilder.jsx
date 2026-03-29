import { useState, useRef, useEffect } from 'react'
import { Printer, Edit3, Save, Camera, Globe } from 'lucide-react'

// CV TRANSLATIONS: English and Danish
const tl = {
  en: {
    subtitle: "Psychotherapist & Addiction Specialist",
    education: "Education",
    degree1: "Training in Transactional Analysis",
    degree2: "Bachelor's Degree in Special Psychopedagogy",
    skills: "Skills",
    sk_1: "Addiction & Recovery",
    sk_2: "Relapse Prevention",
    sk_3: "Sober Coaching",
    sk_4: "Expat Mental Health",
    sk_5: "Harm Reduction",
    sk_6: "Crisis Intervention",
    sk_7: "Group Therapy",
    languages: "Languages",
    lang_ro: "Romanian",
    lang_en: "English",
    lang_note: "*Clinical sessions conducted in EN/RO",
    profile: "About Me",
    profile_text: "Psychologist and psychotherapist with over 15 years of experience in mental health, harm reduction, and social services. I am dedicated to supporting vulnerable groups with respect and empathy. I believe in collaboration, responsibility, and learning.",
    experience: "Experience",
    t1: "Psychotherapist",
    b1a: "Individual, couples, and group psychotherapy.",
    b1b: "Supported patients at ARAS-Arena Substitution Treatment Center.",
    t2: "Founder & President",
    b2a: "Promoting and protecting human rights and freedoms.",
    b2b: "Representation in external relations and legal actions.",
    t3: "Psychotherapist",
    b3a: "Delivered psychotherapy sessions to center clients.",
    t4: "Health Care Center Team Leader",
    b4a: "Coordinated a multidisciplinary team.",
    b4b: "Delivered information on HIV, HBV, HCV, and STI prevention.",
    b4c: "Managed needle exchange programs."
  },
  da: {
    subtitle: "Psykoterapeut & Misbrugsspecialist",
    education: "Uddannelse",
    degree1: "Træning i Transaktionsanalyse",
    degree2: "Professionsbachelor i Specialpsykopædagogik",
    skills: "Kompetencer",
    sk_1: "Misbrug & Recovery",
    sk_2: "Tilbagefaldsforebyggelse",
    sk_3: "Sober Coaching",
    sk_4: "Expat Mental Sundhed",
    sk_5: "Skadesreduktion",
    sk_6: "Kriseintervention",
    sk_7: "Gruppeterapi",
    languages: "Sprog",
    lang_ro: "Rumænsk",
    lang_en: "Engelsk",
    lang_note: "*Kliniske sessioner afholdes på EN/RO",
    profile: "Om Mig",
    profile_text: "Psykolog og psykoterapeut med over 15 års erfaring inden for mental sundhed, skadesreduktion og sociale indsatser. Jeg er dedikeret til at støtte sårbare grupper med respekt og empati. Jeg tror på samarbejde, ansvarlighed og læring.",
    experience: "Erfaring",
    t1: "Psykoterapeut",
    b1a: "Individuel, par- og gruppeterapi.",
    b1b: "Støttede patienter på ARAS-Arena Substitutionsbehandlingscenter.",
    t2: "Stifter & Præsident",
    b2a: "Fremmer og beskytter menneskerettigheder og frihedsrettigheder.",
    b2b: "Repræsentation i eksterne relationer og juridiske handlinger.",
    t3: "Psykoterapeut",
    b3a: "Leverede psykoterapisessioner til centerets klienter.",
    t4: "Teamleder for Sundhedscenter",
    b4a: "Koordinerede et tværfagligt team.",
    b4b: "Leverede information om forebyggelse af HIV, HBV, HCV og STI.",
    b4c: "Administrerede sprøjtebytteprogrammer."
  }
}

export default function CVBuilder() {
  const [editMode, setEditMode] = useState(false)
  const [lang, setLang] = useState('en')
  const [photo, setPhoto] = useState(null) // We would ideally load from localStorage
  const fileInputRef = useRef(null)

  const t = tl[lang]

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhoto(ev.target.result)
    reader.readAsDataURL(file)
  }

  const printCV = () => {
    window.print()
  }

  // Helper for editable fields
  const E = ({ children, tag: Tag = 'span', className = '', style={} }) => {
    return (
      <Tag 
        contentEditable={editMode}
        suppressContentEditableWarning
        className={`${className} ${editMode ? 'cv-editable' : ''}`}
        style={style}
      >
        {children}
      </Tag>
    )
  }

  return (
    <div className="cv-builder-container">
      <div className="toolbar no-print glass">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">Sorin CV Editor</h2>
          <button 
            onClick={() => setLang(lang === 'en' ? 'da' : 'en')}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
          >
            <Globe size={16} /> {lang.toUpperCase()}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition ${editMode ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {editMode ? <Save size={18} /> : <Edit3 size={18} />}
            {editMode ? 'Save Edits' : 'Edit Text'}
          </button>
          
          <button onClick={printCV} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded font-medium hover:opacity-90 transition">
            <Printer size={18} /> Export PDF
          </button>
        </div>
      </div>

      <div className="cv-wrapper">
        <div className="cv-page">
          {/* SIDEBAR */}
          <aside className="cv-sidebar">
            <div className="cv-photo-area">
              {photo ? (
                <img src={photo} alt="Sorin" />
              ) : (
                <div style={{width:'100%', height:'100%', backgroundColor:'var(--cv-primary-light)'}}></div>
              )}
              {editMode && (
                <div className="cv-photo-overlay" onClick={() => fileInputRef.current?.click()}>
                  <Camera color="white" />
                  <span>Update Photo</span>
                </div>
              )}
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handlePhotoUpload} />
            </div>

            <div className="cv-sidebar-body">
              <div className="cv-sidebar-section">
                <h3>Contact</h3>
                <div className="cv-contact-item">
                  <span>📞</span>
                  <E>+46 793106183</E>
                </div>
                <div className="cv-contact-item">
                  <span>✉️</span>
                  <E>briceag.sorin@gmail.com</E>
                </div>
                <div className="cv-contact-item">
                  <span>📍</span>
                  <E>Malmö, Sweden</E>
                </div>
              </div>

              <div className="cv-sidebar-section">
                <h3>{t.education}</h3>
                <div className="cv-edu-entry">
                  <E className="cv-school" tag="div">Yorkshire Training Centre</E>
                  <E className="cv-degree" tag="div">{t.degree1}</E>
                  <E className="cv-years" tag="div">2011 – 2015</E>
                </div>
                <div className="cv-edu-entry">
                  <E className="cv-school" tag="div">University of Bucharest</E>
                  <E className="cv-degree" tag="div">{t.degree2}</E>
                  <E className="cv-years" tag="div">2003 – 2007</E>
                </div>
              </div>

              <div className="cv-sidebar-section">
                <h3>{t.skills}</h3>
                <ul className="cv-skill-list">
                  <li><E>{t.sk_1}</E></li>
                  <li><E>{t.sk_2}</E></li>
                  <li><E>{t.sk_3}</E></li>
                  <li><E>{t.sk_4}</E></li>
                  <li><E>{t.sk_5}</E></li>
                  <li><E>{t.sk_6}</E></li>
                  <li><E>{t.sk_7}</E></li>
                </ul>
              </div>

              <div className="cv-sidebar-section">
                <h3>{t.languages}</h3>
                <div className="cv-lang-entry">
                  <E className="cv-lang-name" tag="div">{t.lang_ro}</E>
                  <div className="cv-lang-bar"><div className="cv-lang-fill" style={{width:'100%'}}></div></div>
                </div>
                <div className="cv-lang-entry">
                  <E className="cv-lang-name" tag="div">{t.lang_en}</E>
                  <div className="cv-lang-bar"><div className="cv-lang-fill" style={{width:'90%'}}></div></div>
                </div>
                <div style={{fontSize:'10px', marginTop:'5px', color:'var(--cv-text-muted)', fontStyle:'italic'}}>
                  {t.lang_note}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="cv-main">
            <div className="cv-name-band">
              <E tag="h1" className="cv-name">SORIN<br/>BRICEAG</E>
              <div className="cv-name-sep"></div>
              <E tag="div" className="cv-subtitle">{t.subtitle}</E>
            </div>

            <div className="cv-right-content">
              <div className="cv-section">
                <h2>{t.profile}</h2>
                <E tag="p" className="cv-body-text">{t.profile_text}</E>
              </div>

              <div className="cv-section">
                <h2>{t.experience}</h2>

                <div className="cv-exp-entry">
                  <div className="cv-exp-date-col"><E className="cv-exp-date" tag="div">2016 – 2025</E></div>
                  <div className="cv-exp-vsep"></div>
                  <div className="cv-exp-details">
                    <E className="cv-exp-company" tag="div">ARAS (Romanian Assoc. Against AIDS)</E>
                    <E className="cv-exp-title" tag="div">{t.t1}</E>
                    <ul className="cv-bullets">
                      <li><E>{t.b1a}</E></li>
                      <li><E>{t.b1b}</E></li>
                    </ul>
                  </div>
                </div>

                <div className="cv-exp-entry">
                  <div className="cv-exp-date-col"><E className="cv-exp-date" tag="div">2011 – Pres.</E></div>
                  <div className="cv-exp-vsep"></div>
                  <div className="cv-exp-details">
                    <E className="cv-exp-company" tag="div">CARUSEL ASSOCIATION</E>
                    <E className="cv-exp-title" tag="div">{t.t2}</E>
                    <ul className="cv-bullets">
                      <li><E>{t.b2a}</E></li>
                      <li><E>{t.b2b}</E></li>
                    </ul>
                  </div>
                </div>

                <div className="cv-exp-entry">
                  <div className="cv-exp-date-col"><E className="cv-exp-date" tag="div">2010 – 2014</E></div>
                  <div className="cv-exp-vsep"></div>
                  <div className="cv-exp-details">
                    <E className="cv-exp-company" tag="div">ARAS & Arena Drop-In Center</E>
                    <E className="cv-exp-title" tag="div">{t.t4}</E>
                    <ul className="cv-bullets">
                      <li><E>{t.b4a}</E></li>
                      <li><E>{t.b4b}</E></li>
                      <li><E>{t.b4c}</E></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>

      <style>{`
        .cv-builder-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
          padding-bottom: 4rem;
        }

        .toolbar {
          width: 100%;
          max-width: 794px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          position: sticky;
          top: 1rem;
          z-index: 50;
        }

        /* ════════ CV STYLES (PORTED FROM ANDREEA MODEL) ════════ */
        .cv-wrapper {
          --cv-primary: #1e3a8a; /* Deep blue to suit Sorin */
          --cv-primary-light: #3b82f6;
          --cv-accent: #f59e0b;
          --cv-text-white: #FFFFFF;
          --cv-text-light: #e0e7ff;
          --cv-text-muted: #93c5fd;
          --cv-text-dark: #1e293b;
          --cv-text-body: #334155;
          --cv-text-gray: #64748b;
          --cv-bar-bg: rgba(255,255,255,0.18);
          --cv-bar-fill: #93c5fd;
          --cv-line-sidebar: rgba(255,255,255,0.3);
          --cv-line-right: #cbd5e1;
          --cv-vsep: #1e3a8a;

          width: 794px;
          height: 1123px;
          background: #fff;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          transform-origin: top center;
        }

        .cv-page {
          width: 100%;
          height: 100%;
          display: flex;
          background: #fff;
          color: var(--cv-text-body);
        }

        /* ════════ SIDEBAR ════════ */
        .cv-sidebar {
          width: 342px; min-width: 342px; height: 100%;
          background: var(--cv-primary);
          color: var(--cv-text-light);
          display: flex; flex-direction: column;
        }
        
        .cv-photo-area {
          width: 190px; height: 190px;
          margin: 30px auto 0 auto;
          border-radius: 50%; overflow: hidden;
          background: var(--cv-primary-light);
          border: 4px solid rgba(255,255,255,0.25);
          position: relative;
        }
        .cv-photo-area img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .cv-photo-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 4px;
          cursor: pointer; color: white; font-size: 11px; font-weight: 600;
        }

        .cv-sidebar-body { padding: 36px 30px 20px 45px; flex: 1; }
        .cv-sidebar-section { margin-bottom: 24px; }
        .cv-sidebar-section h3 {
          font-family: serif; font-weight: 400; font-size: 16px;
          color: var(--cv-text-white); letter-spacing: 6px; text-transform: uppercase;
          border-bottom: 1px solid var(--cv-line-sidebar);
          padding-bottom: 7px; margin-bottom: 14px;
        }

        .cv-contact-item {
          display: flex; gap: 12px; margin-bottom: 10px; font-size: 12px;
        }
        
        .cv-edu-entry { margin-bottom: 15px; }
        .cv-school { font-weight: 800; font-size: 13px; color: var(--cv-text-white); }
        .cv-degree { font-size: 12px; color: var(--cv-text-muted); margin-top: 2px;}
        .cv-years { font-weight: 600; font-size: 11px; color: var(--cv-text-light); margin-top: 4px; }

        .cv-skill-list { padding-left: 20px; font-size: 12.5px; line-height: 1.8; }
        
        .cv-lang-entry { margin-bottom: 12px; }
        .cv-lang-name { font-size: 12px; margin-bottom: 5px; }
        .cv-lang-bar { width: 60%; height: 6px; background: var(--cv-bar-bg); border-radius: 3px; }
        .cv-lang-fill { height: 100%; background: var(--cv-bar-fill); border-radius: 3px; }

        /* ════════ MAIN ════════ */
        .cv-main { flex: 1; display: flex; flex-direction: column; }
        
        .cv-name-band {
          background: var(--cv-primary);
          padding: 44px 40px 30px 100px;
          min-height: 216px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .cv-name {
          font-family: serif; font-weight: 400; font-size: 44px; color: var(--cv-text-white);
          line-height: 1.1; letter-spacing: 2px;
        }
        .cv-name-sep {
          width: 250px; height: 1px; background: rgba(255,255,255,0.4);
          margin: 16px 0;
        }
        .cv-subtitle {
          font-style: italic; font-size: 22px; color: var(--cv-text-muted);
        }

        .cv-right-content { padding: 30px 40px; }
        .cv-section { margin-bottom: 28px; }
        .cv-section h2 {
          font-family: serif; font-weight: 400; font-size: 18px; color: var(--cv-text-dark);
          letter-spacing: 6px; text-transform: uppercase;
          border-bottom: 1px solid var(--cv-line-right); padding-bottom: 8px; margin-bottom: 16px;
        }
        .cv-body-text { font-size: 11.5px; line-height: 1.8; text-align: justify; }

        .cv-exp-entry { display: flex; margin-bottom: 14px; }
        .cv-exp-date-col { width: 85px; min-width: 85px; padding-top: 2px; }
        .cv-exp-date { font-weight: 700; font-size: 11px; color: var(--cv-primary); }
        .cv-exp-vsep { width: 2px; background: var(--cv-vsep); margin: 0 16px; align-self: stretch; opacity:0.8;}
        .cv-exp-details { flex: 1; }
        .cv-exp-company { font-weight: 700; font-size: 14px; color: var(--cv-text-dark); margin-bottom: 3px; }
        .cv-exp-title { font-size: 12px; color: var(--cv-text-gray); margin-bottom: 8px; font-style: italic;}
        .cv-bullets { padding-left: 20px; font-size: 11.5px; line-height: 1.7; }
        .cv-bullets li::marker { color: var(--cv-primary); }

        /* Editing outlines */
        .cv-editable {
          outline: 1.5px dashed rgba(245, 158, 11, 0.6);
          min-width: 20px;
          min-height: 1em;
          border-radius: 2px;
        }
        .cv-editable:focus {
          outline: 2px solid #f59e0b;
          background: rgba(245, 158, 11, 0.1);
        }
        .cv-sidebar .cv-editable:focus {
          background: rgba(255, 255, 255, 0.1);
        }

        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .cv-wrapper { box-shadow: none; transform: none; width: 100%; height: 100%; }
          .cv-editable { outline: none !important; background: transparent !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  )
}
