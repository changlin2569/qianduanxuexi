function loader1(sourceCode) {
    console.log('loader1 start')

    return sourceCode + "\n const loader1 = 'https://baidu.com'"
}

module.exports = loader1