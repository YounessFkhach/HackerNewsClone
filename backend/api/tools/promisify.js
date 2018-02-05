
module.exports = {
  promisify(fn){
    return new Promise(function(resolve, reject) {
      fn.exec((err, res) => {
        if(err) reject(err)
        else resolve(res)
      })
    })
  }
}
