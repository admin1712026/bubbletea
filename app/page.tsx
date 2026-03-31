import fs from 'fs'
import path from 'path'

export default function Home() {
  // Читаем HTML файл из public папки
  const htmlPath = path.join(process.cwd(), 'public', 'index.html')
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
  
  return (
    <>
      {/* Отображаем HTML содержимое */}
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  )
}