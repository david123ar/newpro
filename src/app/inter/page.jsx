export const metadata = {
  title: "Sponsored Page | Henpro",
  description: "Please support Henpro by viewing this sponsored content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InterPage({ searchParams }) {
  const redirect = searchParams?.to || "/";

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: "sans-serif",
        minHeight: "100vh",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Top-right Close Button */}
      <a
        href={redirect}
        style={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "0.5rem 1.5rem",
          backgroundColor: "#333",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "9999px",
          fontSize: "0.9rem",
          zIndex: 10,
        }}
      >
        ✕ Close
      </a>

      <h1
        style={{
          fontSize: "1.5rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        This content is sponsored. Please support us by viewing these ads.
      </h1>

      {/* Ad 1 */}
      <div
        id="ad-container-1"
        style={{ width: "100%", maxWidth: "800px", marginBottom: "2rem" }}
      >
        <div id="container-0a9b41bf6540401a759c03802d78f347" />
      </div>

      {/* Ad 2 */}
      <div id="ad-container-2" style={{ width: "100%", maxWidth: "800px" }}>
        <div id="container-33a497c32aa8ecfffc3d4653d57e37f4" />
      </div>

      {/* Inject ad scripts */}
      <script
        async
        data-cfasync="false"
        src="//processestheycod.com/0a9b41bf6540401a759c03802d78f347/invoke.js"
      ></script>
      <script
        async
        data-cfasync="false"
        src="//processestheycod.com/33a497c32aa8ecfffc3d4653d57e37f4/invoke.js"
      ></script>
    </div>
  );
}
