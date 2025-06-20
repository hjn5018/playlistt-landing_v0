"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music, Share2, Users, Heart, Headphones, ChevronRight, Play, Search } from "lucide-react"
import { PlaylistModal } from "@/components/playlist-modal"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    id: string
    title: string
    creator: string
    tracks: number
    color: string
  } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handlePlayClick = (playlist: {
    id: string
    title: string
    creator: string
    tracks: number
    color: string
  }) => {
    setSelectedPlaylist(playlist)
    setModalOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearch={true} />
      <main className="flex-1">
        <section id="discover" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trending Playlists</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover what's hot in the Playlistt community right now
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Summer Hits",
                  creator: "musiclover",
                  tracks: 24,
                  likes: 1.2,
                  color: "from-orange-400 to-pink-500",
                },
                {
                  title: "Chill Vibes",
                  creator: "chillzone",
                  tracks: 18,
                  likes: 0.9,
                  color: "from-blue-400 to-purple-500",
                },
                {
                  title: "Workout Mix",
                  creator: "fitlife",
                  tracks: 32,
                  likes: 2.4,
                  color: "from-green-400 to-cyan-500",
                },
                {
                  title: "Road Trip",
                  creator: "traveler",
                  tracks: 28,
                  likes: 1.7,
                  color: "from-yellow-400 to-orange-500",
                },
                {
                  title: "Study Focus",
                  creator: "brainpower",
                  tracks: 15,
                  likes: 0.8,
                  color: "from-indigo-400 to-blue-500",
                },
                {
                  title: "Party Anthems",
                  creator: "partypeople",
                  tracks: 22,
                  likes: 3.1,
                  color: "from-pink-400 to-red-500",
                },
              ].map((playlist, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-90`}></div>
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="relative p-6 flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{playlist.title}</h3>
                      <p className="text-sm text-gray-200">by @{playlist.creator}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-white">{playlist.tracks} tracks</div>
                      <div className="flex items-center gap-1 text-sm text-white">
                        <Heart className="h-4 w-4" />
                        {playlist.likes}k
                      </div>
                    </div>
                    <Button
                      className="mt-4 w-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                      onClick={() =>
                        handlePlayClick({
                          id: `playlist-${index}`,
                          title: playlist.title,
                          creator: playlist.creator,
                          tracks: playlist.tracks,
                          color: playlist.color,
                        })
                      }
                    >
                      <Play className="mr-2 h-4 w-4" /> Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/discover">
                <Button variant="outline" size="lg">
                  Explore All Playlists
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-purple-500" />
            <p className="text-sm text-muted-foreground">© 2024 Playlistt. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
      <PlaylistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} playlist={selectedPlaylist} />
    </div>
  )
}
