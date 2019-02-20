function getEpochTime(time?: number): number {
  if (time === undefined) {
    time = new Date().getTime()
  }
  var d = beginEpochTime()
  var t = d.getTime()
  return Math.floor((time - t) / 1000)
}

function beginEpochTime() {
  var d = new Date(Date.UTC(2016, 5, 27, 20, 0, 0, 0))

  return d
}

var interval = 10,
  delegates = 101

function getTime(time?: number) {
  return getEpochTime(time)
}

function getRealTime(epochTime?: number) {
  if (epochTime === undefined) {
    epochTime = getTime()
  }
  var d = beginEpochTime()
  var t = Math.floor(d.getTime() / 1000) * 1000
  return t + epochTime * 1000
}

function getSlotNumber(epochTime?: number) {
  if (epochTime === undefined) {
    epochTime = getTime()
  }

  return Math.floor(epochTime / interval)
}

function getSlotTime(slot: number) {
  return slot * interval
}

function getNextSlot() {
  var slot = getSlotNumber()

  return slot + 1
}

function getLastSlot(nextSlot: number) {
  return nextSlot + delegates
}

export {
  interval,
  delegates,
  getTime,
  getRealTime,
  getSlotNumber,
  getSlotTime,
  getNextSlot,
  getLastSlot,
  beginEpochTime
}
