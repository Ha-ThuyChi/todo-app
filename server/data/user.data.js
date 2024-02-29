
module.exports = {
    initial: function (User) {
        User.create(
            {
                name: "Ann",
                email: "Ann1@gmail.com",
                password: "0912222",
                dob: "2023-01-01"
            }
        );
        User.create(
            {
                name: "Ann",
                email: "Ann2@gmail.com",
                password: "0912222",
                dob: "2023-01-01"
            }
        );
        User.create(
            {
                name: "Ann",
                email: "Ann3@gmail.com",
                password: "0912222",
                dob: "2023-01-01"
            }
        );
    }
}