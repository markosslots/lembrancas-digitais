"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Copy, Download, Share2, QrCode as QrCodeIcon, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import QRCode from "qrcode"

export default function SuccessPage() {
  const params = useParams()
  const memoryId = params.id as string
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [copied, setCopied] = useState(false)
  
  const memoryUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/memory/${memoryId}`
    : ""

  useEffect(() => {
    if (memoryUrl) {
      QRCode.toDataURL(memoryUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#06B6D4',
          light: '#FFFFFF'
        }
      }).then(setQrCodeUrl)
    }
  }, [memoryUrl])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(memoryUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQRCode = () => {
    const link = document.createElement('a')
    link.download = `memorylove-${memoryId}.png`
    link.href = qrCodeUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-cyan-400 fill-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              MemoryLove
            </span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Success Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Success Message */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full mb-4 shadow-lg shadow-cyan-500/30">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Lembrança criada com sucesso! 🎉
            </h1>
            <p className="text-xl text-gray-400">
              Sua página de lembrança está pronta para ser compartilhada
            </p>
          </div>

          {/* QR Code Card */}
          <Card className="shadow-2xl bg-white/5 backdrop-blur-sm border-cyan-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Seu QR Code Personalizado</CardTitle>
              <CardDescription className="text-gray-400">
                Escaneie ou compartilhe para acessar a lembrança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code Display */}
              <div className="flex justify-center">
                {qrCodeUrl ? (
                  <div className="p-6 bg-white rounded-2xl shadow-lg">
                    <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
                  </div>
                ) : (
                  <div className="w-64 h-64 bg-white/10 rounded-2xl animate-pulse" />
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Button
                  onClick={downloadQRCode}
                  variant="outline"
                  className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  disabled={!qrCodeUrl}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar QR Code
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Link
                    </>
                  )}
                </Button>
              </div>

              {/* Link Display */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Seu link:</p>
                <p className="text-sm font-mono break-all text-white">
                  {memoryUrl}
                </p>
              </div>

              {/* View Memory Button */}
              <Link href={`/memory/${memoryId}`}>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white shadow-lg shadow-cyan-500/20">
                  <Heart className="w-4 h-4 mr-2" />
                  Ver Minha Lembrança
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <QrCodeIcon className="w-5 h-5 text-cyan-400" />
                Dicas de Compartilhamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Imprima o QR Code e cole em cartões, presentes ou álbuns físicos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Compartilhe o link por WhatsApp, Instagram ou qualquer rede social</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>O QR Code funciona em qualquer celular com câmera</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Sua lembrança ficará disponível permanentemente neste link</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Create Another */}
          <div className="text-center">
            <Link href="/create">
              <Button variant="outline" size="lg" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                Criar Outra Lembrança
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
