"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import React from "react"

interface HeaderProps {
  searchQuery?: string
  setSearchQuery?: (value: string) => void
  showSearch?: boolean
}

export function Header({ searchQuery = "", setSearchQuery, showSearch = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Music className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold">playlistt</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/discover" className="text-sm font-medium hover:underline underline-offset-4">
            Discover
          </Link>
          {showSearch && setSearchQuery && (
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search playlists..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
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
  )
} 