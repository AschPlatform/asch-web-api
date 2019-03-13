import * as slots from './slots'

function timeAgo(time: number): string {
  let d: Date = slots.beginEpochTime()

  let t: number = d.getTime() / 1000

  let datetime: Date = new Date((time + t) * 1000)

  let currentTime: number = new Date().getTime()
  let diffTime: number = (currentTime - datetime.getTime()) / 1000

  if (diffTime < 60) {
    return Math.floor(diffTime) + ' sec ago'
  }
  if (Math.floor(diffTime / 60) <= 1) {
    return Math.floor(diffTime / 60) + ' min ago'
  }
  if (diffTime / 60 < 60) {
    return Math.floor(diffTime / 60) + ' mins ago'
  }
  if (Math.floor(diffTime / 60 / 60) <= 1) {
    return Math.floor(diffTime / 60 / 60) + ' hour ago'
  }
  if (diffTime / 60 / 60 < 24) {
    return Math.floor(diffTime / 60 / 60) + ' hours ago'
  }
  if (Math.floor(diffTime / 60 / 60 / 24) <= 1) {
    return Math.floor(diffTime / 60 / 60 / 24) + ' day ago'
  }
  if (diffTime / 60 / 60 / 24 < 30) {
    return Math.floor(diffTime / 60 / 60 / 24) + ' days ago'
  }
  if (Math.floor(diffTime / 60 / 60 / 24 / 30) <= 1) {
    return Math.floor(diffTime / 60 / 60 / 24 / 30) + ' month ago'
  }
  if (diffTime / 60 / 60 / 24 / 30 < 12) {
    return Math.floor(diffTime / 60 / 60 / 24 / 30) + ' months ago'
  }
  if (Math.floor(diffTime / 60 / 60 / 24 / 30 / 12) <= 1) {
    return Math.floor(diffTime / 60 / 60 / 24 / 30 / 12) + ' year ago'
  }

  return Math.floor(diffTime / 60 / 60 / 24 / 30 / 12) + ' years ago'
}

function fullTimestamp(time: number): string {
  let d = slots.beginEpochTime()
  let t = d.getTime() / 1000

  d = new Date((time + t) * 1000)
  let month: number = d.getMonth() + 1
  let monthStr: string = month + ''
  if (month < 10) {
    monthStr = '0' + monthStr
  }

  let day: number = d.getDate()
  let dayStr: string = day + ''
  if (day < 10) {
    dayStr = '0' + day
  }

  let h: number = d.getHours()
  let m: number = d.getMinutes()
  let s: number = d.getSeconds()

  let hStr: string = h + ''
  let mStr: string = m + ''
  let sStr: string = s + ''

  if (h < 10) {
    hStr = '0' + h
  }

  if (m < 10) {
    mStr = '0' + m
  }

  if (s < 10) {
    sStr = '0' + s
  }

  return d.getFullYear() + '/' + month + '/' + day + ' ' + h + ':' + m + ':' + s
}

export { timeAgo, fullTimestamp }
