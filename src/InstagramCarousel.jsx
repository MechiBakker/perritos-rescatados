import { useEffect, useRef } from "react";

export default function InstagramCarousel() {
  const trackRef = useRef(null);

  // Función para scrollear entre tarjetas
  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const delta = card ? card.getBoundingClientRect().width + 16 : 320;
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  // 🔹 Lista de links de Instagram (reemplazá con tus posts)
  const posts = [
    "https://www.instagram.com/p/DOCLLaiEUj3/",
    "https://www.instagram.com/p/DOBxaKbDdC4/",
    "https://www.instagram.com/p/DN-5xASDZO2/",
    "https://www.instagram.com/p/DN8cOCtDXgq/",
    "https://www.instagram.com/p/DNy1f4j2jBU/",
    "https://www.instagram.com/p/DNo0yjtt-rd/",
    "https://www.instagram.com/p/DNnjHSYNIkp/",
    "https://www.instagram.com/p/DNUTNhNsv2e/",
    "https://www.instagram.com/p/DNivaNHx18F/"
  ];

  // Cargar el script de Instagram cada vez que cambia la lista
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [posts]);

  return (
    <div className="relative mt-6">
      {/* Flecha izquierda */}
      <button
        type="button"
        className="absolute left-1 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-white shadow hover:shadow-md border text-[#38629F] z-10"
        aria-label="Anterior"
        onClick={() => scrollByCard(-1)}
      >
        «
      </button>

      {/* Contenedor del carrusel */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 scrollbar-hide relative"
        role="region"
        aria-label="Posteos de Instagram"
      >
        {posts.map((url, i) => (
          <div
            key={i}
            data-card
            className="min-w-[320px] max-w-[360px] snap-start bg-white rounded-2xl shadow hover:shadow-lg transition-shadow p-2"
          >
            <blockquote
              className="instagram-media w-full"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{ background: "#fff", borderRadius: "1rem" }}
            ></blockquote>
          </div>
        ))}

        {/* Gradiente a la derecha */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
      </div>

      {/* Flecha derecha */}
      <button
        type="button"
        className="absolute right-1 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-white shadow hover:shadow-md border text-[#38629F] z-10"
        aria-label="Siguiente"
        onClick={() => scrollByCard(1)}
      >
        »
      </button>
    </div>
  );
}
