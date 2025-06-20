"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Heart, Search, Play, Filter } from "lucide-react"
import { PlaylistModal } from "@/components/playlist-modal"

export default function DiscoverPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    id: string
    title: string
    creator: string
    tracks: number
    color: string
  } | null>(null)
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPlatform, setFilterPlatform] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock playlists data - in a real app, you would fetch this from an API
  const allPlaylists = [
    {
      id: "summer-hits",
      title: "Summer Hits",
      creator: "musiclover",
      tracks: 24,
      likes: 1.2,
      color: "from-orange-400 to-pink-500",
      category: "pop",
      platform: "spotify",
    },
    {
      id: "chill-vibes",
      title: "Chill Vibes",
      creator: "chillzone",
      tracks: 18,
      likes: 0.9,
      color: "from-blue-400 to-purple-500",
      category: "lofi",
      platform: "apple",
    },
    {
      id: "workout-mix",
      title: "Workout Mix",
      creator: "fitlife",
      tracks: 32,
      likes: 2.4,
      color: "from-green-400 to-cyan-500",
      category: "electronic",
      platform: "spotify",
    },
    {
      id: "road-trip",
      title: "Road Trip",
      creator: "traveler",
      tracks: 28,
      likes: 1.7,
      color: "from-yellow-400 to-orange-500",
      category: "rock",
      platform: "melon",
    },
    {
      id: "study-focus",
      title: "Study Focus",
      creator: "brainpower",
      tracks: 15,
      likes: 0.8,
      color: "from-indigo-400 to-blue-500",
      category: "classical",
      platform: "apple",
    },
    {
      id: "party-anthems",
      title: "Party Anthems",
      creator: "partypeople",
      tracks: 22,
      likes: 3.1,
      color: "from-pink-400 to-red-500",
      category: "dance",
      platform: "spotify",
    },
    {
      id: "indie-discoveries",
      title: "Indie Discoveries",
      creator: "musicexplorer",
      tracks: 27,
      likes: 1.5,
      color: "from-purple-400 to-pink-500",
      category: "indie",
      platform: "melon",
    },
    {
      id: "jazz-classics",
      title: "Jazz Classics",
      creator: "jazzlover",
      tracks: 19,
      likes: 1.3,
      color: "from-amber-400 to-orange-500",
      category: "jazz",
      platform: "spotify",
    },
    {
      id: "90s-throwbacks",
      title: "90s Throwbacks",
      creator: "retromusic",
      tracks: 25,
      likes: 2.2,
      color: "from-teal-400 to-green-500",
      category: "pop",
      platform: "apple",
    },
    {
      id: "acoustic-sessions",
      title: "Acoustic Sessions",
      creator: "acousticlover",
      tracks: 16,
      likes: 1.1,
      color: "from-rose-400 to-red-500",
      category: "acoustic",
      platform: "melon",
    },
    {
      id: "hip-hop-essentials",
      title: "Hip-Hop Essentials",
      creator: "beatmaster",
      tracks: 30,
      likes: 2.8,
      color: "from-slate-400 to-gray-500",
      category: "hiphop",
      platform: "spotify",
    },
    {
      id: "morning-coffee",
      title: "Morning Coffee",
      creator: "earlybird",
      tracks: 14,
      likes: 0.7,
      color: "from-amber-400 to-yellow-500",
      category: "lofi",
      platform: "apple",
    },
  ]

  // Filter playlists
  const filteredPlaylists = allPlaylists.filter((playlist) => {
    // Filter by category
    if (filterCategory !== "all" && playlist.category !== filterCategory) {
      return false
    }

    // Filter by platform
    if (filterPlatform !== "all" && playlist.platform !== filterPlatform) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return playlist.title.toLowerCase().includes(query) || playlist.creator.toLowerCase().includes(query)
    }

    return true
  })

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

  // Platform icons/logos
  const platformIcons = {
    spotify: (
      <div className="w-5 h-5 bg-[#1DB954] rounded-full flex items-center justify-center">
        <Music className="w-3 h-3 text-white" />
      </div>
    ),
    apple: (
      <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
        <Music className="w-3 h-3 text-white" />
      </div>
    ),
    melon: (
      <div className="w-5 h-5 bg-[#00CD3C] rounded-full flex items-center justify-center">
        <Music className="w-3 h-3 text-white" />
      </div>
    ),
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold">playlistt</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/discover" className="text-sm font-medium text-purple-600 underline underline-offset-4">
              Discover
            </Link>
            <Link href="/mypage" className="text-sm font-medium hover:underline underline-offset-4">
              My Page
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/playlist/create">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Music className="mr-2 h-4 w-4" />
                Create Playlist
              </Button>
            </Link>
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
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Discover Playlists</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore thousands of playlists created by music lovers around the world
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-auto flex items-center gap-2">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search playlists..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="hiphop">Hip-Hop</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                      <SelectItem value="indie">Indie</SelectItem>
                      <SelectItem value="lofi">Lo-Fi</SelectItem>
                      <SelectItem value="dance">Dance</SelectItem>
                      <SelectItem value="acoustic">Acoustic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="spotify">Spotify</SelectItem>
                      <SelectItem value="apple">Apple Music</SelectItem>
                      <SelectItem value="melon">Melon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Playlists Grid */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-8">
                {filteredPlaylists.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPlaylists.map((playlist) => (
                      <div
                        key={playlist.id}
                        className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-90`}></div>
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative p-6 flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-white">{playlist.title}</h3>
                              {platformIcons[playlist.platform as keyof typeof platformIcons]}
                            </div>
                            <p className="text-sm text-gray-200">
                              by{" "}
                              <Link href={`/user/${playlist.creator}`} className="hover:underline">
                                @{playlist.creator}
                              </Link>
                            </p>
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
                                id: playlist.id,
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
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium">No playlists found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
                  </div>
                )}

                {filteredPlaylists.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <Button variant="outline" size="lg">
                      Load More
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="trending">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredPlaylists
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, 8)
                    .map((playlist) => (
                      <div
                        key={playlist.id}
                        className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-90`}></div>
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative p-6 flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-white">{playlist.title}</h3>
                              {platformIcons[playlist.platform as keyof typeof platformIcons]}
                            </div>
                            <p className="text-sm text-gray-200">
                              by{" "}
                              <Link href={`/user/${playlist.creator}`} className="hover:underline">
                                @{playlist.creator}
                              </Link>
                            </p>
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
                                id: playlist.id,
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
              </TabsContent>

              <TabsContent value="new">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredPlaylists
                    .slice()
                    .reverse()
                    .slice(0, 8)
                    .map((playlist) => (
                      <div
                        key={playlist.id}
                        className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-90`}></div>
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative p-6 flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-white">{playlist.title}</h3>
                              {platformIcons[playlist.platform as keyof typeof platformIcons]}
                            </div>
                            <p className="text-sm text-gray-200">
                              by{" "}
                              <Link href={`/user/${playlist.creator}`} className="hover:underline">
                                @{playlist.creator}
                              </Link>
                            </p>
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
                                id: playlist.id,
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
              </TabsContent>
            </Tabs>
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
