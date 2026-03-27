import Image from "next/image";

/** Footer affichant le logo Kasa et le copyright. */
export default function Footer() {
    return (
        <footer className="mt-auto bg-white px-6 md:px-10 py-4 border-t border-light-gray flex items-center justify-between">
            <Image
                src="/ico-logo.png"
                alt="Kasa Footer"
                width={40}
                height={46}
            />
            <p className="text-xs font-medium text-dark-gray">
                © {new Date().getFullYear()} Kasa. All rights reserved
            </p>
        </footer>
    );
}
