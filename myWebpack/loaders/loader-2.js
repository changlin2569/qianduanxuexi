function loader2(sourceCode) {
    console.log('loader2 start')

    return sourceCode + "\n const loader2 = 'https://4399.com'"
}

module.exports = loader2