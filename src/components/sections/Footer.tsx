import { personalData } from "@/../utils/Data/PersonalData";
import Image from "next/image";
import Link from "next/link";
import { FaCodeBranch, FaGithub, FaLinkedin } from "react-icons/fa";

const navItems = [
  { label: "About", to: "about" },
  { label: "Experience", to: "experience" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
  { label: "Contact", to: "contact" },
];

const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/5 text-gray-200">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
        <div className="flex flex-col gap-6">
          <Link href="/" className="w-fit" aria-label="Akhilesh Yadav — home">
            <Image
              src="/logo.svg"
              alt={`${personalData.name} logo`}
              width={100}
              height={100}
              className="brightness-125"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Android engineer focused on building fast, reliable, and
            maintainable mobile products.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 opacity-50">
            Navigation
          </h3>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  href={`/#${item.to}`}
                  className="text-gray-400 hover:text-brand transition-all font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 opacity-50">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${personalData.email}`}
                className="text-gray-400 hover:text-brand transition-all font-medium"
              >
                {personalData.email}
              </a>
              <a
                href={`tel:${personalData.phone.replace(/\s/g, "")}`}
                className="text-gray-400 hover:text-brand transition-all font-medium"
              >
                {personalData.phone}
              </a>
            </div>
          </div>

          <div className="flex space-x-4">
            <Link
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg bg-white/5 hover:bg-brand/10 hover:text-brand transition-all border border-white/5"
            >
              <FaGithub size={20} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg bg-white/5 hover:bg-brand/10 hover:text-brand transition-all border border-white/5"
            >
              <FaLinkedin size={20} />
            </Link>
            <Link
              href={personalData.openSource}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-brand/10 hover:text-brand transition-all border border-white/5"
              aria-label="Open source project"
            >
              <FaCodeBranch size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} {personalData.name}. All rights
          reserved.
        </p>
        <p>Built with TypeScript, Next.js, and attention to detail.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
