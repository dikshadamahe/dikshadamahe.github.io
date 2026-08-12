const NOTE = 'Preview Mode:';
const REST = ' open this on a desktop for the full two-page notebook!';

export default function MobileBanner() {
  return (
    <div className="mobile-preview-banner">
      <div className="marquee-track">
        {[0, 1, 2, 3].map((copy) => (
          <span className="marquee-text" key={copy}>
            &#10024; <strong>{NOTE}</strong>
            {REST}
          </span>
        ))}
      </div>
    </div>
  );
}
