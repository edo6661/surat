"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
interface DownloadPdfProps {
  generatePdf: () => void

}
const DownloadPdf = (
  { generatePdf }: DownloadPdfProps
) => {
  return (
    <Button onClick={generatePdf}>Download PDF</Button>
  )
}

export default DownloadPdf