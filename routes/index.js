module.exports = router => {
    router.prefix("/api")
    router.use("/users", require('./users'))
    router.use("/news", require('./news'))
}