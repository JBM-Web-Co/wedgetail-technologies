// PREVIEW ONLY: Remove this file when copying template for a client site
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import HomePage from './pages/HomePage';
import './styles/global.scss';

const root = document.getElementById('root');
if (root) {
    createRoot(root).render(
        <StrictMode>
            <a href="#main-content" className="sr-only">
                Skip to main content
            </a>
            <Header />
            <main id="main-content">
                <HomePage />
            </main>
            <Footer />
            <StickyCTA />
        </StrictMode>
    );
}
