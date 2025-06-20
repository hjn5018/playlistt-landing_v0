"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Music, Plus, Trash2, Upload, X, Check, Search, Bell } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function CreatePlaylistPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [platform, setPlatform] = useState("spotify")
  const [category, setCategory] = useState("pop")
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [tracks, setTracks] = useState<
    Array<{
      id: number
      title: string
      artist: string
      album?: string
      duration: string
    }>
  >([])
  const [newTrack, setNewTrack] = useState({
    title: "",
    artist: "",
    album: "",
  })
  const [activeTab, setActiveTab] = useState("manual")
  const [importUrl, setImportUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState(null)

  // Color options for playlist background
  const colorOptions = [
    "from-orange-400 to-pink-500",
    "from-blue-400 to-purple-500",
    "from-green-400 to-cyan-500",
    "from-yellow-400 to-orange-500",
    "from-indigo-400 to-blue-500",
    "from-pink-400 to-red-500",
    "from-purple-400 to-pink-500",
    "from-amber-400 to-orange-500",
  ]
  const [selectedColor, setSelectedColor] = useState(colorOptions[0])

  const handleAddTrack = () => {
    if (newTrack.title && newTrack.artist) {
      setTracks([
        ...tracks,
        {
          id: Date.now(),
          title: newTrack.title,
          artist: newTrack.artist,
          album: newTrack.album,
          duration: "0:00", // Placeholder duration
        },
      ])
      setNewTrack({ title: "", artist: "", album: "" })
    }
  }

  const handleRemoveTrack = (id: number) => {
    setTracks(tracks.filter((track) => track.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImport = () => {
    // In a real app, this would parse the URL and import tracks
    // For demo purposes, we'll just add some mock tracks
    if (importUrl) {
      setTracks([
        {
          id: Date.now(),
          title: "Imported Track 1",
          artist: "Various Artists",
          album: "Imported Album",
          duration: "3:45",
        },
        {
          id: Date.now() + 1,
          title: "Imported Track 2",
          artist: "Various Artists",
          album: "Imported Album",
          duration: "4:12",
        },
        {
          id: Date.now() + 2,
          title: "Imported Track 3",
          artist: "Various Artists",
          album: "Imported Album",
          duration: "3:30",
        },
      ])
      setImportUrl("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // In a real app, you would redirect to the new playlist page
      setTimeout(() => {
        window.location.href = "/playlist/new-playlist"
      }, 2000)
    }, 1500)
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
          <div className="flex items-center gap-6">
            <Link href="/discover" className="text-sm font-medium hover:underline underline-offset-4">
              Discover
            </Link>
            <Link href="/mypage" className="text-sm font-medium hover:underline underline-offset-4">
              My Page
            </Link>
            <div className="relative w-64 flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search playlists..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link href="/playlist/create">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 ml-4">
                <Music className="mr-2 h-4 w-4" />
                Create Playlist
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Create New Playlist</h1>
              <p className="text-muted-foreground mt-2">
                Create a new playlist to share your favorite tracks with the world
              </p>
            </div>

            {isSuccess ? (
              <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Playlist Created Successfully!</h2>
                      <p className="text-muted-foreground mt-2">
                        Your playlist has been created and is now available for others to enjoy.
                      </p>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <Link href="/playlist/new-playlist">
                        <Button>View Playlist</Button>
                      </Link>
                      <Link href="/discover">
                        <Button variant="outline">Explore More Playlists</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-[1fr_300px]">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Playlist Details</CardTitle>
                      <CardDescription>Enter the basic information about your playlist</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Playlist Title</Label>
                        <Input
                          id="title"
                          placeholder="Enter a title for your playlist"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your playlist"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="platform">Platform</Label>
                          <Select value={platform} onValueChange={setPlatform}>
                            <SelectTrigger id="platform">
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="spotify">Spotify</SelectItem>
                              <SelectItem value="apple">Apple Music</SelectItem>
                              <SelectItem value="melon">Melon</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
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
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
                        <Label htmlFor="public">Make this playlist public</Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Add Tracks</CardTitle>
                      <CardDescription>Add tracks to your playlist</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="manual">Add Manually</TabsTrigger>
                          <TabsTrigger value="import">Import</TabsTrigger>
                        </TabsList>
                        <TabsContent value="manual" className="space-y-4">
                          <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-5">
                              <Input
                                placeholder="Track title"
                                value={newTrack.title}
                                onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
                              />
                            </div>
                            <div className="col-span-4">
                              <Input
                                placeholder="Artist"
                                value={newTrack.artist}
                                onChange={(e) => setNewTrack({ ...newTrack, artist: e.target.value })}
                              />
                            </div>
                            <div className="col-span-3">
                              <Button
                                type="button"
                                onClick={handleAddTrack}
                                className="w-full bg-purple-600 hover:bg-purple-700"
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="import" className="space-y-4">
                          <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-9">
                              <Input
                                placeholder="Paste Spotify, Apple Music, or Melon playlist URL"
                                value={importUrl}
                                onChange={(e) => setImportUrl(e.target.value)}
                              />
                            </div>
                            <div className="col-span-3">
                              <Button
                                type="button"
                                onClick={handleImport}
                                className="w-full bg-purple-600 hover:bg-purple-700"
                              >
                                Import
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      {tracks.length > 0 ? (
                        <div className="border rounded-md">
                          <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] items-center gap-2 p-3 font-medium border-b">
                            <div>Title</div>
                            <div className="hidden sm:block">Artist</div>
                            <div></div>
                          </div>
                          <div className="divide-y">
                            {tracks.map((track) => (
                              <div
                                key={track.id}
                                className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] items-center gap-2 p-3"
                              >
                                <div className="truncate">{track.title}</div>
                                <div className="hidden sm:block truncate">{track.artist}</div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveTrack(track.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 border rounded-md">
                          <p className="text-muted-foreground">No tracks added yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cover Image</CardTitle>
                      <CardDescription>Upload a cover image for your playlist</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col items-center gap-4">
                        <div
                          className={`w-full aspect-square rounded-md overflow-hidden bg-gradient-to-br ${selectedColor} relative`}
                        >
                          {coverImage ? (
                            <>
                              <img
                                src={coverImage || "/placeholder.svg"}
                                alt="Cover preview"
                                className="w-full h-full object-cover"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                                onClick={() => setCoverImage(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Music className="h-16 w-16 text-white/50" />
                            </div>
                          )}
                        </div>
                        <div className="w-full">
                          <Label htmlFor="cover-upload" className="block mb-2">
                            Upload Image
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="cover-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                              onClick={() => document.getElementById("cover-upload")?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" /> Choose File
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Background Color</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {colorOptions.map((color) => (
                            <button
                              key={color}
                              type="button"
                              className={`h-8 rounded-md bg-gradient-to-br ${color} ${
                                selectedColor === color ? "ring-2 ring-purple-600 ring-offset-2" : ""
                              }`}
                              onClick={() => setSelectedColor(color)}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Publish</CardTitle>
                      <CardDescription>Review and publish your playlist</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm">
                          <div className="font-medium">Playlist Summary</div>
                          <div className="text-muted-foreground mt-1">
                            <div>Title: {title || "Untitled Playlist"}</div>
                            <div>Tracks: {tracks.length}</div>
                            <div>Platform: {platform.charAt(0).toUpperCase() + platform.slice(1)}</div>
                            <div>Visibility: {isPublic ? "Public" : "Private"}</div>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          disabled={isSubmitting || !title || tracks.length === 0}
                        >
                          {isSubmitting ? "Creating..." : "Create Playlist"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>
            )}
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
