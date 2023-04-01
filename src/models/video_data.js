class VideoData{
  constructor(course_name, course_date, file_name){
    this.course = course_name;
    this.date = course_date;
    this.file = file_name;
  }

  getDate(){
    return this.date.toISOString().split("T")[0]
  }

  getOutName(){
    return `${this.getDate()}, ${this.course}`
  }
}

export default VideoData
