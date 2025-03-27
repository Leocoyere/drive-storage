type File = {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
}

export const mockData: Record<string, { 
  name: string;
  parent: string;
  type: string;
  children: string[];
  files: File[];
}> = {
    root: { 
      name: "My Drive",
      type: "folder",
      parent: "",
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