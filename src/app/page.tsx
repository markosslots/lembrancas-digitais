"use client"

import { Heart, Gift, Sparkles, ArrowRight, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-cyan-400 fill-cyan-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            MemoryLove
          </span>
        </div>
        <Link href="/create">
          <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all">
            Criar
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-full px-4 py-2">
            <Gift className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400">Presente perfeito para quem você ama</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Transforme suas
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              memórias em arte
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Crie álbuns digitais emocionantes com fotos, mensagens e músicas.
            Compartilhe momentos especiais de forma única e inesquecível.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/create">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
              >
                Crie sua memória
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-4 pt-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 border-2 border-black flex items-center justify-center"
                >
                  <Users className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-cyan-400">2.847</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-sm text-gray-400">memórias criadas</p>
            </div>
          </div>

          {/* Preview Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {/* Card 1 */}
            <div className="relative group">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/20 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Heart className="w-12 h-12 text-cyan-400 fill-cyan-400 mx-auto" />
                    <p className="text-sm text-gray-400">Fotos Especiais</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Sparkles className="w-12 h-12 text-cyan-400 mx-auto" />
                    <p className="text-sm text-gray-400">Mensagens Únicas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative group">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/20 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Gift className="w-12 h-12 text-emerald-400 mx-auto" />
                    <p className="text-sm text-gray-400">Músicas Marcantes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
        <p>© 2024 MemoryLove. Feito com amor para eternizar momentos especiais.</p>
      </footer>
    </div>
  )
}
