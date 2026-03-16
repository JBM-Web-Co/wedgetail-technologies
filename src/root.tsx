import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.scss';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" type="image/svg+xml" href="/Favicon.svg" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <a href="#main-content" className="sr-only">
                Skip to main content
            </a>
            <Header />
            <main id="main-content">
                <Outlet />
            </main>
            <Footer />
            <StickyCTA />
        </ThemeProvider>
    );
}
