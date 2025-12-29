"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, ArrowLeft, Upload, Music, Sparkles, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { generateMemoryId, saveMemory } from "@/lib/memory-storage"

export default function CreateMemoryPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    photos: [] as string[],
    musicUrl: "",
    customSlug: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newPhotos: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPhotos.push(reader.result as string)
          if (newPhotos.length === files.length) {
            setFormData({ ...formData, photos: [...formData.photos, ...newPhotos] })
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Gera ID único ou usa slug customizado
    const memoryId = formData.customSlug || generateMemoryId()
    
    // Salva a lembrança
    await saveMemory(memoryId, formData)
    
    // Redireciona para página de sucesso com o ID
    router.push(`/success/${memoryId}`)
  }

  const canProceed = () => {
    if (step === 1) return formData.title.trim().length > 0
    if (step === 2) return formData.photos.length > 0
    if (step === 3) return formData.message.trim().length > 0
    return true
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-white" />
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-cyan-400 fill-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                MemoryLove
              </span>
            </div>
          </Link>
          <div className="text-sm text-gray-400">
            Passo {step} de 4
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-black border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="h-2 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl bg-white/5 backdrop-blur-sm border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {step === 1 && "Dê um título especial"}
                {step === 2 && "Adicione suas fotos"}
                {step === 3 && "Escreva sua mensagem"}
                {step === 4 && "Personalize e finalize"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {step === 1 && "Escolha um título que represente esse momento especial"}
                {step === 2 && "Selecione as fotos que fazem parte dessa lembrança"}
                {step === 3 && "Expresse seus sentimentos e emoções"}
                {step === 4 && "Adicione música e personalize o link"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Título */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white">Título da Lembrança</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Nosso Primeiro Ano Juntos ❤️"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="text-lg mt-2 bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Fotos */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="photos" className="text-white">Suas Fotos</Label>
                    <div className="mt-2 border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors bg-white/5">
                      <input
                        id="photos"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <label htmlFor="photos" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
                        <p className="text-sm text-gray-400">
                          Clique para adicionar fotos ou arraste aqui
                        </p>
                      </label>
                    </div>
                  </div>

                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-cyan-500/20">
                          <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Mensagem */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message" className="text-white">Sua Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Escreva aqui sua mensagem especial... Use emojis para deixar ainda mais emocionante! 💕"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[200px] mt-2 bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Personalização */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="music" className="text-white">Música de Fundo (opcional)</Label>
                    <div className="flex gap-2 mt-2">
                      <Music className="w-5 h-5 text-cyan-400 mt-2" />
                      <Input
                        id="music"
                        placeholder="Cole o link do YouTube ou Spotify"
                        value={formData.musicUrl}
                        onChange={(e) => setFormData({ ...formData, musicUrl: e.target.value })}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="slug" className="text-white">Link Personalizado (opcional)</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-500">memorylove.app/</span>
                      <Input
                        id="slug"
                        placeholder="meu-nome-especial"
                        value={formData.customSlug}
                        onChange={(e) => setFormData({ ...formData, customSlug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Deixe em branco para gerar automaticamente
                    </p>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-lg">
                    <h4 className="font-medium text-cyan-400 mb-2">
                      ✨ Resumo da sua lembrança
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Título: {formData.title}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        {formData.photos.length} foto(s) adicionada(s)
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Mensagem personalizada
                      </li>
                      {formData.musicUrl && (
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          Música de fundo incluída
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-emerald-500/20 hover:border-cyan-500/50 transition-all"
                  >
                    Voltar
                  </Button>
                )}
                
                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white shadow-lg shadow-cyan-500/20"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white shadow-lg shadow-cyan-500/20"
                  >
                    {isSubmitting ? (
                      "Criando..."
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Criar Lembrança
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
