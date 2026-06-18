import { useState, useEffect } from 'react';
import { guideSections, guideSlides } from './guideData';
import MockupRenderer from './MockupRenderer';

export default function GuidedPractice() {
  const [section, setSection] = useState('setup');
  const [slideIdx, setSlideIdx] = useState(0);

  const slides = guideSlides[section];
  const slide = slides[slideIdx];
  const total = slides.length;

  useEffect(() => setSlideIdx(0), [section]);

  const goNext = () => setSlideIdx(i => Math.min(i + 1, total - 1));
  const goPrev = () => setSlideIdx(i => Math.max(i - 1, 0));

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [total]);

  return (
    <div>
      {/* Selettore sezione */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {guideSections.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)} style={{
            padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 700,
            background: section === s.id ? '#0f3d2e' : '#e2e8f0', color: section === s.id ? '#fff' : '#475569',
            transition: 'all .15s'
          }}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Slide container */}
      <div style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 2px 10px #0001', minHeight: 520 }}>

        {/* Progress bar slide */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{ flex: 1, height: 5, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${((slideIdx + 1) / total) * 100}%`, height: '100%', background: '#e57000', transition: 'width .25s' }} />
          </div>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>{slideIdx + 1} / {total}</span>
        </div>

        <h2 style={{ margin: '0 0 18px', fontSize: 19, color: '#1e293b' }}>{slide.title}</h2>

        {slide.type === 'screenshot' ? (
          <div>
            <img
              src={slide.img}
              alt={slide.title}
              style={{ width: '100%', borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 2px 10px #0001' }}
            />
            <p style={{ marginTop: 14, fontSize: 14, color: '#334155', lineHeight: 1.6 }}>{slide.caption}</p>
            {slide.warn && (
              <div style={{ marginTop: 10, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '8px 14px', fontSize: 12.5, color: '#b91c1c' }}>
                ⚠️ {slide.warn}
              </div>
            )}
          </div>
        ) : slide.type === 'mockup' ? (
          <div>
            <MockupRenderer kind={slide.mockupKind} />
            <p style={{ marginTop: 16, fontSize: 14, color: '#334155', lineHeight: 1.6 }}>{slide.caption}</p>
            {slide.warn && (
              <div style={{ marginTop: 10, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '8px 14px', fontSize: 12.5, color: '#b91c1c', display: 'flex', gap: 8, alignItems: 'center' }}>
                ⚠️ {slide.warn}
              </div>
            )}
          </div>
        ) : (
          <div>
            <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {slide.bullets.map((b, i) => (
                <li key={i} style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.5 }}>{b}</li>
              ))}
            </ul>
            {slide.note && (
              <div style={{ marginTop: 18, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '10px 14px', fontSize: 12.5, color: '#1e40af' }}>
                💡 {slide.note}
              </div>
            )}
          </div>
        )}

        {/* Navigazione */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, paddingTop: 18, borderTop: '1px solid #f1f5f9' }}>
          <button onClick={goPrev} disabled={slideIdx === 0} style={{
            padding: '9px 20px', borderRadius: 8, border: '1px solid #cbd5e1', background: slideIdx === 0 ? '#f8fafc' : '#fff',
            color: slideIdx === 0 ? '#cbd5e1' : '#334155', fontWeight: 600, fontSize: 13.5, cursor: slideIdx === 0 ? 'default' : 'pointer'
          }}>
            ← Indietro
          </button>

          <div style={{ display: 'flex', gap: 5 }}>
            {slides.map((_, i) => (
              <div key={i} onClick={() => setSlideIdx(i)} style={{
                width: 7, height: 7, borderRadius: '50%', cursor: 'pointer',
                background: i === slideIdx ? '#e57000' : '#e2e8f0'
              }} />
            ))}
          </div>

          <button onClick={goNext} disabled={slideIdx === total - 1} style={{
            padding: '9px 20px', borderRadius: 8, border: 'none', background: slideIdx === total - 1 ? '#f8fafc' : '#e57000',
            color: slideIdx === total - 1 ? '#cbd5e1' : '#fff', fontWeight: 700, fontSize: 13.5, cursor: slideIdx === total - 1 ? 'default' : 'pointer'
          }}>
            Avanti →
          </button>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11.5, color: '#94a3b8', textAlign: 'center' }}>
        Usa le freccette ← → della tastiera per navigare · Interfacce ricreate fedelmente, non screenshot originali
      </div>
    </div>
  );
}
