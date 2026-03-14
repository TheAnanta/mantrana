'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import CharacterCount from '@tiptap/extension-character-count'
import { 
  Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon, 
  Heading1, Heading2, List, ListOrdered, Image as ImageIcon,
  Quote, Redo, Undo, Plus, Type, Maximize2, X
} from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { uploadImage } from '@/lib/firebase-utils'

interface EditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function BlogEditor({ content, onChange, placeholder = 'Start writing your story...' }: EditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-teal hover:text-emerald transition-colors underline underline-offset-4',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-2xl max-w-full h-auto my-12 border border-charcoal/5 shadow-soft hover:shadow-lg transition-all',
        },
      }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-stone prose-lg md:prose-xl max-w-none focus:outline-none min-h-[500px] font-montserrat prose-headings:font-awesome-serif prose-headings:text-charcoal prose-p:text-charcoal/80 prose-blockquote:font-awesome-serif prose-blockquote:italic prose-blockquote:border-teal prose-img:mx-auto',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            handleFileUpload(file);
            return true;
          }
        }
        return false;
      },
    },
  })

  const handleFileUpload = async (file: File) => {
    if (!editor) return

    try {
      setIsUploading(true)
      const path = `blog/content/${Date.now()}_${file.name}`
      const url = await uploadImage(file, path)
      editor.chain().focus().setImage({ src: url }).run()
    } catch (error) {
      console.error('Image upload failed:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
  }

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="relative w-full group/editor">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={onFileChange} 
      />

      {isUploading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-10 w-10 border-b-2 border-teal mb-4"></div>
            <p className="text-charcoal/60 font-bold text-xs uppercase tracking-widest font-montserrat">Uploading Image...</p>
          </div>
        </div>
      )}

      {/* Bubble Menu (appears on selection) */}
      <BubbleMenu 
        editor={editor} 
        className="flex items-center bg-white border border-charcoal/5 rounded-full shadow-2xl p-1 gap-1 overflow-hidden"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2.5 hover:bg-charcoal/5 rounded-full transition-all ${editor.isActive('bold') ? 'text-teal' : 'text-charcoal/60'}`}
          type="button"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2.5 hover:bg-charcoal/5 rounded-full transition-all ${editor.isActive('italic') ? 'text-teal' : 'text-charcoal/60'}`}
          type="button"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2.5 hover:bg-charcoal/5 rounded-full transition-all ${editor.isActive('underline') ? 'text-teal' : 'text-charcoal/60'}`}
          type="button"
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </button>
        
        <div className="w-[1px] bg-charcoal/10 mx-1 self-stretch" />
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2.5 hover:bg-charcoal/5 rounded-full transition-all ${editor.isActive('heading', { level: 2 }) ? 'text-teal' : 'text-charcoal/60'}`}
          type="button"
          title="Heading"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={setLink}
          className={`p-2.5 hover:bg-charcoal/5 rounded-full transition-all ${editor.isActive('link') ? 'text-teal' : 'text-charcoal/60'}`}
          type="button"
          title="Add Link"
        >
          <LinkIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2.5 hover:bg-charcoal/5 rounded-full transition-all ${editor.isActive('blockquote') ? 'text-teal' : 'text-charcoal/60'}`}
          type="button"
          title="Quote"
        >
          <Quote size={18} />
        </button>
      </BubbleMenu>

      {/* Floating Menu (appears on empty lines) */}
      <FloatingMenu 
        editor={editor} 
        className="flex items-center"
      >
        <div className="flex bg-white/90 backdrop-blur-md border border-charcoal/5 shadow-xl rounded-full p-1 opacity-0 group-hover/editor:opacity-100 transition-all duration-300 transform -translate-x-full -ml-4">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 hover:bg-charcoal/5 rounded-full transition-all ${editor.isActive('heading', { level: 1 }) ? 'text-teal' : 'text-charcoal/40'}`}
            type="button"
            title="Large Heading"
          >
            <Heading1 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 hover:bg-charcoal/5 rounded-full transition-all ${editor.isActive('bulletList') ? 'text-teal' : 'text-charcoal/40'}`}
            type="button"
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 hover:bg-charcoal/5 rounded-full transition-all ${editor.isActive('orderedList') ? 'text-teal' : 'text-charcoal/40'}`}
            type="button"
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </button>
          <button
            onClick={triggerImageUpload}
            className="p-2 hover:bg-charcoal/5 rounded-full transition-all text-charcoal/40"
            type="button"
            title="Upload Image"
          >
            <ImageIcon size={18} />
          </button>
        </div>
        <button 
          className="p-1 px-2 border border-charcoal/10 rounded-full text-charcoal/20 hover:text-teal hover:border-teal/30 transition-all"
          title="Quick Commands"
        >
          <Plus size={16} />
        </button>
      </FloatingMenu>

      {/* Undo/Redo Controls (Refined) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-white/80 backdrop-blur-xl border border-charcoal/5 p-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-40 space-x-1">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2.5 hover:bg-charcoal/5 rounded-full transition-all disabled:opacity-20 text-charcoal/60 hover:text-charcoal"
          type="button"
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <div className="w-[1px] h-4 bg-charcoal/10 mx-1" />
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2.5 hover:bg-charcoal/5 rounded-full transition-all disabled:opacity-20 text-charcoal/60 hover:text-charcoal"
          type="button"
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>

      <div 
        className="pt-4 cursor-text group/content min-h-[500px]"
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent 
          editor={editor} 
          className="tiptap-container group-hover/content:bg-white transition-all rounded-2xl p-8 -mx-8 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-transparent hover:border-charcoal/5" 
        />
      </div>
      
      <div className="mt-16 py-8 border-t border-charcoal/5 flex flex-wrap gap-6 justify-between items-center text-[10px] font-bold text-charcoal/20 font-montserrat uppercase tracking-[0.2em] pointer-events-none">
        <div className="flex items-center space-x-4">
          <span>{editor.storage.characterCount.words()} words</span>
          <span className="w-1 h-1 bg-charcoal/10 rounded-full" />
          <span>{editor.storage.characterCount.characters()} characters</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Powered by Mantrana Editor Suite</span>
        </div>
      </div>
    </div>
  )
}
