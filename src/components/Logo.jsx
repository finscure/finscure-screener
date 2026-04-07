// Finscure Logo — renders the triangles logo image at specified size
// Usage: <Logo size={32} /> or <Logo size={56} />

export default function Logo({ size = 32, style = {} }) {
  return (
    <img
      src="/logo-sm.png"
      alt="Finscure"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        borderRadius: size > 40 ? 12 : 8,
        ...style,
      }}
    />
  );
}
