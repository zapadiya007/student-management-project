
import { useState } from "react";
import { Trash2, FileText, Mail, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface BulkActionsProps {
  selectedCount: number;
  onExport: () => void;
  onDelete: () => void;
  onSendNotifications: () => void;
  onClearSelection: () => void;
}

export function BulkActions({ 
  selectedCount, 
  onExport, 
  onDelete, 
  onSendNotifications, 
  onClearSelection 
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
      <Badge variant="secondary" className="bg-primary/10 text-primary">
        {selectedCount} selected
      </Badge>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4 mr-2" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem onClick={onExport}>
              <FileText className="h-4 w-4 mr-2" />
              Export to CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSendNotifications}>
              <Mail className="h-4 w-4 mr-2" />
              Send Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          Clear
        </Button>
      </div>
    </div>
  );
}
