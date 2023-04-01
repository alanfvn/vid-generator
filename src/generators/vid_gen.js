import ffmpeg from "fluent-ffmpeg"
import stream from 'stream'

function getFileDuration(file){
  return new Promise((resolve, reject)=>{
    ffmpeg.ffprobe(file, (err, meta)=>{
      if(err){
        return reject(err)
      }
      return resolve(meta.format.duration)
    })
  })
}


function ffmpeg_async(image, audio_file, duration, output_dir){
  return new Promise((resolve, reject)=>{
    const imgStream = new stream.PassThrough()
    imgStream.write(image, 'utf8')
    ffmpeg()
      .input(audio_file)
      .input(imgStream)
      .loop(duration)
      .videoCodec('libx264')
      .outputOptions([
        '-preset medium',
        '-tune stillimage',
        '-crf 18',
        '-pix_fmt yuv420p',
      ])
      .on('err',(err)=>{
        console.log(err)
        return reject(err)
      })
      .on('end',(_fim)=>{
        return resolve()
      })
      .saveToFile(output_dir)
      imgStream.end()
  })
}

async function generateVideo(image, audio_file, output_dir){
  const dur = await getFileDuration(audio_file)
  await ffmpeg_async(image, audio_file, dur, output_dir)
}

export default generateVideo
