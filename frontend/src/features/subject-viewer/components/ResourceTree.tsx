import { ChevronDown, ChevronRight, FilePlus2, FileText, FolderOpen, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { NoteTag, SubjectNote } from "../services";

const groups: { tag: NoteTag; label: string }[] = [
  { tag: "Lecture", label: "Shared Notes" },
  { tag: "Summary", label: "Unit wise" },
  { tag: "PYQ", label: "PYQs" },
  { tag: "My Notes", label: "My Notes" },
];

interface Props { notes: SubjectNote[]; activeId: string | null; onOpen: (note: SubjectNote) => void; onCreate: () => void; }

export function ResourceTree({ notes, activeId, onOpen, onCreate }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({ Lecture: true, Summary: true, PYQ: true, "My Notes": true });
  return <aside className="flex h-full w-60 shrink-0 flex-col border-r bg-card">
    <div className="flex items-center justify-between border-b px-3 py-2.5"><span className="text-sm font-semibold">Resources</span><FolderOpen className="h-4 w-4 text-muted-foreground" /></div>
    <div className="min-h-0 flex-1 overflow-y-auto p-2">
      {groups.map((group) => {
        const items = notes.filter((note) => note.tag === group.tag);
        const expanded = open[group.tag];
        return <section key={group.tag} className="mb-1">
          <button type="button" onClick={() => setOpen((value) => ({ ...value, [group.tag]: !expanded }))} className="flex w-full items-center gap-1 rounded px-1 py-1.5 text-left text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground">
            {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}{group.label}
          </button>
          {expanded && <div className="ml-2 border-l pl-1">
            {items.map((note) => <button key={note.id} type="button" onClick={() => onOpen(note)} className={`flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-xs ${note.id === activeId ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><FileText className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{note.title}</span></button>)}
            {!items.length && <p className="px-2 py-1 text-xs text-muted-foreground">No files yet</p>}
          </div>}
        </section>;
      })}
    </div>
    <div className="border-t p-2"><Button onClick={onCreate} variant="outline" size="sm" className="w-full justify-start gap-2"><FilePlus2 className="h-4 w-4" />New text note<Plus className="ml-auto h-3.5 w-3.5" /></Button></div>
  </aside>;
}
