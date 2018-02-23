const express = require('express')
const app = express()

app.disable('x-powered-by')

app.use(express.static('dist'))
app.listen(process.env.PORT || 3000)
