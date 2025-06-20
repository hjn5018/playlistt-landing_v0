"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music, Share2, Users, Heart, Headphones, ChevronRight, Play } from "lucide-react"
import { PlaylistModal } from "@/components/playlist-modal"

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    id: string
    title: string
    creator: string
    tracks: number
    color: string
  } | null>(null)

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
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold">playlistt</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#discover" className="text-sm font-medium hover:underline underline-offset-4">
              Discover
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Share Your Musical Journey
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Create, discover, and share playlists that tell your story. Connect with music lovers around the
                    world.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#discover">
                    <Button size="lg" variant="outline">
                      Explore Playlists
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 relative">
                <div className="relative h-[350px] w-[300px] sm:h-[450px] sm:w-[400px] rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-xl">
                  <div className="absolute inset-2 bg-black rounded-xl overflow-hidden">
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                          <Headphones className="h-6 w-6 text-white" />
                        </div>
                        <Heart className="h-6 w-6 text-pink-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Summer Vibes 2024</h3>
                      <p className="text-sm text-gray-300">Created by @musiclover</p>
                      <div className="space-y-2 pt-2">
                        {[1, 2, 3, 4].map((item) => (
                          <div
                            key={item}
                            className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center">
                                <Play className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">Track {item}</p>
                                <p className="text-xs text-gray-400">Artist {item}</p>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">3:2{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 h-[150px] w-[150px] rounded-xl bg-gradient-to-br from-green-400 to-cyan-500 shadow-lg">
                  <div className="absolute inset-1 bg-black rounded-lg overflow-hidden">
                    <div className="p-3">
                      <h4 className="text-sm font-bold text-white">Workout Mix</h4>
                      <p className="text-xs text-gray-300">32 tracks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features You'll Love</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to create and share the perfect playlist
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Music className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Create Playlists</h3>
                <p className="text-center text-muted-foreground">
                  Easily build playlists from millions of tracks across multiple streaming platforms
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Share2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Share Instantly</h3>
                <p className="text-center text-muted-foreground">
                  Share your playlists with friends or the world with just one click
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Discover Music</h3>
                <p className="text-center text-muted-foreground">
                  Find new music through playlists created by friends and tastemakers
                </p>
              </div>
            </div>
          </div>
        </section>

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

        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started with Playlistt in three simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              {[
                {
                  step: 1,
                  title: "Create an Account",
                  description: "Sign up for free and set up your profile in seconds",
                  icon: Users,
                },
                {
                  step: 2,
                  title: "Build Your Playlist",
                  description: "Add songs from your favorite streaming platforms",
                  icon: Music,
                },
                {
                  step: 3,
                  title: "Share with Friends",
                  description: "Share your playlists on social media or directly with friends",
                  icon: Share2,
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-center text-muted-foreground">{item.description}</p>
                  <item.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Start Sharing?</h2>
                  <p className="max-w-[600px] text-purple-100 md:text-xl">
                    Join thousands of music lovers already creating and sharing playlists on Playlistt.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-100">
                      Sign Up Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px]">
                  <div className="absolute top-0 left-0 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] rounded-lg bg-purple-500 shadow-lg transform -rotate-6">
                    <div className="absolute inset-1 bg-black rounded-lg overflow-hidden">
                      <div className="p-3">
                        <h4 className="text-sm font-bold text-white">Indie Discoveries</h4>
                        <p className="text-xs text-gray-300">42 tracks</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] rounded-lg bg-pink-500 shadow-lg transform rotate-6">
                    <div className="absolute inset-1 bg-black rounded-lg overflow-hidden">
                      <div className="p-3">
                        <h4 className="text-sm font-bold text-white">90s Throwbacks</h4>
                        <p className="text-xs text-gray-300">38 tracks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
