'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

interface ProductDescriptionProps {
  description?: string;
  height?: string;
}

const DescriptionViwer: React.FC<ProductDescriptionProps> = ({
  description = '',
  height = '200px',
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Always create the editor; but it won't render anything until mounted
  const editor = useEditor({
    editable: false,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {},
        orderedList: {},
        listItem: {},
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: true, HTMLAttributes: { class: 'text-blue-600 underline' } }),
      Image.configure({ HTMLAttributes: { class: 'max-w-full h-auto rounded-lg' } }),
      Placeholder.configure({ placeholder: '' }),
    ],
    content: description,
  });

  // Only render the EditorContent after mount
  if (!isMounted || !editor) {
    return <div className="p-6 text-gray-500">Loading description...</div>;
  }

 return (
  <div className="p-6 border rounded-lg bg-[#F3F2EC] rich-content">
    <EditorContent
      editor={editor}
      style={{ minHeight: height }}
    />
  </div>
);
};

export default DescriptionViwer;
