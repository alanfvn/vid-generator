import { upload } from 'youtube-videos-uploader'

function uploadVideos(files) {

  const videos = []
  const credentials = { 
    email: process.env.EMAIL,
    pass: process.env.PASSWORD, 
    recoveryemail: process.env.RECOVERY
  }

  for(const path of files){
    videos.push({ 
      path: path,
      title: 'random',
      description: '',
      isAgeRestriction: false, 
      isChannelMonetized: false,
      isNotForKid: true, 
      onProgress: (progress) => {
        console.log(progress)
      },
      onSuccess: (videoUrl)=>{
        console.log(`Done uploading: ${videoUrl}`)
      }, 
      publishType: 'UNLISTED',
      skipProcessingWait: true, 
      uploadAsDraft: false,
    })
  }
  upload(credentials, videos).then(console.log)
}


export default uploadVideos
