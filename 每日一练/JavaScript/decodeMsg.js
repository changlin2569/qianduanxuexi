function decode(message) {
    // your code here
    const [lenX, lenY] = [message?.length, message[0]?.length]
    let res = ''
    let [i, j] = [0, 0]
    while (j < lenY) {
    console.log(message[i][j])
      res += message[i][j]
      if (i === lenX - 1) {
        i--
      } else {
        i++
      }
      j++
    }
    return res
}

console.log(decode([['a']]))