"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { PlaylistModal } from "@/components/playlist-modal"
import {
  Music,
  User,
  Bell,
  Heart,
  Edit,
  Play,
  Share2,
  Headphones,
  ListMusic,
  Lock,
  Globe,
  Calendar,
  MessageSquare,
  MoreHorizontal,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<{
    id: string
    title: string
    creator: string
    tracks: number
    color: string
  } | null>(null)
  const [editMode, setEditMode] = useState(false)

  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "alexjmusic",
    email: "alex@example.com",
    bio: "Music enthusiast | Playlist curator | Always looking for new sounds",
    avatar: "/placeholder.svg?height=100&width=100",
    coverImage: "/placeholder.svg?height=400&width=1200",
    followers: 245,
    following: 132,
    joined: "March 2023",
    location: "New York, USA",
    website: "alexjmusic.com",
    totalPlaylists: 12,
    totalLikes: 347,
    listenTime: "423 hours",
    topGenres: [
      { name: "Pop", percentage: 35 },
      { name: "Indie", percentage: 25 },
      { name: "Electronic", percentage: 20 },
      { name: "Hip-Hop", percentage: 15 },
      { name: "Rock", percentage: 5 },
    ],
    topArtists: [
      { name: "The Weeknd", plays: 142 },
      { name: "Dua Lipa", plays: 98 },
      { name: "Tame Impala", plays: 87 },
      { name: "Kendrick Lamar", plays: 76 },
      { name: "Arctic Monkeys", plays: 65 },
    ],
  }

  // Mock playlists data
  const playlists = [
    {
      id: "summer-vibes",
      title: "Summer Vibes 2024",
      tracks: 24,
      likes: 128,
      color: "from-orange-400 to-pink-500",
      lastUpdated: "2 days ago",
      isPublic: true,
    },
    {
      id: "chill-evenings",
      title: "Chill Evenings",
      tracks: 18,
      likes: 76,
      color: "from-blue-400 to-purple-500",
      lastUpdated: "1 week ago",
      isPublic: true,
    },
    {
      id: "workout-motivation",
      title: "Workout Motivation",
      tracks: 32,
      likes: 214,
      color: "from-green-400 to-cyan-500",
      lastUpdated: "3 days ago",
      isPublic: true,
    },
    {
      id: "indie-discoveries",
      title: "Indie Discoveries",
      tracks: 15,
      likes: 42,
      color: "from-yellow-400 to-orange-500",
      lastUpdated: "2 weeks ago",
      isPublic: false,
    },
    {
      id: "throwback-hits",
      title: "Throwback Hits",
      tracks: 27,
      likes: 93,
      color: "from-purple-400 to-pink-500",
      lastUpdated: "1 month ago",
      isPublic: true,
    },
    {
      id: "coding-focus",
      title: "Coding Focus",
      tracks: 20,
      likes: 54,
      color: "from-indigo-400 to-blue-500",
      lastUpdated: "2 weeks ago",
      isPublic: false,
    },
  ]

  // Mock liked playlists
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

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "like",
      content: "You liked the playlist 'Indie Folk Favorites'",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "create",
      content: "You created a new playlist 'Summer Vibes 2024'",
      time: "2 days ago",
    },
    {
      id: 3,
      type: "follow",
      content: "You followed @musiclover",
      time: "3 days ago",
    },
    {
      id: 4,
      type: "add",
      content: "You added 3 tracks to 'Workout Motivation'",
      time: "5 days ago",
    },
    {
      id: 5,
      type: "share",
      content: "You shared 'Chill Evenings' playlist",
      time: "1 week ago",
    },
    {
      id: 6,
      type: "comment",
      content: "You commented on @jazzlover's playlist",
      time: "1 week ago",
    },
    {
      id: 7,
      type: "like",
      content: "You liked @retromusic's playlist '90s Throwbacks'",
      time: "2 weeks ago",
    },
    {
      id: 8,
      type: "follow",
      content: "You followed @acousticlover",
      time: "2 weeks ago",
    },
  ]

  // Mock followers data
  const followers = [
    {
      username: "musiclover",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      isFollowing: true,
    },
    {
      username: "beatmaster",
      name: "James Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      isFollowing: false,
    },
    {
      username: "jazzlover",
      name: "Sophie Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      isFollowing: true,
    },
    {
      username: "retromusic",
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      isFollowing: false,
    },
    {
      username: "acousticlover",
      name: "Olivia Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      isFollowing: true,
    },
  ]

  // Mock following data
  const following = [
    {
      username: "chillzone",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "fitlife",
      name: "Jessica Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "traveler",
      name: "Ryan Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "brainpower",
      name: "Sophia Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "partypeople",
      name: "Daniel Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Mock recently played tracks
  const recentlyPlayed = [
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      playedAt: "Today, 10:23 AM",
    },
    {
      title: "Don't Start Now",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      playedAt: "Today, 9:45 AM",
    },
    {
      title: "Lost in Yesterday",
      artist: "Tame Impala",
      album: "The Slow Rush",
      playedAt: "Yesterday, 8:30 PM",
    },
    {
      title: "HUMBLE.",
      artist: "Kendrick Lamar",
      album: "DAMN.",
      playedAt: "Yesterday, 7:15 PM",
    },
    {
      title: "Do I Wanna Know?",
      artist: "Arctic Monkeys",
      album: "AM",
      playedAt: "Yesterday, 6:00 PM",
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
            <Link href="/discover" className="text-sm font-medium hover:underline underline-offset-4">
              Discover
            </Link>
            <Link href="/profile" className="text-sm font-medium text-purple-600 underline underline-offset-4">
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Profile Cover & Info */}
        <div className="relative">
          <div className="h-48 md:h-64 w-full overflow-hidden">
            <Image
              src={user.coverImage || "/placeholder.svg"}
              alt="Cover"
              width={1200}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container px-4 md:px-6">
            <div className="relative -mt-16 md:-mt-20 flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 pb-4">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
              <div className="flex gap-3 pb-4">
                <Button variant="outline" onClick={() => setEditMode(!editMode)}>
                  <Edit className="mr-2 h-4 w-4" />
                  {editMode ? "Cancel Editing" : "Edit Profile"}
                </Button>
                <Link href="/playlist/create">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Music className="mr-2 h-4 w-4" />
                    Create Playlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-6 px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  {editMode ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" defaultValue={user.bio} rows={3} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={user.location} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" defaultValue={user.website} />
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Save Changes</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm">{user.bio}</p>
                      <div className="flex flex-col gap-2 text-sm">
                        {user.location && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{user.location}</span>
                          </div>
                        )}
                        {user.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a href={`https://${user.website}`} className="text-purple-600 hover:underline">
                              {user.website}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Joined {user.joined}</span>
                        </div>
                      </div>
                      <div className="flex w-full justify-between text-center">
                        <div>
                          <p className="font-bold">{user.followers}</p>
                          <p className="text-xs text-muted-foreground">Followers</p>
                        </div>
                        <div>
                          <p className="font-bold">{user.following}</p>
                          <p className="text-xs text-muted-foreground">Following</p>
                        </div>
                        <div>
                          <p className="font-bold">{user.totalPlaylists}</p>
                          <p className="text-xs text-muted-foreground">Playlists</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Total Listen Time</span>
                    </div>
                    <span className="font-medium">{user.listenTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ListMusic className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Playlists Created</span>
                    </div>
                    <span className="font-medium">{user.totalPlaylists}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Total Likes</span>
                    </div>
                    <span className="font-medium">{user.totalLikes}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Top Genres</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.topGenres.map((genre, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{genre.name}</span>
                        <span>{genre.percentage}%</span>
                      </div>
                      <Progress value={genre.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Top Artists</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user.topArtists.map((artist, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                            <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-sm">{artist.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{artist.plays} plays</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="playlists">Playlists</TabsTrigger>
                  <TabsTrigger value="liked">Liked</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="connections">Connections</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Your Playlists</CardTitle>
                        <Link href="#playlists" onClick={() => setActiveTab("playlists")}>
                          <Button variant="ghost" size="sm" className="text-purple-600">
                            View All
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {playlists.slice(0, 3).map((playlist) => (
                          <div
                            key={playlist.id}
                            className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all"
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-90`}></div>
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="relative p-6 flex flex-col h-full justify-between">
                              <div>
                                <div className="flex items-center justify-between">
                                  <h3 className="text-xl font-bold text-white">{playlist.title}</h3>
                                  {!playlist.isPublic && <Lock className="h-4 w-4 text-white/70" />}
                                </div>
                                <p className="text-sm text-gray-200">Updated {playlist.lastUpdated}</p>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <div className="text-sm text-white">{playlist.tracks} tracks</div>
                                <div className="flex items-center gap-1 text-sm text-white">
                                  <Heart className="h-4 w-4" />
                                  {playlist.likes}
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
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recently Played</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentlyPlayed.map((track, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                                <Music className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{track.title}</p>
                                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                              </div>
                              <p className="text-xs text-muted-foreground whitespace-nowrap">{track.playedAt}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {activities.slice(0, 5).map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3">
                              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                                {activity.type === "like" && <Heart className="h-4 w-4 text-purple-500" />}
                                {activity.type === "create" && <Music className="h-4 w-4 text-purple-500" />}
                                {activity.type === "follow" && <User className="h-4 w-4 text-purple-500" />}
                                {activity.type === "add" && <Play className="h-4 w-4 text-purple-500" />}
                                {activity.type === "share" && <Share2 className="h-4 w-4 text-purple-500" />}
                                {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-purple-500" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm">{activity.content}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Playlists Tab */}
                <TabsContent value="playlists" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Your Playlists</h3>
                    <Link href="/playlist/create">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Music className="mr-2 h-4 w-4" />
                        Create New Playlist
                      </Button>
                    </Link>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.id}
                        className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-90`}></div>
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative p-6 flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold text-white">{playlist.title}</h3>
                              {!playlist.isPublic && <Lock className="h-4 w-4 text-white/70" />}
                            </div>
                            <p className="text-sm text-gray-200">Updated {playlist.lastUpdated}</p>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-white">{playlist.tracks} tracks</div>
                            <div className="flex items-center gap-1 text-sm text-white">
                              <Heart className="h-4 w-4" />
                              {playlist.likes}
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button
                              className="flex-1 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit playlist
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Liked Tab */}
                <TabsContent value="liked" className="space-y-6">
                  <h3 className="text-xl font-bold">Playlists You Like</h3>

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

                {/* Activity Tab */}
                <TabsContent value="activity" className="space-y-6">
                  <h3 className="text-xl font-bold">Recent Activity</h3>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {activities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-4 p-4">
                            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                              {activity.type === "like" && <Heart className="h-4 w-4 text-purple-500" />}
                              {activity.type === "create" && <Music className="h-4 w-4 text-purple-500" />}
                              {activity.type === "follow" && <User className="h-4 w-4 text-purple-500" />}
                              {activity.type === "add" && <Play className="h-4 w-4 text-purple-500" />}
                              {activity.type === "share" && <Share2 className="h-4 w-4 text-purple-500" />}
                              {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-purple-500" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">{activity.content}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Connections Tab */}
                <TabsContent value="connections" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Followers ({followers.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {followers.map((follower, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={follower.avatar || "/placeholder.svg"} alt={follower.name} />
                                  <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <Link href={`/user/${follower.username}`} className="font-medium hover:underline">
                                    {follower.name}
                                  </Link>
                                  <p className="text-sm text-muted-foreground">@{follower.username}</p>
                                </div>
                              </div>
                              <Button variant={follower.isFollowing ? "outline" : "default"} size="sm">
                                {follower.isFollowing ? "Following" : "Follow"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Following ({following.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {following.map((follow, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={follow.avatar || "/placeholder.svg"} alt={follow.name} />
                                  <AvatarFallback>{follow.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <Link href={`/user/${follow.username}`} className="font-medium hover:underline">
                                    {follow.name}
                                  </Link>
                                  <p className="text-sm text-muted-foreground">@{follow.username}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Unfollow
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
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
