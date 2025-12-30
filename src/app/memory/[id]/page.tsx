"use client"

import { use, useEffect, useState } from "react"
import { Heart, Music, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getMemory, type Memory } from "@/lib/memory-storage"
import { Button } from "@/components/ui/button"

interface FallingEmoji {
  id: number
  emoji: string
  left: number
  animationDuration: number
  size: number
  delay: number
}

export default function MemoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [memory, setMemory] = useState<Memory | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [fallingEmojis, setFallingEmojis] = useState<FallingEmoji[]>([])

  useEffect(() => {
    try {
      const loadedMemory = getMemory(resolvedParams.id)
      setMemory(loadedMemory)
    } catch (error) {
      console.error("Erro ao carregar lembrança:", error)
    } finally {
      setLoading(false)
    }
  }, [resolvedParams.id])

  // Gera emojis caindo continuamente quando a memória estiver carregada
  useEffect(() => {
    if (!memory?.emoji) return

    const interval = setInterval(() => {
      const newEmoji: FallingEmoji = {
        id: Date.now() + Math.random(),
        emoji: memory.emoji!,
        left: Math.random() * 100,
        animationDuration: 4 + Math.random() * 3, // 4-7 segundos
        size: 25 + Math.random() * 25, // 25-50px
        delay: 0,
      }
      
      setFallingEmojis(prev => [...prev, newEmoji])
      
      // Remove emoji após a animação
      setTimeout(() => {
        setFallingEmojis(prev => prev.filter(e => e.id !== newEmoji.id))
      }, (newEmoji.animationDuration + 0.5) * 1000)
    }, 400) // Novo emoji a cada 400ms

    return () => clearInterval(interval)
  }, [memory?.emoji])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Heart className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
          <p className="text-xl text-gray-400">Carregando lembrança...</p>
        </div>
      </div>
    )
  }

  if (!memory) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <Heart className="w-16 h-16 text-red-400 mx-auto" />
          <h1 className="text-2xl font-bold text-white">Lembrança não encontrada</h1>
          <p className="text-gray-400">
            Esta lembrança não existe ou foi removida.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white">
              Voltar para Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % memory.photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + memory.photos.length) % memory.photos.length)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Emojis caindo - CHUVA DE EMOJIS */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {fallingEmojis.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.left}%`,
              top: '-80px',
              fontSize: `${item.size}px`,
              animation: `fall ${item.animationDuration}s linear forwards`,
              opacity: 0.9,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Floating Header */}
      <header className="fixed top-4 left-4 right-4 z-50">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 shadow-lg flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-white" />
            <Heart className="w-6 h-6 text-cyan-400 fill-cyan-400" />
            <span className="font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              MemoryLove
            </span>
          </Link>
          {memory.musicUrl && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Música tocando</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {memory.title}
            </h1>
            <p className="text-sm text-gray-400">
              Criado em {new Date(memory.createdAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
            {memory.emoji && (
              <p className="text-sm text-cyan-400 animate-pulse">
                {memory.emoji} Aproveite a chuva de emojis! {memory.emoji}
              </p>
            )}
          </div>

          {/* Photo Gallery */}
          {memory.photos.length > 0 && (
            <div className="relative">
              <div className="aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-white/5 border border-cyan-500/20">
                <img
                  src={memory.photos[currentPhotoIndex]}
                  alt={`Foto ${currentPhotoIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Photo Navigation */}
              {memory.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 shadow-lg hover:scale-110 transition-transform text-white"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 shadow-lg hover:scale-110 transition-transform text-white"
                  >
                    <ArrowLeft className="w-6 h-6 rotate-180" />
                  </button>

                  {/* Photo Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {memory.photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentPhotoIndex
                            ? 'bg-cyan-400 w-8'
                            : 'bg-white/50 hover:bg-white/75 w-2'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Message */}
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-center md:text-left">
                {memory.message}
              </p>
            </div>
          </div>

          {/* Music Player (if URL provided) */}
          {memory.musicUrl && (
            <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl p-6 text-white shadow-xl shadow-cyan-500/20">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-full p-4">
                  <Music className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Música de Fundo</p>
                  <p className="text-sm text-white/80">Clique para ouvir</p>
                </div>
                <a
                  href={memory.musicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-cyan-600 px-6 py-2 rounded-full font-medium hover:bg-white/90 transition-colors"
                >
                  Ouvir
                </a>
              </div>
            </div>
          )}

          {/* Footer CTA */}
          <div className="text-center pt-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-gray-400">
              <Heart className="w-5 h-5 text-cyan-400 fill-cyan-400" />
              <span>Feito com amor no MemoryLove</span>
            </div>
            <div>
              <Link href="/create">
                <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white shadow-lg shadow-cyan-500/20">
                  Criar Minha Própria Lembrança
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background Music (hidden audio element) */}
      {memory.musicUrl && (
        <audio autoPlay loop className="hidden">
          <source src={memory.musicUrl} />
        </audio>
      )}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(calc(100vh + 100px)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
