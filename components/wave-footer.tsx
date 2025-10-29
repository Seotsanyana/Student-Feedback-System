import { Github, Twitter, Mail } from 'lucide-react';

export function WaveFooter() {
  const year = new Date().getFullYear();

  return (
    <div className="mt-24">
      <LayeredWave />
      <footer className="bg-[#1f618d] text-gray-200 pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-headline text-lg font-bold text-white mb-2">Student Insights Hub</h3>
              <p className="text-sm text-gray-300">
                Analyzing student feedback for a better learning experience.
              </p>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-white mb-2">Quick Links</h3>
              <ul className="text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Submit Feedback</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-white mb-2">Connect With Us</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white transition-colors"><Twitter /></a>
                <a href="#" aria-label="GitHub" className="text-gray-300 hover:text-white transition-colors"><Github /></a>
                <a href="#" aria-label="Email" className="text-gray-300 hover:text-white transition-colors"><Mail /></a>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-600" />
          <div className="text-center text-sm text-gray-400">
            <p>&copy; {year} Student Insights Hub. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

















function LayeredWave() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full block -mb-1">
        <defs>
          <path id="wave-path-1" d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,149.3C672,128,768,128,864,149.3C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192L1440,320L0,320Z" />
          <path id="wave-path-2" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,245.3C840,267,960,277,1080,261.3C1200,245,1320,203,1380,181.3L1440,160L1440,320L0,320Z" />
        </defs>
        <g>
          <use href="#wave-path-1" x="0" y="0" fill="#3498db" />
        </g>
        <g>
          <use href="#wave-path-2" x="0" y="0" fill="#2980b9" />
        </g>
        <path fill="#1f618d" d="M0,288L80,266.7C160,245,320,203,480,197.3C640,192,800,224,960,245.3C1120,267,1280,277,1360,282.7L1440,288L1440,320L0,320Z" />
      </svg>
    </div>
  );
}
