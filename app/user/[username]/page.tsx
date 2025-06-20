"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Heart, Play, Users, Bell, Share2 } from "lucide-react"
import { PlaylistModal } from "@/components/playlist-modal"
import { Header } from "@/components/header"

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState("playlists")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    id: string
    title: string
    creator: string
    tracks: number
    color: string
  } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock user data - in a real app, you would fetch this based on the username
  const user = {
    username: params.username,
    name:
      params.username === "musiclover"
        ? "Alex Johnson"
        : params.username === "chillzone"
          ? "Emma Wilson"
          : params.username === "fitlife"
            ? "Mike Thompson"
            : params.username === "traveler"
              ? "Sarah Parker"
              : params.username === "brainpower"
                ? "David Kim"
                : params.username === "partypeople"
                  ? "Lisa Rodriguez"
                  : "User",
    bio: "Music enthusiast | Playlist curator | Always looking for new sounds",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 245,
    following: 132,
    joined: "March 2023",
    isFollowing: false,
  }

  // Mock playlists data - in a real app, you would fetch this based on the username
  const userPlaylists = [
    {
      id: "summer-hits",
      title: "Summer Hits",
      tracks: 24,
      likes: 1.2,
      color: "from-orange-400 to-pink-500",
      lastUpdated: "2 days ago",
    },
    {
      id: "chill-vibes",
      title: "Chill Vibes",
      tracks: 18,
      likes: 0.9,
      color: "from-blue-400 to-purple-500",
      lastUpdated: "1 week ago",
    },
    {
      id: "workout-mix",
      title: "Workout Mix",
      tracks: 32,
      likes: 2.4,
      color: "from-green-400 to-cyan-500",
      lastUpdated: "3 days ago",
    },
  ]

  // Mock liked playlists data
  const likedPlaylists = [
    {
      id: "road-trip",
      title: "Road Trip",
      creator: "traveler",
      tracks: 28,
      likes: 1.7,
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: "study-focus",
      title: "Study Focus",
      creator: "brainpower",
      tracks: 15,
      likes: 0.8,
      color: "from-indigo-400 to-blue-500",
    },
    {
      id: "party-anthems",
      title: "Party Anthems",
      creator: "partypeople",
      tracks: 22,
      likes: 3.1,
      color: "from-pink-400 to-red-500",
    },
  ]

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

  const toggleFollow = () => {
    // In a real app, you would make an API call to follow/unfollow the user
    user.isFollowing = !user.isFollowing
    // Force re-render
    setActiveTab(activeTab)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearch={true} />
      <main className="flex-1">
        {/* User Profile Header */}
        <div className="bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center md:items-start gap-4 flex-1">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
                <p className="max-w-2xl text-center md:text-left">{user.bio}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{user.followers}</span>
                    <span className="text-muted-foreground">followers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{user.following}</span>
                    <span className="text-muted-foreground">following</span>
                  </div>
                  <div className="text-muted-foreground">Joined {user.joined}</div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant={user.isFollowing ? "outline" : "default"}
                    className={user.isFollowing ? "" : "bg-purple-600 hover:bg-purple-700"}
                    onClick={toggleFollow}
                  >
                    {user.isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Content */}
        <div className="container px-4 py-8 md:px-6">
          <Tabs defaultValue="playlists" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="liked">Liked Playlists</TabsTrigger>
            </TabsList>

            {/* User's Playlists Tab */}
            <TabsContent value="playlists" className="space-y-6">
              <h2 className="text-2xl font-bold">{user.name}'s Playlists</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {userPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-90`}></div>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative p-6 flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{playlist.title}</h3>
                        <p className="text-sm text-gray-200">Updated {playlist.lastUpdated}</p>
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
                            creator: user.username,
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

            {/* Liked Playlists Tab */}
            <TabsContent value="liked" className="space-y-6">
              <h2 className="text-2xl font-bold">Playlists {user.name} Likes</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {likedPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-90`}></div>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative p-6 flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{playlist.title}</h3>
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
                          <Heart className="h-4 w-4 fill-white" />
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
