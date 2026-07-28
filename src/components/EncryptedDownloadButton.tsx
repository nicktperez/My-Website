import { Download } from 'lucide-react';

interface ResumeLinkProps {
  href: string;
  fileName?: string;
}

const EncryptedDownloadButton = ({ href, fileName = 'Resume.pdf' }: ResumeLinkProps) => (
  <a className="button button-secondary" href={href} download={fileName}>
    <Download size={17} aria-hidden="true" />
    Download résumé
  </a>
);

export default EncryptedDownloadButton;
