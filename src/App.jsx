import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import useLenis from './hooks/useLenis';
import Home from './pages/Home';
import Investors from './pages/Investors';
import Mandates from './pages/Mandates';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Legal from './pages/Legal';
import Contact from './pages/Contact';

const SVG_DEFS = "<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\"><defs>\n  <symbol id=\"ic-activity\" viewBox=\"0 0 24 24\"><path d=\"M22 12h-4l-3 9L9 3l-3 9H2\"></path></symbol>\n  <symbol id=\"ic-pen\" viewBox=\"0 0 24 24\"><path d=\"M12 20h9\"></path><path d=\"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z\"></path></symbol>\n  <symbol id=\"ic-file\" viewBox=\"0 0 24 24\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"></line><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"></line></symbol>\n  <symbol id=\"ic-send\" viewBox=\"0 0 24 24\"><line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"13\"></line><polygon points=\"22 2 15 22 11 13 2 9 22 2\"></polygon></symbol>\n  <symbol id=\"ic-scale\" viewBox=\"0 0 24 24\"><path d=\"M12 3v18\"></path><path d=\"M5 21h14\"></path><path d=\"M3 7h4c2 0 4-1 5-2 1 1 3 2 5 2h4\"></path><path d=\"M7 7l-3 7c.6.7 1.7 1 3 1s2.4-.3 3-1z\"></path><path d=\"M17 7l-3 7c.6.7 1.7 1 3 1s2.4-.3 3-1z\"></path></symbol>\n  <symbol id=\"ic-flag\" viewBox=\"0 0 24 24\"><path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\"></path><line x1=\"4\" y1=\"22\" x2=\"4\" y2=\"15\"></line></symbol>\n  <symbol id=\"ic-cpu\" viewBox=\"0 0 24 24\"><rect x=\"5\" y=\"5\" width=\"14\" height=\"14\" rx=\"2\"></rect><rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"></rect><path d=\"M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3\"></path></symbol>\n  <symbol id=\"ic-spark\" viewBox=\"0 0 24 24\"><path d=\"M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17l-1.9-5.1L4.5 10l5.6-1.4z\"></path></symbol>\n  <symbol id=\"ic-building\" viewBox=\"0 0 24 24\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"1.5\"></rect><path d=\"M9 22v-4h6v4\"></path><line x1=\"9\" y1=\"6\" x2=\"9.01\" y2=\"6\"></line><line x1=\"15\" y1=\"6\" x2=\"15.01\" y2=\"6\"></line><line x1=\"9\" y1=\"10\" x2=\"9.01\" y2=\"10\"></line><line x1=\"15\" y1=\"10\" x2=\"15.01\" y2=\"10\"></line></symbol>\n  <symbol id=\"ic-trending\" viewBox=\"0 0 24 24\"><polyline points=\"22 7 13.5 15.5 8.5 10.5 2 17\"></polyline><polyline points=\"16 7 22 7 22 13\"></polyline></symbol>\n  <symbol id=\"ic-home\" viewBox=\"0 0 24 24\"><path d=\"M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z\"></path></symbol>\n  <symbol id=\"ic-briefcase\" viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"7\" width=\"20\" height=\"14\" rx=\"2\"></rect><path d=\"M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2\"></path></symbol>\n  <symbol id=\"ic-globe\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><path d=\"M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z\"></path></symbol>\n  <symbol id=\"ic-shield\" viewBox=\"0 0 24 24\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z\"></path></symbol>\n  <symbol id=\"ic-eye\" viewBox=\"0 0 24 24\"><path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle></symbol>\n  <symbol id=\"ic-layers\" viewBox=\"0 0 24 24\"><polygon points=\"12 2 2 7 12 12 22 7 12 2\"></polygon><polyline points=\"2 17 12 22 22 17\"></polyline><polyline points=\"2 12 12 17 22 12\"></polyline></symbol>\n  <symbol id=\"ic-lock\" viewBox=\"0 0 24 24\"><rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"></rect><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"></path></symbol>\n  <symbol id=\"ic-users\" viewBox=\"0 0 24 24\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path><circle cx=\"9\" cy=\"7\" r=\"4\"></circle><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"></path><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path></symbol>\n</defs></svg>";
const ROLE_MODAL = "<div id=\"dd-role-modal\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Get started\">\n  <div class=\"ddrm-bg\" data-dd-close=\"\"></div>\n  <div class=\"ddrm-card\">\n    <button type=\"button\" class=\"ddrm-close\" data-dd-close=\"\" aria-label=\"Close\">✕</button>\n    <div class=\"ddrm-eyebrow\">Get started</div>\n    <div class=\"ddrm-title\">How do you want to use Done Deal?</div>\n    <div class=\"ddrm-sub\">Tell us who you are and we'll take you to the right place. 🤝</div>\n    <div class=\"ddrm-opts\">\n      <a class=\"ddrm-opt seller\" href=\"DoneDeal-Contact.html\">\n        <span class=\"ddrm-ic\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 21h18\"></path><path d=\"M6 21V8l6-4 6 4v13\"></path><path d=\"M10 21v-5h4v5\"></path><path d=\"M10 9h.01\"></path><path d=\"M14 9h.01\"></path></svg></span>\n        <span class=\"ddrm-txt\"><span class=\"ddrm-opt-t\">I'm raising or selling</span><span class=\"ddrm-opt-d\">Get acquired or raise capital for your company.</span></span>\n        <span class=\"ddrm-arrow\"><svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14\"></path><path d=\"M13 6l6 6-6 6\"></path></svg></span>\n      </a>\n      <a class=\"ddrm-opt investor\" href=\"DoneDeal-Investors.html\">\n        <span class=\"ddrm-ic\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 17l6-6 4 4 7-7\"></path><path d=\"M17 8h4v4\"></path></svg></span>\n        <span class=\"ddrm-txt\"><span class=\"ddrm-opt-t\">I'm an investor</span><span class=\"ddrm-opt-d\">Discover and back vetted companies.</span></span>\n        <span class=\"ddrm-arrow\"><svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14\"></path><path d=\"M13 6l6 6-6 6\"></path></svg></span>\n      </a>\n    </div>\n  </div>\n</div>";

