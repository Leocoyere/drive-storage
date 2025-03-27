"use client"

import React, { useState } from "react"
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
import { mockData } from "~/lib/mock-data"

export default function Page() {
  const [currentFolder, setCurrentFolder] = useState("root")
  const folder = mockData[currentFolder]

  // Generate breadcrumb path
  const generateBreadcrumbs = () => {
    const breadcrumbs = []
    let current = currentFolder

    while (current) {
      breadcrumbs.unshift({
        id: current,
        name: mockData[current]!.name,
      })
      current = mockData[current]!.parent
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
        return <FileText className="h-5 w-5 text-orange-400" />
      case "spreadsheet":
      case "presentation":
        return <FileText className="h-5 w-5 text-orange-400" />
      case "image":
        return <Image className="h-5 w-5 text-orange-400" />
      case "video":
        return <Video className="h-5 w-5 text-orange-400" />
      case "archive":
        return <Package className="h-5 w-5 text-orange-400" />
      default:
        return <File className="h-5 w-5 text-orange-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="border-b border-gray-300 bg-white">
          <div className="container mx-auto px-4 py-3 flex items-center">
            <h1 className="text-xl font-bold">CloudDrive</h1>
            <div className="relative ml-8 flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search files and folders"
                className="pl-8 w-full bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus-visible:ring-gray-400"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{folder!.name}</h2>
              <Breadcrumb className="text-sm text-gray-500">
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.id}>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          onClick={() => navigateToFolder(crumb.id)}
                          className="hover:text-gray-900 transition-colors"
                        >
                          {crumb.name}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <Table>
              <TableHeader className="bg-white">
                <TableRow className="border-gray-300">
                  <TableHead className="text-gray-600 font-medium w-[50%] px-4 py-3">Name</TableHead>
                  <TableHead className="text-gray-600 font-medium py-3">Modified</TableHead>
                  <TableHead className="text-gray-600 font-medium py-3">Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {folder!.children && folder!.children.length > 0 && folder!.children.map((childId) => (
                  <TableRow
                    key={childId}
                    className="border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => navigateToFolder(childId)}
                  >
                    <TableCell className="font-medium flex items-center gap-2 p-4">
                      <Folder className="h-5 w-5 text-indigo-400" />
                      <span>{mockData[childId]!.name}</span>
                    </TableCell>
                    <TableCell className="text-gray-500">—</TableCell>
                    <TableCell className="text-gray-500">—</TableCell>
                  </TableRow>
                  ))}

                  {folder!.files &&
                    folder!.files.length > 0 &&
                    folder!.files.map((file) => (
                      <TableRow key={file.id} className="border-gray-300 hover:bg-gray-200 transition-colors">
                        <TableCell className="font-medium flex items-center gap-2 p-4">
                          {getFileIcon(file.type)}
                          <span>{file.name}</span>
                        </TableCell>
                        <TableCell className="text-gray-500">{file.modified}</TableCell>
                        <TableCell className="text-gray-500">{file.size}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-300 rounded-full"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                          </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
