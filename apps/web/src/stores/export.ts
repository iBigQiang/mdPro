import { toPng } from 'html-to-image'
import {
  downloadFile,
  downloadMD,
  exportHTML,
  exportPDF,
  exportPureHTML,
  getHtmlContent,
  sanitizeTitle,
} from '@/utils'
import { usePostStore } from './post'
import { useRenderStore } from './render'
 

/**
 * 导出功能 Store
 * 负责处理各种导出功能：HTML、PDF、MD、图片等
 */
export const useExportStore = defineStore(`export`, () => {
  const postStore = usePostStore()
  const renderStore = useRenderStore()

  // 将编辑器内容转换为 HTML
  const editorContent2HTML = () => {
    const temp = getHtmlContent()
    document.querySelector(`#output`)!.innerHTML = renderStore.output
    return temp
  }

  // 导出编辑器内容为 HTML，并且下载到本地
  const exportEditorContent2HTML = async () => {
    const currentPost = postStore.currentPost
    if (!currentPost)
      return

    await exportHTML(currentPost.title)
    document.querySelector(`#output`)!.innerHTML = renderStore.output
  }

  // 导出编辑器内容为无样式 HTML
  const exportEditorContent2PureHTML = (content: string) => {
    const currentPost = postStore.currentPost
    if (!currentPost)
      return

    exportPureHTML(content, currentPost.title)
  }

  // 下载卡片图片
  const downloadAsCardImage = async (long = false) => {
    const currentPost = postStore.currentPost
    if (!currentPost)
      return

    const el = document.querySelector<HTMLElement>(`#output-wrapper>.preview`)
    if (!el)
      return
    const contentEl = el.querySelector<HTMLElement>('#output')

    const mm2px = (mm: number) => Math.round(mm * 3.7795)
    const padPx = mm2px(10)

    const options: any = {
      backgroundColor: `#fff`,
      skipFonts: true,
      pixelRatio: Math.max(window.devicePixelRatio || 1, 2),
      style: { margin: `0` },
    }

    const originalClassName = el.className
    const originalStyle = el.getAttribute('style') || ''
    const originalContentStyle = contentEl?.getAttribute('style') || ''
    el.classList.remove('border-x', 'shadow-xl')
    el.style.border = '0'
    el.style.borderLeft = '0'
    el.style.borderRight = '0'
    el.style.boxShadow = 'none'
    el.style.webkitBoxShadow = 'none'
    el.style.outline = 'none'
    el.style.filter = 'none'
    el.style.background = '#fff'
    el.style.backgroundColor = '#fff'
    el.style.backgroundImage = 'none'
    el.style.paddingLeft = `${padPx}px`
    el.style.paddingRight = `${padPx}px`
    el.style.backgroundClip = 'padding-box'

    if (contentEl) {
      contentEl.style.paddingLeft = `${padPx}px`
      contentEl.style.paddingRight = `${padPx}px`
      contentEl.style.paddingTop = `${Math.round(padPx * 0.6)}px`
      contentEl.style.paddingBottom = `${Math.round(padPx * 0.6)}px`
      contentEl.style.background = '#fff'
      contentEl.style.backgroundColor = '#fff'
      contentEl.style.backgroundImage = 'none'
    }

    if (long) {
      options.width = el.scrollWidth
      options.height = el.scrollHeight
      if (options.height > 8000 || options.width > 4000) {
        options.pixelRatio = 1
      }
    }
    else {
      const viewport = document.querySelector<HTMLElement>('#preview')
      const viewportHeight = viewport ? viewport.clientHeight : el.offsetHeight
      el.style.height = `${viewportHeight}px`
      el.style.overflow = 'hidden'
      options.width = el.offsetWidth
      options.height = viewportHeight
    }

    try {
      const url = await toPng(el, options)
      downloadFile(url, `${sanitizeTitle(currentPost.title)}${long ? `.long` : ``}.png`, `image/png`)
    }
    finally {
      el.className = originalClassName
      el.setAttribute('style', originalStyle)
      if (contentEl)
        contentEl.setAttribute('style', originalContentStyle)
    }

  }

  // 导出编辑器内容为 PDF
  const exportEditorContent2PDF = async () => {
    const currentPost = postStore.currentPost
    if (!currentPost)
      return

    await exportPDF(currentPost.title)
    document.querySelector(`#output`)!.innerHTML = renderStore.output
  }

  // 导出编辑器内容到本地（Markdown）
  const exportEditorContent2MD = (content: string) => {
    const currentPost = postStore.currentPost
    if (!currentPost)
      return

    downloadMD(content, currentPost.title)
  }

  return {
    editorContent2HTML,
    exportEditorContent2HTML,
    exportEditorContent2PureHTML,
    downloadAsCardImage,
    exportEditorContent2PDF,
    exportEditorContent2MD,
  }
})