// Map the live-site filenames used throughout the preserved markup to routes.
function hrefToRoute(href) {
  const m = href.match(/DoneDeal-([A-Za-z0-9-]+)\.html(?:\?p=([^#]+))?(?:#(.+))?$/);
  if (!m) return null;
  const name = m[1], slug = m[2], anchor = m[3];
  const routes = {
    Homepage: '/', Investors: '/investors', Mandates: '/mandates',
    FAQ: '/faq', Blog: '/blog', Legal: '/legal', Contact: '/contact',
  };
  if (name === 'Blog-Post') return { path: '/blog/' + (slug || 'post'), anchor };
  const path = routes[name];
  return path ? { path, anchor } : null;
}

// Global background chrome that persists across routes.
function SiteChrome() {
  return (
    <>
      <div id="bgwash" />
      <div className="scroll-progress" aria-hidden="true"><i id="scroll-progress-bar" /></div>
      <div dangerouslySetInnerHTML={{ __html: SVG_DEFS }} />
    </>
  );
}

// "Get started" role modal + the click interception that opens it.
function RoleModal() {
  const navigate = useNavigate();
  useEffect(() => {
    const modal = document.getElementById('dd-role-modal');
    if (!modal) return;
    const open = () => { modal.classList.add('open'); try { document.body.style.overflow = 'hidden'; } catch (e) {} };
    const close = () => { modal.classList.remove('open'); try { document.body.style.overflow = ''; } catch (e) {} };
    const onClick = (e) => {
      const t = e.target;
      const a = t && t.closest && t.closest('a,button');
      if (!a) return;
      if (modal.contains(a)) {
        if (a.hasAttribute('data-dd-close')) { e.preventDefault(); close(); return; }
        // option links inside the modal -> route, then close
        const href = a.getAttribute('href') || '';
        const r = hrefToRoute(href);
        if (r) { e.preventDefault(); close(); navigate(r.path); }
        return;
      }
      const txt = (a.textContent || '').trim().toLowerCase();
      const gs = txt === 'get started' || a.classList.contains('nav-cta') || a.classList.contains('dd-mn-cta') || a.classList.contains('cmpx-cta');
      if (gs) { e.preventDefault(); e.stopPropagation(); open(); }
    };
    const onBg = (e) => { if (e.target === modal || (e.target.classList && e.target.classList.contains('ddrm-bg'))) close(); };
    const onKey = (e) => { if (e.key === 'Escape' || e.keyCode === 27) close(); };
    document.addEventListener('click', onClick, true);
    modal.addEventListener('click', onBg);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick, true);
      modal.removeEventListener('click', onBg);
      document.removeEventListener('keydown', onKey);
    };
  }, [navigate]);
  return <div dangerouslySetInnerHTML={{ __html: ROLE_MODAL }} />;
}

// Intercept internal DoneDeal-*.html links anywhere in the preserved markup
// and route them through React Router instead of a full page load.
function useInternalLinks() {
  const navigate = useNavigate();
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.indexOf('DoneDeal-') === -1) return;
      const r = hrefToRoute(href);
      if (r) { e.preventDefault(); navigate(r.path); }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useLenis();
  useInternalLinks();
  return (
    <>
      <SiteChrome />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/mandates" element={<Mandates />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <RoleModal />
    </>
  );
}
