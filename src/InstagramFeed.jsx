import { useEffect, useState } from "react";
import InstagramCarousel from "./InstagramCarousel";

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // ⚠️ Reemplazá con tu Access Token válido
    const token = "TU_ACCESS_TOKEN_DE_FACEBOOK";
    fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setPosts(
            data.data.map((p) => ({
              id: p.id,
              img: p.media_url,
              link: p.permalink,
              desc: p.caption || "",
            }))
          );
        }
      });
  }, []);

  if (posts.length === 0) {
    return <p className="text-center text-slate-500">Cargando posteos...</p>;
  }

  return <InstagramCarousel posts={posts} />;
}
