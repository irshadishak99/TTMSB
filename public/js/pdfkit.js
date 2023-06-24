const PDFDocument = require('pdf-lib')
//const { PDFDocument} = PDFLib
async function generateQRPDF(){
  console.log('hello12')
  
 //const fs = require('fs')
  console.log('hello1')
  const pdfUrl = await PDFDocument.load(document.getElementById('doc-file').files[0]) 
  const qrUrl = await PDFDocument.load(document.getElementById('qrcode'))
 
  const pdff = await fetch(pdfUrl).then(res => res.arrayBuffer())
  const qrr = await fetch(qrUrl).then(res => res.arrayBuffer())
  
  
  const qrFile = await pdff.embedPng(qrr)

  const pages = pdff.getPages()

  pages[0].drawImage(qrFile, {
    x: 25,
    y: 25, 
   })
   const pdfBytes = await pdff.save()
   download(pdfBytes, files[0].name, "application/pdf");
   /*
   document.getElementById('download-link').download = document.getElementById(
    'doc-file',
  ).files[0].name
  console.log('hello2')
 
  function makeDownload() {
    document.getElementById('download-link').href = document.querySelector(
      '#qrcode img',
    ).src
    console.log('hello3')
    }
setTimeout(makeDownload, 500)
*/
}