import React, { ReactNode } from "react";

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ul>
        <li>liItem 1</li>
        <li>Item 2</li>
      </ul>
      {children}
    </div>
  );
}
