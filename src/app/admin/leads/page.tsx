'use client';

import { useEffect, useState } from 'react';
import styles from './leads.module.scss';

interface Lead {
  id: string;
  company_name: string;
  website: string | null;
  email: string | null;
  source: string;
  lead_score: number;
  status: string;
  notes: string | null;
}

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [pitchingId, setPitchingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads/');
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handlePitch = async (lead: Lead) => {
    setPitchingId(lead.id);
    try {
      const res = await fetch('/api/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          companyName: lead.company_name,
          email: lead.email,
          notes: lead.notes,
        }),
      });

      if (res.ok) {
        fetchLeads();
      } else {
        const errorData = await res.json();
        alert(`Failed to pitch: ${errorData.error}`);
      }
    } catch (err) {
      console.error('Pitch error:', err);
      alert('An error occurred while sending the pitch.');
    } finally {
      setPitchingId(null);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.lottieIcon}>
              <iframe 
                src="https://lottie.host/embed/eff89e5a-22dc-4b2e-98e5-afee165a30ee/Rmd1E60hr6.lottie" 
                style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none', background: 'transparent' }}
                title="Coderon Animation"
              ></iframe>
            </div>
            <div>
              <div className={styles.typewriterWrapper}>
                <h1 className={styles.typewriterTitle}>CODERON</h1>
              </div>
              <p className={styles.subtitle}>Welcome back, Ron. Let's hunt.</p>
            </div>
          </div>

          <div className={styles.controls}>
            <input
              type="text"
              placeholder="Search leads or emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button onClick={fetchLeads} className={styles.syncBtn}>
              {loading ? 'Syncing...' : 'Sync Database'}
            </button>
          </div>
        </div>

        {/* METRICS */}
        <div className={styles.metrics}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Total Leads</span>
            <div className={styles.cardValue}>{leads.length}</div>
          </div>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Audited & Scraped</span>
            <div className={`${styles.cardValue} ${styles.valGreen}`}>
              {leads.filter((l) => l.status === 'audited').length}
            </div>
          </div>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Pitched</span>
            <div className={`${styles.cardValue} ${styles.valIndigo}`}>
              {leads.filter((l) => l.status === 'pitched').length}
            </div>
          </div>
          <div className={styles.card}>
            {/* THIS IS THE FIX: Count opened, clicked, and replied */}
            <span className={styles.cardLabel}>Opened / Engaged</span>
            <div className={`${styles.cardValue} ${styles.valPurple}`}>
              {leads.filter((l) => ['opened', 'clicked', 'replied'].includes(l.status)).length}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company / URL</th>
                <th>Direct Email</th>
                <th>Source</th>
                <th>Score</th>
                <th>Status</th>
                <th>Audit Findings</th>
                <th className={styles.actionCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div className={styles.companyName}>{lead.company_name}</div>
                    {lead.website ? (
                      <a href={lead.website} target="_blank" rel="noreferrer" className={styles.link}>
                        {lead.website}
                      </a>
                    ) : (
                      <span className={styles.na}>No Website</span>
                    )}
                  </td>
                  <td>
                    {lead.email ? (
                      <span className={styles.emailBadge}>{lead.email}</span>
                    ) : (
                      <span className={styles.na}>N/A</span>
                    )}
                  </td>
                  <td className={styles.sourceText}>{lead.source}</td>
                  <td>
                    <span className={lead.lead_score >= 90 ? styles.scoreGreen : styles.scoreAmber}>
                      {lead.lead_score}/100
                    </span>
                  </td>
                  <td>
                    {/* THIS IS THE FIX: Style opened, clicked, and replied correctly */}
                    <span
                      className={
                        ['opened', 'clicked', 'replied'].includes(lead.status)
                          ? styles.statusOpened
                          : lead.status === 'pitched'
                          ? styles.statusPitched
                          : lead.status === 'audited'
                          ? styles.statusAudited
                          : styles.statusNew
                      }
                    >
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td className={styles.notes}>
                    {lead.notes && lead.notes.includes('⚠️') ? (
                      <span className={styles.warning}>{lead.notes}</span>
                    ) : (
                      lead.notes || 'Pending Audit'
                    )}
                  </td>
                  <td className={styles.actionCell}>
                    {lead.status === 'audited' && lead.email ? (
                      <button
                        className={styles.pitchBtn}
                        onClick={() => handlePitch(lead)}
                        disabled={pitchingId === lead.id}
                      >
                        {pitchingId === lead.id ? 'Sending...' : 'Send Pitch'}
                      </button>
                    ) : (
                      <span className={styles.na}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}