module.exports = {
    initial: function (User) {
        User.create({
            name: "Ann",
            email: "Ann@gmail.com",
            password: "0912222",
            dob: "2023-01-01"
        })
    }
}