'use client';

import React, { forwardRef, useCallback, useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
     Bold,
     Italic,
     Strikethrough,
     List,
     ListOrdered,
     AlignLeft,
     AlignCenter,
     AlignRight,
     Link as LinkIcon,
     ImageIcon,
     Code,
     Quote,
     Undo,
     Redo
} from 'lucide-react';

interface RichTextEditorProps {
     label?: string;
     className?: string;
     placeholder?: string;
     labelClass?: string;
     error?: string;
     value?: string;
     onChange?: (content: string) => void;
     height?: string;
}

const TextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
     ({
          label,
          className,
          placeholder = 'Start writing...',
          labelClass,
          error,
          value = '',
          onChange,
          height = '200px',
     }, ref) => {

          const [isMounted, setIsMounted] = useState(false);

          // Fix SSR issues by only rendering after mount
          useEffect(() => {
               setIsMounted(true);
          }, []);

          const editor = useEditor({
               immediatelyRender: false, // crucial for SSR in Next.js
               extensions: [
                    StarterKit.configure({
                         bulletList: {},
                         orderedList: {},
                         listItem: {},
                    }),
                    TextAlign.configure({ types: ['heading', 'paragraph'] }),
                    Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline' } }),
                    Image.configure({ HTMLAttributes: { class: 'max-w-full h-auto rounded-lg' } }),
                    Placeholder.configure({ placeholder }),
               ],
               content: value || '<p></p>',
               editorProps: {
                    attributes: {
                         class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4 md:p-6`,
                    },
                    handleDOMEvents: {
                         keydown: (view, event) => {
                              if (event.key === 'Tab') {
                                   const { state } = view;
                                   const { $from } = state.selection;
                                   const node = $from.node($from.depth);
                                   if (node.type.name === 'listItem') {
                                        event.preventDefault();
                                        if (!event.shiftKey) {
                                             editor?.commands.sinkListItem('listItem');
                                        } else {
                                             editor?.commands.liftListItem('listItem');
                                        }
                                        return true;
                                   }
                              }
                              return false;
                         },
                    },
               },
          });
          useEffect(() => {
               if (!editor) return;

               const updateHandler = () => {
                    const html = editor.getHTML();
                    onChange?.(html);
               };

               editor.on('update', updateHandler);

               return () => {
                    editor.off('update', updateHandler);
               };
          }, [editor, onChange]);
          // Update editor content when value prop changes
          useEffect(() => {
               if (!editor) return;

               const current = editor.getHTML();

               if (value !== current) {
                    editor.commands.setContent(value || '<p></p>', {
                         emitUpdate: false,
                    });
               }
          }, [editor, value]);


          const addLink = useCallback(() => {
               const url = window.prompt('Enter URL:');
               if (url) {
                    editor?.chain().focus().setLink({ href: url }).run();
               }
          }, [editor]);

          const addImage = useCallback(() => {
               const url = window.prompt('Enter image URL:');
               if (url) {
                    editor?.chain().focus().setImage({ src: url }).run();
               }
          }, [editor]);

          // Don't render until component is mounted (fixes SSR)
          if (!isMounted) {
               return (
                    <div className={`flex flex-col gap-2 md:gap-4 ${className || ''}`}>
                         {label && (
                              <Label className={`font-medium text-2xl capitalize ${labelClass || ''}`}>
                                   {label}
                              </Label>
                         )}
                         <div
                              className={`rich-text-editor-wrapper rounded-md border ${error ? 'border-red-500' : 'border-gray-300'
                                   } bg-white overflow-hidden`}
                              style={{ minHeight: height }}
                         >
                              <div className="flex items-center justify-center p-8 text-gray-500">
                                   Loading editor...
                              </div>
                         </div>
                         {error && (
                              <span className="text-red-500 text-sm mt-1">
                                   {error}
                              </span>
                         )}
                    </div>
               );
          }

          if (!editor) {
               return (
                    <div className={`flex flex-col gap-2 md:gap-4 ${className || ''}`}>
                         {label && (
                              <Label className={`font-medium text-2xl capitalize ${labelClass || ''}`}>
                                   {label}
                              </Label>
                         )}
                         <div
                              className={`rich-text-editor-wrapper rounded-md border ${error ? 'border-red-500' : 'border-gray-300'
                                   } bg-white overflow-hidden`}
                              style={{ minHeight: height }}
                         >
                              <div className="flex items-center justify-center p-8 text-gray-500">
                                   Initializing editor...
                              </div>
                         </div>
                         {error && (
                              <span className="text-red-500 text-sm mt-1">
                                   {error}
                              </span>
                         )}
                    </div>
               );
          }

          const ToolbarButton = ({
               onClick,
               isActive = false,
               children,
               title
          }: {
               onClick: () => void;
               isActive?: boolean;
               children: React.ReactNode;
               title: string;
          }) => (
               <button
                    type="button"
                    onClick={onClick}
                    title={title}
                    className={`p-2 rounded hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-200 text-blue-600' : 'text-gray-600'
                         }`}
               >
                    {children}
               </button>
          );

          return (
               <div className={`flex flex-col gap-2 md:gap-4 ${className || ''}`}>
                    {label && (
                         <Label className={`font-medium text-2xl capitalize ${labelClass || ''}`}>
                              {label}
                         </Label>
                    )}

                    <div
                         ref={ref}
                         className={`rich-text-editor-wrapper rounded-md border ${error ? 'border-red-500' : 'border-gray-300'
                              } bg-white overflow-hidden`}
                    >
                         {/* Toolbar */}
                         <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-200 bg-gray-50">
                              <ToolbarButton
                                   onClick={() => editor.chain().focus().toggleBold().run()}
                                   isActive={editor.isActive('bold')}
                                   title="Bold"
                              >
                                   <Bold size={16} />
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().toggleItalic().run()}
                                   isActive={editor.isActive('italic')}
                                   title="Italic"
                              >
                                   <Italic size={16} />
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().toggleStrike().run()}
                                   isActive={editor.isActive('strike')}
                                   title="Strikethrough"
                              >
                                   <Strikethrough size={16} />
                              </ToolbarButton>

                              <div className="w-px h-6 bg-gray-300 mx-1" />

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                   isActive={editor.isActive('heading', { level: 1 })}
                                   title="Heading 1"
                              >
                                   <span className="font-bold text-lg">H1</span>
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                   isActive={editor.isActive('heading', { level: 2 })}
                                   title="Heading 2"
                              >
                                   <span className="font-bold">H2</span>
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                   isActive={editor.isActive('heading', { level: 3 })}
                                   title="Heading 3"
                              >
                                   <span className="font-bold text-sm">H3</span>
                              </ToolbarButton>

                              <div className="w-px h-6 bg-gray-300 mx-1" />

                              <ToolbarButton
                                   onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                   isActive={editor?.isActive('bulletList') || false}
                                   title="Bullet List"
                              >
                                   <List size={16} />
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                                   isActive={editor?.isActive('orderedList') || false}
                                   title="Ordered List"
                              >
                                   <ListOrdered size={16} />
                              </ToolbarButton>

                              <div className="w-px h-6 bg-gray-300 mx-1" />

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                   isActive={editor.isActive({ textAlign: 'left' })}
                                   title="Align Left"
                              >
                                   <AlignLeft size={16} />
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                   isActive={editor.isActive({ textAlign: 'center' })}
                                   title="Align Center"
                              >
                                   <AlignCenter size={16} />
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                   isActive={editor.isActive({ textAlign: 'right' })}
                                   title="Align Right"
                              >
                                   <AlignRight size={16} />
                              </ToolbarButton>

                              <div className="w-px h-6 bg-gray-300 mx-1" />

                              <ToolbarButton
                                   onClick={addLink}
                                   isActive={editor.isActive('link')}
                                   title="Add Link"
                              >
                                   <LinkIcon size={16} />
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={addImage}
                                   title="Add Image"
                              >
                                   <ImageIcon size={16} />
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                   isActive={editor.isActive('codeBlock')}
                                   title="Code Block"
                              >
                                   <Code size={16} />
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                   isActive={editor.isActive('blockquote')}
                                   title="Quote"
                              >
                                   <Quote size={16} />
                              </ToolbarButton>

                              <div className="w-px h-6 bg-gray-300 mx-1" />

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().undo().run()}
                                   title="Undo"
                              >
                                   <Undo size={16} />
                              </ToolbarButton>

                              <ToolbarButton
                                   onClick={() => editor.chain().focus().redo().run()}
                                   title="Redo"
                              >
                                   <Redo size={16} />
                              </ToolbarButton>
                         </div>

                         {/* Editor Content */}
                         <EditorContent
                              editor={editor}
                              className="prose max-w-none"
                              style={{ minHeight: height }}
                         />
                    </div>

                    {error && (
                         <span className="text-red-500 text-sm mt-1">
                              {error}
                         </span>
                    )}

                    <style jsx global>{`
          .rich-text-editor-wrapper .ProseMirror {
            padding: 20px;
            font-size: 16px;
            line-height: 1.6;
            color: #334155;
            min-height: ${height};
            outline: none;
          }
          
          .rich-text-editor-wrapper .ProseMirror p.is-editor-empty:first-child::before {
            color: #9ca3af;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }
          
          .rich-text-editor-wrapper .ProseMirror h1 {
            font-size: 2em;
            font-weight: bold;
            margin-top: 1em;
            margin-bottom: 0.5em;
          }
          
          .rich-text-editor-wrapper .ProseMirror h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-top: 1em;
            margin-bottom: 0.5em;
          }
          
          .rich-text-editor-wrapper .ProseMirror h3 {
            font-size: 1.25em;
            font-weight: bold;
            margin-top: 1em;
            margin-bottom: 0.5em;
          }
          
          .rich-text-editor-wrapper .ProseMirror ul, 
          .rich-text-editor-wrapper .ProseMirror ol {
            padding-left: 1.5em;
          }
          
          .rich-text-editor-wrapper .ProseMirror blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1em;
            margin-left: 0;
            font-style: italic;
          }
          
          .rich-text-editor-wrapper .ProseMirror pre {
            background: #f3f4f6;
            border-radius: 0.5rem;
            padding: 1rem;
            overflow-x: auto;
          }
          
          .rich-text-editor-wrapper .ProseMirror code {
            background: #f3f4f6;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.875em;
          }
          
          /* Responsive styles */
          @media (min-width: 768px) {
            .rich-text-editor-wrapper .ProseMirror {
              padding: 32px;
              font-size: 18px;
            }
          }
        `}</style>
               </div>
          );
     }
);

TextEditor.displayName = 'TextEditor';

export default TextEditor;