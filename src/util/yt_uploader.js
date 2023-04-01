import { upload } from 'youtube-videos-uploader'

function uploadVideos(files) {
  const videos = []
  const credentials = { 
    email: process.env.EMAIL,
    pass: process.env.PASSWORD, 
    recoveryemail: process.env.RECOVERY
  }

  //TODO: Automatically set the playlist for uploaded video.
  for(const [k, v] of Object.entries(files)){
    videos.push({ 
      path: v,
      title: k,
      description: '',
      isAgeRestriction: false, 
      isChannelMonetized: false,
      isNotForKid: true, 
      onProgress: (prog) => {
        const {progress, stage} = prog
        console.log(`Uploading "${k}" prog: ${progress}%, stage: ${stage}`)
      },
      onSuccess: (_videoUrl)=>{}, 
      publishType: 'UNLISTED',
      skipProcessingWait: true, 
      uploadAsDraft: false,
    })
  }
  upload(credentials, videos).then(console.log)
}


export default uploadVideos
