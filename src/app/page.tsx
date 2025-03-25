"use client"

import { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { File, FileText, Folder, Image, MoreHorizontal, Package, PlusCircle, Search, Video } from "lucide-react"

// Mock data for files and folders
const mockData = {
  root: {
    name: "My Drive",
    type: "folder",
    children: ["documents", "images", "videos", "projects"],
    files: [
      { id: "file1", name: "Resume.pdf", type: "pdf", size: "2.4 MB", modified: "Apr 12, 2023" },
      { id: "file2", name: "Budget.xlsx", type: "spreadsheet", size: "1.8 MB", modified: "Mar 25, 2023" },
    ],
  },
  documents: {
    name: "Documents",
    type: "folder",
    parent: "root",
    children: ["work"],
    files: [
      { id: "file3", name: "Report.docx", type: "document", size: "3.2 MB", modified: "Feb 15, 2023" },
      { id: "file4", name: "Notes.txt", type: "text", size: "0.1 MB", modified: "Jan 5, 2023" },
    ],
  },
  work: {
    name: "Work",
    type: "folder",
    parent: "documents",
    children: [],
    files: [
      { id: "file5", name: "Presentation.pptx", type: "presentation", size: "5.7 MB", modified: "Mar 10, 2023" },
      { id: "file6", name: "Contract.pdf", type: "pdf", size: "1.2 MB", modified: "Feb 28, 2023" },
    ],
  },
  images: {
    name: "Images",
    type: "folder",
    parent: "root",
    children: [],
    files: [
      { id: "file7", name: "Vacation.jpg", type: "image", size: "4.5 MB", modified: "Dec 12, 2022" },
      { id: "file8", name: "Profile.png", type: "image", size: "2.1 MB", modified: "Nov 8, 2022" },
    ],
  },
  videos: {
    name: "Videos",
    type: "folder",
    parent: "root",
    children: [],
    files: [
      { id: "file9", name: "Tutorial.mp4", type: "video", size: "45.2 MB", modified: "Jan 22, 2023" },
      { id: "file10", name: "Meeting.mp4", type: "video", size: "32.8 MB", modified: "Feb 5, 2023" },
    ],
  },
  projects: {
    name: "Projects",
    type: "folder",
    parent: "root",
    children: [],
    files: [
      { id: "file11", name: "Project Plan.pdf", type: "pdf", size: "3.4 MB", modified: "Mar 15, 2023" },
      { id: "file12", name: "Code.zip", type: "archive", size: "12.7 MB", modified: "Apr 2, 2023" },
    ],
  },
}

export default function Page() {
  const [currentFolder, setCurrentFolder] = useState("root")
  const folder = mockData[currentFolder as keyof typeof mockData]

  // Generate breadcrumb path
  const generateBreadcrumbs = () => {
    const breadcrumbs = []
    let current = currentFolder

    while (current) {
      breadcrumbs.unshift({
        id: current,
        name: mockData[current as keyof typeof mockData].name,
      })
      current = mockData[current as keyof typeof mockData].parent
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // Navigate to a folder
  const navigateToFolder = (folderId: string) => {
    setCurrentFolder(folderId)
  }

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "document":
      case "text":
        return <FileText className="h-5 w-5 text-blue-400" />
      case "spreadsheet":
      case "presentation":
        return <FileText className="h-5 w-5 text-green-400" />
      case "image":
        return <Image className="h-5 w-5 text-purple-400" />
      case "video":
        return <Video className="h-5 w-5 text-red-400" />
      case "archive":
        return <Package className="h-5 w-5 text-amber-400" />
      default:
        return <File className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="dark min-h-screen bg-slate-900 text-slate-200">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="border-b border-slate-700 bg-slate-800">
          <div className="container mx-auto px-4 py-3 flex items-center">
            <h1 className="text-xl font-bold text-white">CloudDrive</h1>
            <div className="relative ml-8 flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search files and folders"
                className="pl-8 w-full bg-slate-700 border-slate-600 text-slate-200 placeholder:text-slate-400 focus-visible:ring-slate-500"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-200 hover:text-white hover:bg-slate-700"
              >
                <span className="sr-only">User profile</span>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
                  U
                </div>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden container mx-auto px-4 py-6">
          {/* Breadcrumbs and actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{folder.name}</h2>
              <Breadcrumb className="text-sm text-slate-400">
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <BreadcrumbItem key={crumb.id}>
                      <BreadcrumbLink
                        onClick={() => navigateToFolder(crumb.id)}
                        className="hover:text-white transition-colors"
                      >
                        {crumb.name}
                      </BreadcrumbLink>
                      {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-slate-200">
                  <DropdownMenuItem className="hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white">
                    New folder
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white">
                    Upload file
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white">
                    Upload folder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main content */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-800">
                <TableRow className="border-slate-700 hover:bg-slate-800">
                  <TableHead className="text-slate-400 font-medium w-[50%]">Name</TableHead>
                  <TableHead className="text-slate-400 font-medium">Modified</TableHead>
                  <TableHead className="text-slate-400 font-medium">Size</TableHead>
                  <TableHead className="text-slate-400 font-medium w-[40px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Folders */}
                {folder.children &&
                  folder.children.length > 0 &&
                  folder.children.map((childId) => (
                    <TableRow
                      key={childId}
                      className="border-slate-700 hover:bg-slate-700 cursor-pointer transition-colors"
                      onClick={() => navigateToFolder(childId)}
                    >
                      <TableCell className="font-medium flex items-center gap-2">
                        <Folder className="h-5 w-5 text-amber-400" />
                        <span>{mockData[childId as keyof typeof mockData].name}</span>
                      </TableCell>
                      <TableCell className="text-slate-400">—</TableCell>
                      <TableCell className="text-slate-400">—</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-600 rounded-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                {/* Files */}
                {folder.files &&
                  folder.files.length > 0 &&
                  folder.files.map((file) => (
                    <TableRow key={file.id} className="border-slate-700 hover:bg-slate-700 transition-colors">
                      <TableCell className="font-medium flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <span>{file.name}</span>
                      </TableCell>
                      <TableCell className="text-slate-400">{file.modified}</TableCell>
                      <TableCell className="text-slate-400">{file.size}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-600 rounded-full"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                {/* Empty state */}
                {(!folder.children || folder.children.length === 0) && (!folder.files || folder.files.length === 0) && (
                  <TableRow className="border-slate-700">
                    <TableCell colSpan={4} className="h-[200px] text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <Folder className="h-12 w-12 mb-2 text-slate-500" />
                        <p>This folder is empty</p>
                        <Button variant="link" className="text-purple-400 hover:text-purple-300 mt-2">
                          Upload files
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

