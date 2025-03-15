import Link from "next/link"
import { PostContent } from "@/components/blog/post-content"
import { ShareButtons } from "@/components/blog/share-buttons"

// Dados simulados para os posts do blog (mesmo array da página principal)
const blogPosts = [
  {
    id: 1,
    slug: "praias-escondidas-nordeste",
    title: "As 5 praias escondidas mais incríveis do Nordeste",
    excerpt: "Descubra paraísos pouco explorados no litoral nordestino que vão te deixar sem fôlego...",
    content:
      "O Nordeste brasileiro é conhecido por suas praias paradisíacas, mas existem algumas joias escondidas que poucos turistas conhecem. Longe das multidões, estas praias oferecem uma experiência autêntica e inesquecível. Desde pequenas enseadas cercadas por falésias até praias desertas com águas cristalinas, estes destinos são perfeitos para quem busca tranquilidade e contato com a natureza. A Praia do Madeiro, em Pipa (RN), é uma delas - com suas águas calmas e a presença frequente de golfinhos. Já a Praia de Patacho, em Porto de Pedras (AL), impressiona pelas piscinas naturais que se formam durante a maré baixa.",
    coverImage: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    date: "12 de março de 2025",
    tags: ["Praias", "Nordeste", "Viagem", "Natureza"],
  },
  {
    id: 2,
    slug: "gastronomia-mineira",
    title: "Gastronomia mineira: um tour pelos sabores tradicionais",
    excerpt: "Uma jornada pelos pratos mais autênticos e saborosos de Minas Gerais...",
    content:
      "A culinária mineira é um verdadeiro tesouro nacional, com pratos que contam histórias e tradições passadas de geração em geração. Do tradicional pão de queijo ao feijão tropeiro, cada receita carrega consigo um pedaço da alma mineira. Em cidades históricas como Tiradentes e Ouro Preto, pequenos restaurantes familiares servem iguarias preparadas em fogões a lenha, exatamente como se fazia há séculos. O queijo canastra, produzido artesanalmente nas fazendas da região, é um patrimônio cultural que merece ser degustado com calma, acompanhado de um bom café coado na hora.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "10 de março de 2025",
    tags: ["Gastronomia", "Minas Gerais", "Cultura", "Comida"],
  },
  {
    id: 3,
    slug: "trilhas-chapada-diamantina",
    title: "As trilhas mais impressionantes da Chapada Diamantina",
    excerpt: "Aventure-se pelos caminhos mais deslumbrantes deste paraíso natural na Bahia...",
    content:
      "A Chapada Diamantina é um playground para os amantes de trilhas e natureza. Com seus vales profundos, cachoeiras impressionantes e formações rochosas únicas, o parque nacional oferece experiências para todos os níveis de caminhantes. A trilha do Vale do Pati, considerada uma das mais bonitas do Brasil, proporciona vistas de tirar o fôlego e a chance de se hospedar com moradores locais em casas simples no meio da mata. Já o Morro do Pai Inácio oferece uma subida relativamente fácil com uma recompensa incrível: uma vista panorâmica de 360° do parque. Para os mais aventureiros, a Cachoeira da Fumaça, com seus 380 metros de queda livre, é um destino imperdível.",
    coverImage: "/placeholder.svg?height=400&width=600",
    video: "https://example.com/video.mp4",
    date: "5 de março de 2025",
    tags: ["Trilhas", "Chapada Diamantina", "Aventura", "Natureza"],
  },
]

export default function BlogPostPage({ params }) {
  const { slug } = params
  const post = blogPosts.find((post) => post.slug === slug)

  if (!post) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
        <p className="mb-8">O post que você está procurando não existe ou foi removido.</p>
        <Link href="/blog" className="text-blue-600 hover:underline">
          Voltar para o blog
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Link href="/blog" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Voltar para o blog
        </Link>

        <PostContent post={post} />

        <div className="mt-8 border-t pt-6">
          <ShareButtons post={post} />
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Outros posts que podem te interessar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="h-40 bg-gray-200 relative">
                      <img
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg">{relatedPost.title}</h3>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

