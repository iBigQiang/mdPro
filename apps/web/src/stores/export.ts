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
import { useThemeStore } from './theme'


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

  // 下载卡片图片 - 使用克隆DOM并强制移除所有宽度限制
  const downloadAsCardImage = async (long = false) => {
    const currentPost = postStore.currentPost
    if (!currentPost)
      return

    // 获取原始预览元素
    const originalEl = document.querySelector<HTMLElement>(`#output-wrapper>.preview`)
    if (!originalEl)
      return

    const mm2px = (mm: number) => Math.round(mm * 3.7795)
    const padPx = mm2px(10)

    // 判断当前预览模式
    const themeStore = useThemeStore()
    const previewWidth = themeStore.previewWidth || ''
    const isMobileMode = previewWidth.includes('w-[375px]')
    const isDesktopMode = previewWidth.includes('max-w-[740px]')
    const isFullScreenMode = !isMobileMode && !isDesktopMode

    // 根据模式确定导出宽度
    const fixedExportWidth = isMobileMode ? 375 : (isDesktopMode ? 740 : 0) // 0 表示不限制（全屏模式）

    // 注入全局样式到 head（确保对克隆元素生效）
    const globalStyle = document.createElement('style')
    globalStyle.id = 'export-global-style'
    
    // 根据模式决定样式
    const tableWidthStyle = isFullScreenMode 
      ? `width: auto !important; max-width: none !important; table-layout: auto !important;`
      : `width: 100% !important; max-width: 100% !important; table-layout: fixed !important;`
    
    const cellWidthStyle = isFullScreenMode
      ? `white-space: nowrap !important; word-break: keep-all !important; width: auto !important; max-width: none !important; min-width: 0 !important;`
      : `white-space: normal !important; word-break: break-word !important;`

    // 手机/电脑模式下图片样式：限制最大宽度并居中
    const imageStyle = isFullScreenMode
      ? ``
      : `
      #export-clone img {
        max-width: 100% !important;
        height: auto !important;
        display: block !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
      `

    globalStyle.innerHTML = `
      #export-clone,
      #export-clone * {
        ${isFullScreenMode ? 'max-width: none !important;' : ''}
        box-sizing: border-box !important;
      }
      #export-clone table {
        ${tableWidthStyle}
        min-width: 0 !important;
        border-collapse: collapse !important;
      }
      #export-clone th,
      #export-clone td {
        ${cellWidthStyle}
      }
      ${imageStyle}
      #export-clone *::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      #export-clone {
        scrollbar-width: none !important;
      }
    `
    document.head.appendChild(globalStyle)

    // 深度克隆预览元素
    const clonedEl = originalEl.cloneNode(true) as HTMLElement
    clonedEl.id = 'export-clone'
    
    // 移除可能限制宽度的 CSS 类
    clonedEl.classList.remove('border-x', 'shadow-xl', 'w-full', 'max-w-full')
    
    // 设置克隆元素基础样式 - 根据模式设置宽度
    const clonedWidth = fixedExportWidth > 0 ? `${fixedExportWidth}px` : 'auto'
    const clonedMaxWidth = fixedExportWidth > 0 ? `${fixedExportWidth}px` : 'none'
    
    clonedEl.style.cssText = `
      position: fixed !important;
      left: 0 !important;
      top: 0 !important;
      z-index: 99999 !important;
      background: #fff !important;
      border: none !important;
      box-shadow: none !important;
      width: ${clonedWidth} !important;
      max-width: ${clonedMaxWidth} !important;
      height: auto !important;
      min-height: 0 !important;
      overflow: visible !important;
      padding: ${padPx}px !important;
      transform: none !important;
    `
    
    // 遍历所有子元素，强制移除宽度限制
    const allElements = clonedEl.querySelectorAll('*')
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      // 移除可能限制宽度的类
      htmlEl.classList.remove('w-full', 'max-w-full', 'overflow-hidden', 'overflow-x-hidden', 'overflow-y-hidden')
      // 强制设置样式
      htmlEl.style.maxWidth = 'none'
      htmlEl.style.overflow = 'visible'
    })

    // 特别处理内容容器
    const clonedContent = clonedEl.querySelector<HTMLElement>('#output')
    if (clonedContent) {
      clonedContent.style.cssText = `
        width: auto !important;
        max-width: none !important;
        height: auto !important;
        min-height: 0 !important;
        overflow: visible !important;
        padding: 0 !important;
        margin: 0 !important;
      `
    }

    // 特别处理表格
    const tables = clonedEl.querySelectorAll('table')
    tables.forEach(table => {
      const tbl = table as HTMLElement
      tbl.style.cssText = `
        width: auto !important;
        max-width: none !important;
        table-layout: auto !important;
        border-collapse: collapse !important;
      `
      // 处理所有单元格
      const cells = tbl.querySelectorAll('th, td')
      cells.forEach(cell => {
        const c = cell as HTMLElement
        c.style.whiteSpace = 'nowrap'
        c.style.wordBreak = 'keep-all'
        c.style.width = 'auto'
        c.style.maxWidth = 'none'
      })
    })

    // 添加到 body
    document.body.appendChild(clonedEl)

    // 等待渲染完成
    await new Promise(resolve => setTimeout(resolve, 500))

    // 测量实际尺寸 - 手机/电脑模式使用固定宽度，全屏模式使用测量值
    const measuredWidth = clonedEl.scrollWidth
    // 手机/电脑模式：直接使用固定宽度（padding 已包含在克隆元素中）
    const contentWidth = fixedExportWidth > 0 ? fixedExportWidth : measuredWidth
    const contentHeight = long ? clonedEl.scrollHeight : Math.min(clonedEl.scrollHeight, 800)
    
    // 设置最终尺寸
    clonedEl.style.width = `${contentWidth}px`
    clonedEl.style.height = `${contentHeight}px`
    clonedEl.style.overflow = 'hidden'

    const options: any = {
      backgroundColor: '#fff',
      skipFonts: true,
      pixelRatio: Math.max(window.devicePixelRatio || 1, 2),
      width: contentWidth,
      height: contentHeight,
      style: {
        margin: '0',
        overflow: 'hidden',
      },
    }

    // 大尺寸图片降低像素比
    if (contentHeight > 10000 || contentWidth > 5000) {
      options.pixelRatio = 1
    }

    try {
      const url = await toPng(clonedEl, options)
      downloadFile(url, `${sanitizeTitle(currentPost.title)}.png`, `image/png`)
    }
    catch (err) {
      console.error('导出图片失败:', err)
    }
    finally {
      // 清理
      document.body.removeChild(clonedEl)
      document.getElementById('export-global-style')?.remove()
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
