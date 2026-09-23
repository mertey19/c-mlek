'use client';

import { useMemo, useState } from 'react';
import { deleteLeadAction, updateLeadAction } from '@/app/admin/actions';
import { LEAD_STATUSES, type Lead, type LeadStatus } from '@/lib/admin/lead-types';
import { ResultMessage, useSaver } from './ui';

const dateFormat = new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Istanbul' });

function whatsappLink(phone: string) {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `90${digits.slice(1)}`;
  else if (digits.length === 10 && digits.startsWith('5')) digits = `90${digits}`;
  return digits.length >= 10 ? `https://wa.me/${digits}` : null;
}

function toCsv(leads: Lead[]) {
  const columns: (keyof Lead)[] = ['createdAt', 'status', 'name', 'company', 'phone', 'email', 'country', 'city', 'product', 'quantity', 'message', 'note', 'language', 'page'];
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  return [columns.join(';'), ...leads.map((lead) => columns.map((column) => escape(String(lead[column] ?? ''))).join(';'))].join('\r\n');
}

export function LeadsTable({ initial }: { initial: Lead[] }) {
  const [leads, setLeads] = useState(initial);
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const saver = useSaver();

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR');
    return leads.filter(
      (lead) =>
        (filter === 'all' || lead.status === filter) &&
        (!q || [lead.name, lead.company, lead.phone, lead.email, lead.country, lead.city, lead.message].join(' ').toLocaleLowerCase('tr-TR').includes(q)),
    );
  }, [leads, filter, query]);

  function patch(id: string, change: Partial<Pick<Lead, 'status' | 'note'>>) {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, ...change } : lead)));
    saver.run(() => updateLeadAction(id, change));
  }

  function remove(lead: Lead) {
    saver.run(
      async () => {
        const result = await deleteLeadAction(lead.id);
        if (result.ok) setLeads((current) => current.filter((item) => item.id !== lead.id));
        return result;
      },
      { confirmText: `${lead.name} (${lead.company}) kaydı kalıcı olarak silinsin mi?` },
    );
  }

  function exportCsv() {
    const blob = new Blob([`﻿${toCsv(visible)}`], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `teklif-talepleri-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <>
      <div className="admin-toolbar">
        <nav className="admin-tabs" aria-label="Durum filtresi">
          <button type="button" className={filter === 'all' ? 'is-active' : undefined} onClick={() => setFilter('all')}>Tümü ({leads.length})</button>
          {LEAD_STATUSES.map((status) => (
            <button key={status.value} type="button" className={filter === status.value ? 'is-active' : undefined} onClick={() => setFilter(status.value)}>
              {status.label} ({leads.filter((lead) => lead.status === status.value).length})
            </button>
          ))}
        </nav>
        <div className="admin-inline">
          <input type="search" placeholder="Ara: ad, firma, telefon…" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Taleplerde ara" />
          <button type="button" className="admin-button" onClick={exportCsv} disabled={!visible.length}>Excel (CSV) indir</button>
        </div>
      </div>
      {saver.result && !saver.result.ok && <ResultMessage result={saver.result} />}

      <div className="admin-leads">
        {visible.map((lead) => {
          const wa = whatsappLink(lead.phone);
          const expanded = open === lead.id;
          return (
            <article key={lead.id} className={`admin-lead admin-lead--${lead.status}`}>
              <button type="button" className="admin-lead__summary" onClick={() => setOpen(expanded ? null : lead.id)} aria-expanded={expanded}>
                <span className="admin-lead__who">
                  <strong>{lead.name}</strong>
                  <small>{lead.company} · {[lead.city, lead.country].filter(Boolean).join(', ')}</small>
                </span>
                <span className="admin-lead__what">
                  {lead.product}
                  {lead.quantity && <small>{lead.quantity} adet</small>}
                </span>
                <span className="admin-lead__when">
                  {dateFormat.format(new Date(lead.createdAt))}
                  <span className={`admin-status admin-status--${lead.status}`}>{LEAD_STATUSES.find((s) => s.value === lead.status)?.label}</span>
                </span>
              </button>
              {expanded && (
                <div className="admin-lead__body">
                  <p className="admin-lead__message">{lead.message}</p>
                  <dl>
                    <div><dt>Telefon</dt><dd><a href={`tel:${lead.phone}`}>{lead.phone}</a></dd></div>
                    {lead.email && <div><dt>E-posta</dt><dd><a href={`mailto:${lead.email}`}>{lead.email}</a></dd></div>}
                    <div><dt>Dil</dt><dd>{lead.language === 'en' ? 'İngilizce form' : 'Türkçe form'}</dd></div>
                    {lead.page && <div><dt>Sayfa</dt><dd>{lead.page}</dd></div>}
                  </dl>
                  <div className="admin-grid">
                    <label className="admin-field">
                      <span>Durum</span>
                      <select value={lead.status} onChange={(event) => patch(lead.id, { status: event.target.value as LeadStatus })}>
                        {LEAD_STATUSES.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                      </select>
                    </label>
                    <label className="admin-field admin-field--wide">
                      <span>İç not (yalnızca panelde görünür)</span>
                      <textarea
                        rows={2}
                        defaultValue={lead.note}
                        onBlur={(event) => event.target.value !== lead.note && patch(lead.id, { note: event.target.value })}
                      />
                    </label>
                  </div>
                  <div className="admin-lead__actions">
                    {wa && <a className="admin-button admin-button--whatsapp" href={wa} target="_blank" rel="noreferrer">WhatsApp’tan yaz</a>}
                    <a className="admin-button" href={`tel:${lead.phone}`}>Ara</a>
                    <button type="button" className="admin-button admin-button--danger" onClick={() => remove(lead)} disabled={saver.pending}>Sil</button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
        {!visible.length && <p className="admin-empty">{leads.length ? 'Bu filtreye uyan kayıt yok.' : 'Henüz teklif talebi yok. Sitedeki teklif formu gönderildiğinde burada görünür.'}</p>}
      </div>
    </>
  );
}
