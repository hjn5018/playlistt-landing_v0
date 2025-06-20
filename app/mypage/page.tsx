"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Music, Settings, User, Bell, Heart, Clock, Edit, Play, Share2 } from "lucide-react"

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("playlists")

  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "alexjmusic",
    email: "alex@example.com",
    bio: "Music enthusiast | Playlist curator | Always looking for new sounds",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 245,
    following: 132,
    joined: "March 2023",
  }

  // Mock playlists data
  const playlists = [
    {
      id: 1,
      title: "Summer Vibes 2024",
      tracks: 24,
      likes: 128,
      color: "from-orange-400 to-pink-500",
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      title: "Chill Evenings",
      tracks: 18,
      likes: 76,
      color: "from-blue-400 to-purple-500",
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      title: "Workout Motivation",
      tracks: 32,
      likes: 214,
      color: "from-green-400 to-cyan-500",
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      title: "Indie Discoveries",
      tracks: 15,
      likes: 42,
      color: "from-yellow-400 to-orange-500",
      lastUpdated: "2 weeks ago",
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
  ]

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
            <Link href="/mypage" className="text-sm font-medium text-purple-600 underline underline-offset-4">
              My Page
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
        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            {/* Profile Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 text-center">
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                    <p className="text-center text-sm">{user.bio}</p>
                    <div className="flex w-full justify-between text-center text-sm">
                      <div>
                        <p className="font-bold">{user.followers}</p>
                        <p className="text-muted-foreground">Followers</p>
                      </div>
                      <div>
                        <p className="font-bold">{user.following}</p>
                        <p className="text-muted-foreground">Following</p>
                      </div>
                      <div>
                        <p className="font-bold">{playlists.length}</p>
                        <p className="text-muted-foreground">Playlists</p>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Link href="/mypage" className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <User className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Profile</span>
                    </Link>
                    <Link href="/mypage/liked" className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <Heart className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Liked Playlists</span>
                    </Link>
                    <Link href="/mypage/history" className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Recently Played</span>
                    </Link>
                    <Link href="/mypage/settings" className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <Settings className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Settings</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <Tabs defaultValue="playlists" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="playlists">My Playlists</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="settings">Account Settings</TabsTrigger>
                </TabsList>

                {/* Playlists Tab */}
                <TabsContent value="playlists" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Your Playlists</h3>
                    <Button>
                      <Music className="mr-2 h-4 w-4" />
                      Create New Playlist
                    </Button>
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
                            <h3 className="text-xl font-bold text-white">{playlist.title}</h3>
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
                            <Button className="flex-1 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                              <Play className="mr-2 h-4 w-4" /> Play
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="space-y-4">
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

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your profile details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue={user.username} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" defaultValue={user.bio} />
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Manage your notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Followers</Label>
                          <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Playlist Likes</Label>
                          <p className="text-sm text-muted-foreground">Get notified when someone likes your playlist</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Security</CardTitle>
                      <CardDescription>Manage your account security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </CardContent>
                  </Card>
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
    </div>
  )
}
