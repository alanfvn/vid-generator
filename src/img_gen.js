import textToImage from 'text-to-image'

async function generateText(course, date) {
  const image = await textToImage.generate(
    `${course}\n\n${date}`, {
      customHeight: 720,
      maxWidth: 1280,
      fontFamily: 'Times New Roman',
      bgColor: 'black',
      textColor: 'white',
      fontSize: 40,
      verticalAlign: 'center',
      textAlign: 'center'
    })
  return image
}

export default generateText
