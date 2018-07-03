const fs = require('fs')
module.exports = {
  outputPath: null,
  getOutPutPath: function () {
    if (this.outputPath !== null) {
      return this.outputPath
    }
    let testConfigStr;
    switch (process.argv[2]) {
      case 'test':
        if (!process.env.QINIU_TEST) {
         throw new Error('please config process.env.QINIU_TEST')
        }
        testConfigStr = process.env.QINIU_TEST
        break
      case 'prod':
        if (!process.env.QINIU_PROD) {
          throw new Error('please config process.env.QINIU_PROD')
        }
        testConfigStr = process.env.QINIU_PROD
        break
      default:
        this.outputPath = '/'
        return '/'
        break
    }
    const testConfig = JSON.parse(testConfigStr);
    const date = new Date();
    const webebagPrefix = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '' + date.getHours();
    fs.writeFileSync('./adverst', webebagPrefix)
    this.outputPath = testConfig.domain + '/' + testConfig.prefix + '/' + webebagPrefix + '/'
    return this.outputPath
  }
}
